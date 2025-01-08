// types/gray-matter.d.ts
declare module 'gray-matter' {
    interface GrayMatterFile<T = any> {
      data: T;
      content: string;
      excerpt?: string;
      orig: Buffer | string;
      language?: string;
      matter?: string;
      stringify(): string;
    }
  
    type InstanceOptions = {
      excerpt?: boolean | ((input: string) => string);
      excerpt_separator?: string;
      engines?: Record<string, any>;
      language?: string;
      delimiters?: string | [string, string];
    };
  
    function matter(
      input: string | Buffer,
      options?: InstanceOptions
    ): GrayMatterFile;
  
    export = matter;
  }