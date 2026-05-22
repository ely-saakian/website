import BlogPostCard from "@/components/Blog/BlogPostCard";
import IntroCard from "./IntroCard";

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
}

export function HomeContent({ latestPost }: HomeContentProps) {
  return (
    <div className="flex flex-col gap-10 items-center">
      <IntroCard />
      {latestPost && <BlogPostCard post={latestPost} featured />}
    </div>
  );
}
