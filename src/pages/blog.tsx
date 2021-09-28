import Main from "../components/Blog/Main";
import BlogpostCard from "../components/Blog/BlogpostCard";
import SubscribeCard from "../components/Blog/SubscribeCard";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import Link from "next/link";

const Blog = ({ posts }: { posts: any[] }) => {
	return (
		<Main>
			{posts.map(({ slug, frontmatter: { title, description, date, thumbnail, readingTime } }) => (
				<Link key={date} href={`/blog/${slug}`}>
					<a>
						<BlogpostCard
							title={title}
							description={description}
							date={date}
							image={thumbnail}
							readingTime={readingTime}
						></BlogpostCard>
					</a>
				</Link>
			))}
			<SubscribeCard></SubscribeCard>
		</Main>
	);
};

export async function getStaticProps() {
	const files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);

	const posts = files.map((filename) => {
		const markdownWithMetadata = fs.readFileSync(`content/blog/posts/${filename}`).toString();

		const { data, content } = matter(markdownWithMetadata);

		const timeToRead = readingTime(content);

		// Convert post date to format: Month day, Year
		const options = { year: "numeric", month: "short", day: "numeric" };
		const formattedDate = data.date.toLocaleDateString("en-US", options);

		const frontmatter = {
			...data,
			readingTime: timeToRead.text,
			date: formattedDate,
		};

		return {
			slug: filename.replace(".md", ""),
			frontmatter,
		};
	});

	return {
		props: {
			posts,
		},
	};
}

export default Blog;
