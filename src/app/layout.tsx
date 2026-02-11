import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://www.my-universe.hinnytsang.com";

export const metadata: Metadata = {
  title: {
    default: "Hinny Tsang — Data Scientist / Quant / Developer",
    template: "%s | Hinny Tsang",
  },
  description:
    "Portfolio of Man Hin (Hinny) Tsang — turning messy data into useful things. Background in physics, currently exploring data science and quantitative finance.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "My Universe — Hinny Tsang",
    title: "Hinny Tsang — Data Scientist / Quant / Developer",
    description:
      "Portfolio of Man Hin (Hinny) Tsang — turning messy data into useful things. Background in physics, currently exploring data science and quantitative finance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hinny Tsang — Data Scientist / Quant / Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hinny Tsang — Data Scientist / Quant / Developer",
    description:
      "Portfolio of Man Hin (Hinny) Tsang — turning messy data into useful things. Background in physics, currently exploring data science and quantitative finance.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // biome-ignore lint/a11y/useHtmlLang: lang is set dynamically per locale in [locale]/layout.tsx
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/earth-globe-tool-svgrepo-com.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
