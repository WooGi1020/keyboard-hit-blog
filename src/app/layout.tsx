import "@/styles/globals.css";
import localFont from "next/font/local";
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
      <body className={`${pretendardFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="my-15 w-full px-4">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
