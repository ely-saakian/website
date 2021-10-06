import type { NextPage } from "next";
import IntroCard from "../components/Homepage/Main/IntroCard";
import LatestBlogPostCard from "../components/Homepage/Main/LatestBlogPostCard";
import ProjectCard from "../components/Homepage/Main/ProjectCard";
import RandomQuoteCard from "../components/Homepage/Main/RandomQuoteCard";
import Main from "../components/Homepage/Main";
import Masonry from "react-masonry-css";
import SubscribeCard from "../components/Blog/SubscribeCard";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Project } from "./projects";
import { gql, GraphQLClient } from "graphql-request";

export type Quote = {
	author: string;
	text: string;
};

interface HomePageProps {
	latestPost: {
		latestPostData: matter.GrayMatterFile<string>;
		timeToRead: string;
		slug: string;
	};
	latestProject: Project;
	quote: Quote;
}

const Home: NextPage<HomePageProps> = ({ latestPost, latestProject, quote }) => {
	const breakpointColumnsObj = {
		default: 2,
		768: 1,
	};

	return (
		<Main>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid flex space-x-10"
				columnClassName="my-masonry-grid_column space-y-10"
			>
				<IntroCard></IntroCard>
				<LatestBlogPostCard latestPost={latestPost}></LatestBlogPostCard>
				<ProjectCard latestProject project={latestProject}></ProjectCard>
				<RandomQuoteCard quote={quote}></RandomQuoteCard>
				<SubscribeCard></SubscribeCard>
			</Masonry>
		</Main>
	);
};

export async function getStaticProps() {
	let files;

	try {
		files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);
	} catch (e) {
		console.warn(e);
		return { props: {} };
	}

	const latestPostFilename = files.sort((f1, f2) => {
		let f1WithMetadata;
		let f2WithMetadata;
		try {
			f1WithMetadata = fs.readFileSync(`content/blog/posts/${f1}`).toString();
			f2WithMetadata = fs.readFileSync(`content/blog/posts/${f2}`).toString();
		} catch (e) {
			console.warn(e);
			return 0;
		}

		const data1 = matter(f1WithMetadata).data;
		const data2 = matter(f2WithMetadata).data;

		return data2.date - data1.date;
	})[0];

	const latestPostFile = fs.readFileSync(`content/blog/posts/${latestPostFilename}`).toString();
	const latestPostData = matter(latestPostFile);

	const timeToRead = readingTime(latestPostData.content).text;

	const slug = latestPostFilename.replace(".md", "");

	const reposApi = "https://api.github.com/users/ely-saakian/repos";

	const response = await fetch(reposApi);
	const reposData = await response.json();

	const latestProjectData = reposData.sort((repo1: any, repo2: any) => repo2.updated_at - repo1.updated_at)[0];

	const query = gql`
			{
				repository(owner: "ely-saakian", name: "${latestProjectData.name}") {
					openGraphImageUrl
				}
			}
		`;

	const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
		headers: {
			authorization: "Bearer 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",
		},
	});

	const graphQLresponse = await graphQLClient.request(query);

	const qutoesApi = "https://www.Famous-Quotes.uk/api.php?id=day&tags=failure";
	const qutoesApiResponse = await fetch(qutoesApi);
	const quoteData = await qutoesApiResponse.json();

	return {
		props: {
			latestPost: {
				latestPostData: {
					data: {
						...latestPostData.data,
						date: new Date(latestPostData.data.date).toString(),
					},
				},
				timeToRead,
				slug,
			},
			quote: {
				author: quoteData[0][2],
				text: quoteData[0][1],
			},
			latestProject: {
				title: latestProjectData.name,
				description: latestProjectData.description,
				url: latestProjectData.html_url,
				imageUrl: graphQLresponse.repository.openGraphImageUrl,
				date: latestProjectData.updated_at,
			},
		},
		revalidate: 120,
	};
}

export default Home;
