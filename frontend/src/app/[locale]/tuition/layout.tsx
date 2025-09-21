"use client";

import Header from "@/layout/Header";

export default function TuitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header dùng chung */}
      <Header />

      {/* Nội dung trang con */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
