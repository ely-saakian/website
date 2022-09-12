import Image from 'next/image';
import matter from 'gray-matter';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { isEmpty } from 'lodash';

interface LatestBlogPostCardProps {
  latestPost: {
    latestPostData: matter.GrayMatterFile<string>;
    timeToRead: string;
    slug: string;
  };
}

const LatestBlogPostCard: React.FC<LatestBlogPostCardProps> = ({ latestPost }) => {
  const router = useRouter();

  const continueReadingHandler = () => {
    router.push('/blog/' + latestPost.slug);
  };

  return isEmpty(latestPost) ? (
    <></>
  ) : (
    <article className="flex flex-col space-y-5 rounded-xl shadow-lg dark:bg-gray-700">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-10 py-5">
          <p className="font-light dark:text-white">Latest blog post</p>
          <p className="font-light italic text-gray-500 dark:text-white">
            {formatDistanceToNow(new Date(latestPost.latestPostData.data.date), { addSuffix: true })}
          </p>
        </div>
        <div className="h-[200px] relative">
          <Image
            src={'/' + latestPost.latestPostData.data.thumbnail}
            alt="Latest Blog Post Image"
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className="flex flex-col p-10 space-y-5">
          <h2 className="text-2xl font-medium dark:text-white">{latestPost.latestPostData.data.title}</h2>
          <p className="text-gray-500 dark:text-white">{latestPost.latestPostData.data.description}</p>
          <p className="font-light italic text-gray-500 dark:text-white"> · {latestPost.timeToRead} · </p>
          <button
            onClick={continueReadingHandler}
            className="bg-gray-200 dark:bg-gray-500 py-[10px] px-5 rounded-full transition dark:text-white duration-150 active:scale-95"
          >
            Continue reading
          </button>
        </div>
      </div>
    </article>
  );
};

export default LatestBlogPostCard;
