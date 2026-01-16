import ABOUT_ME from "@/constant/ABOUT_ME";

function AboutSkills() {
  const skillEntries = Object.entries(ABOUT_ME.skills);

  return (
    <section className="flex flex-col gap-8 py-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-chart-1 opacity-80">
          Technical Skills
        </span>
        <div className="h-px flex-1 bg-chart-1/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {skillEntries.map(([category, skills]) => (
          <div key={category} className="relative pl-5 flex flex-col gap-4">
            <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-linear-to-b from-chart-1/40 to-transparent" />

            <h3 className="text-[13px] font-bold tracking-tighter text-foreground/50">
              {category}
            </h3>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm font-medium text-foreground/80 hover:text-chart-1 duration-200 cursor-default rounded-md bg-accent/50 px-3 py-1 border border-transparent hover:border-chart-1/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutSkills;
