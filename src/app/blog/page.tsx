import { Fragment } from "react";
import readingTime from "reading-time";
import client from "@tina/__generated__/client";
import Main from "@/components/Blog/Main";
import BlogPostCard from "@/components/Blog/BlogPostCard";

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
          data: {
            title: node.title,
            description: node.description,
            date: formattedDate,
            series: (node as any).series ?? null,
          },
          timeToRead: timeToRead,
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
        <Fragment key={post.slug}>
          <BlogPostCard post={post} featured={index === 0} />
          {index === 0 && posts.length > 1 && (
            <div
              className="flex items-center gap-4 w-full max-w-[600px]"
              aria-hidden
            >
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs uppercase tracking-wide font-light text-gray-400 dark:text-gray-500">
                More posts
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
        </Fragment>
      ))}
    </Main>
  );
}
