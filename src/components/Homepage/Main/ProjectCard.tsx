import Image from "next/image";
import { Project } from "@/types/project";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const STATUS = {
  live: { label: "Live", className: "bg-live-soft text-live" },
  "coming-soon": { label: "Coming soon", className: "bg-soon-soft text-soon" },
} as const;

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const status = project.status ? STATUS[project.status] : null;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="card-link group flex w-full max-w-[600px] flex-col overflow-hidden"
    >
      <div className="relative aspect-[40/21]">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 600px"
          className="object-cover dark:brightness-[.88]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:px-10 sm:pb-10 sm:pt-6">
        {(project.tags?.length || status) && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {project.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-track px-2.5 py-0.5 text-muted">
                {tag}
              </span>
            ))}
            {status && (
              <span className={cn("rounded-full px-2.5 py-0.5 font-medium", status.className)}>
                {status.label}
              </span>
            )}
          </div>
        )}
        <h2 className="text-2xl font-semibold tracking-[-0.01em] text-ink">
          {project.title}
        </h2>
        <p className="leading-relaxed text-muted">{project.description}</p>
        {project.stack && (
          <ul aria-label="Stack" className="flex flex-wrap gap-1.5 font-mono text-xs text-muted">
            {project.stack.map((item) => (
              <li key={item} className="rounded-md px-2 py-1 shadow-[0_0_0_1px_var(--line)]">
                {item}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-accent">
          Visit website
          <ArrowRightIcon />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </div>
    </a>
  );
};

export default ProjectCard;
