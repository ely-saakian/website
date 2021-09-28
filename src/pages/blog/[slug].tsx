import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import marked from "marked";
import DOMPurify from "isomorphic-dompurify";

type BlogPostProps = {
	post: {
		content: string;
		readingTime: string;
		title: string;
		thumbnail: string;
		description: string;
		date: string;
	};
};

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
	return (
		<article>
			<div className="flex flex-col space-y-5 p-10">
				<h1 className="text-2xl lg:text-4xl font-bold">{post.title}</h1>
				<p className="text-lg text-gray-500 dark:text-white">{post.description}</p>
				<p className="font-light italic text-gray-500 dark:text-white">
					{post.date} · {post.readingTime}
				</p>
			</div>
			<div className="h-[250px] sm:h-[450px] relative">
				<Image src={post.thumbnail} alt={post.title} objectFit="cover" layout="fill"></Image>
			</div>
			<div className="prose mx-auto p-10" dangerouslySetInnerHTML={{ __html: post.content }}></div>
		</article>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const files = fs.readdirSync("content/blog/posts");

	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace(".md", ""),
		},
	}));

	return {
		paths,
		fallback: false,
	};
};

interface IGetStaticPropsParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps = (context) => {
	const { slug } = context.params as IGetStaticPropsParams;
	const markdownWithMetadata = fs.readFileSync(path.join("content/blog/posts", slug + ".md")).toString();

	const { data, content } = matter(markdownWithMetadata);

	const timeToRead = readingTime(content);

	// Convert post date to format: Month day, Year
	const options = { year: "numeric", month: "short", day: "numeric" };
	const formattedDate = data.date.toLocaleDateString("en-US", options);

	const frontmatter = {
		title: data.title,
		thumbnail: data.thumbnail,
		description: data.description,
		readingTime: timeToRead.text,
		date: formattedDate,
	};

	return {
		props: {
			post: {
				content: DOMPurify.sanitize(marked(content)),
				readingTime: frontmatter.readingTime,
				title: frontmatter.title,
				thumbnail: frontmatter.thumbnail,
				date: frontmatter.date,
				description: frontmatter.description,
			},
		},
	};
};

export default BlogPost;
