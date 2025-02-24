'use client';

import React, { useState } from 'react';

interface Entry {
  model: string;
  both: number;
  act: number;
  jus: number;
  sens: number;
}

interface LeaderboardTableProps {
  entries: Entry[];
}

type SortKey = keyof Entry;
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const data: { [key: string]: Entry[] } = {
  blind: [
    { model: 'Gemini 1.5 Flash', both: 12.2, act: 15.0, jus: 14.1, sens: 46.6 },
    { model: 'o3-mini', both: 15.0, act: 16.8, jus: 17.1, sens: 51.9 },
    { model: 'GPT-4o', both: 17.7, act: 19.9, jus: 19.9, sens: 55.9 },
    { model: 'Gemini 1.5 Pro', both: 21.2, act: 24.6, jus: 23.6, sens: 54.0 },
    { model: 'InternVL 2.5', both: 15.3, act: 18.3, jus: 17.4, sens: 55.4 },
    { model: 'Deepseek R1', both: 16.1, act: 19.4, jus: 17.1, sens: 27.3 }
  ],
  pipeline: [
    { model: 'Gemini 1.5 Flash', both: 14.7, act: 17.7, jus: 16.7, sens: 54.2 },
    { model: 'GPT-4o', both: 21.0, act: 23.7, jus: 23.5, sens: 66.0 },
    { model: 'Claude 3.5 Sonnet', both: 23.9, act: 36.7, jus: 33.5, sens: 61.2 },
    { model: 'Gemini 1.5 Pro', both: 30.7, act: 37.3, jus: 34.8, sens: 64.0 },
    { model: 'Gemini 2.0 Thinking', both: 37.5, act: 46.3, jus: 42.1, sens: 58.8 },
    { model: 'o3-mini', both: 41.5, act: 45.7, jus: 45.2, sens: 65.0 },
    { model: 'InternVL 2.5', both: 32.7, act: 40.9, jus: 38.0, sens: 62.5 },
    { model: 'Deepseek R1', both: 36.5, act: 42.9, jus: 40.0, sens: 61.0 }
  ],
  video: [
    { model: 'Human', both: 92.4, act: 92.4, jus: 92.4, sens: 85.1 },
    { model: 'Claude 3.5 Sonnet', both: 36.0, act: 43.5, jus: 41.0, sens: 59.3 },
    { model: 'Gemini 2.0 Flash', both: 38.9, act: 49.6, jus: 41.3, sens: 60.0 },
    { model: 'GPT-4o', both: 39.8, act: 45.1, jus: 44.8, sens: 59.6 },
    { model: 'Gemini 1.5 Flash', both: 41.7, act: 46.5, jus: 44.3, sens: 54.4 },
    { model: 'Gemini 2.0 Thinking', both: 42.7, act: 51.7, jus: 45.3, sens: 57.3 },
    { model: 'Gemini 1.5 Pro', both: 45.3, act: 51.9, jus: 47.8, sens: 61.1 },
    { model: 'Llama 3.2', both: 2.2, act: 19.9, jus: 10.1, sens: 54.7 },
    { model: 'InternVL 2.5', both: 15.1, act: 18.7, jus: 17.6, sens: 50.7 },
    { model: 'Qwen2.5 VL', both: 41.5, act: 48.3, jus: 43.8, sens: 62.8 }
  ]
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'both', direction: 'desc' });

  const sortedEntries = React.useMemo(() => {
    const sorted = [...entries];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    return sorted;
  }, [entries, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig((currentConfig) => ({
      key,
      direction: 
        currentConfig.key === key && currentConfig.direction === 'desc' 
          ? 'asc' 
          : 'desc'
    }));
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="max-w-4xl">
        <thead>
          <tr className="border-b">
            <th 
              className="p-2 text-left cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('model')}
            >
              Model {getSortIcon('model')}
            </th>
            <th 
              className="p-2 text-right cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('both')}
            >
              Both (% Accuracy) {getSortIcon('both')}
            </th>
            <th 
              className="p-2 text-right cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('act')}
            >
              Action (% Accuracy) {getSortIcon('act')}
            </th>
            <th 
              className="p-2 text-right cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('jus')}
            >
              Justification (% Accuracy) {getSortIcon('jus')}
            </th>
            <th 
              className="p-2 text-right cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('sens')}
            >
              Sensibility (% IoU) {getSortIcon('sens')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{entry.model}</td>
              <td className="p-2 text-right">{entry.both.toFixed(1)}</td>
              <td className="p-2 text-right">{entry.act.toFixed(1)}</td>
              <td className="p-2 text-right">{entry.jus.toFixed(1)}</td>
              <td className="p-2 text-right">{entry.sens.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('blind');

  return (
    <div className="w-full">
      <div className="bg-[#1a1a1a] p-6 rounded-t-lg">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-8 tracking-wider text-white font-['Orbitron']">EGONORMIA LEADERBOARD</h1>
          
          <div className="text-white mb-8">
            <div className="mb-4 text-lg">
              <a href="https://www2.cs.arizona.edu/~mhrezaei/" target="_blank" rel="noopener noreferrer" className="hover:underline">MohammadHossein Rezaei</a>*
              <span className="mx-2">·</span>
              <a href="https://sofyc.github.io" target="_blank" rel="noopener noreferrer" className="hover:underline">Yicheng Fu</a>*
              <span className="mx-2">·</span>
              <a href="https://scholar.google.com/citations?user=bDIUeu4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">Philippe Cuvin</a>*
            </div>
            
            <div className="text-lg">
              <a href="https://calebziems.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Caleb Ziems</a>
              <span className="mx-2">·</span>
              <a href="https://stevenyzzhang.github.io/website/" target="_blank" rel="noopener noreferrer" className="hover:underline">Yanzhe Zhang</a>
              <span className="mx-2">·</span>
              <a href="https://zhuhao.me" target="_blank" rel="noopener noreferrer" className="hover:underline">Hao Zhu</a>
              <span className="mx-2">·</span>
              <a href="https://cs.stanford.edu/~diyiy/" target="_blank" rel="noopener noreferrer" className="hover:underline">Diyi Yang</a>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a 
              href="/articles/psn" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1a1a] rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <span role="img" aria-label="blog" className="text-xl">📝</span>
              Blog
            </a>
            <a 
              href="https://huggingface.co/datasets/open-social-world/EgoNormia"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1a1a] rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <span role="img" aria-label="hugging face" className="text-xl">🤗</span>
              Data
            </a>
            <a 
              href="https://arxiv.org/abs/2305.17008"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1a1a] rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <span role="img" aria-label="document" className="text-xl">📄</span>
              arXiv
            </a>
            <a 
              href="https://github.com/Open-Social-World/EgoNormia"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1a1a] rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <span role="img" aria-label="code" className="text-xl">💻</span>
              Code
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-b-lg shadow-lg">
        <div className="flex gap-2 mb-6">
          {['blind', 'pipeline', 'video'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === 'blind' && <LeaderboardTable entries={data.blind} />}
          {activeTab === 'pipeline' && <LeaderboardTable entries={data.pipeline} />}
          {activeTab === 'video' && <LeaderboardTable entries={data.video} />}
        </div>
      </div>
    </div>
  );
}