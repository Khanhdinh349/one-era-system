import type { Metadata } from "next";
import "./globals.css"; // Đường dẫn tương đối từ file layout

export const metadata: Metadata = {
  title: "ONE ERA - SG Registration",
  description: "Hệ thống đăng ký tham quan dự án",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}