import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | myLink",
  description: "Google 계정으로 myLink에 로그인하세요.",
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
