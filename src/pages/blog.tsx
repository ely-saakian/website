import Main from "../components/Blog/Main";
import BlogpostCard from "../components/Blog/BlogpostCard";
import SubscribeCard from "../components/Blog/SubscribeCard";
import Layout from "../components/Layout";

const Blog = () => {
	return (
		<Layout>
		  <Main>
  			<BlogpostCard featured></BlogpostCard>
  			<SubscribeCard></SubscribeCard>
  			<BlogpostCard></BlogpostCard>
  			<BlogpostCard></BlogpostCard>
  		</Main>
		</Layout>
	);
};

export default Blog;
