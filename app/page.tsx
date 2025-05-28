import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-4xl py-16 sm:py-24">
            <div className="text-center space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Open Social World
              </h1>
              <p className="mt-6 text-xl leading-8 font-serif italic">
                Exploring the new dynamics of human-AI agent interaction.
              </p>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                <Card className="text-start max-w-[300px] h-[360px] mx-auto flex flex-col">
                  <CardHeader>
                    <CardTitle>AutoLibra</CardTitle>
                    <CardDescription>
                      Evaluation Metric Induction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Current agent evaluation relies heavily on manual metric
                      design and expert heuristics. AutoLibra builds metrics
                      that gives you insights into agent behaviors from open-end
                      human feedback.
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto grid grid-cols-1 gap-4">
                    <Link href="/articles/autolibra">
                      <Button className="w-full">Blog Post</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="text-start max-w-[300px] h-[360px] mx-auto flex flex-col">
                  <CardHeader>
                    <CardTitle>EgoNormia</CardTitle>
                    <CardDescription>Normative Decision Making</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Can VLM models make decisions that follow human social
                      norm when given egocentric video input? A challenging
                      ego-centric video QA benchmark.
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <div className="flex gap-x-1 w-full mx-auto">
                      <Link href="/articles/egonormia" className="w-full">
                        <Button className="w-full">Blog</Button>
                      </Link>
                      <Link href="leaderboard" className="w-full">
                        <Button className="w-full">Leaderboard</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="text-start max-w-[300px] h-[360px] mx-auto flex flex-col">
                  <CardHeader>
                    <CardTitle>Social Intelligence Tutorial</CardTitle>
                    <CardDescription>NAACL 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      An introduction to social intelligence research. What are
                      the components of social intelligence? How are they
                      connected and reinforce each other? What are the failure
                      of LLMs&apos; social intelligence?
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link href="/naacl2025" className="w-full">
                      <Button className="w-full">Check out more</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
