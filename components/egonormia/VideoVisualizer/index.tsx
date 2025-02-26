"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

// Hierarchical relationship between high and low level activities
const ACTIVITY_HIERARCHY: Record<string, string[]> = {
  "Lifestyle": [
    "Pet Interaction",
    "Outdoor Activities",
    "Sports and Exercise",
    "Social Events",
    "Nature Exploration",
    "Group Activities",
    "Entertainment",
    "Technology Interactions",
    "Daily Routines",
    "Health and Personal Care"
  ],
  "Professional": [
    "Domestic Life",
    "Childcare and Parenting",
    "Work Environments",
    "Home Maintenance"
  ],
  "Living/Commute": [
    "Transportation",
    "Nighttime and Urban Activities",
    "Community and Urban Life"
  ],
  "Art/Culture": [
    "Cultural Practices",
    "DIY and Crafting",
    "Art Expressions",
    "Education"
  ],
  "Shopping": [
    "Shopping and Retail",
    "Food and Dining"
  ]
};

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
    className="inline-block rounded px-2 py-1 text-xs font-medium mr-2 mb-2 text-white"
    style={{
      backgroundColor: color,
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
  // Use a CSS variable that can be different in dark mode
  return (
    <span className="inline-block rounded px-2 py-1 text-xs font-medium mr-2 mb-2 text-white dark:bg-gray-600 bg-gray-900">
      {model}
    </span>
  );
};

interface VideoGridVisualizerProps {
  videos_per_page: number;
}

const VideoGridVisualizer = ({ videos_per_page }: VideoGridVisualizerProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [matchingCount, setMatchingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  // ID search removed as requested
  const [highLevelActivity, setHighLevelActivity] = useState("");
  const [lowLevelActivity, setLowLevelActivity] = useState("");
  const [highLevelSelectValue, setHighLevelSelectValue] = useState("all");
  const [lowLevelSelectValue, setLowLevelSelectValue] = useState("all");

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
      const from = (currentPage - 1) * videos_per_page;
      const to = from + videos_per_page - 1;

      let baseQuery = supabase.from("videos").select("*", { count: "exact" });

      if (highLevelActivity) {
        baseQuery = baseQuery.eq("high", highLevelActivity);
        
        if (lowLevelActivity) {
          baseQuery = baseQuery.eq("low", lowLevelActivity);
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
      setTotalPages(Math.ceil((filteredCount ?? 0) / videos_per_page));
      setMatchingCount(filteredCount || 0);
      setTotalVideos(totalCount || 0);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, highLevelActivity, lowLevelActivity, videos_per_page]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchVideos();
    };
    fetchData();
  }, [currentPage, highLevelActivity, lowLevelActivity, fetchVideos]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  // Handler for high level activity change
  const handleHighLevelChange = (value: string) => {
    setHighLevelSelectValue(value);
    setHighLevelActivity(value === "all" ? "" : value);
    setLowLevelActivity(""); // Reset low level when high level changes
    setLowLevelSelectValue("all"); // Reset low level select value
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6 flex flex-col items-center gap-4">
        <h2 className="text-xl font-medium text-foreground mb-2">Show Videos of Activities:</h2>
        <div className="flex gap-2">
          {/* High Level Activity Selector */}
          <Select
            value={highLevelSelectValue}
            onValueChange={handleHighLevelChange}
          >
            <SelectTrigger className="w-[200px] bg-background text-foreground border-input">
              <SelectValue placeholder="High Level Activity" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all">All Activities</SelectItem>
              {Object.keys(ACTIVITY_HIERARCHY).map((activity) => (
                <SelectItem key={activity} value={activity}>
                  {activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Low Level Activity Selector */}
          <Select
            value={lowLevelSelectValue}
            onValueChange={(value) => {
              setLowLevelSelectValue(value);
              setLowLevelActivity(value === "all" ? "" : value);
              setCurrentPage(1);
            }}
            disabled={!highLevelActivity}
          >
            <SelectTrigger 
              className={`w-[280px] bg-background text-foreground border-input ${
                !highLevelActivity ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <SelectValue placeholder={highLevelActivity ? "Low Level Activity" : "Select High Level First"} />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all">All {highLevelActivity} Activities</SelectItem>
              {highLevelActivity && ACTIVITY_HIERARCHY[highLevelActivity] && 
                ACTIVITY_HIERARCHY[highLevelActivity].map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          {/* Clear Button for filters */}
          {(highLevelActivity || lowLevelActivity) && (
            <button
              onClick={() => {
                setHighLevelActivity("");
                setLowLevelActivity("");
                setHighLevelSelectValue("all");
                setLowLevelSelectValue("all");
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-muted-foreground hover:text-foreground border border-input rounded-lg hover:bg-accent"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="text-muted-foreground mb-4">
        Found {matchingCount} matching videos out of {totalVideos} total videos
      </div>

      {error ? (
        <div className="w-full p-6 text-center text-destructive bg-destructive/10 rounded-lg">
          {error}
        </div>
      ) : isLoading ? (
        <div className="w-full p-6 text-center">Loading videos...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-card rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-105 border border-border"
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
                      <span className="text-muted-foreground">{video.low}</span>
                    </p>
                  )}
                  {video.high && (
                    <p className="text-sm">
                      <span className="font-medium">High level activity:</span>{" "}
                      <span className="text-muted-foreground">
                        {video.high}
                      </span>
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {video.description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80"
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
          <div className="bg-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-card-foreground">
            <div className="p-4 flex justify-between items-center border-b border-border">
              <h2 className="font-serif text-2xl font-bold">Video Details</h2>
              <button
                onClick={handleCloseVideo}
                className="text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                <div className="border-b border-border pb-4">
                  <p className="text-muted-foreground mb-2">
                    Video ID: {selectedVideo.id}
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  {selectedVideo.low && (
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold mb-2">
                        Low Level Activity
                      </h3>
                      <p className="text-foreground">{selectedVideo.low}</p>
                    </div>
                  )}
                  {selectedVideo.high && (
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-2">
                        High Level Activity
                      </h3>
                      <p className="text-foreground">{selectedVideo.high}</p>
                    </div>
                  )}
                </div>

                {selectedVideo.description && (
                  <div className="border-b border-border pb-4">
                    <h3 className="font-serif text-xl font-bold mb-2">
                      Description
                    </h3>
                    <p className="text-foreground">
                      {selectedVideo.description}
                    </p>
                  </div>
                )}

                {selectedVideo.behaviors && (
                  <div className="border-b border-border pb-4">
                    <h3 className="font-serif text-xl font-bold mb-4">
                      Actions
                    </h3>
                    <div className="pl-4 border-l border-muted">
                      {selectedVideo.behaviors.map((behavior, index) => (
                        <div
                          key={index}
                          className={`border-b border-muted last:border-b-0 ${
                            index === selectedVideo.correct_behavior
                              ? "border-l-4 border-l-green-500 -ml-4 pl-4 bg-green-500/10"
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
                  <div className="border-b border-border pb-4">
                    <h3 className="font-serif text-xl font-bold mb-4">
                      Justifications
                    </h3>
                    <div className="pl-4 border-l border-muted">
                      {selectedVideo.justifications.map(
                        (justification, index) => (
                          <div
                            key={index}
                            className={`border-b border-muted last:border-b-0 ${
                              index === selectedVideo.correct_behavior
                                ? "border-l-4 border-l-green-500 -ml-4 pl-4 bg-green-500/10"
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

const ResponsiveVideoVisualizer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile when component mounts
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint in Tailwind
    };

    // Initial check
    checkIfMobile();

    // Listen for window resize events
    window.addEventListener("resize", checkIfMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <VideoGridVisualizer videos_per_page={3} />
      ) : (
        <VideoGridVisualizer videos_per_page={6} />
      )}
    </>
  );
};

export default ResponsiveVideoVisualizer;