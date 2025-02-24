// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/layout';
// import { Abstract, Math, Figure, Citation, Code, Bibliography } from '@/components/article';
import { Abstract } from '@/components/article/abstract';
import { Math } from '@/components/article/math';
import { Figure } from '@/components/article/figure';
import { Citation } from '@/components/article/citation';
import { Code } from '@/components/article/code';
import { Bibliography } from '@/components/article/bibliography';
import { Footnote, FootnotesList, FootnotesProvider } from '@/components/article/footnotes';
import { ArticleCitation } from '@/components/article/article-citation';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';
import { getCitationsForArticle, sortCitations } from '@/lib/bibliography';
import { Citation as CitationType } from '@/types/article';
import VideoVisualizer from '@/components/VideoVisualizer';

interface HTMLComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

// Create a Bibliography wrapper component that has access to citations
function BibliographyWrapper({ citations }: { citations: Map<string, CitationType> }) {
  const sortedCitations = sortCitations(citations);
  return <Bibliography citations={sortedCitations} />;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  // Get only the citations used in this article
  const citations = await getCitationsForArticle(article.content);

  // Define components with access to citations
  const components = {
    Abstract,
    Math,
    Figure,
    Citation: (props: { id: string }) => (
      <span data-citation-id={props.id}>
        <Citation {...props} citation={citations.get(props.id)} />
      </span>
    ),
    Code,
    Bibliography: () => <BibliographyWrapper citations={citations} />,
    VideoVisualizer,
    h1: ({ children, className, ...props }: HTMLComponentProps) => (
      <h1 className={`text-4xl font-bold mt-8 mb-4 ${className || ''}`} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }: HTMLComponentProps) => (
      <h2 className={`text-3xl font-bold mt-8 mb-4 ${className || ''}`} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }: HTMLComponentProps) => (
      <h3 className={`text-2xl font-bold mt-6 mb-3 ${className || ''}`} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, className, ...props }: HTMLComponentProps) => (
      <h4 className={`text-xl font-bold mt-4 mb-2 ${className || ''}`} {...props}>
        {children}
      </h4>
    ),
    
    // List components with proper types
    ul: ({ children, className, ...props }: HTMLComponentProps) => (
      <ul 
        className={`list-disc list-outside pl-6 my-6 space-y-2 ${className || ''}`} 
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }: HTMLComponentProps) => (
      <ol 
        className={`list-decimal list-outside pl-6 my-6 space-y-2 ${className || ''}`} 
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }: HTMLComponentProps) => (
      <li 
        className={`pl-2 marker:text-gray-500 ${className || ''}`} 
        {...props}
      >
        {children}
      </li>
    )
  };


  return (
    <Layout frontMatter={article.frontMatter}>
      <FootnotesProvider>
        <article className="max-w-4xl prose lg:prose-lg mx-auto">
          <MDXRemote 
            source={article.content}
            components={{
              ...components,
              Footnote
            }}
          />
          <FootnotesList />
          <ArticleCitation frontMatter={article.frontMatter} />
        </article>
      </FootnotesProvider>
    </Layout>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const { frontMatter } = article;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    authors: frontMatter.authors?.map(author => ({
      name: author.name,
      url: author.personalURL,
    })),
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      type: 'article',
      publishedTime: frontMatter.publishedDate,
      authors: frontMatter.authors?.map(author => author.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontMatter.title,
      description: frontMatter.description,
    },
    // Add any article-specific schema.org metadata
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
  };
}