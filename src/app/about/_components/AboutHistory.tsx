import ABOUT_ME from "@/constant/ABOUT_ME";

function AboutHistory() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-chart-1 opacity-80">
          History
        </span>
        <div className="h-px flex-1 bg-chart-1/10" />
      </div>
      <div className="flex flex-col gap-0 border-l-2 border-input ml-3 cursor-default">
        {ABOUT_ME.history.map((history, index) => (
          <div key={index} className="relative pl-8 pb-10 last:pb-0">
            {/* Timeline Dot */}
            <div className="absolute left-[-7px] top-2 size-3 rounded-full border-2 border-chart-1 bg-background z-10" />

            <div className="flex flex-col gap-1 group">
              <span className="text-lg md:text-xl font-bold group-hover:text-chart-1 transition-colors">
                {history.do}
              </span>
              <span className="text-sm font-medium text-muted-foreground bg-accent w-fit px-2 py-0.5 rounded-md">
                {history.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutHistory;
