import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { formatPostDate, seriesLabel, type PostSummary } from "@/lib/posts";

interface BlogPostCardProps {
  post: PostSummary;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const label = seriesLabel(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-link group flex w-full max-w-[600px] flex-col overflow-hidden"
    >
      {post.coverImage && (
        <div className="relative aspect-video">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            className="object-cover dark:brightness-[.88]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-6 sm:px-10 sm:pb-10 sm:pt-6">
        {label && (
          <span className="self-start rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
            {label}
          </span>
        )}
        <h2 className="font-serif text-[28px] font-semibold leading-tight tracking-[-0.01em] text-ink">
          {post.title}
        </h2>
        <p className="line-clamp-3 leading-relaxed text-muted">
          {post.description}
        </p>
        <div className="mt-2 flex items-center justify-between border-t border-line pt-4">
          <p className="text-sm text-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
            {post.readingTime}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-accent">
            Read
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
