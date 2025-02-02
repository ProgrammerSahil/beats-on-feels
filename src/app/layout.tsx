import type { Metadata } from "next";
import { Playwrite_IN, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Feels on Beat",
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
        {children}
      </body>
    </html>
  );
}