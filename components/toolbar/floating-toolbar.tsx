"use client";
import React, { useState } from "react";
import { ArrowUpToLine, Database, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBarDecreasingIcon } from "../ui/chart-bar-decreasing";
import { GithubIcon } from "../ui/github";
import { CopyIcon } from "../ui/copy";
import { ChevronsDownUpIcon } from "../ui/chevrons-down-up";
import { ChevronsUpDownIcon } from "../ui/chevrons-up-down";


interface FloatingToolbarProps {
  leaderboard_url?: string;
  code_url?: string;
  data_url?: string;
  paper_url?: string;
  citation_bib?: string;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  leaderboard_url,
  code_url,
  data_url,
  paper_url,
  citation_bib,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TooltipProvider>
      <Card className="fixed w-12 right-4 bottom-4 shadow-lg transition-all duration-300 z-50">
        <CardContent className="p-2">
          <div className="flex flex-col items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-full"
                  onClick={toggleExpand}
                >
                  {isExpanded ? (
                    <ChevronsDownUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronsUpDownIcon className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isExpanded ? "Collapse" : "Expand"}</p>
              </TooltipContent>
            </Tooltip>

            {isExpanded && (
              <div className="flex flex-col gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <ArrowUpToLine className="w-4 h-4"/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Scroll to top</p>
                    </TooltipContent>
                  </Tooltip>
                
                {leaderboard_url && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.open(leaderboard_url, "_blank")}
                      >
                        <ChartBarDecreasingIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Leaderboard</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {code_url && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.open(code_url, "_blank")}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Code</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {data_url && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.open(data_url, "_blank")}
                      >
                        <Database className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Data</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {paper_url && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.open(paper_url, "_blank")}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Paper</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {citation_bib && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => {
                          navigator.clipboard.writeText(citation_bib);
                          // Could add a toast notification here
                        }}
                      >
                        <CopyIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Copy Citation</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FloatingToolbar;
