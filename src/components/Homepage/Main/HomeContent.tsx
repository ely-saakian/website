"use client";

import IntroCard from "./IntroCard";
import LatestBlogPostCard from "./LatestBlogPostCard";
import { VerseOfTheDay } from "@youversion/platform-react-ui";

interface HomeContentProps {
  latestPost: {
    latestPostData: {
      data: {
        title?: string;
        description?: string;
        date?: string;
        series?: string;
        [key: string]: unknown;
      };
    };
    timeToRead: string;
    slug: string;
  } | null;
}

export function HomeContent({ latestPost }: HomeContentProps) {
  return (
    <div className="columns-1 md:columns-2 gap-10 *:mb-10 *:break-inside-avoid">
      <IntroCard />
      {latestPost && <LatestBlogPostCard latestPost={latestPost} />}
      <VerseOfTheDay
        showBibleAppAttribution={false}
        showSunIcon={false}
        versionId={2692}
      />
    </div>
  );
}
