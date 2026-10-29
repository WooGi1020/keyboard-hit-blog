import ABOUT_ME from "@/constant/ABOUT_ME";

function AboutSkills() {
  return (
    <section className="about-section" aria-labelledby="about-skills-title">
      <div className="about-section-heading">
        <h2 id="about-skills-title">사용하는 기술</h2>
      </div>
      <div className="about-skills-grid">
        {Object.entries(ABOUT_ME.skills).map(([category, skills]) => (
          <div key={category} className="about-skill-group">
            <h3>{category}</h3>
            <div className="about-stack">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AboutSkills;
