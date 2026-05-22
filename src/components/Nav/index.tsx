"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import NavSlider, { TabSliderStyles } from "./NavSlider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavButton = forwardRef<
  HTMLDivElement,
  {
    href: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }
>(({ href, children, onClick }, ref) => {
  const pathname = usePathname();

  const isActive = pathname?.replaceAll("/", "") === href.replaceAll("/", "");

  return (
    <Link href={href}>
      <div
        className={cn("nav-btn", isActive ? "text-black dark:text-white" : "")}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );
});
NavButton.displayName = "NavButton";

const Nav = () => {
  const pathname = usePathname();

  const [sliderStyles, setSliderStyles] = useState<TabSliderStyles>();
  const homeTabRef = useRef<HTMLDivElement>(null);
  const blogTabRef = useRef<HTMLDivElement>(null);
  const projectsTabRef = useRef<HTMLDivElement>(null);
  const errorTabRef = useRef<HTMLDivElement>(null);

  type RoutesTabRefMap = {
    [route: string]: React.RefObject<HTMLDivElement | null>;
  };

  useEffect(() => {
    if (!pathname) return;

    const routesTabRefMap: RoutesTabRefMap = {
      "/": homeTabRef,
      "/blog": blogTabRef,
      "/projects": projectsTabRef,
      "/404": errorTabRef,
    };

    const ref = routesTabRefMap["/" + pathname.split("/")[1]];

    const frameId = requestAnimationFrame(() => {
      setSliderStyles({
        height: ref.current?.offsetHeight || 0,
        width: ref.current?.offsetWidth || 0,
        left: ref.current?.offsetLeft || 0,
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  const selectTabHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLDivElement;
    setSliderStyles({
      height: target.offsetHeight,
      width: target.offsetWidth,
      left: target.offsetLeft,
    });
  };

  return (
    <nav className="text-center">
      <div className="relative inline-flex flex-row py-1.5 px-1.5 bg-gray-200 dark:bg-gray-800 rounded-full translate-x-0 text-sm">
        {sliderStyles && <NavSlider sliderStyles={sliderStyles} />}
        <div className="hidden" ref={errorTabRef}></div>
        <NavButton href="/" ref={homeTabRef} onClick={selectTabHandler}>
          HOME
        </NavButton>
        <NavButton href="/blog" ref={blogTabRef} onClick={selectTabHandler}>
          BLOG
        </NavButton>
        <NavButton
          href="/projects"
          ref={projectsTabRef}
          onClick={selectTabHandler}
        >
          PROJECTS
        </NavButton>
      </div>
    </nav>
  );
};

export default Nav;
