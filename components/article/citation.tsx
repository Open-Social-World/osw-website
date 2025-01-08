// components/article/Citation.tsx
'use client';

import { Citation as CitationType } from '@/types/article';

export interface CitationProps {
  id: string;
  citation?: CitationType;
  children?: React.ReactNode;
}

export function Citation({ id, citation, children }: CitationProps) {
  if (!citation) {
    console.warn(`Citation with id "${id}" not found`);
    return <span>[?]</span>;
  }

  const handleClick = () => {
    const element = document.getElementById(`citation-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Add a brief highlight effect
      element.classList.add('bg-yellow-100');
      setTimeout(() => {
        element.classList.remove('bg-yellow-100');
      }, 2000);
    }
  };

  return (
    <span className="citation inline-flex items-baseline">
      <sup>
        <button 
          onClick={handleClick}
          className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors px-0.5 text-base"
          aria-label={`Jump to reference ${id}`}
        >
          [{citation.authors[0].split(',')[0].trim()} et al., {citation.year}]
        </button>
      </sup>
      {children}
    </span>
  );
}