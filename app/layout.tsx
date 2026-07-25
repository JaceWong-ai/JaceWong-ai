import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://jacewong-ai.github.io",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Jace Wong — Intelligence & Beyond",
    template: "%s — Jace Wong",
  },
  description:
    "Jace Wong is an AI practitioner writing about technology, philosophy, mathematics, reading, and the structures of intelligence.",
  keywords: [
    "Jace Wong",
    "artificial intelligence",
    "AI",
    "technology",
    "philosophy",
    "mathematics",
    "reading",
    "personal blog",
  ],
  authors: [{ name: "Jace Wong" }],
  creator: "Jace Wong",
  openGraph: {
    type: "website",
    url: metadataBase,
    siteName: "Jace Wong",
    title: "Jace Wong — Intelligence & Beyond",
    description:
      "Notes on artificial intelligence, technology, philosophy, mathematics, and reading.",
    images: [
      {
        url: new URL("/og.png", metadataBase).toString(),
        width: 1731,
        height: 909,
        alt: "Jace Wong — Intelligence & Beyond",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jace Wong — Intelligence & Beyond",
    description:
      "AI, technology, philosophy, mathematics, and reading—in working form.",
    images: [new URL("/og.png", metadataBase).toString()],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem("jace-theme");
      const preferred = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = saved || preferred;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
