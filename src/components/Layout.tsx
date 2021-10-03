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
