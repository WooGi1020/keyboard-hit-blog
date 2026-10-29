import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  name: string;
  description: string;
  period: string;
  tag: string[];
  link: string;
  src: string;
}
function ProjectCard({ project }: { project: Project }) {
  return (
    <a className="about-project-card" href={project.link} target="_blank" rel="noopener noreferrer">
      <div className="about-project-copy">
        <div className="about-project-card-title">
          <h3>{project.name}</h3>
          <ArrowUpRight size={16} aria-hidden="true" />
        </div>
        <p>{project.description}</p>
        <span className="about-project-period">{project.period}</span>
        <div className="about-stack">
          {project.tag.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="about-project-image">
        <Image
          src={project.src}
          alt={`${project.name} 미리보기 이미지`}
          className="object-cover"
          fill
          sizes="(max-width: 639px) 0px, 140px"
        />
      </div>
    </a>
  );
}
export default ProjectCard;
