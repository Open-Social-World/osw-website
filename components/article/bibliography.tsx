'use client';

import { useState } from 'react';
import { Citation } from '@/types/article';

export interface BibliographyProps {
  citations: Map<string, Citation>;
}

function getBibTeX(citation: Citation): string {
  const type = citation.type || 'article';
  let bibtex = `@${type}{${citation.id},\n`;
  bibtex += `  title = {${citation.title}},\n`;
  bibtex += `  author = {${citation.authors.join(' and ')}},\n`;
  bibtex += `  year = {${citation.year}}`;
  
  if (citation.journal) bibtex += `,\n  journal = {${citation.journal}}`;
  if (citation.volume) bibtex += `,\n  volume = {${citation.volume}}`;
  if (citation.number) bibtex += `,\n  number = {${citation.number}}`;
  if (citation.pages) bibtex += `,\n  pages = {${citation.pages}}`;
  if (citation.doi) bibtex += `,\n  doi = {${citation.doi}}`;
  if (citation.publisher) bibtex += `,\n  publisher = {${citation.publisher}}`;
  
  bibtex += '\n}';
  return bibtex;
}

export function Bibliography({ citations }: BibliographyProps) {
  const [showBibtex, setShowBibtex] = useState<string | null>(null);

  if (!citations || citations.size === 0) {
    return null;
  }

  const handleBackClick = (citationId: string) => {
    const elements = document.querySelectorAll(`[data-citation-id="${citationId}"]`);
    if (elements.length > 0) {
      elements[0].scrollIntoView({ behavior: 'smooth' });
      elements.forEach(element => {
        element.classList.add('bg-yellow-100');
        setTimeout(() => element.classList.remove('bg-yellow-100'), 2000);
      });
    }
  };

  const handleCopyBibtex = async (bibtex: string) => {
    await navigator.clipboard.writeText(bibtex);
  };

  const renderCitation = (citation: Citation) => {
    const bibtex = getBibTeX(citation);
    const authors = citation.authors.join(', ');
    const title = citation.title;
    const journal = citation.journal;
    const year = citation.year;
    
    let result = `${authors} (${year}). ${title}.`;
    if (journal) {
      result += ` ${journal}`;
      if (citation.volume) {
        result += ` ${citation.volume}`;
        if (citation.number) result += `(${citation.number})`;
      }
      if (citation.pages) result += `, ${citation.pages}`;
      result += '.';
    }

    return (
      <div key={citation.id} id={`citation-${citation.id}`} className="mb-6 py-2">
        <div className="flex items-start gap-2">
          <button
            onClick={() => handleBackClick(citation.id)}
            className="mt-1 text-gray-400 hover:text-gray-600"
            aria-label="Return to citation in text"
          >
            ↑
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-700">{result}</p>
            {citation.doi && (
              <p className="mt-1 text-sm">
                DOI:{' '}
                <a
                  href={`https://doi.org/${citation.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {citation.doi}
                </a>
              </p>
            )}
            <div className="mt-2">
              <button
                onClick={() => setShowBibtex(showBibtex === citation.id ? null : citation.id)}
                className="text-sm text-blue-600 hover:underline mr-4"
              >
                {showBibtex === citation.id ? 'Hide BibTeX' : 'Show BibTeX'}
              </button>
              <button
                onClick={() => handleCopyBibtex(bibtex)}
                className="text-sm text-blue-600 hover:underline"
              >
                Copy BibTeX
              </button>
            </div>
            {showBibtex === citation.id && (
              <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-sm overflow-x-auto">
                {bibtex}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold mb-6" id="references">References</h2>
      <div>
        {Array.from(citations.values()).map(renderCitation)}
      </div>
    </div>
  );
}