export default function StatsSkeleton() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 opacity-10 sm:opacity-[0.2]">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="w-full h-full transform scale-y-110 origin-bottom"
        >
          {[10, 20, 30].map((line) => (
            <line
              key={line}
              x1="0"
              y1={line}
              x2="100"
              y2={line}
              stroke="currentColor"
              strokeWidth="0.05"
              strokeDasharray="1,1"
              className="text-primary"
            />
          ))}
        </svg>
      </div>
      <div className="absolute bottom-3 left-0 right-0 px-6 sm:flex justify-end gap-3 items-end hidden">
        <div className="h-8 w-24 bg-primary/10 animate-pulse rounded" />
        <div className="h-8 w-24 bg-primary/10 animate-pulse rounded" />
      </div>
    </div>
  );
}
