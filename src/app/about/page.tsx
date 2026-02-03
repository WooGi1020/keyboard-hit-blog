import {
  AboutHistory,
  AboutMeta,
  AboutOpinion,
  AboutProject,
  AboutSkills,
} from "@/app/about/_components";

function AboutPage() {
  return (
    <div className="flex flex-col gap-16 w-full">
      <AboutMeta />
      <AboutOpinion />
      <AboutSkills />
      <AboutProject />
      <AboutHistory />
    </div>
  );
}

export default AboutPage;
