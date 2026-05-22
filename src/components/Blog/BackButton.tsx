"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      className="text-gray-600 inline-flex items-center cursor-pointer"
      onClick={() => router.push("/blog")}
    >
      <ChevronLeftIcon className="w-8 h-8 mr-1" />
      <span className="pt-1">Back to blog</span>
    </button>
  );
}
