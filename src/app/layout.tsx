import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Background from "@/components/ui/Background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swedel.dev"),
  title: {
    default: "Swedel Dsouza | Full Stack Developer",
    template: "%s | Swedel Dsouza",
  },
  description:
    "Full Stack Developer specializing in React, Angular, Node.js and TypeScript — building scalable, performant, beautifully crafted web applications.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Angular",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "Swedel Dsouza",
  ],
  authors: [{ name: "Swedel Dsouza" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Swedel Dsouza Portfolio",
    title: "Swedel Dsouza | Full Stack Developer",
    description: "Full Stack Developer building scalable web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swedel Dsouza | Full Stack Developer",
    description: "Full Stack Developer building scalable web applications.",
  },
};

// Runs before paint to set the theme class and avoid a flash of the wrong theme.
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.style.colorScheme = t;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body antialiased selection:bg-accent/25`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <Background />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
