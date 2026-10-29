import {
  AboutCareer,
  AboutHistory,
  AboutMeta,
  AboutOpinion,
  AboutProject,
  AboutSkills,
} from "@/app/about/_components";

function AboutPage() {
  return (
    <div className="about-page">
      <AboutMeta />
      <AboutOpinion />
      <AboutCareer />
      <AboutSkills />
      <AboutProject />
      <AboutHistory />
    </div>
  );
}

export default AboutPage;
