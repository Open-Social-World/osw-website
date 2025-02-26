'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Filter data to show only Both scores
const normThinkerData = [
  {
    name: 'GPT-4o',
    Both: 9.1,
  },
  {
    name: '+ Best-5 Retrieval',
    Both: 45.5,
  },
  {
    name: 'Human',
    Both: 72.7,
  }
];

// EcoNormia data with only Both scores, without Human
const ecoNormiaData = [
  {
    name: 'Gemini 1.5 Pro',
    Both: 45.2,
  },
  {
    name: 'GPT-4o',
    Both: 39.8,
  },
  {
    name: '+ Random Retrieval',
    Both: 41.3,
  },
  {
    name: '+ Best-5 Retrieval',
    Both: 49.2,
  }
];

// Find the maximum value in the data to set y-axis limit
const getMaxValue = (data: Array<Record<string, number | string>>): number => {
  let max = 0;
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'name' && typeof item[key] === 'number' && item[key] > max) {
        max = item[key] as number;
      }
    });
  });
  // Round up to nearest 10 for a cleaner y-axis
  return Math.ceil(max / 10) * 10;
};

// Color for the Both metric
const bothColor = "#8884d8";

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
            {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const NormThinkerResult: React.FC = () => {
  // Calculate the maximum values for both charts
  const maxNormThinkerValue = getMaxValue(normThinkerData);
  const maxEcoNormiaValue = getMaxValue(ecoNormiaData);

  return (
    <div className="flex flex-row space-x-2 w-full p-4">
      {/* First chart - NormThinker results */}
      <Card className="overflow-hidden w-1/2">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Results with NormThinker on ego-centric robotics videos, n=11</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-2">
          <div className="h-72 w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                data={normThinkerData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  height={60}
                  tick={{ fontSize: 9 }}
                  interval={0}
                  tickFormatter={(value) => {
                    // Break long names into multiple lines
                    const parts = value.split(' ');
                    if (parts.length <= 2) return value;
                    
                    if (value.includes('Random')) {
                      return ['+ Random', 'Retrieval'].join('\n');
                    } else if (value.includes('Best-5')) {
                      return ['+ Best-5', 'Retrieval'].join('\n');
                    } else if (value.includes('Gemini')) {
                      return ['Gemini 1.5', 'Pro'].join('\n');
                    }
                    
                    return value;
                  }}
                />
                <YAxis 
                  domain={[0, maxNormThinkerValue]} 
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  padding={{ bottom: 0 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="Both" 
                  fill={bothColor} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  name="Both Score"
                >
                  <LabelList 
                    dataKey="Both" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Second chart - EcoNormia results */}
      <Card className="overflow-hidden w-1/2">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Results with NORMTHINKER on held-out instances in EGONORMIA</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-2">
          <div className="h-72 w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                data={ecoNormiaData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  height={60}
                  tick={{ fontSize: 9 }}
                  interval={0}
                  tickFormatter={(value) => {
                    // Break long names into multiple lines
                    const parts = value.split(' ');
                    if (parts.length <= 2) return value;
                    
                    if (value.includes('Random')) {
                      return ['+ Random', 'Retrieval'].join('\n');
                    } else if (value.includes('Best-5')) {
                      return ['+ Best-5', 'Retrieval'].join('\n');
                    } else if (value.includes('Gemini')) {
                      return ['Gemini 1.5', 'Pro'].join('\n');
                    }
                    
                    return value;
                  }}
                />
                <YAxis 
                  domain={[0, maxEcoNormiaValue]} 
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  padding={{ bottom: 0 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="Both" 
                  fill={bothColor} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  name="Both Score"
                >
                  <LabelList 
                    dataKey="Both" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="#666"
                    fontSize={10}
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