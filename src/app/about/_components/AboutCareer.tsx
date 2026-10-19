import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import ABOUT_ME from "@/constant/ABOUT_ME";
import type { CareerProject } from "@/constant/ABOUT_ME";

function CareerProjectItem({ project }: { project: CareerProject }) {
  return (
    <article className="relative pl-8 pb-10 last:pb-0">
      <div className="absolute left-[-7px] top-2 size-3 rounded-full border-2 border-chart-1 bg-background z-10" />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="text-lg md:text-xl font-bold tracking-tight">{project.name}</h4>
            <span className="text-xs font-mono text-muted-foreground/70">{project.period}</span>
          </div>
          <p className="text-sm font-medium text-muted-foreground leading-snug break-keep">
            {project.subtitle}
          </p>
        </div>

        <p className="text-[15px] leading-relaxed text-foreground/90 break-keep">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="text-[11px] bg-secondary text-secondary-foreground font-semibold rounded-full px-2.5 py-0.5 border border-transparent"
            >
              {item}
            </span>
          ))}
        </div>

        {project.caseHref && (
          <Link
            href={project.caseHref}
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-chart-1 hover:underline underline-offset-4"
          >
            사례 읽기: {project.caseTitle ?? project.name}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}

function AboutCareer() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-chart-1 opacity-80">
          Experience
        </span>
        <div className="h-px flex-1 bg-chart-1/10" />
      </div>

      {ABOUT_ME.careers.map((career) => (
        <div key={career.company} className="flex flex-col gap-6">
          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Briefcase className="size-5 text-chart-1" />
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">{career.company}</h3>
              <span className="text-sm font-semibold text-muted-foreground">{career.role}</span>
              <span className="text-sm font-medium text-muted-foreground bg-accent px-2 py-0.5 rounded-md">
                {career.period}
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90 break-keep">
              {career.summary}
            </p>
          </header>

          <div className="flex flex-col border-l-2 border-input ml-3">
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
