"use client";

import Masonry from "react-masonry-css";
import IntroCard from "./IntroCard";
import LatestBlogPostCard from "./LatestBlogPostCard";
import DailyQuoteCard from "./DailyQuoteCard";

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
  const breakpointColumnsObj = { default: 2, 768: 1 };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid flex space-x-10"
      columnClassName="my-masonry-grid_column space-y-10"
    >
      <IntroCard />
      {!latestPost && <DailyQuoteCard />}
      {latestPost && <LatestBlogPostCard latestPost={latestPost} />}
      {latestPost && <DailyQuoteCard />}
    </Masonry>
  );
}
