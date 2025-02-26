'use client';

import React, { useState } from 'react';

interface Entry {
  model: string;
  both: number;
  act: number;
  jus: number;
  sens: number;
  organization: string;
}

type SortKey = keyof Entry;
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

// Icon URLs for different organizations
const organizationIcons: Record<string, { light: string, dark: string }> = {
  Google: {
    light: 'https://unpkg.com/@lobehub/icons-static-png@latest/light/google-color.png',
    dark: 'https://unpkg.com/@lobehub/icons-static-png@latest/dark/google-color.png'
  },
  OpenAI: {
    light: 'https://unpkg.com/@lobehub/icons-static-png@latest/light/openai.png',
    dark: 'https://unpkg.com/@lobehub/icons-static-png@latest/dark/openai.png'
  },
  Anthropic: {
    light: 'https://unpkg.com/@lobehub/icons-static-png@latest/light/anthropic.png',
    dark: 'https://unpkg.com/@lobehub/icons-static-png@latest/dark/anthropic.png'
  },
  Meta: {
    light: 'https://unpkg.com/@lobehub/icons-static-png@latest/light/meta-color.png',
    dark: 'https://unpkg.com/@lobehub/icons-static-png@latest/dark/meta-color.png'
  },
  Alibaba: {
    light: 'https://unpkg.com/@lobehub/icons-static-png@latest/light/alibaba-color.png',
    dark: 'https://unpkg.com/@lobehub/icons-static-png@latest/dark/alibaba-color.png'
  },
  Deepseek: {
    light: 'https://unpkg.com/@lobehub/icons-static-png@latest/light/deepseek-color.png',
    dark: 'https://unpkg.com/@lobehub/icons-static-png@latest/dark/deepseek-color.png'
  },
};

// Organization-specific colors as fallback
const organizationColors: Record<string, string> = {
  Google: '#4285F4',
  OpenAI: '#10a37f',
  Anthropic: '#9A5CFF',
  Meta: '#0668E1',
  Alibaba: '#FF6A00',
  Deepseek: '#1E88E5',
  'Shanghai AI Lab': '#38B2AC',
  Human: '#718096',
};

// Simple fallback component with organization initials and brand colors
const OrganizationInitial = ({ name }: { name: string }) => {
  const bgColor = organizationColors[name] || '#CBD5E0';
  
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
    // Using CSS for dark mode detection instead of picture element
    return (
      <div className="relative w-6 h-6">
        <img 
          src={iconData.light} 
          alt={`${name} logo - light`} 
          className="w-6 h-6 object-contain block dark:hidden" 
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = `w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold`;
              fallback.style.backgroundColor = organizationColors[name] || '#CBD5E0';
              fallback.textContent = name.charAt(0);
              parent.appendChild(fallback);
            }
          }}
        />
        <img 
          src={iconData.dark} 
          alt={`${name} logo - dark`} 
          className="w-6 h-6 object-contain hidden dark:block" 
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = `w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold`;
              fallback.style.backgroundColor = organizationColors[name] || '#CBD5E0';
              fallback.textContent = name.charAt(0);
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
    );
  }
  
  return <OrganizationInitial name={name} />;
};

const data: { [key: string]: Entry[] } = {
  blind: [
    { model: 'Gemini 1.5 Flash', both: 12.2, act: 15.0, jus: 14.1, sens: 46.6, organization: 'Google' },
    { model: 'o3-mini', both: 15.0, act: 16.8, jus: 17.1, sens: 51.9, organization: 'OpenAI' },
    { model: 'GPT-4o', both: 17.7, act: 19.9, jus: 19.9, sens: 55.9, organization: 'OpenAI' },
    { model: 'Gemini 1.5 Pro', both: 21.2, act: 24.6, jus: 23.6, sens: 54.0, organization: 'Google' },
    { model: 'InternVL 2.5', both: 15.3, act: 18.3, jus: 17.4, sens: 55.4, organization: 'Shanghai AI Lab' },
    { model: 'Deepseek R1', both: 16.1, act: 19.4, jus: 17.1, sens: 27.3, organization: 'Deepseek' }
  ],
  pipeline: [
    { model: 'Gemini 1.5 Flash', both: 14.7, act: 17.7, jus: 16.7, sens: 54.2, organization: 'Google' },
    { model: 'GPT-4o', both: 21.0, act: 23.7, jus: 23.5, sens: 66.0, organization: 'OpenAI' },
    { model: 'Claude 3.5 Sonnet', both: 23.9, act: 36.7, jus: 33.5, sens: 61.2, organization: 'Anthropic' },
    { model: 'Gemini 1.5 Pro', both: 30.7, act: 37.3, jus: 34.8, sens: 64.0, organization: 'Google' },
    { model: 'Gemini 2.0 Thinking', both: 37.5, act: 46.3, jus: 42.1, sens: 58.8, organization: 'Google' },
    { model: 'o3-mini', both: 41.5, act: 45.7, jus: 45.2, sens: 65.0, organization: 'OpenAI' },
    { model: 'InternVL 2.5', both: 32.7, act: 40.9, jus: 38.0, sens: 62.5, organization: 'Shanghai AI Lab' },
    { model: 'Deepseek R1', both: 36.5, act: 42.9, jus: 40.0, sens: 61.0, organization: 'Deepseek' }
  ],
  video: [
    { model: 'Human', both: 92.4, act: 92.4, jus: 92.4, sens: 85.1, organization: 'Human' },
    { model: 'Claude 3.5 Sonnet', both: 36.0, act: 43.5, jus: 41.0, sens: 59.3, organization: 'Anthropic' },
    { model: 'Gemini 2.0 Flash', both: 38.9, act: 49.6, jus: 41.3, sens: 60.0, organization: 'Google' },
    { model: 'GPT-4o', both: 39.8, act: 45.1, jus: 44.8, sens: 59.6, organization: 'OpenAI' },
    { model: 'Gemini 1.5 Flash', both: 41.7, act: 46.5, jus: 44.3, sens: 54.4, organization: 'Google' },
    { model: 'Gemini 2.0 Thinking', both: 42.7, act: 51.7, jus: 45.3, sens: 57.3, organization: 'Google' },
    { model: 'Gemini 1.5 Pro', both: 45.3, act: 51.9, jus: 47.8, sens: 61.1, organization: 'Google' },
    { model: 'Llama 3.2', both: 2.2, act: 19.9, jus: 10.1, sens: 54.7, organization: 'Meta' },
    { model: 'InternVL 2.5', both: 15.1, act: 18.7, jus: 17.6, sens: 50.7, organization: 'Shanghai AI Lab' },
    { model: 'Qwen2.5 VL', both: 41.5, act: 48.3, jus: 43.8, sens: 62.8, organization: 'Alibaba' }
  ]
};

