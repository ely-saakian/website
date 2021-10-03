import ProjectCard from "../components/Homepage/Main/ProjectCard";
import Masonry from "react-masonry-css";
import { GetStaticProps } from "next";
import { gql, GraphQLClient } from "graphql-request";
import { formatDistanceToNow } from "date-fns";
import Main from "../components/Homepage/Main/index";

export type Project = {
	title: string;
	description: string;
	url: string;
	imageUrl: string;
	date: string;
};

interface ProjectsProps {
	projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
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
				{projects.map((project) => (
					<ProjectCard key={project.url} project={project}></ProjectCard>
				))}
			</Masonry>
		</Main>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const api = "https://api.github.com/users/ely-saakian/repos";

	const response = await fetch(api);
	const reposData = await response.json();

	const projects = await Promise.all(
		reposData.map(async (repo: any) => {
			const query = gql`
			{
				repository(owner: "ely-saakian", name: "${repo.name}") {
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

			return {
				title: repo.name,
				description: repo.description,
				url: repo.html_url,
				imageUrl: graphQLresponse.repository.openGraphImageUrl,
				date: formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true }),
			};
		})
	);

	return {
		props: {
			projects,
		},
	};
};

export default Projects;
