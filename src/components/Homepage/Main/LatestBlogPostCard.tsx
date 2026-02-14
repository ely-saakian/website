"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { isEmpty } from "lodash";
import { BlogPostCover } from "@/components/Blog/BlogPostCover";

interface LatestBlogPostCardProps {
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
  };
}

const LatestBlogPostCard: React.FC<LatestBlogPostCardProps> = ({
  latestPost,
}) => {
  const router = useRouter();

  const continueReadingHandler = () => {
    router.push("/blog/" + latestPost.slug);
  };

  return isEmpty(latestPost) ? (
    <></>
  ) : (
    <article className="flex flex-col space-y-5 rounded-xl shadow-lg dark:bg-gray-700">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-10 py-5">
          <p className="font-light dark:text-white">Latest blog post</p>
          <p className="font-light italic text-gray-500 dark:text-white">
            {formatDistanceToNow(
              new Date(latestPost.latestPostData.data.date as string),
              { addSuffix: true },
            )}
          </p>
        </div>
        <BlogPostCover
          seriesTitle={latestPost.latestPostData.data.series ?? ""}
          articleTitle={latestPost.latestPostData.data.title ?? ""}
          small
        />
        <div className="flex flex-col pb-10 px-10 space-y-5">
          <p className="text-gray-500 dark:text-white">
            {latestPost.latestPostData.data.description}
          </p>
          <p className="font-light italic text-gray-500 dark:text-white">
            {" "}
            · {latestPost.timeToRead} ·{" "}
          </p>
          <button
            onClick={continueReadingHandler}
            className="bg-gray-200 dark:bg-gray-500 py-[10px] px-5 rounded-full transition dark:text-white duration-150 active:scale-95"
          >
            Continue reading
          </button>
        </div>
      </div>
    </article>
  );
};

export default LatestBlogPostCard;
