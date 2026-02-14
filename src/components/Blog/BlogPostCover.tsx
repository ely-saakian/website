import AvatarMeIcon from "@/components/icons/AvatarMeIcon";
import { cn } from "@/lib/utils";

interface BlogPostCoverProps {
  seriesTitle: string;
  articleTitle: string;
  small?: boolean;
}

export function BlogPostCover({
  seriesTitle,
  articleTitle,
  small = false,
}: BlogPostCoverProps) {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden px-10 py-10 gap-6">
      <p
        className={cn(
          "text-[24px] font-normal text-gray-500 dark:text-gray-400 text-center leading-tight",
          small ? "text-[16px]" : "",
        )}
      >
        {seriesTitle} Blog Series
      </p>
      {small ? (
        <h2
          className={cn(
            "text-[48px] font-bold text-black dark:text-white text-center leading-tight",
            small ? "text-[24px]" : "",
          )}
        >
          {articleTitle}
        </h2>
      ) : (
        <h1
          className={cn(
            "text-[48px] font-bold text-black dark:text-white text-center leading-tight",
            small ? "text-[24px]" : "",
          )}
        >
          {articleTitle}
        </h1>
      )}
    </div>
  );
}
