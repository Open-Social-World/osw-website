// app/blogs/utils.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "app/blogs");

export interface BlogFrontMatter {
  title?: string;
  description?: string;
  publishedDate?: string;
  author?: string;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  frontMatter: BlogFrontMatter;
  content: string;
  title: string;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(blogsDirectory, { withFileTypes: true });
  
  return entries
    .filter(entry => {
      if (!entry.isDirectory()) return false;
      const pagePath = path.join(blogsDirectory, entry.name, "page.mdx");
      return fs.existsSync(pagePath);
    })
    .map(entry => entry.name);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogsDirectory, slug, "page.mdx");

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  
  // Use gray-matter to parse potential frontmatter
  const { data, content } = matter(fileContents);
  
  // Extract title from the first h1 in the content if not in frontmatter
  let title = data.title;
  if (!title) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1] : slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  const frontMatter: BlogFrontMatter = {
    title: data.title,
    description: data.description,
    publishedDate: data.publishedDate,
    author: data.author,
    tags: data.tags,
  };

  return {
    slug,
    frontMatter,
    content,
    title,
  };
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const slugs = await getAllBlogSlugs();
  const blogs = await Promise.all(
    slugs.map(async (slug) => await getBlogBySlug(slug))
  );

  // Filter out null results and sort by date if available, otherwise by title
  return blogs
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => {
      // If both have dates, sort by date (newest first)
      if (a.frontMatter.publishedDate && b.frontMatter.publishedDate) {
        return new Date(b.frontMatter.publishedDate).getTime() - new Date(a.frontMatter.publishedDate).getTime();
      }
      // If only one has a date, prioritize the one with date
      if (a.frontMatter.publishedDate && !b.frontMatter.publishedDate) return -1;
      if (!a.frontMatter.publishedDate && b.frontMatter.publishedDate) return 1;
      // If neither has date, sort alphabetically by title
      return a.title.localeCompare(b.title);
    });
}

export function extractDescription(content: string, maxLength: number = 200): string {
  // Remove MDX imports and exports
  let cleanContent = content
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+.*$/gm, '')
    .replace(/export\s+default\s+function[\s\S]*$/m, '');
  
  // Remove markdown syntax and get plain text
  cleanContent = cleanContent
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italics
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .trim();

  // Get first meaningful paragraph
  const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 0);
  const description = paragraphs[0] || '';
  
  if (description.length <= maxLength) {
    return description;
  }
  
  return description.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}