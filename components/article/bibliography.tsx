// components/article/Bibliography.tsx
'use client';

import { Citation } from '@/types/article';

export interface BibliographyProps {
  citations: Map<string, Citation>;
}

export function Bibliography({ citations }: BibliographyProps) {
  if (!citations || citations.size === 0) {
    return null;
  }

  const handleBackClick = (citationId: string) => {
    // Find all citation references in the text
    const elements = document.querySelectorAll(`[data-citation-id="${citationId}"]`);
    if (elements.length > 0) {
      // Scroll to the first instance of the citation
      elements[0].scrollIntoView({ behavior: 'smooth' });
      elements.forEach(element => {
        element.classList.add('bg-yellow-100');
        setTimeout(() => {
          element.classList.remove('bg-yellow-100');
        }, 2000);
      });
    }
  };

  const renderCitation = (citation: Citation) => {
    const authors = citation.authors.join(', ');
    const title = citation.title;
    const journal = citation.journal;
    const year = citation.year;
    
    let result = `${authors} (${year}). ${title}.`;
    
    if (citation.journal) {
      result += ` ${journal}`;
      if (citation.volume) {
        result += ` ${citation.volume}`;
        if (citation.number) {
          result += `(${citation.number})`;
        }
      }
      if (citation.pages) {
        result += `, ${citation.pages}`;
      }
      result += '.';
    }

    return (
      <div 
        key={citation.id} 
        id={`citation-${citation.id}`} 
        className="mb-4 py-2 px-3 -mx-3 rounded-lg transition-colors duration-300"
      >
        <p className="text-sm text-gray-700">
          <button
            onClick={() => handleBackClick(citation.id)}
            className="mr-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={`Return to citation in text`}
          >
            ↑
          </button>
          {result}
          {citation.doi && (
            <>
              {' '}DOI:{' '}
              <a
                href={`https://doi.org/${citation.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {citation.doi}
              </a>
            </>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold mb-6" id="references">References</h2>
      <div className="space-y-2">
        {Array.from(citations.values()).map(renderCitation)}
      </div>
    </div>
  );
}