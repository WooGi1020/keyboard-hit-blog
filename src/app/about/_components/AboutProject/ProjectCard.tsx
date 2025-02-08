import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      className="group relative flex gap-2 w-full h-[170px] border border-input rounded-xl p-4 pl-8 hover:bg-accent/80 overflow-hidden items-center"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <span className="text-lg font-semibold mb-2">{project.name}</span>
        <p className="text-[12px]">{project.description}</p>
        <span className="text-[12px]">{project.period}</span>
        <div className="flex gap-2 mt-2 w-[500px] flex-wrap">
          {project.tag.map((tag) => (
            <span
              key={tag}
              className="group-hover:bg-background text-[12px] bg-input rounded-md px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="size-[250px] absolute right-[-70px] rounded-full border border-input max-sm:hidden">
        <Image
          src={project.src}
          alt="프로젝트 미리보기 이미지"
          className="rounded-full object-cover"
          priority
          fill
          sizes="100%"
        />
      </div>
    </Link>
  );
}

export default ProjectCard;
