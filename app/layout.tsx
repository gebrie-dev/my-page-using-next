import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peak Portfolio - Full Stack Developer",
  description:
    "Barcelona-inspired portfolio showcasing cutting-edge web development skills",
  keywords: "portfolio, web developer, Next.js, React, full stack",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Peak Portfolio - Full Stack Developer",
    description:
      "Barcelona-inspired portfolio showcasing cutting-edge web development skills",
    type: "website",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navigation />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
