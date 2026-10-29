import ABOUT_ME from "@/constant/ABOUT_ME";

function AboutHistory() {
  return (
    <section className="about-section" aria-labelledby="about-history-title">
      <div className="about-section-heading">
        <h2 id="about-history-title">학력·자격·활동</h2>
      </div>
      <ol className="about-history">
        {ABOUT_ME.history.map((item) => (
          <li key={item.do}>
            <h3>{item.do}</h3>
            <p>{item.period}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export default AboutHistory;
