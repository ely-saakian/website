import { formatDistanceToNow } from "date-fns";
import { isEmpty } from "lodash";
import Image from "next/image";
import { Project } from "../../../types/project";
import ArrowIconBtn from "./ArrowIconBtn";

interface ProjectCardProps {
  project: Project;
  latestProject?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  latestProject,
}) => {
  return isEmpty(project) ? (
    <></>
  ) : (
    <article className="flex flex-col space-y-5 rounded-xl shadow-lg dark:bg-gray-700">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-10 py-5">
          {latestProject && (
            <p className="font-light dark:text-white">Latest project</p>
          )}
          <p className="font-light italic text-gray-500 dark:text-white">
            {formatDistanceToNow(new Date(project.date), { addSuffix: true })}
          </p>
        </div>
        <div className="h-[200px] relative">
          <Image
            src={project.imageUrl}
            alt="Weather app powered by Open Weather API Image"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-10 space-y-5">
          <h2 className="text-2xl font-medium dark:text-white">
            {project.title}
          </h2>
          <p className="text-gray-500 dark:text-white">{project.description}</p>
          <div>
            <a
              href={project.url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex"
            >
              <ArrowIconBtn></ArrowIconBtn>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
