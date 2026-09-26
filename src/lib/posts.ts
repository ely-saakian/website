import readingTime from "reading-time";
import client from "@tina/__generated__/client";
import seriesData from "@/data/series.json";
import { localMediaPath } from "@/lib/media";

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  /** ISO timestamp. */
  date: string;
  series: string | null;
  /** 1-based position in its series, oldest first. */
  part: number | null;
  partsInSeries: number | null;
  coverImage: string | null;
  coverAlt: string;
  readingTime: string;
  readingMinutes: number;
}

export interface Series {
  name: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  /** Oldest first, so posts[0] is part 1. */
  posts: PostSummary[];
  totalMinutes: number;
}

/** All posts, newest first. */
export async function getAllPosts(): Promise<PostSummary[]> {
  const response = await client.queries.postConnection({ sort: "date" });

  const posts: PostSummary[] =
    response.data?.postConnection?.edges?.flatMap((edge) => {
      const node = edge?.node;
      if (!node) return [];

      const stats = readingTime(JSON.stringify(node.body));

      return [
        {
          slug: node._sys.filename,
          title: node.title,
          description: node.description ?? "",
          date: node.date ?? "",
          series: node.series ?? null,
          part: null,
          partsInSeries: null,
          coverImage: localMediaPath(node.coverImage),
          coverAlt: node.coverAlt ?? "",
          readingTime: stats.text,
          readingMinutes: Math.ceil(stats.minutes),
        },
      ];
    }) ?? [];

  const bySeries = new Map<string, PostSummary[]>();
  for (const post of posts) {
    if (!post.series) continue;
    bySeries.set(post.series, [...(bySeries.get(post.series) ?? []), post]);
  }
  bySeries.forEach((seriesPosts) => {
    seriesPosts
      .sort((a, b) => a.date.localeCompare(b.date))
      .forEach((post, index) => {
        post.part = index + 1;
        post.partsInSeries = seriesPosts.length;
      });
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Series with a matching entry in src/data/series.json, most recently updated first; everything else is standalone. */
export function groupBySeries(posts: PostSummary[]): {
  series: Series[];
  standalone: PostSummary[];
} {
  const series: Series[] = [];
  const standalone: PostSummary[] = [];
  const seen = new Set<string>();

  for (const post of posts) {
    const meta = seriesData.find((s) => s.name === post.series);
    if (!meta) {
      standalone.push(post);
      continue;
    }
    if (seen.has(meta.name)) continue;
    seen.add(meta.name);

    const seriesPosts = posts
      .filter((p) => p.series === meta.name)
      .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));

    series.push({
      ...meta,
      posts: seriesPosts,
      totalMinutes: seriesPosts.reduce((sum, p) => sum + p.readingMinutes, 0),
    });
  }

  return { series, standalone };
}

export function seriesLabel(post: PostSummary, withTotal = false) {
  if (!post.series || !post.part) return null;
  return withTotal && post.partsInSeries
    ? `${post.series} · Part ${post.part} of ${post.partsInSeries}`
    : `${post.series} · Part ${post.part}`;
}

export function formatPostDate(date: string | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
