import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import AutoBreadcrumb from "@/components/auto-breadcrumb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            {/* <Header /> */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <SidebarTrigger />
                <AutoBreadcrumb />
              </div>
              {children}
            </div>
            {/* <Footer /> */}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
