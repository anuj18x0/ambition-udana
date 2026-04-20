import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unada — Sell Properties Faster with Immersive Digital Experiences",
  description:
    "Unada helps real-estate developers and sales teams close deals faster with interactive digital sales tools, immersive property experiences, and AI-powered visualization.",
  keywords: [
    "proptech",
    "real estate technology",
    "property sales",
    "digital sales tools",
    "immersive property experience",
    "AI visualization",
  ],
  openGraph: {
    title: "Unada — Sell Properties Faster",
    description:
      "Interactive digital sales tools and immersive property experiences for modern real-estate teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
