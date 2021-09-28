import Image from "next/image";

const LatestBlogPostCard = () => {
	return (
		<article className="flex flex-col space-y-5 rounded-xl shadow-lg dark:bg-gray-700">
			<div className="flex flex-col">
				<div className="flex items-center justify-between px-10 py-5">
					<p className="font-light dark:text-white">Latest blog post</p>
					<p className="font-light italic text-gray-500 dark:text-white">2 months ago</p>
				</div>
				<div className="h-[200px] relative">
					<Image
						src="/images/latest_blogpost_sample_image.png"
						alt="Coding Sucks Image"
						layout="fill"
						objectFit="cover"
					></Image>
				</div>
				<div className="flex flex-col p-10 space-y-5">
					<h2 className="text-2xl font-medium dark:text-white">Coding sucks.</h2>
					<p className="text-gray-500 dark:text-white">
						If your application is experiencing load problems, time to bring out the champagne! Your web-app must be
						pretty successful to get to this stage.
					</p>
					<button className="bg-gray-200 dark:bg-gray-500 py-[10px] px-5 rounded-full transition dark:text-white duration-150 active:scale-95">
						Continue reading
					</button>
				</div>
			</div>
		</article>
	);
};

export default LatestBlogPostCard;
