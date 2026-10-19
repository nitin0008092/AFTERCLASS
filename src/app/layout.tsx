import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://afterclass.in"),
  title: "AFTERCLASS — Independent Streetwear",
  description:
    "Independent streetwear brand launching in India. Premium oversized graphic tees, heavyweight essentials, and contemporary youth culture.",
  openGraph: {
    title: "AFTERCLASS — Independent Streetwear",
    description: "Not Made To Blend In. Everyday uniform. Individual expression.",
    url: "https://afterclass.in",
    siteName: "AFTERCLASS",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 1600,
        alt: "AFTERCLASS Streetwear Campaign",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AFTERCLASS — Independent Streetwear",
    description: "Not Made To Blend In. Launching December 31, 2026.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased selection:bg-[#171717] selection:text-[#F5F2EB]`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F5F2EB] text-[#171717]">
        {children}
      </body>
    </html>
  );
}
