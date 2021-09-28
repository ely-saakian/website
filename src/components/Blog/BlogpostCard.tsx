import Image from "next/image";

const BlogpostCard = ({ featured = false }) => {
	return featured ? (
		<article className="flex flex-col rounded-xl shadow-lg dark:bg-gray-700">
			<div className="h-[200px] sm:h-[300px] md:h-[400px] bg-blue-200 relative rounded-t-xl">
				<Image
					src="/images/latest_blogpost_sample_image.png"
					alt=""
					layout="fill"
					objectFit="cover"
					className="rounded-t-xl"
				></Image>
			</div>
			<div className="flex flex-col space-y-5 p-10">
				<h2 className="text-2xl font-medium dark:text-white">5 Database Scaling Solutions You Need to Know</h2>
				<p className="text-lg text-gray-500 dark:text-white">
					If your application is experiencing load problems, time to bring out the champagne! Your web-app must be
					pretty successful to get to this stage.
				</p>
				<p className="font-light italic text-gray-500 dark:text-white">Dec 22, 2020 · 10 min read</p>
			</div>
		</article>
	) : (
		<article className="flex flex-col md:flex-row rounded-xl shadow-lg dark:bg-gray-700">
			<div className="h-[200px] md:h-auto md:w-[600px] bg-blue-200 rounded-t-xl relative md:rounded-tr-none md:rounded-l-xl">
				<Image
					src="/images/latest_blogpost_sample_image.png"
					alt=""
					layout="fill"
					objectFit="cover"
					className="rounded-t-xl md:rounded-l-xl"
				></Image>
			</div>
			<div className="flex flex-col space-y-5 p-10 flex-grow">
				<h2 className="text-2xl font-medium dark:text-white">5 Database Scaling Solutions You Need to Know</h2>
				<p className="text-lg text-gray-500 dark:text-white">
					If your application is experiencing load problems, time to bring out the champagne! Your web-app must be
					pretty successful to get to this stage.
				</p>
				<p className="font-light italic text-gray-500 dark:text-white">Dec 22, 2020 · 10 min read</p>
			</div>
		</article>
	);
};

export default BlogpostCard;
