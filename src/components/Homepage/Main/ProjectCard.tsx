import { formatDistanceToNow } from "date-fns";
import { isEmpty } from "lodash";
import Image from "next/image";
import { Project } from "@/types/project";
import ArrowIconBtn from "./ArrowIconBtn";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return isEmpty(project) ? (
    <></>
  ) : (
    <article className="flex flex-col space-y-5 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#1C1C1B] max-w-[600px]">
      <div className="flex flex-col">
        <div className="h-[300px] relative">
          <Image
            src={project.imageUrl}
            alt="Weather app powered by Open Weather API Image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-10 pt-5 space-y-5">
          <h2 className="text-2xl font-medium dark:text-white">
            {project.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
          <Link
            href={project.url}
            target="_blank"
            className=" text-gray-600 dark:text-white"
          >
            <span className="border-b border-gray-500 dark:border-white">
              Visit website
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
