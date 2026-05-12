import ProjectCard from "@/components/Homepage/Main/ProjectCard";
import Main from "@/components/Homepage/Main/index";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

const projects = projectsData as Project[];

export default function Projects() {
  return (
    <Main>
      <div className="columns-1 md:columns-2 gap-10 *:mb-10 *:break-inside-avoid">
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </Main>
  );
}
