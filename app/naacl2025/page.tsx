import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

import naacl2025 from "@/public/images/naacl2025.png";

export const metadata = {
  openGraph: {
    title: "NAACL 2025 Tutorial:Social Intelligence in the Age of LLMs",
    description:
      "What is social intelligence? Why you should start care about the social intelligence in this age of LLMs? How to do research on social intelligence?",
    authors: [
      "Hao Zhu",
      "Bodhisattwa Prasad Majumder",
      "Dirk Hovy",
      "Diyi Yang",
    ],
  },
};

export default function TutorialPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="m-4 p-4 sm:p-6 rounded-t-lg">
        <div className="text-center mb-6 sm:mb-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Social Intelligence in the Age of LLMs
            </h1>
            <p className="text-center text-muted-foreground md:text-xl">
              What is social intelligence? Why you should start care about the
              social intelligence in this age of LLMs? How to do research on
              social intelligence?
            </p>

            <h2 className="text-xl font-bold sm:text-xl xl:text-xl/none">
              Hao Zhu, Bodhisattwa Prasad Majumder, Dirk Hovy, Diyi Yang
            </h2>
            <div className="items-center text-sm pb-8">
              <div className="flex justify-center gap-x-8">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>May 4, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>14:00-17:30</span>
                </div>
              </div>
              <div className="flex justify-center gap-x-8">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Pecos, The Albuquerque Convention Center, Albuquerque, New
                    Mexico
                  </span>
                </div>
              </div>
            </div>
            <div className="items-center text-md pb-8">
              Tutorial slides will be available soon...
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={naacl2025}
              alt="Tutorial illustration showing social intelligence and LLMs"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
