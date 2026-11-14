import type { Metadata } from "next";
import FirebaseAnalytics from "./firebase-analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "myLink | 모든 연결을 한곳에",
  description: "나의 작업과 기록, 소셜 링크를 한 페이지에 모으는 myLink",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
