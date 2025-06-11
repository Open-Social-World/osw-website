"use client";

import React, { useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { BookTextIcon, BookTextIconHandle } from "@/components/ui/book-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Entry {
  model: string;
  both: number;
  act: number;
  jus: number;
  sens: number;
  organization: string;
  modality: string; // Added modality field
  date: string;
}

type SortKey = keyof Entry;
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

// Icon URLs for different organizations
const organizationIcons: Record<string, { light: string; dark: string }> = {
  Google: {
    light:
      "https://unpkg.com/@lobehub/icons-static-png@latest/light/gemini-color.png",
    dark: "https://unpkg.com/@lobehub/icons-static-png@latest/dark/gemini-color.png",
  },
  OpenAI: {
    light:
      "https://unpkg.com/@lobehub/icons-static-png@latest/light/openai.png",
    dark: "https://unpkg.com/@lobehub/icons-static-png@latest/dark/openai.png",
  },
  Anthropic: {
    light:
      "https://unpkg.com/@lobehub/icons-static-png@latest/light/claude-color.png",
    dark: "https://unpkg.com/@lobehub/icons-static-png@latest/dark/claude-color.png",
  },
  Meta: {
    light:
      "https://unpkg.com/@lobehub/icons-static-png@latest/light/meta-color.png",
    dark: "https://unpkg.com/@lobehub/icons-static-png@latest/dark/meta-color.png",
  },
  Alibaba: {
    light:
      "https://unpkg.com/@lobehub/icons-static-png@latest/light/qwen-color.png",
    dark: "https://unpkg.com/@lobehub/icons-static-png@latest/dark/qwen-color.png",
  },
  Deepseek: {
    light:
      "https://unpkg.com/@lobehub/icons-static-png@latest/light/deepseek-color.png",
    dark: "https://unpkg.com/@lobehub/icons-static-png@latest/dark/deepseek-color.png",
  },
};

// Organization-specific colors as fallback
const organizationColors: Record<string, string> = {
  Google: "#4285F4",
  OpenAI: "#10a37f",
  Anthropic: "#9A5CFF",
  Meta: "#0668E1",
  Alibaba: "#FF6A00",
  Deepseek: "#1E88E5",
  "Shanghai AI Lab": "#38B2AC",
  Human: "#718096",
  Random: "#9CA3AF",
};

// Modality colors for badges
const modalityColors: Record<string, string> = {
  Blind: "#6B7280", // Gray
  Pipeline: "#3B82F6", // Blue
  Video: "#EC4899", // Pink
};

// Simple fallback component with organization initials and brand colors
const OrganizationInitial = ({ name }: { name: string }) => {
  const bgColor = organizationColors[name] || "#CBD5E0";

  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold"
      style={{ backgroundColor: bgColor }}
    >
      {name.charAt(0)}
    </div>
  );
};

