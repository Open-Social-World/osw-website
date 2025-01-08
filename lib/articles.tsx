// lib/articles.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FrontMatter } from '@/types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function getAllArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  const frontMatter: FrontMatter = {
    title: data.title,
    description: data.description,
    authors: data.authors,
    publishedDate: data.publishedDate,
    doi: data.doi,
    image: data.image,
    katex: data.katex
  };

  return {
    slug,
    frontMatter,
    content
  };
}

export async function getAllArticles() {
  const slugs = await getAllArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async slug => await getArticleBySlug(slug))
  );

  // Sort articles by date
  return articles
    .filter(article => article !== null)
    .sort((a, b) => {
      if (!a || !b) return 0;
      return new Date(b.frontMatter.publishedDate).getTime() - 
             new Date(a.frontMatter.publishedDate).getTime();
    });
}