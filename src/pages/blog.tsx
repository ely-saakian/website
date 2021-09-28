import Main from "../components/Blog/Main";
import BlogpostCard from "../components/Blog/BlogpostCard";
import SubscribeCard from "../components/Blog/SubscribeCard";

const Blog = () => {
	return (
		<Main>
			<BlogpostCard featured></BlogpostCard>
			<SubscribeCard></SubscribeCard>
			<BlogpostCard></BlogpostCard>
			<BlogpostCard></BlogpostCard>
		</Main>
	);
};

export default Blog;
