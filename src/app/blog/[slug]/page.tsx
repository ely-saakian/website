import readingTime from "reading-time";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticTinaMarkdown } from "tinacms/dist/rich-text/static";
import client from "@tina/__generated__/client";
import { ArticleLayout } from "@/components/Blog/ArticleLayout";
import { CodeBlock } from "@/components/Blog/CodeBlock";
import { getAllPosts, seriesLabel } from "@/lib/posts";

interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = await client.queries.postConnection();
  const paths =
    pages.data?.postConnection?.edges?.map((edge) => ({
      slug: edge?.node?._sys.filename,
    })) ?? [];

  return paths;
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const { slug } = await params;

  let data;
  try {
    data = await client.queries.post({
      relativePath: `${slug}.md`,
    });
  } catch {
    return { title: "Post Not Found" };
  }

  const post = data.data.post;
  const baseUrl = "https://elysaakian.com";
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${post.title} | Ely Saakian`,
    authors: [{ name: "Ely Saakian" }],
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? undefined,
    },
    alternates: {
      canonical: postUrl,
    },
    robots: "index, follow",
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params;

  let data;
  try {
    data = await client.queries.post({
      relativePath: `${slug}.md`,
    });
  } catch {
    notFound();
  }

  const post = data.data.post;
  const stats = readingTime(JSON.stringify(post.body));
  const summary = (await getAllPosts()).find((p) => p.slug === slug);

  return (
    <ArticleLayout
      title={post.title}
      date={post.date}
      seriesLabel={summary ? seriesLabel(summary, true) : null}
      readingTime={stats.text}
      coverImage={post.coverImage}
      coverAlt={post.coverAlt}
    >
      {post.body && (
        <StaticTinaMarkdown
          content={post.body}
          components={{
            code_block: (
              props: { value: string; lang?: string } | undefined,
            ) => <CodeBlock value={props?.value ?? ""} lang={props?.lang} />,
          }}
        />
      )}
    </ArticleLayout>
  );
}
