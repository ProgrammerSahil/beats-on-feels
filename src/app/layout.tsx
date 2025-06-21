import type { Metadata } from "next";
import { Playwrite_IN, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Script from "next/script";

// Configure Playwrite font (adjust based on actual available properties)
const playwrite = Playwrite_IN({
  weight: 'variable', // Use 'variable' for variable fonts
  display: 'swap',
  variable: '--font-playwrite',
  adjustFontFallback: true,
});

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Beats on Feels",
  description: "Generate playlists based on your mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playwrite.variable} ${inter.variable}`}>
    
      <body className={`${inter.className} min-h-screen bg-[var(--background)] text-[var(--text)]`}>
      <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4938441116155197"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}