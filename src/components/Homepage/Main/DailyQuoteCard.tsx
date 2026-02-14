"use client";

import { useContext } from "react";
import { useSpinDelay } from "spin-delay";
import { QuoteContext } from "@/store/QuoteContextProvider";

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

const DailyQuoteCard: React.FC = () => {
  const { quote, isLoading } = useContext(QuoteContext);
  const showSkeleton = useSpinDelay(isLoading, { delay: 500, minDuration: 200 });

  return (
    <article className="flex flex-col space-y-5 p-10">
      <div className="flex justify-between">
        <p className="font-light dark:text-white">Daily quote</p>
        <p className="font-light dark:text-white text-gray-500">
          ZenQuotes.io
        </p>
      </div>
      {showSkeleton ? (
        <>
          <SkeletonLine className="h-6 w-full" />
          <SkeletonLine className="h-6 w-3/4" />
          <SkeletonLine className="h-5 w-32 ml-auto" />
        </>
      ) : quote ? (
        <>
          <p className="font-light italic text-xl dark:text-white">&ldquo;{quote.text}&rdquo;</p>
          <p className="font-medium text-xl text-right dark:text-white">
            {quote.author}
          </p>
        </>
      ) : null}
    </article>
  );
};

export default DailyQuoteCard;
