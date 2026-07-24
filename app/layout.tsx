import type { Metadata } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    "jacewong.ai";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Jace Wong — Intelligence & Beyond",
      template: "%s — Jace Wong",
    },
    description:
      "Jace Wong is an AI practitioner exploring intelligence, philosophy, reading, investing, and the questions that shape what comes next.",
    keywords: [
      "Jace Wong",
      "artificial intelligence",
      "AI",
      "philosophy",
      "investing",
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
        "AI is my medium, not my boundary. Notes on intelligence, philosophy, reading, and capital.",
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
        "AI is my medium, not my boundary. Notes from the moving edge.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
