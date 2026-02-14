import { BlogPostCover } from "./BlogPostCover";

interface BlogpostCardProps {
  title: string;
  seriesTitle: string;
  date: string;
  description: string;
  readingTime: string;
}

const BlogpostCard = ({
  title,
  seriesTitle,
  date,
  description,
  readingTime,
}: BlogpostCardProps) => {
  return (
    <article className="flex flex-col md:flex-row rounded-xl shadow-lg dark:bg-gray-700">
      <div className="flex flex-col space-y-5 p-10">
        <BlogPostCover seriesTitle={seriesTitle} articleTitle={title} small />
        <p className="text-lg text-gray-500 dark:text-white">{description}</p>
        <p className="font-light italic text-gray-500 dark:text-white">
          {date} · {readingTime}
        </p>
      </div>
    </article>
  );
};

export default BlogpostCard;
