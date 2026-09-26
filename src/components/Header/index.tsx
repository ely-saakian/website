import Socials from "./Socials";
import Link from "next/link";
import Nav from "@/components/Nav/index";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row space-y-10 sm:space-y-0 content-between items-center justify-between px-10 py-10 pb-0 sm:pb-12 xl:px-14">
      <div className="flex w-full sm:w-auto justify-between">
        <Link href="/" title="Go Home">
          <p className="font-semibold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#3E7BA6] to-[#2F6E9A] dark:from-[#9CD6FF] dark:to-[#8CC4EC] inline-block">
            Ely Saakian
          </p>
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
