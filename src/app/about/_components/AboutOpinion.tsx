import ABOUT_ME from "@/constant/ABOUT_ME";

function AboutOpinion() {
  const descriptionArr = ABOUT_ME.description.split("\n").filter(Boolean);

  return (
    <section className="flex flex-col gap-8 py-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-chart-1 opacity-80">
          Philosophy
        </span>
        <div className="h-px flex-1 bg-chart-1/20" />
      </div>

      <div className="relative pl-5 flex flex-col gap-3">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-chart-1/60 to-transparent" />

        {descriptionArr.map((desc, index) => (
          <p
            key={index}
            className="text-md font-medium leading-snug text-foreground/90 max-sm:text-[15px] tracking-tight"
          >
            {desc}
          </p>
        ))}
      </div>
    </section>
  );
}

export default AboutOpinion;
