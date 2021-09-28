// @ts-nocheck
import Layout from "../../components/Layout";

const BlogPost = ({ post }) => {
	return (
		<Layout>
			<h1>BlogPost {post}</h1>
		</Layout>
	);
};

export async function getStaticProps(context) {
	return {
		props: {
			post: context.params.slug,
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { slug: "sds" } }],
		fallback: false,
	};
}

export default BlogPost;
