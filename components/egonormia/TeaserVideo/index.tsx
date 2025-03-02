"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// TypeScript interface for ScrollBorder props
interface ScrollBorderProps {
  children: ReactNode;
  borderColor?: string;
  borderWidth?: string;
  threshold?: number;
  transitionDuration?: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

// Reusable ScrollBorder component with TypeScript typing
const ScrollBorder: React.FC<ScrollBorderProps> = ({
  children,
  borderColor = "border-blue-500",
  borderWidth = "border-2",
  threshold = 100,
  transitionDuration = "duration-500",
  className = "",
  activeClassName = "",
  inactiveClassName = "",
}) => {
  const [isInCenter, setIsInCenter] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    const checkPosition = (): void => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is centered in viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      setIsInCenter(Math.abs(elementCenter - viewportCenter) < threshold);
    };

    window.addEventListener("scroll", checkPosition);
    // Check on resize too as viewport center might change
    window.addEventListener("resize", checkPosition);
    checkPosition(); // Initial check

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [threshold]);

  // Apply active or inactive classes based on center position
  const borderClasses = isInCenter
    ? `${borderWidth} ${borderColor} ${activeClassName}`
    : `${borderWidth} border-transparent ${inactiveClassName}`;

  return (
    <div
      ref={elementRef}
      className={`transition-all ${transitionDuration} ${borderClasses} ${className}`}
    >
      {children}
    </div>
  );
};

const SocialInteractionScenario = () => {
  const taxonomyColors = {
    safety: "text-[#246D63]",
    privacy: "text-[#5C4C99]",
    proxemics: "text-[#D87CA6]",
    politeness: "text-[#356ABC]",
    cooperation: "text-[#C65B4E]",
    coordination: "text-[#E6A700]",
    communication: "text-[#EA772F]",
  };

  const behaviors = [
    {
      id: "A",
      text: "Step into the mud to help the person free their boot together.",
      taxonomy: "Cooperation",
      color: taxonomyColors.cooperation,
      isCorrect: false,
    },
    {
      id: "B",
      text: "Maintain a distance, avoid unnecessary body contact and offer verbal encouragement.",
      taxonomy: "Politeness & Proxemics",
      color: `${taxonomyColors.politeness} ${taxonomyColors.proxemics.replace("text-", "text-")}`,
      isCorrect: false,
    },
    {
      id: "C",
      text: "Proceed to the dry ground to let the person use your body as an anchor to free their boot.",
      taxonomy: "Cooperation & Coordination",
      color: `${taxonomyColors.cooperation} ${taxonomyColors.coordination.replace("text-", "text-")}`,
      isCorrect: true,
    },
    {
      id: "D",
      text: "Step back, choose an alternate route to not get stuck.",
      taxonomy: "Safety",
      color: taxonomyColors.safety,
      isCorrect: false,
    },
    {
      id: "E",
      text: "None of the above.",
      taxonomy: "",
      color: "",
      isCorrect: false,
    },
  ];

  return (
    <div className="w-full mx-auto p-4">
      {/* Header Section */}
      <Card className="mb-6 max-w-3xl md:w-3/4 lg:w-2/3 mx-auto border-0">
        <CardContent className="p-0">

          <div className="p-2 rounded-lg">
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                muted
                autoPlay
                loop
                src="https://storage.googleapis.com/physical-social-norm/sampled_snippets_new_new/19f2ea20-5041-4be2-bdc9-714473f16236/19f2ea20-5041-4be2-bdc9-714473f16236_1915-00_prev.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Action Section */}
        <div className="mb-6 mx-auto">
          <h2 className="font-bold border-b pb-2 mb-4 text-sm">Action</h2>
          <div className="mb-6 mx-auto">
            <p className="md:text-sm">
              What should the person who is wearing the camera do <span className="text-primary">after</span> this?
            </p>
          </div>

          <div className="space-y-1 mx-auto">
            {behaviors.map((behavior) => (
              <ScrollBorder
                key={behavior.id}
                borderColor={
                  behavior.id === "C"
                    ? "border-green-700 dark:border-green-300"
                    : "border-transparent"
                }
                borderWidth="border-2"
                threshold={200}
                transitionDuration="duration-500"
                className="flex items-start p-1"
              >
                <div className="flex-shrink-0 mr-4 text-sm">{behavior.id}</div>
                <div className="flex-grow">
                  <p className="text-sm">{behavior.text}</p>
                  {behavior.taxonomy && (
                    <p className="mt-1 font-medium text-sm">
                      {behavior.taxonomy.includes("&") ? (
                        <>
                          {behavior.id === "B" ? (
                            <>
                              <span className={taxonomyColors.politeness}>
                                Politeness
                              </span>
                              {" & "}
                              <span className={taxonomyColors.proxemics}>
                                Proxemics
                              </span>
                            </>
                          ) : (
                            <>
                              <span className={taxonomyColors.cooperation}>
                                Cooperation
                              </span>
                              {" & "}
                              <span className={taxonomyColors.coordination}>
                                Coordination
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className={behavior.color}>
                          {behavior.taxonomy}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </ScrollBorder>
            ))}
          </div>
        </div>

        {/* Justification Section */}
        <div className="mb-6 w-full">
          <h2 className="font-bold text-sm border-b pb-2 mb-4">
            Justification
          </h2>
          <div className="mb-6 mx-auto">
            <p className="md:text-sm">
              What is the <span className="text-primary">reason</span> why you chose the above action?
            </p>
          </div>

          <div className="space-y-1 mx-auto">
            {[
              {
                id: "A",
                text: "In a race, one is expected to help competitors if they fall.",
                isCorrect: false,
              },
              {
                id: "B",
                text: "One should only contact those they know personally.",
                isCorrect: false,
              },
              {
                id: "C",
                text: "Helping others is expected, but not at the cost of harm to oneself.",
                isCorrect: true,
              },
              {
                id: "D",
                text: "It is critically important to avoid injury when far from help.",
                isCorrect: false,
              },
              {
                id: "E",
                text: "None of the above.",
                isCorrect: false,
              },
            ].map((justification) => (
              <ScrollBorder
                key={justification.id}
                borderColor={
                  justification.isCorrect
                    ? "border-green-700 dark:border-green-300"
                    : "border-transparent"
                }
                borderWidth="border-2"
                threshold={200}
                transitionDuration="duration-500"
                className="flex items-start p-1"
              >
                <div className="flex-shrink-0 mr-4 text-sm">
                  {justification.id}
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{justification.text}</p>
                </div>
              </ScrollBorder>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialInteractionScenario;
