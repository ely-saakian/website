import readingTime from "reading-time";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "../../../../tina/__generated__/client";
import ClientPost from "./client-page";

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

  const contentString = JSON.stringify(data.data.post.body);
  const stats = readingTime(contentString);

  return (
    <ClientPost
      query={data.query}
      variables={data.variables}
      data={data.data}
      readingTime={stats.text}
    />
  );
}
