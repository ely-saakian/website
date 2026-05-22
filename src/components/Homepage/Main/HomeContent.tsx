import BlogPostCard from "@/components/Blog/BlogPostCard";
import IntroCard from "./IntroCard";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface HomeContentProps {
  latestPost: {
    data: {
      title?: string;
      description?: string;
      date?: string;
      series?: string;
      [key: string]: unknown;
    };
    timeToRead: string;
    slug: string;
  } | null;
  latestProject: Project | null;
}

export function HomeContent({ latestPost, latestProject }: HomeContentProps) {
  return (
    <div className="flex flex-col gap-10 items-center">
      <IntroCard />
      <div className="flex flex-col gap-5">
        <p className="self-start font-light text-gray-600 dark:text-gray-400">
          Recent blog
        </p>
        {latestPost && <BlogPostCard post={latestPost} featured />}
      </div>
      <div className="flex flex-col gap-5">
        <p className="self-start font-light text-gray-600 dark:text-gray-400">
          Recent project
        </p>
        {latestProject && <ProjectCard project={latestProject} />}
      </div>
    </div>
  );
}
