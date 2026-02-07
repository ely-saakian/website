import Image from "next/image";
import ArrowIconBtn from "./ArrowIconBtn";

const ReadingNowCard = () => {
  return (
    <article className="flex flex-col space-y-5 rounded-xl shadow-lg dark:bg-gray-700">
      <div className="flex flex-col">
        <div className="flex flex-col p-10 space-y-5">
          <p className="font-light dark:text-white">Reading now</p>
          <h2 className="text-2xl font-medium dark:text-white">
            The Hard Thing About Hard Things
          </h2>
          <div className="relative h-[200px]">
            <Image
              src="/images/reading_now_image.png"
              alt="The Hard Thing About Hard Things Book Cover"
              fill
              sizes="200px"
              className="object-contain"
            />
          </div>
          <p className="font-light italic text-gray-500 dark:text-white">
            Ben Horowitz
          </p>
          <p className="text-gray-500 dark:text-white">
            Ben Horowitz, cofounder of Andreessen Horowitz and one of Silicon
            Valley&apos;s most respected and experienced entrepreneurs, offers
            essential advice on...
          </p>
          <div>
            <a
              href="https://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205/"
              rel="noreferrer"
              target="_blank"
              className="inline-flex"
            >
              <ArrowIconBtn></ArrowIconBtn>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReadingNowCard;
