'use client';

import { useEffect, useContext } from 'react';
import { FootnotesContext } from './footnotes-context';

interface FootnoteProps {
  id: string;
  children: React.ReactNode;
}

export function Footnote({ id, children }: FootnoteProps) {
  const { addFootnote } = useContext(FootnotesContext);

  // Register this footnote with the context when the component mounts
  useEffect(() => {
    addFootnote(id, children);
    // Cleanup when unmounting
    return () => {
      addFootnote(id, null);
    };
  }, [id, children, addFootnote]);

  const handleClick = () => {
    const target = document.getElementById(`footnote-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Add highlight effect
      target.classList.add('bg-yellow-100');
      setTimeout(() => target.classList.remove('bg-yellow-100'), 2000);
    }
  };

  return (
    <sup
      id={`footnote-ref-${id}`}
      className="cursor-pointer text-blue-600 hover:text-blue-800 ml-0.5"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`See footnote ${id}`}
    >
      [{id}]
    </sup>
  );
}
