import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ABOUT_ME from "@/constant/ABOUT_ME";
import type { CareerProject } from "@/constant/ABOUT_ME";

function CareerProjectItem({ project }: { project: CareerProject }) {
  return (
    <article className="about-career-project">
      <div className="about-project-heading">
        <h4>{project.name}</h4>
        <span>{project.period}</span>
      </div>
      <p className="about-project-subtitle">{project.subtitle}</p>
      <p className="about-project-summary">{project.summary}</p>
      <div className="about-stack">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {project.caseHref && (
        <Link href={project.caseHref} className="about-case-link">
          <span>사례 읽기: {project.caseTitle ?? project.name}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
function AboutCareer() {
  return (
    <section className="about-section" aria-labelledby="about-career-title">
      <div className="about-section-heading">
        <h2 id="about-career-title">경력</h2>
      </div>
      {ABOUT_ME.careers.map((career) => (
        <div key={career.company}>
          <header className="about-company">
            <div className="about-company-heading">
              <h3>{career.company}</h3>
              <span>{career.period}</span>
            </div>
            <p className="about-company-role">{career.role}</p>
            <p>{career.summary}</p>
          </header>
          <div className="about-career-timeline">
            {career.projects.map((project) => (
              <CareerProjectItem key={project.name} project={project} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
export default AboutCareer;
