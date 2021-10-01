import type { GetStaticProps, NextPage } from "next";
import IntroCard from "../components/Homepage/Main/IntroCard";
import LatestBlogPostCard from "../components/Homepage/Main/LatestBlogPostCard";
import LatestProjectCard from "../components/Homepage/Main/LatestProjectCard";
import ReadingNowCard from "../components/Homepage/Main/ReadingNowCard";
import RandomQuoteCard from "../components/Homepage/Main/RandomQuoteCard";
import Main from "../components/Homepage/Main";
import Masonry from "react-masonry-css";
import SubscribeCard from "../components/Blog/SubscribeCard";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { formatDistanceToNow } from "date-fns";

interface HomePageProps {
	latestPost: {
		latestPostData: matter.GrayMatterFile<string>;
		timeToRead: string;
		slug: string;
	};
}

const Home: NextPage<HomePageProps> = ({ latestPost }) => {
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
				<LatestProjectCard></LatestProjectCard>
				<ReadingNowCard></ReadingNowCard>
				<RandomQuoteCard></RandomQuoteCard>
				<SubscribeCard></SubscribeCard>
			</Masonry>
		</Main>
	);
};

export const getStaticProps: GetStaticProps = async () => {
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

	return {
		props: {
			latestPost: {
				latestPostData: {
					data: {
						...latestPostData.data,
						date: formatDistanceToNow(latestPostData.data.date, { addSuffix: true }),
					},
				},
				timeToRead,
				slug,
			},
		},
		revalidate: 60 * 60 * 24,
	};
};

export default Home;
