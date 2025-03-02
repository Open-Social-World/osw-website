// app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
// import { Abstract, Math, Figure, Citation, Code, Bibliography } from '@/components/article';
import { Abstract } from "@/components/article/abstract";
import { Math } from "@/components/article/math";
import { Figure } from "@/components/article/figure";
import { Citation } from "@/components/article/citation";
import { Code } from "@/components/article/code";
import { Bibliography } from "@/components/article/bibliography";
import {
  Footnote,
  FootnotesList,
  FootnotesProvider,
} from "@/components/article/footnotes";
import { ArticleCitation } from "@/components/article/article-citation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import { getCitationsForArticle, sortCitations } from "@/lib/bibliography";
import { Citation as CitationType } from "@/types/article";
import VideoVisualizer from "@/components/egonormia/VideoVisualizer";
import FailureModeCharts from "@/components/egonormia/FailureModeCharts";
import TeaserVideo from "@/components/egonormia/TeaserVideo";
import NormTaxonomy from '@/components/egonormia/NormTaxonomy';
import ExampleMCQ from '@/components/egonormia/ExampleMCQ';
import NormThinkerResult from '@/components/egonormia/NormThinkerResult';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FloatingToolbar from "@/components/toolbar/floating-toolbar";
import { Callout } from "@/components/callout";
import Header from "@/components/header";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import EmphasizedSpan from "@/components/article/emphasis";

interface HTMLComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

// Create a Bibliography wrapper component that has access to citations
function BibliographyWrapper({
  citations,
}: {
  citations: Map<string, CitationType>;
}) {
  const sortedCitations = sortCitations(citations);
  return <Bibliography citations={sortedCitations} />;
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
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
    Image,
    Citation: (props: { id: string }) => (
      <span data-citation-id={props.id}>
        <Citation {...props} citation={citations.get(props.id)} />
      </span>
    ),
    Code,
    Bibliography: () => <BibliographyWrapper citations={citations} />,
    VideoVisualizer,
    FailureModeCharts,
    TeaserVideo,
    NormTaxonomy,
    ExampleMCQ,
    NormThinkerResult,
    Link,
    Button,
    Callout,
    ArrowDown,
    EmphasizedSpan,
    h1: ({ children, className, ...props }: HTMLComponentProps) => (
      <h1
        className={`text-2xl text-primary font-bold mt-8 mb-4 ${className || ""}`}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }: HTMLComponentProps) => (
      <h2
        className={`text-xl text-primary font-bold mt-8 mb-4 ${className || ""}`}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }: HTMLComponentProps) => (
      <h3
        className={`text-lg text-primary mt-6 mb-3 ${className || ""}`}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, className, ...props }: HTMLComponentProps) => (
      <h4
        className={`text-md font-bold mt-4 mb-2 ${className || ""}`}
        {...props}
      >
        {children}
      </h4>
    ),

    // List components with proper types
    ul: ({ children, className, ...props }: HTMLComponentProps) => (
      <ul
        className={`list-disc list-outside pl-6 my-6 space-y-2 ${className || ""}`}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }: HTMLComponentProps) => (
      <ol
        className={`list-decimal list-outside pl-6 my-6 space-y-2 ${className || ""}`}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }: HTMLComponentProps) => (
      <li className={`pl-2 marker:text-gray-500 ${className || ""}`} {...props}>
        {children}
      </li>
    ),
  };

  return (
    <>
      <Header frontMatter={article.frontMatter} />
      <FootnotesProvider>
        <div className="max-w-2xl mx-auto px-8 py-12 text-muted-foreground">
          <MDXRemote
            source={article.content}
            components={{
              ...components,
              Footnote,
            }}
          />
          <FootnotesList />
          <ArticleCitation frontMatter={article.frontMatter} />
          <FloatingToolbar
            leaderboard_url={article.frontMatter.leaderboard_url}
            code_url={article.frontMatter.code_url}
            data_url={article.frontMatter.data_url}
            paper_url={article.frontMatter.paper_url}
            citation_bib={article.frontMatter.citation_bib}
          />
        </div>
      </FootnotesProvider>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const { frontMatter } = article;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    authors: frontMatter.authors?.map((author) => ({
      name: author.name,
      url: author.personalURL,
    })),
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      url: `https://opensocial.world/articles/${params.slug}`,
      type: "article",
      publishedTime: frontMatter.publishedDate,
      authors: frontMatter.authors?.map((author) => author.name),
      images: [
        {
          url: frontMatter.image?.url 
            ? `https://opensocial.world${frontMatter.image.url}` 
            : "https://opensocial.world/images/psn/teaser.jpeg",
          width: 1200,
          height: 630,
          alt: frontMatter.image?.alt || frontMatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.description,
      images: [
        frontMatter.image?.url 
          ? `https://opensocial.world${frontMatter.image.url}` 
          : "https://opensocial.world/images/psn/teaser.jpeg"
      ],
    },
    // Add any article-specific schema.org metadata
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
  };
}
