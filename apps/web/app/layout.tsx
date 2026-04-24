import type { Metadata } from "next";
import { IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { getSiteUrl, siteDescription } from "@/lib/site";

const headline = Syne({
  variable: "--font-headline",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SEAR | Self Evolving Agent Retrainer",
    template: "%s | SEAR",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SEAR",
    description: siteDescription,
    url: siteUrl,
    siteName: "SEAR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAR",
    description: siteDescription,
  },
  keywords: [
    "SEAR",
    "Self Evolving Agent Retrainer",
    "ChatGPT app",
    "MCP server",
    "agent retraining",
    "benchmark marketing",
    "Vercel launch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headline.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
