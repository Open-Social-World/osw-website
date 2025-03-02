import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import AutoBreadcrumb from "@/components/auto-breadcrumb";

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


export const metadata: Metadata = {
  title: "Open Social World | Human-AI Interaction Research",
  description:
    "Exploring novel dynamics of human-AI agent interaction through research, experiments, and innovative frameworks like EgoNormia.",
  keywords:
    "AI research, human-AI interaction, social AI, EgoNormia, agent interaction",
  authors: [{ name: "Open Social World Research Team" }],
  openGraph: {
    title: "Open Social World | Human-AI Interaction Research",
    description:
      "Exploring novel dynamics of human-AI agent interaction through research, experiments, and innovative frameworks.",
    url: "https://opensocialworld.org", // Update with your actual domain
    siteName: "Open Social World",
    images: [
      {
        url: "/images/og-image.jpg", // Create and add an OG image
        width: 1200,
        height: 630,
        alt: "Open Social World Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Social World | Human-AI Interaction Research",
    description: "Exploring novel dynamics of human-AI agent interaction.",
    images: ["/images/twitter-image.jpg"], // Create and add a Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://opensocialworld.org", // Update with your actual domain
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={`antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1">
              {/* Sticky header with sidebar trigger and breadcrumb */}
              <div className="sticky top-0 z-10 bg-background opacity-95 border-b flex items-center h-14 px-4 shadow-[0_1px_3px_-1px_rgba(0,0,0,0.1)]">
                <SidebarTrigger />
                <AutoBreadcrumb />
              </div>
              <main className="flex-1">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
