// app/articles/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/articles';

import Header from '@/components/header';
import Footer from '@/components/footer';

type ArticleType = 'PEER-REVIEWED' | 'EDITORIAL';

const badgeStyles: Record<ArticleType, string> = {
  'PEER-REVIEWED': "bg-gray-700 text-white",
  'EDITORIAL': "bg-white border border-gray-300 text-gray-700"
};

function ArticleBadge({ type }: { type: ArticleType }) {
  const baseClasses = "px-2 py-1 text-xs font-medium tracking-wide uppercase";
  const styleClass = badgeStyles[type];

  return (
    <span className={`${baseClasses} ${styleClass}`}>
      {type}
    </span>
  );
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-16">
          {articles.map(article => {
            if (!article) return null;
            const { frontMatter, slug } = article;
            const date = new Date(frontMatter.publishedDate);
            
            return (
              <article key={slug} className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_300px] gap-8">
                  {/* Left column: Date and badges */}
                  <div className="flex flex-row md:flex-col gap-4 md:gap-2">
                    <time 
                      dateTime={frontMatter.publishedDate}
                      className="text-sm text-gray-500 whitespace-nowrap"
                    >
                      {date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <div className="flex gap-2">
                      {frontMatter.type && (
                        <ArticleBadge type={frontMatter.type as ArticleType} />
                      )}
                    </div>
                  </div>

                  {/* Middle column: Article content */}
                  <div className="flex-1">
                    <Link 
                      href={`/articles/${slug}`}
                      className="group-hover:text-blue-600 transition-colors"
                    >
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        {frontMatter.title}
                      </h2>
                    </Link>

                    <div className="text-gray-700 mb-3">
                      {frontMatter.authors?.map(author => author.name).join(', ')}
                    </div>

                    {frontMatter.description && (
                      <p className="text-gray-600 leading-relaxed">
                        {frontMatter.description}
                      </p>
                    )}
                  </div>

                  {/* Right column: Figure */}
                  {frontMatter.image && (
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                          src={frontMatter.image.url}
                          alt={frontMatter.image.alt || ''}
                          fill
                          className="object-contain"
                        />
                      </div>
                  )}
                </div>

                {/* Bottom border */}
                <div className="absolute -bottom-8 left-0 right-0 h-px bg-gray-200" />
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}