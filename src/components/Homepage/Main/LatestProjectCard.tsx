import Image from "next/image";
import ArrowIconBtn from "./ArrowIconBtn";

const LatestProjectCard = () => {
	return (
		<article className="flex flex-col space-y-5 rounded-xl shadow-lg dark:bg-gray-700">
			<div className="flex flex-col">
				<div className="flex items-center justify-between px-10 py-5">
					<p className="font-light dark:text-white">Latest project</p>
					<p className="font-light italic text-gray-500 dark:text-white">2 months ago</p>
				</div>
				<div className="h-[200px] relative">
					<Image
						src="/images/weather-repo-preview.jpg"
						alt="Weather app powered by Open Weather API Image"
						layout="fill"
						objectFit="cover"
					></Image>
				</div>
				<div className="flex flex-col p-10 space-y-5">
					<h2 className="text-2xl font-medium dark:text-white">weather-app-react-typescript-material-ui</h2>
					<p className="text-gray-500 dark:text-white">
						Weather app powered by Open Weather API. Built with React+Typescript and Material-UI framework.
					</p>
					<div>
						<a
							href="https://github.com/ely-saakian/weather-app-react-typescript-material-ui"
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

export default LatestProjectCard;
