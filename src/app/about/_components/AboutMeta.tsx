import ABOUT_ME from "@/constant/ABOUT_ME";
import { MapPin, Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import FlippableAvatar from "./FlippableAvatar";

function AboutMeta() {
  return (
    <header className="about-profile">
      <div className="about-profile-copy">
        <span className="about-eyebrow">About Me</span>
        <h1>{ABOUT_ME.name}</h1>
        <p className="about-role">{ABOUT_ME.role}</p>
        <p className="about-location">
          <MapPin size={15} aria-hidden="true" />
          {ABOUT_ME.address}
        </p>
        <div className="about-contact">
          <a href={`mailto:${ABOUT_ME.email}`}>
            <Mail size={16} aria-hidden="true" />
            <span>E-mail</span>
          </a>
          <a href={ABOUT_ME.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
      <FlippableAvatar
        frontSrc={ABOUT_ME.avatar}
        backSrc={ABOUT_ME.avatarBack}
        fallback={ABOUT_ME.name}
      />
    </header>
  );
}
export default AboutMeta;
