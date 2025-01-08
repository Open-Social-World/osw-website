'use client';

import { createContext, useState, useCallback, ReactNode } from 'react';

interface FootnotesContextType {
  footnotes: Map<string, ReactNode>;
  addFootnote: (id: string, content: ReactNode | null) => void;
}

export const FootnotesContext = createContext<FootnotesContextType>({
  footnotes: new Map(),
  addFootnote: () => {},
});

interface FootnotesProviderProps {
  children: ReactNode;
}

export function FootnotesProvider({ children }: FootnotesProviderProps) {
  const [footnotes, setFootnotes] = useState<Map<string, ReactNode>>(new Map());

  const addFootnote = useCallback((id: string, content: ReactNode | null) => {
    setFootnotes(prev => {
      const next = new Map(prev);
      if (content === null) {
        next.delete(id);
      } else {
        next.set(id, content);
      }
      return next;
    });
  }, []);

  return (
    <FootnotesContext.Provider value={{ footnotes, addFootnote }}>
      {children}
    </FootnotesContext.Provider>
  );
}