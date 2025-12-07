import "@/styles/globals.css";
import localFont from "next/font/local";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "sonner";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import META_DATA from "@/constant/META_DATA";
import { GoogleAnalytics } from "@next/third-parties/google";

const pretendardFont = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  preload: true,
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  verification: {
    google: META_DATA.googleVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendardFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="my-20 w-full px-4">
            <section className="flex flex-col gap-6">{children}</section>
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
