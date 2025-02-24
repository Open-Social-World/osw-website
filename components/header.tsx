import Image from 'next/image';
import { FrontMatter } from '@/types/article';

interface HeaderProps {
  frontMatter?: FrontMatter;
}

export default function Header({ frontMatter }: HeaderProps) {
  const formattedDate = frontMatter?.publishedDate 
    ? new Date(frontMatter.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <header>

      {/* Article Header with Hero Image */}
      {frontMatter && (
        <div className="border-b">
          
          
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
              {/* Title and Description */}
              <div>
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  {frontMatter.title}
                </h1>
                {frontMatter.description && (
                  <p className="text-xl leading-relaxed">
                    {frontMatter.description}
                  </p>
                )}
                {formattedDate && (
                  <p className="mt-4 ">
                    Published: {formattedDate}
                  </p>
                )}
                {frontMatter.image && (
                  <div className="w-full mt-4">
                    <div className="max-w-screen-xl mx-auto px-4">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={frontMatter.image.url}
                          alt={frontMatter.image.alt || frontMatter.title}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      {frontMatter.image.caption && (
                        <p className="text-sm  mt-2 text-center pb-4">
                          {frontMatter.image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Authors */}
              {frontMatter.authors && frontMatter.authors.length > 0 && (
                <div className="lg:border-l lg:pl-8">
                  <h2 className="text-sm uppercase tracking-wider font-medium mb-4">
                    Authors
                  </h2>
                  <div className="space-y-6">
                    {frontMatter.authors.map((author, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-medium">
                          {author.personalURL ? (
                            <a 
                              href={author.personalURL}
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {author.name}
                            </a>
                          ) : (
                            author.name
                          )}
                        </div>
                        {author.affiliation && (
                          <div className="text-sm ">
                            {author.affiliationURL ? (
                              <a 
                                href={author.affiliationURL}
                                className="hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {author.affiliation}
                              </a>
                            ) : (
                              author.affiliation
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}