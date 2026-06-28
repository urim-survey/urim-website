import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "우림측량 | 토지측량·개발행위허가·농지전용·태양광 인허가 전문",
  description:
    "강원도 횡성 기반 토지측량 및 인허가 전문 업체 우림측량입니다. 개발행위허가·농지전용허가·태양광 인허가를 처음부터 끝까지 원스톱으로 처리합니다.",
  keywords:
    "토지측량, 개발행위허가, 농지전용허가, 태양광 인허가, 횡성측량, 강원도 인허가, 우림측량",
  openGraph: {
    title: "우림측량 | 토지측량·인허가 전문",
    description: "강원도 횡성 기반 토지측량 및 인허가 전문 업체",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-noto), sans-serif" }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
