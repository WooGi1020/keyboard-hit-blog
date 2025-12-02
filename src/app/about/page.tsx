import { AboutHistory, AboutMeta, AboutOpinion, AboutProject } from "@/app/about/_components";

function AboutPage() {
  return (
    <div className="flex flex-col gap-11 w-full mt-10">
      <AboutMeta />
      <AboutOpinion />
      <AboutProject />
      <AboutHistory />
    </div>
  );
}

export default AboutPage;
