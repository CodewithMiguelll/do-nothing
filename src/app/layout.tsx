import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do Nothing | Productivity App",
  description: "Do Nothing is a productivity app that helps you embrace the art of doing nothing and find balance in your busy life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#f0f0f0] text-[#333333] font-semibold"
      >
        {children}
      </body>
    </html>
  );
}
