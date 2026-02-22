interface BlogPostListCardProps {
  title: string;
  description: string;
  date: string;
  seriesTitle?: string | null;
  author?: string;
}

function formatDateForDisplay(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatted.toUpperCase();
}

const BlogPostListCard = ({
  title,
  description,
  date,
  seriesTitle,
  author = "Ely Saakian",
}: BlogPostListCardProps) => {
  const formattedDate = formatDateForDisplay(date);

  return (
    <article className="rounded-xl border border-gray-200 dark:border-gray-600 p-6 shadow-sm dark:bg-gray-800/50">
      <div className="flex flex-col space-y-3">
        {seriesTitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {seriesTitle} Blog Series
          </p>
        )}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
        <p className="text-xs font-light text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          {formattedDate} • {author.toUpperCase()}
        </p>
      </div>
    </article>
  );
};

export default BlogPostListCard;
