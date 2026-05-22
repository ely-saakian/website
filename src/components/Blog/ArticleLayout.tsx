import { BackButton } from "./BackButton";
import { BlogPostCover } from "./BlogPostCover";

interface ArticleLayoutProps {
  title: string;
  date?: string | null;
  seriesTitle?: string | null;
  readingTime?: string;
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  date,
  seriesTitle,
  readingTime,
  children,
}: ArticleLayoutProps) {
  const dateLabel = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="px-10">
        <BackButton />
      </div>
      <article>
        {seriesTitle && (
          <BlogPostCover seriesTitle={seriesTitle} articleTitle={title} />
        )}
        <div className="flex items-center gap-2 px-10 pb-12 justify-center">
          {dateLabel && (
            <p className="font-light text-gray-400 dark:text-gray-500 text-sm">
              {dateLabel}
            </p>
          )}
          <span className="text-gray-400 dark:text-gray-500 text-sm">|</span>
          <p className="font-light text-gray-400 dark:text-gray-500 text-sm">
            {readingTime}
          </p>
        </div>

        <div className="mx-auto prose dark:prose-invert px-10 sm:px-0">
          {children}
        </div>
      </article>
    </div>
  );
}
