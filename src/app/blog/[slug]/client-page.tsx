"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ArticleLayout } from "@/components/Blog/ArticleLayout";
import type { PostQuery } from "@tina/__generated__/types";

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

  return (
    <ArticleLayout
      title={post.title}
      description={post.description}
      date={post.date}
      seriesTitle={(post as any).series ?? null}
      readingTime={props.readingTime}
    >
      {post.body && <TinaMarkdown content={post.body} />}
    </ArticleLayout>
  );
}
