import ABOUT_ME from "@/constant/ABOUT_ME";

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
          <ul className="about-career-highlights">
            {career.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
export default AboutCareer;
