import fs from 'fs';
import path from 'path';
import bibtexParse from 'bibtex-parse-js';
import { Citation } from '@/types/article';

let bibliographyCache: Map<string, Citation> | null = null;

export async function getAllCitations(): Promise<Map<string, Citation>> {
  // Return cached bibliography if available
  if (bibliographyCache) {
    return bibliographyCache;
  }

  const bibPath = path.join(process.cwd(), 'content', 'bibliography.bib');
  const bibtex = fs.readFileSync(bibPath, 'utf8');
  const entries = bibtexParse.toJSON(bibtex);
  
  bibliographyCache = new Map(
    entries.map(entry => {
      const citation: Citation = {
        id: entry.citationKey,
        title: entry.entryTags.title?.replace(/[{}]/g, '') || '',
        authors: (entry.entryTags.author || '').split(' and ').map(author => author.trim()),
        journal: entry.entryTags.journal || entry.entryTags.booktitle || '',
        year: entry.entryTags.year || '',
        volume: entry.entryTags.volume,
        number: entry.entryTags.number,
        pages: entry.entryTags.pages,
        doi: entry.entryTags.doi,
        url: entry.entryTags.url,
        publisher: entry.entryTags.publisher,
        type: entry.entryType // 'article', 'book', 'inproceedings', etc.
      };
      return [entry.citationKey, citation];
    })
  );

  return bibliographyCache;
}

export async function getCitationsForArticle(content: string): Promise<Map<string, Citation>> {
  const allCitations = await getAllCitations();
  const citationKeys = collectCitations(content);
  
  // Create a new map with only the citations used in this article
  const articleCitations = new Map();
  citationKeys.forEach(key => {
    if (allCitations.has(key)) {
      articleCitations.set(key, allCitations.get(key));
    } else {
      console.warn(`Citation key not found in bibliography: ${key}`);
    }
  });

  return articleCitations;
}

export function collectCitations(content: string): string[] {
  const citations = new Set<string>();
  // Match both MDX and JSX citation patterns
  const citationRegex = /<Citation\s+id=["']([^"']+)["']/g;
  let match;

  while ((match = citationRegex.exec(content)) !== null) {
    citations.add(match[1]);
  }

  return Array.from(citations).sort();
}

// Helper function to format citations
export function formatCitation(citation: Citation): string {
  const authors = citation.authors.map(author => {
    const parts = author.split(',');
    if (parts.length === 2) {
      return `${parts[1].trim()} ${parts[0].trim()}`;
    }
    return author;
  });

  const authorStr = authors.length > 2 
    ? `${authors[0]} et al.`
    : authors.join(' & ');

  let result = `${authorStr} (${citation.year})`;

  if (citation.title) {
    result += `. ${citation.title}`;
  }

  if (citation.journal) {
    result += `. ${citation.journal}`;
    if (citation.volume) {
      result += ` ${citation.volume}`;
      if (citation.number) {
        result += `(${citation.number})`;
      }
    }
    if (citation.pages) {
      result += `, ${citation.pages}`;
    }
  } else if (citation.publisher) {
    result += `. ${citation.publisher}`;
  }

  return result + '.';
}

// Helper function to sort citations
export function sortCitations(citations: Map<string, Citation>): Map<string, Citation> {
  return new Map(
    [...citations.entries()].sort((a, b) => {
      // Sort by first author's last name, then year
      const aLastName = a[1].authors[0].split(',')[0].trim();
      const bLastName = b[1].authors[0].split(',')[0].trim();
      if (aLastName === bLastName) {
        return parseInt(b[1].year) - parseInt(a[1].year);
      }
      return aLastName.localeCompare(bLastName);
    })
  );
}