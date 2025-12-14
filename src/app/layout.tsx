import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Do Nothing",
    template: "%s | Do Nothing",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  description:
    "Do Nothing is a minimalist productivity web app where the goal is to stay completely still. Any mouse movement, key press, or tab switch resets your timer.",
  keywords: [
    "productivity app",
    "focus app",
    "mindfulness",
    "minimalist app",
    "attention economy",
    "deep focus",
    "do nothing",
  ],
  authors: [{ name: "Chiaima Uwakwe" }],
  creator: "Chiaima Uwakwe",
  metadataBase: new URL("https://do-nothing-now.vercel.app"),
  openGraph: {
    title: "Do Nothing",
    description:
      "A productivity app where doing nothing is the challenge. Move once and you lose.",
    url: "https://do-nothing-now.vercel.app",
    siteName: "Do Nothing",
    images: [
      {
        url: "/do-nothing-og-image.png",
        width: 1200,
        height: 630,
        alt: "Do Nothing — Stay still if you can",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Do Nothing",
    description:
      "A productivity app that punishes productivity. Any movement resets your timer.",
    images: ["/do-nothing-og-image.png"],
    creator: "@Chikaimaaa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body
        suppressHydrationWarning
        className="min-h-screen antialiased text-white bg-[#121212] "
      >
        {children}
      </body>
    </html>
  );
}
