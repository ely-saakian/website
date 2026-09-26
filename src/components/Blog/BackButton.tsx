import Link from "next/link";

export function BackButton() {
  return (
    <Link
      href="/blog"
      className="inline-flex h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
    >
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      All posts
    </Link>
  );
}
