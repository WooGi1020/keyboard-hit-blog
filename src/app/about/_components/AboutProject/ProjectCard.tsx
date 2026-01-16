import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  period: string;
  tag: string[];
  link: string;
  src: string;
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="group relative flex gap-6 w-full min-h-[180px] border border-input rounded-2xl p-6 hover:bg-accent/50 transition-color duration-300 overflow-hidden items-center shadow-sm hover:shadow-md hover:border-chart-1"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex-1 flex flex-col gap-3 z-10">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight group-hover:text-chart-1 transition-colors">
            {project.name}
          </h3>
          <ExternalLink className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-[14px] text-muted-foreground font-medium leading-snug">
          {project.description}
        </p>
        <span className="text-[12px] font-mono text-muted-foreground/70">{project.period}</span>
        <div className="flex gap-2 mt-1 flex-wrap">
          {project.tag.map((tag) => (
            <span
              key={tag}
              className="group-hover:bg-chart-1/10 group-hover:text-chart-1 text-[11px] bg-secondary text-secondary-foreground font-semibold rounded-full px-2.5 py-0.5 transition-colors border border-transparent group-hover:border-chart-1/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative size-[140px] shrink-0 rounded-xl overflow-hidden border border-input max-sm:hidden group-hover:scale-105 transition-transform duration-500">
        <Image
          src={project.src}
          alt={`${project.name} 미리보기 이미지`}
          className="object-cover"
          priority
          fill
          sizes="(max-width: 768px) 0px, 140px"
        />
      </div>

      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-chart-1/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-chart-1/10 transition-colors" />
    </Link>
  );
}

export default ProjectCard;
