import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Open Social World | Home",
    description:
      "Discover research on novel dynamics of human-AI agent interaction at Open Social World.",
    openGraph: {
      title: "Open Social World | Home",
      description:
        "Discover research on novel dynamics of human-AI agent interaction at Open Social World.",
    },
  };
};

const HeroPage = () => {
  return (
    // Added min-h-screen and flex with items-center to center vertically
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-4xl py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Open Social World
              </h1>
              <p className="mt-6 text-lg leading-8">
                Exploring novel dynamics of human-AI agent interaction.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button>
                  <Link href="/articles/egonormia">EgoNormia</Link>
                </Button>
                <Button variant="ghost">
                  <Link href="/leaderboard">Leaderboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
