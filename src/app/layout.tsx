import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김태랑 | 프로필과 링크",
  description: "김태랑의 소개와 링크를 모아둔 개인 프로필 페이지",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
