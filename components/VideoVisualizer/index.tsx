"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

const VIDEOS_PER_PAGE = 6;

const HIGH_LEVEL_CATEGORIES = [
  "Lifestyle",
  "Professional",
  "Living/Commute",
  "Art/Culture",
  "Shopping",
];
const LOW_LEVEL_CATEGORIES = [
  "Pet Interaction",
  "Outdoor Activities",
  "Sports and Exercise",
  "Social Events",
  "Nature Exploration",
  "Group Activities",
  "Entertainment",
  "Technology Interactions",
  "Daily Routines",
  "Health and Personal Care",
  "Domestic Life",
  "Childcare and Parenting",
  "Work Environments",
  "Home Maintenance",
  "Transportation",
  "Nighttime and Urban Activities",
  "Community and Urban Life",
  "Cultural Practices",
  "DIY and Crafting",
  "Art Expressions",
  "Education",
  "Shopping and Retail",
  "Food and Dining",
];

type TaxonomyType =
  | "safety"
  | "privacy"
  | "proxemics"
  | "politeness"
  | "cooperation"
  | "coordination/proactivity"
  | "communication/legibility";

const TAXONOMY_COLORS: Record<TaxonomyType, string> = {
  safety: "#246D63",
  privacy: "#5C4C99",
  proxemics: "#D87CA6",
  politeness: "#356ABC",
  cooperation: "#C65B4E",
  "coordination/proactivity": "#E6A700",
  "communication/legibility": "#EA772F",
};

type ModelPrediction = {
  behavior: number;
  justification: number;
};

type PredictionData = {
  [key: string]: ModelPrediction;
};

type Video = {
  id: string;
  high?: string;
  low?: string;
  taxonomy?: string | null;
  description?: string;
  video_url?: string;
  video_during_url?: string;
  thumbnail_url?: string;
  frame_url?: string;
  behaviors?: string[];
  correct_behavior?: number;
  justifications?: string[];
  prediction?: PredictionData;
};

const NEXT_PUBLIC_SUPABASE_URL = "https://ockebqxgdcybuerqphqp.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ja2VicXhnZGN5YnVlcnFwaHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4Mjk0MDQsImV4cCI6MjA1NTQwNTQwNH0.azu_Oi1O2ib56T6V4u210DxqjCNTYAHkBcPYbA6zPvo";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span
    className="inline-block rounded px-2 py-1 text-xs font-medium mr-2 mb-2"
    style={{
      backgroundColor: color,
      color: "#FFFFFF",
    }}
  >
    {text}
  </span>
);

const TaxonomyBadge = ({ taxonomy }: { taxonomy: string }) => {
  const normalizedTaxonomy = taxonomy.toLowerCase() as TaxonomyType;
  const color = TAXONOMY_COLORS[normalizedTaxonomy] || "#666666";
  return <Badge text={taxonomy} color={color} />;
};

const ModelBadge = ({ model }: { model: string }) => {
  return <Badge text={model} color="#000000" />;
};

