import { BackButton } from "./BackButton";
import { BlogPostCover } from "./BlogPostCover";

interface ArticleLayoutProps {
  title: string;
  description?: string | null;
  date?: string | null;
  seriesTitle?: string | null;
  readingTime?: string;
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  date,
  seriesTitle,
  readingTime,
  children,
}: ArticleLayoutProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <>
      <BackButton />
      <article>
        {seriesTitle && (
          <BlogPostCover seriesTitle={seriesTitle} articleTitle={title} />
        )}
        <div className="prose dark:prose-invert mx-auto py-10 px-10 sm:px-0">
          {(formattedDate || readingTime) && (
            <p className="font-light italic text-gray-500 dark:text-white">
              {formattedDate}
              {formattedDate && readingTime ? " · " : ""}
              {readingTime}
            </p>
          )}
        </div>

        <div className="prose dark:prose-invert mx-auto px-10 sm:px-0">
          {children}
        </div>
      </article>
    </>
  );
}
