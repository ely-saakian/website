"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="px-5">
      <button
        className="text-gray-400 inline-flex items-center"
        onClick={() => router.push("/blog")}
      >
        <ChevronLeftIcon className="w-7 h-7 mr-1" />
        <span>Blog</span>
      </button>
    </div>
  );
}
