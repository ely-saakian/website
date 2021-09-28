// @ts-nocheck
const BlogPost = ({ post }) => {
	return <h1>BlogPost {post}</h1>;
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
