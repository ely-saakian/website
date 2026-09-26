import ProjectCard from "@/components/Homepage/Main/ProjectCard";
import Main from "@/components/Homepage/Main/index";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

const projects = projectsData as Project[];

export default function Projects() {
  return (
    <Main>
      <div className="flex flex-col items-center gap-10 pt-2">
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </Main>
  );
}
