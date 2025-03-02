export interface Author {
  name: string;
  personalURL?: string;
  affiliation?: string;
  affiliationURL?: string;
}

export type ArticleType = "PEER-REVIEWED" | "EDITORIAL";

export interface FrontMatter {
  title: string;
  description?: string;
  authors?: Author[];
  publishedDate: string;
  doi?: string;
  type?: ArticleType;
  katex?: {
    [key: string]: any;
  };
  leaderboard_url?: string;
  paper_url?: string;
  code_url?: string;
  data_url?: string;
  citation_bib?: string;
  image?: {
    url: string;
    alt?: string;
    caption?: string;
  };
}

export interface Citation {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  url?: string;
  publisher?: string;
  type?: string;
}

export interface CitationProps {
  id: string;
  children?: React.ReactNode;
}

export interface BibliographyProps {
  citations: Map<string, Citation>;
}

export interface ArticleProps {
  frontMatter: FrontMatter;
}

// Component-specific props
export interface AbstractProps {
  children: React.ReactNode;
}

export interface FigureProps {
  src: string;
  darkSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string | React.ReactNode;
  className?: string;
}

export interface CitationProps {
  id: string;
  children?: React.ReactNode;
}

export interface MathProps {
  children: string;
  block?: boolean;
}

export interface CodeProps {
  children: string;
  language?: string;
  className?: string;
}
