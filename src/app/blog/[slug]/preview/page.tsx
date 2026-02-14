import { notFound } from "next/navigation";
import readingTime from "reading-time";
import client from "@tina/__generated__/client";
import ClientPost from "../client-page";

export const metadata = {
  robots: "noindex, nofollow",
};

interface PreviewParams {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPost({ params }: PreviewParams) {
  const { slug } = await params;

  let data;
  try {
    data = await client.queries.post({
      relativePath: `${slug}.md`,
    });
  } catch {
    notFound();
  }

  const stats = readingTime(JSON.stringify(data.data.post.body));

  return (
    <ClientPost
      query={data.query}
      variables={data.variables}
      data={data.data}
      readingTime={stats.text}
    />
  );
}
