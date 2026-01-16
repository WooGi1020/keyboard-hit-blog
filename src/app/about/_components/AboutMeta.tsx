import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ABOUT_ME from "@/constant/ABOUT_ME";
import { MapIcon, Mail, Github, Globe } from "lucide-react";
import Link from "next/link";

function AboutMeta() {
  return (
    <>
      <div className="flex justify-between w-full items-start">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-semibold max-sm:text-[36px] tracking-tight">
              {ABOUT_ME.name}
            </h1>
            <p className="text-xl font-semibold text-muted-foreground max-sm:text-lg italic">
              {ABOUT_ME.role}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center text-muted-foreground">
              <MapIcon className="size-5 max-sm:size-4" />
              <p className="text-base font-medium max-sm:text-[14px]">{ABOUT_ME.address}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href={`mailto:${ABOUT_ME.email}`}
                className="flex items-center gap-1.5 hover:text-chart-1 transition-colors"
              >
                <Mail className="size-5" />
                <span className="text-sm font-medium">E-mail</span>
              </Link>
              <Link
                href={ABOUT_ME.github}
                target="_blank"
                className="flex items-center gap-1.5 hover:text-chart-1 transition-colors"
              >
                <Github className="size-5" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <Avatar className="size-32 max-sm:hidden border-2 border-chart-1 rounded-full p-1">
          <AvatarImage src={ABOUT_ME.avatar} alt="아바타 이미지" />
          <AvatarFallback>{ABOUT_ME.name}</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}

export default AboutMeta;
