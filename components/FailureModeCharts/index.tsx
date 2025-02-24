"use client";

import React from "react";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define colors for failure modes
const COLORS = {
  sensibility: "#d88c8c",
  prioritization: "#d4b278",
  perception: "#94adc2",
  refusal: "#a894c2",
};

// Pattern definitions for each failure mode
const PATTERNS = {
  sensibility: (
    <pattern
      id="pattern-sensibility"
      patternUnits="userSpaceOnUse"
      width="4"
      height="4"
    >
      <rect width="4" height="4" fill={COLORS.sensibility} />
      <circle cx="2" cy="2" r="0.5" fill="black" />
    </pattern>
  ),
  prioritization: (
    <pattern
      id="pattern-prioritization"
      patternUnits="userSpaceOnUse"
      width="6"
      height="6"
    >
      <rect width="6" height="6" fill={COLORS.prioritization} />
      <rect y="2" width="6" height="0.8" fill="black" opacity="0.2" />
      <rect y="5" width="6" height="0.8" fill="black" opacity="0.2" />
    </pattern>
  ),
  perception: (
    <pattern
      id="pattern-perception"
      patternUnits="userSpaceOnUse"
      width="6"
      height="6"
      patternTransform="rotate(45)"
    >
      <rect width="6" height="6" fill={COLORS.perception} />
      <rect y="0" width="6" height="1.5" fill="black" opacity="0.15" />
      <rect y="3" width="6" height="1.5" fill="black" opacity="0.15" />
    </pattern>
  ),
  refusal: (
    <pattern
      id="pattern-refusal"
      patternUnits="userSpaceOnUse"
      width="5"
      height="5"
    >
      <rect width="5" height="5" fill={COLORS.refusal} />
      <rect x="0" width="2.5" height="2.5" fill="black" opacity="0.2" />
      <rect x="2.5" y="2.5" width="2.5" height="2.5" fill="black" opacity="0.2" />
    </pattern>
  ),
};

// Data for each model
const GPT4O_DATA = [
  { name: "Sensibility", value: 61.5, fill: "url(#pattern-sensibility)" },
  { name: "Prioritization", value: 15.4, fill: "url(#pattern-prioritization)" },
  { name: "Perception", value: 23.1, fill: "url(#pattern-perception)" },
  { name: "Refusal", value: 0, fill: "url(#pattern-refusal)" },
];

const GEMINI_DATA = [
  { name: "Sensibility", value: 46.0, fill: "url(#pattern-sensibility)" },
  { name: "Prioritization", value: 24.0, fill: "url(#pattern-prioritization)" },
  { name: "Perception", value: 24.0, fill: "url(#pattern-perception)" },
  { name: "Refusal", value: 6.0, fill: "url(#pattern-refusal)" },
];

const HUMAN_DATA = [
  { name: "Sensibility", value: 25.0, fill: "url(#pattern-sensibility)" },
  { name: "Prioritization", value: 62.5, fill: "url(#pattern-prioritization)" },
  { name: "Perception", value: 12.5, fill: "url(#pattern-perception)" },
  { name: "Refusal", value: 0, fill: "url(#pattern-refusal)" },
];

// Custom label renderer
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, index } = props;
  if (value < 5) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Changed from 0.5 to 0.7 to move labels outward
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      fontWeight="bold" 
      fontSize={22} 
      textAnchor="middle" 
      dominantBaseline="central"
    >
      {`${value.toFixed(1)}%`}
    </text>
  );
};

// Individual Chart Component
const FailureModeChart = ({ data, title }: { data: any[], title: string }) => (
  <Card className="flex flex-col h-full">
    <CardHeader className="items-center pb-2">
      <CardTitle className="text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-center flex-1 p-0">
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          dataKey="value"
          strokeWidth={1}
          stroke="black"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </CardContent>
  </Card>
);

// Legend component
const FailureModeLegend = () => (
  <Card className="flex flex-col h-full">
    <CardHeader className="items-center justify-center pb-2">
      <CardTitle className="text-2xl">Failure Mode</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 pt-2 flex items-center justify-center">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 border border-black" style={{ backgroundColor: COLORS.sensibility, backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '5px 5px' }}></div>
          <span>Norm Sensibility</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 border border-black" style={{ 
            backgroundColor: COLORS.prioritization, 
            backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)',
            backgroundSize: '100% 4px'
          }}></div>
          <span>Norm Prioritization</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 border border-black" style={{ 
            backgroundColor: COLORS.perception, 
            backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)',
            backgroundSize: '6px 6px'
          }}></div>
          <span>Perception</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 border border-black" style={{ 
            backgroundColor: COLORS.refusal, 
            backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2) 75%, transparent 75%, transparent)',
            backgroundSize: '6px 6px'
          }}></div>
          <span>Refusal</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main component
export default function FailureModeCharts() {
  return (
    <div className="relative">
      {/* SVG definitions for patterns - placed once at the top level */}
      <svg width="0" height="0" style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          {PATTERNS.sensibility}
          {PATTERNS.prioritization}
          {PATTERNS.perception}
          {PATTERNS.refusal}
        </defs>
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <FailureModeChart data={GPT4O_DATA} title="GPT-4o" />
        <FailureModeChart data={GEMINI_DATA} title="Gemini 1.5 Pro" />
        <FailureModeChart data={HUMAN_DATA} title="Human" />
        <FailureModeLegend />
      </div>
    </div>
  );
}