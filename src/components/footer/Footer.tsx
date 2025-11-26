import FooterNav from "@/components/footer/FooterNav";

function Footer() {
  return (
    <footer className="w-full h-[250px] p-10 flex flex-col justify-start border-t-2 border-t-input">
      <div
        className="max-w-[982px] px-4 mx-auto w-full
      flex flex-col gap-2 items-center"
      >
        <p className="text-lg text-center">
          우기의 <span className="text-chart-2">Next.js</span> 블로그: 키보드 두들기며 먹고살기
          ver.1
        </p>
        <FooterNav />
        <p className="text-sm">(C) 2024. 우기. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
