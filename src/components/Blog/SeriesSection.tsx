import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { cn } from "@/lib/utils";
import { formatPostDate, type PostSummary, type Series } from "@/lib/posts";

export function SeriesSection({ series }: { series: Series }) {
  const id = `series-${series.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const first = series.posts[0];

  return (
    <section
      aria-labelledby={id}
      className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12"
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-surface p-3 pb-6 shadow-card">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
          <Image
            src={series.coverImage}
            alt={series.coverAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 296px"
            className="object-cover dark:brightness-[.88]"
          />
        </div>
        <div className="flex flex-col gap-2.5 px-3">
          <p className="eyebrow">Series</p>
          <h2
            id={id}
            className="text-[26px] font-semibold tracking-[-0.02em] text-ink"
          >
            {series.name}
          </h2>
          <p className="leading-relaxed text-muted">{series.description}</p>
          <p className="font-mono text-[13px] text-meta">
            {series.posts.length} {series.posts.length === 1 ? "part" : "parts"}{" "}
            · {series.totalMinutes} min
          </p>
          {first && (
            <Link
              href={`/blog/${first.slug}`}
              className="mt-1.5 inline-flex h-11 items-center gap-2 self-start rounded-full bg-ink px-[18px] text-sm font-medium text-paper transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start with part 1
              <ArrowRightIcon />
            </Link>
          )}
        </div>
      </div>

      <ol className="flex flex-col">
        {series.posts.map((post) => (
          <li key={post.slug} className="border-t border-line first:border-t-0 lg:first:border-t">
            <PostRow post={post} number={post.part} />
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PostRow({
  post,
  number,
}: {
  post: PostSummary;
  number?: number | null;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group grid items-start gap-x-6 gap-y-3 rounded-lg py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        number
          ? "grid-cols-[40px_minmax(0,1fr)] sm:grid-cols-[56px_minmax(0,1fr)_176px]"
          : "grid-cols-1 sm:grid-cols-[minmax(0,1fr)_176px]",
      )}
    >
      {number && (
        <span className="font-mono text-2xl leading-none text-accent sm:text-[28px]">
          <span className="sr-only">Part </span>
          {String(number).padStart(2, "0")}
        </span>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-[15px] leading-relaxed text-muted">
          {post.description}
        </p>
        <p className="text-sm text-meta">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
          {post.readingTime}
        </p>
      </div>
      {post.coverImage && (
        <div className="relative hidden aspect-[8/5] overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--line)] sm:block">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="176px"
            className="object-cover transition-transform dark:brightness-[.88] duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      )}
    </Link>
  );
}
