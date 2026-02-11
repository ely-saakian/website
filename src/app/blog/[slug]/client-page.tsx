"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import { BackButton } from "../../../components/Blog/BackButton";
import type { PostQuery } from "../../../../tina/__generated__/types";

interface ClientPostProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
  readingTime: string;
}

export default function ClientPost(props: ClientPostProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const post = data.post;

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
          {(formattedDate || props.readingTime) && (
            <p className="font-light italic text-gray-500 dark:text-white">
              {formattedDate}
              {formattedDate && props.readingTime ? " · " : ""}
              {props.readingTime}
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
          {post.body && <TinaMarkdown content={post.body} />}
        </div>
      </article>
    </>
  );
}
