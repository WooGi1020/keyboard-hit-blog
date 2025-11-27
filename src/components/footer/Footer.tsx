import FooterNav from "@/components/footer/FooterNav";

function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex flex-col items-center md:items-start gap-1">
            <h2 className="text-lg font-bold tracking-tight">
              우기의 <span className="text-chart-1">개발</span> 블로그
            </h2>
            <p className="text-sm text-muted-foreground">
              키보드 두들기며 먹고살기{" "}
              <span className="text-xs bg-muted px-1.5 py-0.5 rounded ml-1">v1.1.0</span>
            </p>
          </div>

          <p className="text-xs text-muted-foreground/60 mt-2">
            © 2025. Woo-gi. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <FooterNav />
          <p className="text-xs text-muted-foreground/40 text-center md:text-right">
            Built with Next.js, Tailwind CSS, Velite <br />
            Hosted on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
