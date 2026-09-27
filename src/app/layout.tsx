import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhavishya - Unified School Experience",
  description: "A calmer way for schools and families to stay connected",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
