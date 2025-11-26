import HeaderNav from "@/components/header/HeaderNav";

function Header() {
  return (
    <header className="fixed inset-0 h-[60px] border-b-2 border-b-input flex items-center w-full z-50 bg-background dark:bg-back">
      <HeaderNav />
    </header>
  );
}

export default Header;
