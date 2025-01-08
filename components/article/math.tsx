"use client";
import { useEffect, useRef } from 'react';
import katex from 'katex';
import { MathProps } from '@/types/article';
import 'katex/dist/katex.min.css';

export function Math({ children, block = false }: MathProps) {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mathRef.current && typeof children === 'string') {
      try {
        katex.render(children, mathRef.current, {
          throwOnError: false,
          displayMode: block,
          strict: false
        });
      } catch (error) {
        console.error('KaTeX error:', error);
      }
    }
  }, [children, block]);

  return (
    <span 
      ref={mathRef} 
      className={`${block ? 'block my-4 text-center' : 'inline'}`}
    />
  );
}