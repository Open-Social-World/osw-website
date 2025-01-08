'use client';

import { useContext } from 'react';
import { FootnotesContext } from './footnotes-context';

export function FootnotesList() {
  const { footnotes } = useContext(FootnotesContext);
  
  // If there are no footnotes, don't render the section
  if (!footnotes.size) {
    return null;
  }

  const handleBackClick = (id: string) => {
    const ref = document.getElementById(`footnote-ref-${id}`);
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
      ref.classList.add('bg-yellow-100');
      setTimeout(() => ref.classList.remove('bg-yellow-100'), 2000);
    }
  };

  // Sort footnotes by their numeric ID
  const sortedFootnotes = Array.from(footnotes.entries())
    .sort(([a], [b]) => parseInt(a) - parseInt(b));

  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Footnotes</h2>
      <div className="space-y-4">
        {sortedFootnotes.map(([id, content]) => (
          <div
            key={id}
            id={`footnote-${id}`}
            className="group flex gap-2 text-sm transition-colors duration-300 rounded-lg p-2 -mx-2"
          >
            <button
              onClick={() => handleBackClick(id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={`Return to footnote ${id} in text`}
            >
              ↑
            </button>
            <div className="flex-1">
              <span className="font-medium">{id}.</span>{' '}
              <span className="text-gray-700">{content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}