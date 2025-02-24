// app/articles/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";

type ArticleType = "PEER-REVIEWED" | "EDITORIAL" | "PREPRINT";

function ArticleBadge({ type }: { type: ArticleType }) {
  return <Badge>{type}</Badge>;
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-16">
          {articles.map((article) => {
            if (!article) return null;
            const { frontMatter, slug } = article;
            const date = new Date(frontMatter.publishedDate);

            return (
              <article key={slug} className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_300px] gap-8 items-start">
                  {/* Left column: Date and badges */}
                  <div className="flex flex-row md:flex-col gap-4 md:gap-2 self-start">
                    <time
                      dateTime={frontMatter.publishedDate}
                      className="text-sm whitespace-nowrap"
                    >
                      {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <div className="flex gap-2">
                      {frontMatter.type && (
                        <ArticleBadge type={frontMatter.type as ArticleType} />
                      )}
                    </div>
                  </div>

                  {/* Middle column: Article content */}
                  <div className="flex-1 self-start">
                    <Link
                      href={`/articles/${slug}`}
                      className="group-hover:text-blue-600 transition-colors"
                    >
                      <h2 className="text-2xl font-semibold mb-2">
                        {frontMatter.title}
                      </h2>
                    </Link>

                    {/* <div className="text-gray-700 mb-3">
                      {frontMatter.authors
                        ?.map((author) => author.name)
                        .join(", ")}
                    </div> */}

                    {frontMatter.description && (
                      <p className="leading-relaxed">
                        {frontMatter.description}
                      </p>
                    )}
                  </div>

                  {/* Right column: Figure */}
                  {frontMatter.image && (
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden self-start">
                      <Image
                        src={frontMatter.image.url}
                        alt={frontMatter.image.alt || ""}
                        fill
                        className="object-contain object-top"
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
      </div>
    </div>
  );
}
