"use client";

import React from "react";
import ABOUT_ME from "@/constant/ABOUT_ME";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/app/about/_components/AboutProject/ProjectCard";

const INITIAL_COUNT = 2;

function AboutProject() {
  const [expanded, setExpanded] = React.useState(false);

  const projectArr = expanded ? ABOUT_ME.project : ABOUT_ME.project.slice(0, INITIAL_COUNT);
  const hasMore = ABOUT_ME.project.length > INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-chart-1 opacity-80">
          Side Projects
        </span>
        <div className="h-px flex-1 bg-chart-1/10" />
      </div>
      <div className="flex flex-col gap-4">
        {projectArr.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
        {hasMore && (
          <Button
            variant="outline"
            className="w-fit mx-auto"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded
              ? "접기"
              : `이전 프로젝트 ${ABOUT_ME.project.length - INITIAL_COUNT}개 더보기`}
          </Button>
        )}
      </div>
    </div>
  );
}

export default AboutProject;
