import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "myLink — 모든 연결을 한곳에",
  description: "나를 소개하는 링크를 한 페이지에 모으는 myLink 데모 페이지",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
