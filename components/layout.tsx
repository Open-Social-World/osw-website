// components/Layout.tsx
import Head from 'next/head';
import { FrontMatter } from '@/types/article'
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
  frontMatter?: FrontMatter;
}

export default function Layout({ children, frontMatter }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{frontMatter?.title || 'Academic Article'}</title>
      </Head>

      <Header frontMatter={frontMatter} />

      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <article className="prose prose-lg max-w-none">
          {children}
        </article>
      </main>

      <Footer frontMatter={frontMatter} />
    </div>
  );
}