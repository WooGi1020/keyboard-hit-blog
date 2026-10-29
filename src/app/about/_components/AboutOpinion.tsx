import ABOUT_ME from "@/constant/ABOUT_ME";

function AboutOpinion() {
  return (
    <section className="about-section" aria-labelledby="about-intro-title">
      <div className="about-section-heading">
        <h2 id="about-intro-title">소개</h2>
      </div>
      <div className="about-intro-copy">
        {ABOUT_ME.description
          .split("\n")
          .filter(Boolean)
          .map((text, index) => (
            <p key={index}>{text}</p>
          ))}
      </div>
    </section>
  );
}
export default AboutOpinion;
