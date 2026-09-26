import Link from "next/link";
import BlogPostCard from "@/components/Blog/BlogPostCard";
import IntroCard from "./IntroCard";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";
import type { PostSummary } from "@/lib/posts";

interface HomeContentProps {
  latestPost: PostSummary | null;
  featuredProject: Project | null;
}

export function HomeContent({ latestPost, featuredProject }: HomeContentProps) {
  return (
    <div className="flex flex-col gap-10 items-center">
      <IntroCard />
      {featuredProject && (
        <section
          aria-labelledby="featured-project"
          className="flex w-full max-w-[600px] flex-col gap-5"
        >
          <div className="flex items-baseline justify-between px-2 sm:px-0">
            <h2 id="featured-project" className="font-light text-muted">
              Featured project
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-accent"
            >
              All projects
            </Link>
          </div>
          <ProjectCard project={featuredProject} />
        </section>
      )}
      {latestPost && (
        <section
          aria-labelledby="recent-blog"
          className="flex w-full max-w-[600px] flex-col gap-5"
        >
          <h2 id="recent-blog" className="px-2 font-light text-muted sm:px-0">
            Recent blog
          </h2>
          <BlogPostCard post={latestPost} />
        </section>
      )}
    </div>
  );
}