const OrganizationLogo = ({ name }: { name: string }) => {
  const iconData = organizationIcons[name];

  if (iconData) {
    return (
      <div className="relative w-6 h-6">
        <div className="block dark:hidden">
          <Image
            src={iconData.light}
            alt={`${name} logo - light`}
            width={24}
            height={24}
            className="object-contain"
            onError={(e) => {
              // If image fails, show the fallback
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement?.parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.className = `w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold`;
                fallback.style.backgroundColor =
                  organizationColors[name] || "#CBD5E0";
                fallback.textContent = name.charAt(0);
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        <div className="hidden dark:block">
          <Image
            src={iconData.dark}
            alt={`${name} logo - dark`}
            width={24}
            height={24}
            className="object-contain"
            onError={(e) => {
              // If image fails, show the fallback
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement?.parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.className = `w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold`;
                fallback.style.backgroundColor =
                  organizationColors[name] || "#CBD5E0";
                fallback.textContent = name.charAt(0);
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return <OrganizationInitial name={name} />;
};

// Add modality to each entry
const rawData = {
  blind: [
    {
      model: "Gemini 1.5 Flash",
      both: 12.2,
      act: 15.0,
      jus: 14.1,
      sens: 46.6,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "o3-mini",
      both: 15.0,
      act: 16.8,
      jus: 17.1,
      sens: 51.9,
      organization: "OpenAI",
      date: "2025-02-15",
    },
    {
      model: "GPT-4o",
      both: 17.7,
      act: 19.9,
      jus: 19.9,
      sens: 55.9,
      organization: "OpenAI",
      date: "2025-02-15",
    },
    {
      model: "Gemini 1.5 Pro",
      both: 21.2,
      act: 24.6,
      jus: 23.6,
      sens: 54.0,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "InternVL 2.5",
      both: 15.3,
      act: 18.3,
      jus: 17.4,
      sens: 55.4,
      organization: "Shanghai AI Lab",
      date: "2025-02-15",
    },
    {
      model: "Deepseek R1",
      both: 16.1,
      act: 19.4,
      jus: 17.1,
      sens: 27.3,
      organization: "Deepseek",
      date: "2025-02-15",
    },
    {
      model: "Constant Choice",
      both: 25.3,
      act: 25.3,
      jus: 25.3,
      sens: 40.5,
      organization: "Random",
      date: "2025-02-15",
    },
  ],
  pipeline: [
    {
      model: "Gemini 1.5 Flash",
      both: 14.7,
      act: 17.7,
      jus: 16.7,
      sens: 54.2,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "GPT-4o",
      both: 21.0,
      act: 23.7,
      jus: 23.5,
      sens: 66.0,
      organization: "OpenAI",
      date: "2025-02-15",
    },
    {
      model: "Claude 3.5 Sonnet",
      both: 23.9,
      act: 36.7,
      jus: 33.5,
      sens: 61.2,
      organization: "Anthropic",
      date: "2025-02-15",
    },
    {
      model: "Gemini 1.5 Pro",
      both: 30.7,
      act: 37.3,
      jus: 34.8,
      sens: 64.0,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "Gemini 2.0 Thinking",
      both: 37.5,
      act: 46.3,
      jus: 42.1,
      sens: 58.8,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "o3-mini",
      both: 41.5,
      act: 45.7,
      jus: 45.2,
      sens: 65.0,
      organization: "OpenAI",
      date: "2025-02-15",
    },
    {
      model: "InternVL 2.5",
      both: 32.7,
      act: 40.9,
      jus: 38.0,
      sens: 62.5,
      organization: "Shanghai AI Lab",
      date: "2025-02-15",
    },
    {
      model: "Deepseek R1",
      both: 36.5,
      act: 42.9,
      jus: 40.0,
      sens: 61.0,
      organization: "Deepseek",
      date: "2025-02-15",
    },
  ],
  video: [
    {
      model: "Human",
      both: 92.4,
      act: 92.4,
      jus: 92.4,
      sens: 85.1,
      organization: "Human",
      date: "2025-02-15",
    },
    {
      model: "Claude 3.5 Sonnet",
      both: 25.5,
      act: 32.0,
      jus: 28.5,
      sens: 39.4,
      organization: "Anthropic",
      date: "2025-02-15",
    },
    {
      model: "Gemini 2.0 Flash",
      both: 38.9,
      act: 49.6,
      jus: 41.3,
      sens: 60.0,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "GPT-4o",
      both: 39.8,
      act: 45.1,
      jus: 44.8,
      sens: 59.6,
      organization: "OpenAI",
      date: "2025-02-15",
    },
    {
      model: "Gemini 1.5 Flash",
      both: 41.7,
      act: 46.5,
      jus: 44.3,
      sens: 54.4,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "Gemini 2.0 Thinking",
      both: 42.7,
      act: 51.7,
      jus: 45.3,
      sens: 57.3,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "Gemini 1.5 Pro",
      both: 45.3,
      act: 51.9,
      jus: 47.8,
      sens: 61.1,
      organization: "Google",
      date: "2025-02-15",
    },
    {
      model: "Llama 3.2",
      both: 2.2,
      act: 19.9,
      jus: 10.1,
      sens: 54.7,
      organization: "Meta",
      date: "2025-02-15",
    },
    {
      model: "InternVL 2.5",
      both: 15.1,
      act: 18.7,
      jus: 17.6,
      sens: 50.7,
      organization: "Shanghai AI Lab",
      date: "2025-02-15",
    },
    {
      model: "Qwen2.5 VL 72B",
      both: 41.5,
      act: 48.3,
      jus: 43.8,
      sens: 62.8,
      organization: "Alibaba",
      date: "2025-02-15",
    },
    {
      model: "QwQ-32B",
      both: 37.8,
      act: 46.7,
      jus: 42.2,
      sens: 44.6,
      organization: "Alibaba",
      date: "2025-04-27",
    },
    {
      model: "🥇 Gemini 2.5 Pro (05-06-2025 Preview)",
      both: 53.9,
      act: 61.4,
      jus: 55.4,
      sens: 46.4,
      organization: "Google",
      date: "2025-05-20",
    },
    {
      model: "🥈 Gemini 2.5 Flash (04-17-2025 Preview)",
      both: 50.3,
      act: 58.2,
      jus: 52.2,
      sens: 51.1,
      organization: "Google",
      date: "2025-04-27",
    },
    {
      model: "GPT-4.1",
      both: 49.8,
      act: 55.5,
      jus: 52.6,
      sens: 55.2,
      organization: "OpenAI",
      date: "2025-04-27",
    },
    {
      model: "🥉o4-mini",
      both: 50.0,
      act: 60.2,
      jus: 52.3,
      sens: 52.8,
      organization: "OpenAI",
      date: "2025-04-27",
    },
  ],
  video_verified: [
    {
      model: "Gemini 1.5 Flash",
      both: 48.0,
      act: 53.0,
      jus: 50.5,
      sens: 56.8,
      organization: "Google",
      date: "2025-05-20",
    },
    {
      model: "🥇 Gemini 2.5 Pro (05-06-2025 Preview)",
      both: 64.7,
      act: 75.8,
      jus: 66.3,
      sens: 57.7,
      organization: "Google",
      date: "2025-05-20",
    },
    {
      model: "🥈 Gemini 2.5 Flash (04-17-2025 Preview)",
      both: 54.0,
      act: 65.0,
      jus: 55.0,
      sens: 54.7,
      organization: "Google",
      date: "2025-05-20",
    },
    {
      model: "🥉 o4-mini",
      both: 58.3,
      act: 66.7,
      jus: 66.7,
      sens: 64.6,
      organization: "OpenAI",
      date: "2025-05-20",
    },
    {
      model: "GPT-4.1",
      both: 46.4,
      act: 50.0,
      jus: 50.0,
      sens: 57.7,
      organization: "OpenAI",
      date: "2025-05-20",
    },
    {
      model: "Gemini 1.5 Pro",
      both: 49.0,
      act: 56.5,
      jus: 50.5,
      sens: 61.8,
      organization: "Google",
      date: "2025-05-20",
    },
    {
      model: "Gemini 2.0 Thinking",
      both: 50.0,
      act: 70.6,
      jus: 50.0,
      sens: 56.1,
      organization: "Google",
      date: "2025-05-20",
    },
    {
      model: "Claude 3.5 Sonnet",
      both: 22.7,
      act: 27.3,
      jus: 27.3,
      sens: 47.7,
      organization: "Anthropic",
      date: "2025-05-20",
    },
    {
      model: "Claude 3.7 Sonnet",
      both: 33.3,
      act: 40.0,
      jus: 41.7,
      sens: 40.8,
      organization: "Anthropic",
      date: "2025-05-20",
    },
    {
      model: "Qwen2.5 VL (72B)",
      both: 47.0,
      act: 57.5,
      jus: 48.0,
      sens: 68.2,
      organization: "Alibaba",
      date: "2025-05-20",
    },
    {
      model: "QWQ-32B",
      both: 37.5,
      act: 37.5,
      jus: 37.5,
      sens: 39.6,
      organization: "Alibaba",
      date: "2025-05-20",
    },
    {
      model: "InternVL 2.5",
      both: 13.0,
      act: 16.5,
      jus: 15.0,
      sens: 52.1,
      organization: "Shanghai AI Lab",
      date: "2025-05-20",
    },
    {
      model: "Llama 3.2",
      both: 4.0,
      act: 18.0,
      jus: 10.5,
      sens: 55.6,
      organization: "Meta",
      date: "2025-05-20",
    },
    { 
      model: "GPT-4o",
      both: 45.5,
      act: 53.0,
      jus: 50.0,
      sens: 62.7,
      organization: "OpenAI",
      date: "2025-05-20",
    },
  ],
};

// Create full dataset (all data except verified models with -V suffix)
const fullData: Entry[] = [
  ...rawData.blind.map((entry) => ({ ...entry, modality: "Blind" })),
  ...rawData.pipeline.map((entry) => ({ ...entry, modality: "Pipeline" })),
  ...rawData.video
    .filter((entry) => !entry.model.includes("-V"))
    .map((entry) => ({ ...entry, modality: "Video" })),
];

// Create verified dataset (video_verified + models with -V suffix from video)
const verifiedData: Entry[] = [
  ...rawData.video_verified.map((entry) => ({
    ...entry,
    modality: "Video",
  })),
  ...rawData.video
    .filter((entry) => entry.model.includes("-V"))
    .map((entry) => ({
      ...entry,
      modality: "Video",
      model: entry.model.replace("-V", ""),
    })),
];

const ModalityBadge = ({ modality }: { modality: string }) => {
  const bgColor = modalityColors[modality] || "#CBD5E0";

  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white whitespace-nowrap"
      style={{ backgroundColor: bgColor }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      ></span>
      {modality}
    </span>
  );
};

const ModalityExplanations = ({ data }: { data: Entry[] }) => {
  const availableModalities = [...new Set(data.map((entry) => entry.modality))];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
      <p className="font-medium mb-2">Input Modality Types:</p>
      <ul className="space-y-2">
        {availableModalities.includes("Blind") && (
          <li className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: modalityColors["Blind"] }}
            ></span>
            <strong>Blind:</strong> Models receive only the questions with no
            visual input
          </li>
        )}
        {availableModalities.includes("Pipeline") && (
          <li className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: modalityColors["Pipeline"] }}
            ></span>
            <strong>Pipeline:</strong> Models receive text-only descriptions of
            the scene (generated by Gemini 1.5 Flash)
          </li>
        )}
        {availableModalities.includes("Video") && (
          <li className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: modalityColors["Video"] }}
            ></span>
            <strong>Video:</strong> Models receive both video input (1 fps,
            concatenated into a single image) and questions
          </li>
        )}
      </ul>
    </div>
  );
};

