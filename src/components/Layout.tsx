import Header from "./Header/index";
import Nav from "./Nav/index";
import Footer from "./Footer/index";
import Head from "next/head";
import Transition from "./Transition/index";
import { useRouter } from "next/router";

const Layout: React.FC = ({ children }) => {
	const router = useRouter();
	return (
		<div className="bg-white dark:bg-gray-900 min-h-screen">
			<Head>
				<title>Ely Saakian - Developer</title>
				<meta
					name="description"
					content="Hey, I’m Ely and I am a full-stack developer. Currently a software engineer at Amazon. With my passion for coding I’m here to share the things I learn along
				my path to being the best at what I do. Also feel free to hit me up for your projects. Cheers!"
				/>
				<meta property="og:title" content="Ely Saakian - Developer" key="ogtitle" />+{" "}
				<meta
					property="og:description"
					content="Hey, I’m Ely and I am a full-stack developer. Currently a software engineer at Amazon. With my passion for coding I’m here to share the things I learn along
				my path to being the best at what I do. Also feel free to hit me up for your projects. Cheers!"
					key="ogdesc"
				/>
				{/* Open Graph */}
				<meta property="og:url" content="https://elysaakian.com" key="ogurl" />
				<meta property="og:image" content="images/avatar.png" key="ogimage" />
				<meta property="og:site_name" content="Ely Saakian - Developer" key="ogsitename" />
				<meta property="og:title" content="Ely Saakian - Developer" key="ogtitle" />
			</Head>
			<Header></Header>
			<div className="flex flex-col container mx-auto lg:max-w-[960px]">
				<div className="min-h-screen">
					<Transition location={router.pathname}>{children}</Transition>
				</div>
				<Footer></Footer>
			</div>
		</div>
	);
};

export default Layout;
