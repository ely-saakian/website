import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import Link from "next/link";
import Main from "../../components/Blog/Main";
import BlogpostCard from "../../components/Blog/BlogpostCard";

async function getBlogPosts() {
  let files;

  try {
    files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);
  } catch (e) {
    console.warn(e);
    return [];
  }

  const posts = files.map((filename) => {
    let markdownWithMetadata;
    try {
      markdownWithMetadata = fs
        .readFileSync(`content/blog/posts/${filename}`)
        .toString();
    } catch (e) {
      console.warn(e);
      return null;
    }

    const { data, content } = matter(markdownWithMetadata);

    const timeToRead = readingTime(content);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
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

  return posts.filter(Boolean);
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Main>
      {posts.map((post: any) => (
        <Link key={post.frontmatter.title} href={`/blog/${post.slug}`}>
          <BlogpostCard
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            date={post.frontmatter.date}
            image={post.frontmatter.thumbnail}
            readingTime={post.frontmatter.readingTime}
          />
        </Link>
      ))}
    </Main>
  );
}