const LeaderboardTable = ({ entries }: { entries: Entry[] }) => {
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
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 opacity-50">
          <path d="M7 15l5 5 5-5"/>
          <path d="M7 9l5-5 5 5"/>
        </svg>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
        <path d="M7 11l5-5 5 5"/>
        <path d="M7 18l5-5 5 5"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
        <path d="M7 6l5 5 5-5"/>
        <path d="M7 13l5 5 5-5"/>
      </svg>
    );
  };

  return (
    <div className="rounded-md border dark:border-gray-700 overflow-x-auto">
      <table className="w-full caption-bottom">
        <thead className="[&_tr]:border-b [&_tr]:border-gray-200 dark:[&_tr]:border-gray-700">
          <tr className="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800">
            <th 
              className="h-12 px-3 sm:px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('model')}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="whitespace-nowrap">Model</span>
                {getSortIcon('model')}
              </div>
            </th>
            <th 
              className="h-12 px-2 sm:px-4 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('both')}
            >
              <div className="flex items-center justify-end gap-1 sm:gap-2">
                <span className="whitespace-nowrap text-xs sm:text-sm">Both (%)</span>
                {getSortIcon('both')}
              </div>
            </th>
            <th 
              className="h-12 px-2 sm:px-4 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('act')}
            >
              <div className="flex items-center justify-end gap-1 sm:gap-2">
                <span className="whitespace-nowrap text-xs sm:text-sm">Action (%)</span>
                {getSortIcon('act')}
              </div>
            </th>
            <th 
              className="h-12 px-2 sm:px-4 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('jus')}
            >
              <div className="flex items-center justify-end gap-1 sm:gap-2">
                <span className="whitespace-nowrap text-xs sm:text-sm">Just. (%)</span>
                {getSortIcon('jus')}
              </div>
            </th>
            <th 
              className="h-12 px-2 sm:px-4 text-right align-middle font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('sens')}
            >
              <div className="flex items-center justify-end gap-1 sm:gap-2">
                <span className="whitespace-nowrap text-xs sm:text-sm">Sens. (%)</span>
                {getSortIcon('sens')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {sortedEntries.map((entry, index) => (
            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800">
              <td className="p-2 sm:p-4 align-middle font-medium">
                <div className="flex items-center gap-2">
                  <OrganizationLogo name={entry.organization} />
                  <span className="dark:text-white text-sm sm:text-base">{entry.model}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-8">{entry.organization}</span>
              </td>
              <td className="p-2 sm:p-4 align-middle text-right dark:text-white text-sm sm:text-base">{entry.both.toFixed(1)}</td>
              <td className="p-2 sm:p-4 align-middle text-right dark:text-white text-sm sm:text-base">{entry.act.toFixed(1)}</td>
              <td className="p-2 sm:p-4 align-middle text-right dark:text-white text-sm sm:text-base">{entry.jus.toFixed(1)}</td>
              <td className="p-2 sm:p-4 align-middle text-right dark:text-white text-sm sm:text-base">{entry.sens.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-t-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 tracking-wider text-white font-['Orbitron']">EGONORMIA LEADERBOARD</h1>
          
          <div className="text-white mb-6 sm:mb-8">
            <div className="mb-3 sm:mb-4 text-base sm:text-lg">
              <a href="https://www2.cs.arizona.edu/~mhrezaei/" target="_blank" rel="noopener noreferrer" className="hover:underline">MohammadHossein Rezaei</a>*
              <span className="mx-2">·</span>
              <a href="https://sofyc.github.io" target="_blank" rel="noopener noreferrer" className="hover:underline">Yicheng Fu</a>*
              <span className="mx-2">·</span>
              <a href="https://scholar.google.com/citations?user=bDIUeu4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">Philippe Cuvin</a>*
            </div>
            
            <div className="text-base sm:text-lg">
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
              href="/articles" 
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-white text-[#1a1a1a] rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              <span role="img" aria-label="blog" className="text-xl">📝</span>
              Blog
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-b-lg shadow-lg">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex border dark:border-gray-700 rounded-md p-1">
            <button
              onClick={() => setActiveTab('blind')}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
                activeTab === 'blind'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Blind
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
                activeTab === 'pipeline'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
                activeTab === 'video'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Video
            </button>
          </div>
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