"use client";

import { useEffect, useRef, useState } from "react";
import NavSlider, { TabSliderStyles } from "./NavSlider";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    const routesTabRefMap: RoutesTabRefMap = {
      "/": homeTabRef,
      "/blog": blogTabRef,
      "/projects": projectsTabRef,
      "/404": errorTabRef,
    };

    const ref = routesTabRefMap["/" + pathname.split("/")[1]];

    setSliderStyles({
      height: ref.current?.offsetHeight || 0,
      width: ref.current?.offsetWidth || 0,
      left: ref.current?.offsetLeft || 0,
    });
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
      <div className="relative inline-flex flex-row py-1.5 px-1.5 bg-gray-200 dark:bg-gray-800 rounded-full -translate-x-0 text-sm">
        {sliderStyles && <NavSlider sliderStyles={sliderStyles} />}
        <div className="hidden" ref={errorTabRef}></div>
        <Link href="/">
          <div ref={homeTabRef} className="nav-btn" onClick={selectTabHandler}>
            Home
          </div>
        </Link>
        <Link href="/blog">
          <div ref={blogTabRef} className="nav-btn" onClick={selectTabHandler}>
            Blog
          </div>
        </Link>
        <Link href="/projects">
          <div
            ref={projectsTabRef}
            className="nav-btn"
            onClick={selectTabHandler}
          >
            Projects
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
