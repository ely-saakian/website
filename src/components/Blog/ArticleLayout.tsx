import Image from "next/image";
import { BackButton } from "./BackButton";

interface ArticleLayoutProps {
  title: string;
  description?: string | null;
  date?: string | null;
  thumbnail?: string | null;
  readingTime?: string;
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  date,
  thumbnail,
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
        <div className="flex flex-col space-y-5 p-10">
          <h1 className="text-2xl lg:text-4xl font-bold dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-500 dark:text-white">
              {description}
            </p>
          )}
          {(formattedDate || readingTime) && (
            <p className="font-light italic text-gray-500 dark:text-white">
              {formattedDate}
              {formattedDate && readingTime ? " · " : ""}
              {readingTime}
            </p>
          )}
        </div>
        {thumbnail && (
          <div className="h-[250px] sm:h-[450px] relative">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              className="object-cover"
            />
          </div>
        )}
        <div className="prose dark:prose-invert mx-auto p-10">{children}</div>
      </article>
    </>
  );
}
