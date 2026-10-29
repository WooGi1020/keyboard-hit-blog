"use client";

import { useState } from "react";
import ABOUT_ME from "@/constant/ABOUT_ME";
import ProjectCard from "./ProjectCard";

const INITIAL_COUNT = 2;
function AboutProject() {
  const [expanded, setExpanded] = useState(false);
  const projects = expanded ? ABOUT_ME.project : ABOUT_ME.project.slice(0, INITIAL_COUNT);
  return (
    <section className="about-section" aria-labelledby="about-projects-title">
      <div className="about-section-heading">
        <h2 id="about-projects-title">개인·팀 프로젝트</h2>
        <span>{ABOUT_ME.project.length}개</span>
      </div>
      <div id="about-project-list" className="about-project-list">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      {ABOUT_ME.project.length > INITIAL_COUNT && (
        <button
          type="button"
          className="about-more-button"
          aria-expanded={expanded}
          aria-controls="about-project-list"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : `이전 프로젝트 ${ABOUT_ME.project.length - INITIAL_COUNT}개 더보기`}
        </button>
      )}
    </section>
  );
}
export default AboutProject;
