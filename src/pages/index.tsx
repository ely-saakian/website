import type { NextPage } from "next";
import IntroCard from "../components/Homepage/Main/IntroCard";
import LatestBlogPostCard from "../components/Homepage/Main/LatestBlogPostCard";
import LatestProjectCard from "../components/Homepage/Main/LatestProjectCard";
import ReadingNowCard from "../components/Homepage/Main/ReadingNowCard";
import RandomQuoteCard from "../components/Homepage/Main/RandomQuoteCard";
import Main from "../components/Homepage/Main";
import Masonry from "react-masonry-css";
import SubscribeCard from "../components/Blog/SubscribeCard";

const Home: NextPage = () => {
	const breakpointColumnsObj = {
		default: 2,
		768: 1,
	};

	return (
		<Main>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid flex space-x-10"
				columnClassName="my-masonry-grid_column space-y-10"
			>
				<IntroCard></IntroCard>
				<LatestBlogPostCard></LatestBlogPostCard>
				<LatestProjectCard></LatestProjectCard>
				<ReadingNowCard></ReadingNowCard>
				<RandomQuoteCard></RandomQuoteCard>
				<SubscribeCard></SubscribeCard>
			</Masonry>
		</Main>
	);
};

export default Home;
