'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Transform data for vertical bar charts
const normThinkerData = [
  {
    category: 'Both',
    'GPT-4o': 9.1,
    '+ Best-5 Retrieval': 45.5,
    'Human': 72.7,
  },
  {
    category: 'Action',
    'GPT-4o': 45.5,
    '+ Best-5 Retrieval': 63.6,
    'Human': 72.7,
  },
  {
    category: 'Justification',
    'GPT-4o': 18.2,
    '+ Best-5 Retrieval': 45.5,
    'Human': 72.7,
  }
];

// Modified EcoNormia data without Human performance
const ecoNormiaData = [
  {
    category: 'Both',
    'Gemini 1.5 Pro': 45.2,
    'GPT-4o': 39.8,
    '+ Random Retrieval': 41.3,
    '+ Best-5 Retrieval': 49.2,
  },
  {
    category: 'Action',
    'Gemini 1.5 Pro': 51.8,
    'GPT-4o': 44.9,
    '+ Random Retrieval': 51.0,
    '+ Best-5 Retrieval': 54.5,
  },
  {
    category: 'Justification',
    'Gemini 1.5 Pro': 47.7,
    'GPT-4o': 45.1,
    '+ Random Retrieval': 45.7,
    '+ Best-5 Retrieval': 52.6,
  }
];

// Find the maximum value in the EcoNormia data to set y-axis limit
const getMaxValue = (data: Array<Record<string, number | string>>): number => {
  let max = 0;
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'category' && typeof item[key] === 'number' && item[key] > max) {
        max = item[key] as number;
      }
    });
  });
  // Round up to nearest 10 for a cleaner y-axis
  return Math.ceil(max / 10) * 10;
};

// Color configuration
const colors = {
  'GPT-4o': '#8884d8',
  '+ Best-5 Retrieval': '#82ca9d',
  'Human': '#ffc658',
  'Gemini 1.5 Pro': '#ff8042',
  '+ Random Retrieval': '#a4de6c',
};

// Custom tooltip interface and component
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const NormThinkerResult: React.FC = () => {
  // Calculate the maximum value for the second chart's y-axis
  const maxEcoNormiaValue = getMaxValue(ecoNormiaData);

  // Formatter for the legend
  const legendFormatter = (value: string): string => {
    if (value === 'Justification') return 'Jus.';
    if (value === 'Action') return 'Act.';
    return value;
  };

  return (
    <div className="flex flex-col space-y-12 w-full p-4">
      {/* First chart - NormThinker results */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">Results with NormThinker on ego-centric robotics videos, n=11</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={normThinkerData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="category" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={legendFormatter} />
                <Bar 
                  dataKey="GPT-4o" 
                  fill={colors['GPT-4o']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                >
                  <LabelList 
                    dataKey="GPT-4o" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={12}
                  />
                </Bar>
                <Bar 
                  dataKey="+ Best-5 Retrieval" 
                  fill={colors['+ Best-5 Retrieval']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                >
                  <LabelList 
                    dataKey="+ Best-5 Retrieval" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={12}
                  />
                </Bar>
                <Bar 
                  dataKey="Human" 
                  fill={colors['Human']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                >
                  <LabelList 
                    dataKey="Human" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Second chart - EcoNormia results (without Human) */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">Results with NORMTHINKER on held-out instances in EGONORMIA</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ecoNormiaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="category" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, maxEcoNormiaValue]} 
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={legendFormatter} />
                <Bar 
                  dataKey="Gemini 1.5 Pro" 
                  fill={colors['Gemini 1.5 Pro']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                >
                  <LabelList 
                    dataKey="Gemini 1.5 Pro" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={11}
                  />
                </Bar>
                <Bar 
                  dataKey="GPT-4o" 
                  fill={colors['GPT-4o']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                >
                  <LabelList 
                    dataKey="GPT-4o" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={11}
                  />
                </Bar>
                <Bar 
                  dataKey="+ Random Retrieval" 
                  fill={colors['+ Random Retrieval']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                >
                  <LabelList 
                    dataKey="+ Random Retrieval" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={11}
                  />
                </Bar>
                <Bar 
                  dataKey="+ Best-5 Retrieval" 
                  fill={colors['+ Best-5 Retrieval']} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                >
                  <LabelList 
                    dataKey="+ Best-5 Retrieval" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={11}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NormThinkerResult;