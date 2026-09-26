import Image from "next/image";
import { BackButton } from "./BackButton";
import { formatPostDate } from "@/lib/posts";
import { localMediaPath } from "@/lib/media";

interface ArticleLayoutProps {
  title: string;
  date?: string | null;
  /** e.g. "React Performance · Part 2 of 2" */
  seriesLabel?: string | null;
  readingTime?: string;
  coverImage?: string | null;
  coverAlt?: string | null;
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  date,
  seriesLabel,
  readingTime,
  coverImage,
  coverAlt,
  children,
}: ArticleLayoutProps) {
  const dateLabel = formatPostDate(date);
  const cover = localMediaPath(coverImage);

  return (
    <div className="flex flex-col items-center gap-8 px-5">
      <div className="w-full max-w-[960px]">
        <BackButton />
      </div>
      <article className="flex w-full flex-col items-center gap-8">
        <header className="flex w-full max-w-[720px] flex-col gap-4">
          {seriesLabel && <p className="eyebrow">{seriesLabel}</p>}
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[52px]">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-meta">
            <Image
              src="/images/avatar.png"
              alt=""
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-text">Ely Saakian</span>
            {dateLabel && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={date ?? undefined}>{dateLabel}</time>
              </>
            )}
            {readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>
        </header>

        {cover && (
          <figure className="relative mt-2 aspect-video w-full max-w-[960px] overflow-hidden rounded-2xl shadow-[0_0_0_1px_var(--line)]">
            <Image
              src={cover}
              alt={coverAlt ?? ""}
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 960px"
              className="object-cover dark:brightness-[.88]"
            />
          </figure>
        )}

        <div className="prose prose-lg w-full pt-4">{children}</div>
      </article>
    </div>
  );
}