const CombinedLeaderboardTable = ({ data }: { data: Entry[] }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "both",
    direction: "desc",
  });
  const [filterModality, setFilterModality] = useState<string | null>(null);

  const filteredEntries = React.useMemo(() => {
    if (filterModality) {
      return data.filter((entry) => entry.modality === filterModality);
    }
    return data;
  }, [filterModality, data]);

  const sortedEntries = React.useMemo(() => {
    const sorted = [...filteredEntries];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    return sorted;
  }, [filteredEntries, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig((currentConfig) => ({
      key,
      direction:
        currentConfig.key === key && currentConfig.direction === "desc"
          ? "asc"
          : "desc",
    }));
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2 h-4 w-4 opacity-50"
        >
          <path d="M7 15l5 5 5-5" />
          <path d="M7 9l5-5 5 5" />
        </svg>
      );
    }
    return sortConfig.direction === "asc" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 h-4 w-4"
      >
        <path d="M7 11l5-5 5 5" />
        <path d="M7 18l5-5 5 5" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 h-4 w-4"
      >
        <path d="M7 6l5 5 5-5" />
        <path d="M7 13l5 5 5-5" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <ModalityExplanations data={data} />

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setFilterModality(null)}
            className={`px-3 py-1 text-sm rounded-full ${
              filterModality === null
                ? "bg-slate-900 text-white"
                : "bg-gray-200 text-slate-700 dark:bg-gray-700 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          {Object.keys(modalityColors)
            .filter((modality) =>
              data.some((entry) => entry.modality === modality),
            )
            .map((modality) => (
              <button
                key={modality}
                onClick={() => setFilterModality(modality)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterModality === modality
                    ? "text-white"
                    : "bg-gray-200 text-slate-700 dark:bg-gray-700 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                style={{
                  backgroundColor:
                    filterModality === modality
                      ? modalityColors[modality]
                      : undefined,
                }}
              >
                {modality}
              </button>
            ))}
        </div>
      </div>

      <div className="rounded-md border dark:border-gray-700 overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full caption-bottom text-xs sm:text-sm md:text-base table-fixed">
            <thead className="[&_tr]:border-b [&_tr]:border-gray-200 dark:[&_tr]:border-gray-700">
              <tr className="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800">
                <th
                  className="h-8 sm:h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/3"
                  onClick={() => handleSort("model")}
                >
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Model</span>
                    {getSortIcon("model")}
                  </div>
                </th>
                <th
                  className="h-8 sm:h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/6"
                  onClick={() => handleSort("modality")}
                >
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Modality</span>
                    {getSortIcon("modality")}
                  </div>
                </th>
                <th
                  className="h-8 sm:h-10 px-1 sm:px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/12"
                  onClick={() => handleSort("both")}
                  title="Combined score for both Action and Justification"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span className="whitespace-nowrap">Both</span>
                    {getSortIcon("both")}
                  </div>
                </th>
                <th
                  className="h-8 sm:h-10 px-1 sm:px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/12"
                  onClick={() => handleSort("act")}
                  title="Action score"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span className="whitespace-nowrap">Act</span>
                    {getSortIcon("act")}
                  </div>
                </th>
                <th
                  className="h-8 sm:h-10 px-1 sm:px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/12"
                  onClick={() => handleSort("jus")}
                  title="Justification score"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span className="whitespace-nowrap">Jus</span>
                    {getSortIcon("jus")}
                  </div>
                </th>
                <th
                  className="h-8 sm:h-10 px-1 sm:px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/12"
                  onClick={() => handleSort("sens")}
                  title="Sensitivity score"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span className="whitespace-nowrap">Sen</span>
                    {getSortIcon("sens")}
                  </div>
                </th>
                <th
                  className="h-8 sm:h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer w-1/6"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Date</span>
                    {getSortIcon("date")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {sortedEntries.map((entry, index) => (
                <tr
                  key={`${entry.model}-${entry.modality}-${index}`}
                  className="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800"
                >
                  <td className="p-1 sm:p-2 align-middle font-medium">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <OrganizationLogo name={entry.organization} />
                      <span className="dark:text-white text-xs sm:text-sm md:text-base">
                        {entry.model}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-6 sm:ml-8">
                      {entry.organization}
                    </span>
                  </td>
                  <td className="p-1 sm:p-2 align-middle">
                    <ModalityBadge modality={entry.modality} />
                  </td>
                  <td className="p-1 sm:p-2 align-middle text-right dark:text-white font-mono">
                    {entry.both.toFixed(1)}
                  </td>
                  <td className="p-1 sm:p-2 align-middle text-right dark:text-white font-mono">
                    {entry.act.toFixed(1)}
                  </td>
                  <td className="p-1 sm:p-2 align-middle text-right dark:text-white font-mono">
                    {entry.jus.toFixed(1)}
                  </td>
                  <td className="p-1 sm:p-2 align-middle text-right dark:text-white font-mono">
                    {entry.sens.toFixed(1)}
                  </td>
                  <td className="p-1 sm:p-2 align-middle text-right dark:text-white font-mono">
                    {entry.date ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ParentButton = () => {
  const iconRef = useRef<BookTextIconHandle>(null);

  const handleMouseEnter = () => {
    // Trigger the icon animation when the button is hovered
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    // Stop the animation when the hover ends
    iconRef.current?.stopAnimation();
  };

  return (
    <Button
      variant="outline"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/articles/egonormia"
        className="inline-flex items-center gap-2 text-lg font-bold"
      >
        <BookTextIcon ref={iconRef} />
        <span>Learn More</span>
      </Link>
    </Button>
  );
};

export default function CombinedLeaderboard() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="m-4 p-4 sm:p-6 rounded-t-lg">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8">
            EgoNormia
          </h1>

          <p className="text-xl font-serif italic sm:text-2xl md:text-3xl mb-6 font-light">
            Can large models make normative decisions in physical-social embodied situations?
          </p>

          {/* <div className="mb-4 sm:mb-6">
            <div className="mb-2 sm:mb-3 text-sm sm:text-base">
              <a
                href="https://www2.cs.arizona.edu/~mhrezaei/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                MohammadHossein Rezaei
              </a>
              *<span className="mx-1 sm:mx-2">·</span>
              <a
                href="https://sofyc.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Yicheng Fu
              </a>
              *<span className="mx-1 sm:mx-2">·</span>
              <a
                href="https://scholar.google.com/citations?user=bDIUeu4AAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Phil Cuvin
              </a>
              *
            </div>

            <div className="text-sm sm:text-base">
              <a
                href="https://calebziems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Caleb Ziems
              </a>
              <span className="mx-1 sm:mx-2">·</span>
              <a
                href="https://stevenyzzhang.github.io/website/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Yanzhe Zhang
              </a>
              <span className="mx-1 sm:mx-2">·</span>
              <a
                href="https://zhuhao.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Hao Zhu
              </a>
              <span className="mx-1 sm:mx-2">·</span>
              <a
                href="https://cs.stanford.edu/~diyiy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Diyi Yang
              </a>
            </div>
          </div> */}

          <ParentButton />
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-b-lg">
        <Tabs defaultValue="verified" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="full">Full Dataset</TabsTrigger>
          </TabsList>

          <TabsContent value="verified">
            <div className="mb-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Verified Split:</strong> A high-quality subset of 200
                videos with full agreement on the correct answers{" "}
                <strong>among 5 independent annotators</strong>.
              </p>
            </div>
            <CombinedLeaderboardTable data={verifiedData} />
          </TabsContent>

          <TabsContent value="full">
            <div className="mb-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Full Dataset:</strong> Complete dataset of 1.8k videos
                with full agreement from{" "}
                <strong>3 independent annotators</strong>.
              </p>
            </div>
            <CombinedLeaderboardTable data={fullData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
