import readingTime from "reading-time";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { StaticTinaMarkdown } from "tinacms/dist/rich-text/static";
import client from "../../../../tina/__generated__/client";
import { BackButton } from "../../../components/Blog/BackButton";

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
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <>
      <BackButton />
      <article>
        <div className="flex flex-col space-y-5 p-10">
          <h1 className="text-2xl lg:text-4xl font-bold dark:text-white">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-gray-500 dark:text-white">
              {post.description}
            </p>
          )}
          {(formattedDate || stats.text) && (
            <p className="font-light italic text-gray-500 dark:text-white">
              {formattedDate}
              {formattedDate && stats.text ? " · " : ""}
              {stats.text}
            </p>
          )}
        </div>
        {post.thumbnail && (
          <div className="h-[250px] sm:h-[450px] relative">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              className="object-cover"
            />
          </div>
        )}
        <div className="prose dark:prose-invert mx-auto p-10">
          {post.body && <StaticTinaMarkdown content={post.body} />}
        </div>
      </article>
    </>
  );
}
