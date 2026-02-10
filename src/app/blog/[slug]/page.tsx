import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import Image from "next/image";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import type { Metadata } from "next";
import { BackButton } from "../../../components/Blog/BackButton";
import { notFound } from "next/navigation";

interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

function getPostBySlug(slug: string) {
  let markdownWithMetadata = "";

  try {
    markdownWithMetadata = fs
      .readFileSync(path.join("content/blog/posts", slug + ".md"))
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

  return {
    content: DOMPurify.sanitize(marked(content) as string),
    readingTime: timeToRead.text,
    title: data.title,
    thumbnail: data.thumbnail,
    description: data.description,
    date: formattedDate,
    slug,
  };
}

export async function generateStaticParams() {
  let files: string[] = [];

  try {
    files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);
  } catch (e) {
    console.warn(e);
    return [];
  }

  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const baseUrl = "https://elysaakian.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = `${baseUrl}/${post.thumbnail}`;

  return {
    title: `${post.title} | Ely Saakian`,
    description: post.description,
    authors: [{ name: "Ely Saakian" }],
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.description,
      siteName: "Ely Saakian - Developer",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
    robots: "index, follow",
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <BackButton />
      <article>
        <div className="flex flex-col space-y-5 p-10">
          <h1 className="text-2xl lg:text-4xl font-bold dark:text-white">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-white">
            {post.description}
          </p>
          <p className="font-light italic text-gray-500 dark:text-white">
            {post.date} · {post.readingTime}
          </p>
        </div>
        <div className="h-[250px] sm:h-[450px] relative">
          <Image
            src={"/" + post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
            className="object-cover"
          />
        </div>
        <div
          className="prose dark:prose-invert mx-auto p-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </>
  );
}
