import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FlippableAvatar({
  frontSrc,
  backSrc,
  fallback,
}: {
  frontSrc: string;
  backSrc: string;
  fallback: string;
}) {
  return (
    <div className="group size-32 max-sm:hidden perspective-[1000px] cursor-pointer">
      <div className="relative h-full w-full transition-all duration-1500 transform-3d group-hover:transform-[rotateY(360deg)] will-change-transform">
        <div className="absolute inset-0 backface-hidden">
          <Avatar className="size-full border-2 border-chart-1 rounded-full p-1">
            <AvatarImage src={frontSrc} alt="아바타 앞면" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </div>

        <div className="absolute inset-0 h-full w-full rounded-full border-2 border-chart-2 p-1 bg-white backface-hidden overflow-hidden transform-[rotateY(180deg)] will-change-transform">
          <img
            src={backSrc}
            alt="아바타 뒷면"
            className="h-full w-full object-contain scale-120 top-2 relative"
          />
        </div>
      </div>
    </div>
  );
}
