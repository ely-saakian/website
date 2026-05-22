import { formatDistanceToNow } from "date-fns";
import { isEmpty } from "lodash";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlogPostCover } from "./BlogPostCover";

interface BlogPostCardProps {
  post: {
    data: {
      title?: string;
      description?: string;
      date?: string;
      series?: string;
      [key: string]: unknown;
    };
    timeToRead: string;
    slug: string;
  };
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  featured = false,
}) => {
  if (isEmpty(post)) return null;

  const { data, timeToRead, slug } = post;
  const dateStr = data.date ?? "";

  const dateLabel = dateStr
    ? formatDistanceToNow(new Date(dateStr), { addSuffix: true })
    : "";

  return (
    <article
      className={cn(
        "flex flex-col space-y-5 rounded-xl bg-white dark:bg-[#1C1C1B] max-w-[600px]",
        featured ? "shadow-lg" : "",
      )}
    >
      <div className="flex flex-col pt-5">
        <BlogPostCover
          seriesTitle={data.series ?? ""}
          articleTitle={data.title ?? ""}
          small
        />
        <div className="flex flex-col pb-10 px-10 space-y-5">
          <div className="flex items-center gap-2">
            {dateLabel && (
              <p className="font-light text-gray-400 dark:text-white text-sm">
                {dateLabel}
              </p>
            )}
            <span className="text-gray-400 dark:text-gray-500 text-sm">|</span>
            <p className="font-light text-gray-400 dark:text-gray-500 text-sm">
              {timeToRead}
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {data.description}
          </p>
          <Link
            href={"/blog/" + slug}
            className=" text-gray-600 dark:text-white"
          >
            <span className="border-b border-gray-500 dark:border-white">
              Read More
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
