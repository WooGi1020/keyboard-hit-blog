import { Link2, Github } from "lucide-react"; // GitHub, Mail 아이콘 추가
import Link from "next/link";

function FooterNav() {
  const iconClass = "size-5 text-muted-foreground transition-colors hover:text-foreground";

  return (
    <nav className="flex items-center gap-4">
      <Link
        href="https://github.com/woogi1020" // 깃허브 아이디에 맞춰 수정하세요
        target="_blank"
        aria-label="GitHub 프로필"
        className={iconClass}
      >
        <Github className="size-5" />
      </Link>
      <Link
        href="https://linktr.ee/woogi1020"
        target="_blank"
        aria-label="링크트리 프로필"
        className={iconClass}
      >
        <Link2 className="size-5" />
      </Link>
    </nav>
  );
}

export default FooterNav;
