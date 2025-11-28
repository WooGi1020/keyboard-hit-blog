import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ABOUT_ME from "@/constant/ABOUT_ME";
import { MapIcon } from "lucide-react";

function AboutMeta() {
  return (
    <>
      <span className="text-chart-1 -mb-10">Who am I?</span>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-[40px] font-bold max-sm:text-[32px]">{ABOUT_ME.name}</h1>
          <p className="text-xl font-medium max-sm:text-lg">{ABOUT_ME.role}</p>
          <div className="flex gap-2 items-center">
            <MapIcon className="size-5 max-sm:size-4" />
            <p className="text-lg font-medium max-sm:text-[14px]">{ABOUT_ME.address}</p>
          </div>
        </div>
        <Avatar className="ml-3 max-sm:hidden">
          <AvatarImage src="https://avatars.githubusercontent.com/u/113000290?v=4" />
          <AvatarFallback>코딩기</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}

export default AboutMeta;
