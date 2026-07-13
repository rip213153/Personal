import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "张杰 — Agent Engineer",
  description: "张杰的个人网站：Agent 开发、后端工程、项目作品与技术写作。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
