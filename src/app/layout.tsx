import "@/styles/globals.css";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "sonner";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import META_DATA from "@/constant/META_DATA";

const pretendardFont = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  preload: true,
  display: "swap",
  variable: "--font-pretendard",
});

// 1. 폰트 로드 및 변수명 지정 (--font-jetbrains)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains", // ✅ 이 변수명을 기억하세요
  display: "swap",
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
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendardFont.className} ${jetbrainsMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="my-20 w-full px-4 main">
            <section className="flex flex-col gap-6">{children}</section>
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
