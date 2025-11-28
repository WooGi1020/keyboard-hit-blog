"use client";

import React from "react";
import ABOUT_ME from "@/constant/ABOUT_ME";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/app/about/_components/AboutProject/ProjectCard";

function AboutProject() {
  const [sliceNum, setSliceNum] = React.useState<number>(3);

  const projectArr = ABOUT_ME.project.slice(0, sliceNum);

  const handleViewCount = () => {
    sliceNum === 3 ? setSliceNum((prev) => prev + 3) : setSliceNum(3);
  };

  return (
    <>
      <span className="text-chart-1 mb-[-30px]">My Project</span>
      <div className="flex flex-col gap-4">
        {projectArr.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
        <Button variant="outline" className="w-fit mx-auto" onClick={handleViewCount}>
          {sliceNum === 3 ? "더보기" : "접기"}
        </Button>
      </div>
    </>
  );
}

export default AboutProject;
