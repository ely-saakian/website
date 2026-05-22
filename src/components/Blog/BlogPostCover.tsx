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
    <div className="flex flex-col overflow-hidden px-10 py-4 gap-2">
      <p
        className={"font-normal text-gray-600 dark:text-gray-400 leading-tight"}
      >
        {seriesTitle} Blog Series
      </p>
      {small ? (
        <h2
          className={cn(
            "text-[48px] font-bold text-black dark:text-white leading-tight",
            small ? "text-[24px]" : "",
          )}
        >
          {articleTitle}
        </h2>
      ) : (
        <h1
          className={cn(
            "text-[48px] font-bold text-black dark:text-white leading-tight",
            small ? "text-[24px]" : "",
          )}
        >
          {articleTitle}
        </h1>
      )}
    </div>
  );
}
