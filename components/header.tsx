import Link from 'next/link';
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
      {/* Top Navigation Bar */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm md:text-xl font-semibold hover:text-gray-300">
              Open Social World
            </Link>
            <div className="flex space-x-6">
              <Link href="/articles" className="hover:text-gray-300">
                Articles
              </Link>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
              <Link href="/submit" className="hover:text-gray-300">
                Submit
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header with Hero Image */}
      {frontMatter && (
        <div className="bg-white border-b">
          
          
          <div className="max-w-screen-xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
              {/* Title and Description */}
              <div>
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  {frontMatter.title}
                </h1>
                {frontMatter.description && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {frontMatter.description}
                  </p>
                )}
                {formattedDate && (
                  <p className="mt-4 text-gray-500">
                    Published: {formattedDate}
                  </p>
                )}
                {frontMatter.image && (
                  <div className="w-full mt-4">
                    <div className="max-w-screen-xl mx-auto px-4">
                      <div className="relative aspect-[21/9] w-full">
                        <Image
                          src={frontMatter.image.url}
                          alt={frontMatter.image.alt || frontMatter.title}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      {frontMatter.image.caption && (
                        <p className="text-sm text-gray-600 mt-2 text-center pb-4">
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
                  <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-4">
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
                          <div className="text-sm text-gray-600">
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