const VideoGridVisualizer = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [matchingCount, setMatchingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [idSearch, setIdSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryType, setCategoryType] = useState("high");

  const renderTaxonomyDisplay = (taxonomyList: string | string[] | null) => {
    if (!taxonomyList) return null;

    const taxonomies = Array.isArray(taxonomyList)
      ? taxonomyList
      : [taxonomyList];
    return (
      <div className="flex flex-wrap">
        {taxonomies.map((taxonomy, idx) => (
          <TaxonomyBadge key={idx} taxonomy={taxonomy} />
        ))}
      </div>
    );
  };

  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const from = (currentPage - 1) * VIDEOS_PER_PAGE;
      const to = from + VIDEOS_PER_PAGE - 1;

      let baseQuery = supabase.from("videos").select("*", { count: "exact" });

      if (idSearch.trim()) {
        baseQuery = baseQuery.ilike("id", `%${idSearch.trim()}%`);
      }

      if (categorySearch.trim()) {
        if (categoryType === "high") {
          baseQuery = baseQuery.ilike("high", `%${categorySearch.trim()}%`);
        } else {
          baseQuery = baseQuery.ilike("low", `%${categorySearch.trim()}%`);
        }
      }

      const {
        data,
        error: filteredError,
        count: filteredCount,
      } = await baseQuery.range(from, to).order("id");

      if (filteredError) throw filteredError;

      const { count: totalCount } = await supabase
        .from("videos")
        .select("*", { count: "exact", head: true });

      const processedData = data.map((video) => ({
        ...video,
        taxonomy: video.taxonomy ? JSON.parse(video.taxonomy) : null,
        prediction: video.prediction ? JSON.parse(video.prediction) : null,
      }));

      setVideos(processedData || []);
      setTotalPages(Math.ceil((filteredCount ?? 0) / VIDEOS_PER_PAGE));
      setMatchingCount(filteredCount || 0);
      setTotalVideos(totalCount || 0);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, idSearch, categorySearch, categoryType]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchVideos();
    };
    fetchData();
  }, [currentPage, idSearch, categorySearch, categoryType, fetchVideos]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="text-gray-600 mb-4">
        Found {matchingCount} matching videos out of {totalVideos} total videos
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search video ID..."
              value={idSearch}
              onChange={(e) => {
                setIdSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {idSearch && (
              <button
                onClick={() => {
                  setIdSearch("");
                  setCurrentPage(1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex gap-2">
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">
                  Mountain Standard Time (MST)
                </SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="akst">
                  Alaska Standard Time (AKST)
                </SelectItem>
                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe & Africa</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                <SelectItem value="west">
                  Western European Summer Time (WEST)
                </SelectItem>
                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="cst_china">
                  China Standard Time (CST)
                </SelectItem>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                <SelectItem value="ist_indonesia">
                  Indonesia Central Standard Time (WITA)
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Australia & Pacific</SelectLabel>
                <SelectItem value="awst">
                  Australian Western Standard Time (AWST)
                </SelectItem>
                <SelectItem value="acst">
                  Australian Central Standard Time (ACST)
                </SelectItem>
                <SelectItem value="aest">
                  Australian Eastern Standard Time (AEST)
                </SelectItem>
                <SelectItem value="nzst">
                  New Zealand Standard Time (NZST)
                </SelectItem>
                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>South America</SelectLabel>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <select
            value={categoryType}
            onChange={(e) => {
              setCategoryType(e.target.value);
              setCategorySearch("");
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 flex items-center appearance-none bg-white"
          >
            <option value="high">High Level Activity</option>
            <option value="low">Low Level Activity</option>
          </select>
          <select
            value={categorySearch}
            onChange={(e) => {
              setCategorySearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {(categoryType === "high"
              ? HIGH_LEVEL_CATEGORIES
              : LOW_LEVEL_CATEGORIES
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {categorySearch && (
            <button
              onClick={() => {
                setCategorySearch("");
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {error ? (
        <div className="w-full p-6 text-center text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      ) : isLoading ? (
        <div className="w-full p-6 text-center">Loading videos...</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleVideoClick(video)}
              >
                <div className="aspect-video relative h-40">
                  <Image
                    src={video.frame_url || ""}
                    alt={`Preview for ${video.id}`}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg">
                      Click to view video
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  {video.low && (
                    <p className="text-sm">
                      <span className="font-medium">Low level activity:</span>{" "}
                      <span className="text-gray-600">{video.low}</span>
                    </p>
                  )}
                  {video.high && (
                    <p className="text-sm">
                      <span className="font-medium">High level activity:</span>{" "}
                      <span className="text-gray-600">{video.high}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {video.description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-serif text-2xl font-bold">Video Details</h2>
              <button
                onClick={handleCloseVideo}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-serif text-lg font-semibold mb-2">
                    Before
                  </h4>
                  <video
                    className="w-full aspect-video"
                    controls
                    playsInline
                    preload="metadata"
                    key={selectedVideo.video_url}
                  >
                    <source src={selectedVideo.video_url} type="video/mp4" />
                  </video>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold mb-2">
                    During
                  </h4>
                  <video
                    className="w-full aspect-video"
                    controls
                    playsInline
                    preload="metadata"
                    key={selectedVideo.video_during_url}
                  >
                    <source
                      src={selectedVideo.video_during_url}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <p className="text-gray-600 mb-2">
                    Video ID: {selectedVideo.id}
                  </p>
                </div>

                <div className="border-b pb-4">
                  {selectedVideo.low && (
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold mb-2">
                        Low Level Activity
                      </h3>
                      <p className="text-gray-800">{selectedVideo.low}</p>
                    </div>
                  )}
                  {selectedVideo.high && (
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-2">
                        High Level Activity
                      </h3>
                      <p className="text-gray-800">{selectedVideo.high}</p>
                    </div>
                  )}
                </div>

                {selectedVideo.description && (
                  <div className="border-b pb-4">
                    <h3 className="font-serif text-xl font-bold mb-2">
                      Description
                    </h3>
                    <p className="text-gray-800">{selectedVideo.description}</p>
                  </div>
                )}

                {selectedVideo.behaviors && (
                  <div className="border-b pb-4">
                    <h3 className="font-serif text-xl font-bold mb-4">
                      Actions
                    </h3>
                    <div className="pl-4 border-l border-gray-200">
                      {selectedVideo.behaviors.map((behavior, index) => (
                        <div
                          key={index}
                          className={`border-b border-gray-400 last:border-b-0 ${
                            index === selectedVideo.correct_behavior
                              ? "border-l-4 border-l-green-500 -ml-4 pl-4 bg-green-50"
                              : ""
                          } py-4 first:pt-0 last:pb-0`}
                        >
                          <div className="text-lg mb-2 flex items-center gap-2">
                            <span>
                              {String.fromCharCode(65 + index)}.{" "}
                              {behavior ||
                                "None of the other options is correct."}
                            </span>
                            {selectedVideo.taxonomy?.[index] && behavior && (
                              <div className="flex flex-wrap">
                                {renderTaxonomyDisplay(
                                  selectedVideo.taxonomy[index],
                                )}
                              </div>
                            )}
                          </div>
                          {selectedVideo.prediction &&
                            Object.entries(selectedVideo.prediction).some(
                              ([, pred]) => pred.behavior === index,
                            ) && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {Object.entries(selectedVideo.prediction).map(
                                  ([model, pred]) =>
                                    pred.behavior === index &&
                                    pred.behavior !== -1 && (
                                      <ModelBadge key={model} model={model} />
                                    ),
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedVideo.justifications && (
                  <div className="border-b pb-4">
                    <h3 className="font-serif text-xl font-bold mb-4">
                      Justifications
                    </h3>
                    <div className="pl-4 border-l border-gray-200">
                      {selectedVideo.justifications.map(
                        (justification, index) => (
                          <div
                            key={index}
                            className={`border-b border-gray-400 last:border-b-0 ${
                              index === selectedVideo.correct_behavior
                                ? "border-l-4 border-l-green-500 -ml-4 pl-4 bg-green-50"
                                : ""
                            } py-4 first:pt-0 last:pb-0`}
                          >
                            <div className="text-lg mb-2">
                              {String.fromCharCode(65 + index)}.{" "}
                              {justification ||
                                "None of the other options is correct."}
                            </div>
                            {selectedVideo.prediction &&
                              Object.entries(selectedVideo.prediction).some(
                                ([, pred]) => pred.justification === index,
                              ) && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {Object.entries(selectedVideo.prediction).map(
                                    ([model, pred]) =>
                                      pred.justification === index &&
                                      pred.justification !== -1 && (
                                        <ModelBadge key={model} model={model} />
                                      ),
                                  )}
                                </div>
                              )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGridVisualizer;
