"use client";

import Masonry from "react-masonry-css";
import IntroCard from "./IntroCard";
import LatestBlogPostCard from "./LatestBlogPostCard";
import ProjectCard from "./ProjectCard";
import DailyQuoteCard from "./DailyQuoteCard";
import { isEmpty } from "lodash";
import { Project } from "../../../types/project";

interface HomeContentProps {
  latestPost: {
    latestPostData: {
      data: {
        title?: string;
        description?: string;
        date?: string;
        thumbnail?: string;
        [key: string]: unknown;
      };
    };
    timeToRead: string;
    slug: string;
  } | null;
  latestProject: Project;
}

export function HomeContent({ latestPost, latestProject }: HomeContentProps) {
  const breakpointColumnsObj = { default: 2, 768: 1 };
  const hasLatestContent = latestPost || !isEmpty(latestProject);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid flex space-x-10"
      columnClassName="my-masonry-grid_column space-y-10"
    >
      <IntroCard />
      {!hasLatestContent && <DailyQuoteCard />}
      {latestPost && <LatestBlogPostCard latestPost={latestPost} />}
      {!isEmpty(latestProject) && (
        <ProjectCard latestProject project={latestProject} />
      )}
      {hasLatestContent && <DailyQuoteCard />}
    </Masonry>
  );
}
