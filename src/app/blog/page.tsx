import readingTime from "reading-time";
import Link from "next/link";
import client from "@tina/__generated__/client";
import Main from "@/components/Blog/Main";
import BlogpostCard from "@/components/Blog/BlogpostCard";
import BlogPostListCard from "@/components/Blog/BlogPostListCard";

async function getBlogPosts() {
  try {
    const postsResponse = await client.queries.postConnection({
      sort: "date",
    });

    const posts =
      postsResponse.data?.postConnection?.edges?.map((edge) => {
        const node = edge?.node;
        if (!node) return null;

        const bodyString = JSON.stringify(node.body);
        const timeToRead = readingTime(bodyString).text;

        const formattedDate = node.date
          ? new Date(node.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;

        return {
          slug: node._sys.filename,
          frontmatter: {
            title: node.title,
            description: node.description,
            date: formattedDate,
            dateRaw: node.date,
            series: (node as any).series ?? null,
            readingTime: timeToRead,
          },
        };
      }) ?? [];

    return posts.filter(Boolean).reverse();
  } catch (error) {
    console.error("Error fetching posts from Tina:", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Main>
      {posts.map((post: any, index: number) => (
        <Link key={post.frontmatter.title} href={`/blog/${post.slug}`}>
          {index === 0 ? (
            <BlogpostCard
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              date={post.frontmatter.date}
              seriesTitle={post.frontmatter.series ?? ""}
              readingTime={post.frontmatter.readingTime}
            />
          ) : (
            <BlogPostListCard
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              date={post.frontmatter.dateRaw ?? post.frontmatter.date}
              seriesTitle={post.frontmatter.series}
            />
          )}
        </Link>
      ))}
    </Main>
  );
}
