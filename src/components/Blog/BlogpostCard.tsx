import Image from "next/image";

type BlogpostCardProps = {
  title: string;
  image: string;
  date: string;
  description: string;
  readingTime: string;
};

const BlogpostCard = ({
  title,
  image,
  date,
  description,
  readingTime,
}: BlogpostCardProps) => {
  return (
    <article className="flex flex-col md:flex-row rounded-xl shadow-lg dark:bg-gray-700">
      <div className="h-[200px] md:h-auto md:w-[300px] bg-blue-200 rounded-t-xl relative md:rounded-tr-none md:rounded-l-xl">
        <Image
          src={"/" + image}
          alt="Blog post images"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none object-cover"
        />
      </div>
      <div className="flex flex-col space-y-5 p-10">
        <h2 className="text-2xl font-medium dark:text-white">{title}</h2>
        <p className="text-lg text-gray-500 dark:text-white">{description}</p>
        <p className="font-light italic text-gray-500 dark:text-white">
          {date} · {readingTime}
        </p>
      </div>
    </article>
  );
};

export default BlogpostCard;
