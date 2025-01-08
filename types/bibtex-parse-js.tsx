declare module 'bibtex-parse-js' {
    interface BibtexEntry {
      citationKey: string;
      entryType: string;
      entryTags: {
        title?: string;
        author?: string;
        journal?: string;
        booktitle?: string;
        year?: string;
        volume?: string;
        number?: string;
        pages?: string;
        doi?: string;
        url?: string;
        publisher?: string;
        [key: string]: string | undefined;
      };
    }
  
    function toJSON(input: string): BibtexEntry[];
  
    export { toJSON, BibtexEntry };
}