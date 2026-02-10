"use client";

import Masonry from "react-masonry-css";
import ProjectCard from "../../components/Homepage/Main/ProjectCard";
import Main from "../../components/Homepage/Main/index";
import { Project } from "../../types/project";

export default function Projects() {
  const projects: Project[] = [];

  const breakpointColumnsObj = {
    default: 2,
    768: 1,
  };

  return (
    <Main>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex space-x-10"
        columnClassName="my-masonry-grid_column space-y-10"
      >
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </Masonry>
    </Main>
  );
}
