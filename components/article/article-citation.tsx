'use client';

import { useState } from 'react';
import { FrontMatter } from '@/types/article';

interface ArticleCitationProps {
  frontMatter: FrontMatter;
}

export function ArticleCitation({ frontMatter }: ArticleCitationProps) {
  const [showBibtex, setShowBibtex] = useState(false);

  const year = new Date(frontMatter.publishedDate).getFullYear();
  const authors = frontMatter.authors?.map(author => author.name).join(', ');
  
  // Create bibtex entry
  const bibtex = `@article{${frontMatter.doi?.split('/').pop() || 'citation'},
  title     = {${frontMatter.title}},
  author    = {${frontMatter.authors?.map(author => author.name).join(' and ')}},
  journal   = {Open Social World},
  year      = {${year}},${frontMatter.doi ? `\n  doi       = {${frontMatter.doi}},` : ''}
  publisher = {Open Social World}
}`;

  const handleCopyBibtex = async () => {
    await navigator.clipboard.writeText(bibtex);
  };

  return (
    <div className="mt-16 mb-16 border-t border-b border-gray-200 py-8">
      <h2 className="text-2xl font-bold mb-4">Cite this article</h2>
      <p className="text-gray-700 mb-2">
        {authors} ({year}). {frontMatter.title}. Open Social World.
        {frontMatter.doi && (
          <>
            {' '}DOI:{' '}
            <a
              href={`https://doi.org/${frontMatter.doi}`}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {frontMatter.doi}
            </a>
          </>
        )}
      </p>
      
      <div className="mt-4">
        <button
          onClick={() => setShowBibtex(!showBibtex)}
          className="text-blue-600 hover:underline mr-4"
        >
          {showBibtex ? 'Hide BibTeX' : 'Show BibTeX'}
        </button>
        <button
          onClick={handleCopyBibtex}
          className="text-blue-600 hover:underline"
        >
          Copy BibTeX
        </button>
      </div>

      {showBibtex && (
        <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-sm overflow-x-auto font-mono">
          {bibtex}
        </pre>
      )}
    </div>
  );
}