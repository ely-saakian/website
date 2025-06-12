import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import Head from "next/head";
import SubscribeCard from "../../components/Blog/SubscribeCard";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

type BlogPostProps = {
  post: {
    content: string;
    readingTime: string;
    title: string;
    thumbnail: string;
    description: string;
    date: string;
    slug: string;
  };
};

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const router = useRouter();

  // Construct the full URL for the blog post
  const baseUrl = "https://elysaakian.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = `${baseUrl}/${post.thumbnail}`;

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{post.title} | Ely Saakian</title>
        <meta name="title" content={`${post.title} | Ely Saakian`} />
        <meta name="description" content={post.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:site_name" content="Ely Saakian - Developer" />
        <meta
          property="article:published_time"
          content={new Date(post.date).toISOString()}
        />
        <meta property="article:author" content="Ely Saakian" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={postUrl} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content={imageUrl} />
        <meta property="twitter:image:alt" content={post.title} />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ely Saakian" />
        <link rel="canonical" href={postUrl} />
      </Head>

      <div className="px-5">
        <button
          className="text-gray-400 inline-flex items-center"
          onClick={() => router.push("/blog")}
        >
          <ChevronLeftIcon className="w-7 h-7 mr-1"></ChevronLeftIcon>
          <span>Blog</span>
        </button>
      </div>
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
            objectFit="cover"
            layout="fill"
          ></Image>
        </div>
        <div
          className="prose dark:prose-invert mx-auto p-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <SubscribeCard></SubscribeCard>
      </article>
    </>
  );
};

export async function getStaticPaths() {
  let files;

  try {
    files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);
  } catch (e) {
    console.warn(e);
    return { paths: [], fallback: false };
  }

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface IGetStaticPropsParams extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticProps(context: any) {
  const { slug } = context.params as IGetStaticPropsParams;
  let markdownWithMetadata = "";

  try {
    markdownWithMetadata = fs
      .readFileSync(path.join("content/blog/posts", slug + ".md"))
      .toString();
  } catch (e) {
    console.warn(e);
    return { props: {} };
  }

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
        slug: slug,
      },
    },
  };
}

export default BlogPost;
