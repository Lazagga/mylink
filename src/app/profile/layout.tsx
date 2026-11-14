import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 프로필 | myLink",
  description: "내 프로필과 링크를 관리하세요.",
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
