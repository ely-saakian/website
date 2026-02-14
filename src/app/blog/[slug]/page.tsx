import readingTime from "reading-time";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticTinaMarkdown } from "tinacms/dist/rich-text/static";
import client from "@tina/__generated__/client";
import { ArticleLayout } from "@/components/Blog/ArticleLayout";

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
  const imageUrl = post.thumbnail ? `${baseUrl}${post.thumbnail}` : undefined;

  return {
    title: `${post.title} | Ely Saakian`,
    description: post.description ?? undefined,
    authors: [{ name: "Ely Saakian" }],
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.description ?? undefined,
      siteName: "Ely Saakian - Developer",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? undefined,
      images: imageUrl ? [imageUrl] : undefined,
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

  return (
    <ArticleLayout
      title={post.title}
      description={post.description}
      date={post.date}
      thumbnail={post.thumbnail}
      readingTime={stats.text}
    >
      {post.body && <StaticTinaMarkdown content={post.body} />}
    </ArticleLayout>
  );
}
