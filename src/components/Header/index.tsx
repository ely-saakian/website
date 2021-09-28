import Socials from "./Socials";
import Link from "next/link";
import Nav from "../Nav/index";

const Header = () => {
	return (
		<header className="flex flex-col sm:flex-row space-y-10 sm:space-y-0 content-between items-center justify-between px-10 py-12 xl:px-14 bg-white dark:bg-gray-900">
			<div className="flex w-full sm:w-auto justify-between">
				<Link href="/">
					<a title="Go Home">
						<p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-[#9CD6FF] to-[#6C95B1] inline-block">
							Ely Saakian
						</p>
					</a>
				</Link>
				<div className="sm:hidden">
					<Socials></Socials>
				</div>
			</div>
			<Nav></Nav>
			<div className="hidden sm:block">
				<Socials></Socials>
			</div>
		</header>
	);
};

export default Header;
