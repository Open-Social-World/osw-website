// components/Footer.tsx
import Link from 'next/link';
import { FrontMatter } from '@/types/article';

interface FooterProps {
  frontMatter?: FrontMatter;
}

export default function Footer({ frontMatter }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Article Footer */}
      {frontMatter && (
        <div className="border-b border-gray-800">
          <div className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Citation Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Cite this article</h3>
                <div className="text-gray-400 text-sm">
                  {frontMatter.authors?.map(author => author.name).join(', ')} 
                  ({new Date(frontMatter.publishedDate || '').getFullYear()})
                  <br />
                  {frontMatter.title}
                  <br />
                  Open Social World 
                  {frontMatter.doi && (
                    <div className="mt-2">
                      DOI: <a 
                        href={`https://doi.org/${frontMatter.doi}`}
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {frontMatter.doi}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Options */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Downloads</h3>
                <div className="space-y-2">
                  <button className="block text-sm text-gray-400 hover:text-white">
                    PDF Version
                  </button>
                  <button className="block text-sm text-gray-400 hover:text-white">
                    BibTeX Citation
                  </button>
                  <button className="block text-sm text-gray-400 hover:text-white">
                    EndNote Citation
                  </button>
                </div>
              </div>

              {/* Article Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Open Science</h3>
                <div className="space-y-2">
                  <a 
                    href="#"
                    className="block text-sm text-gray-400 hover:text-white"
                  >
                    View Source Code
                  </a>
                  <a 
                    href="#"
                    className="block text-sm text-gray-400 hover:text-white"
                  >
                    View on GitHub
                  </a>
                  <a 
                    href="#"
                    className="block text-sm text-gray-400 hover:text-white"
                  >
                    Report an Issue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              Opening up the social world for AI agents. An initiative for creating open-source
              datasets, models, and evaluation benchmarks for AI agents that interact with humans.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link 
                href="/archive"
                className="block text-sm text-gray-400 hover:text-white"
              >
                Archive
              </Link>
              <Link 
                href="/about"
                className="block text-sm text-gray-400 hover:text-white"
              >
                About
              </Link>
              <Link 
                href="/submit"
                className="block text-sm text-gray-400 hover:text-white"
              >
                Submit
              </Link>
            </div>
          </div>

          {/* RSS & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow</h3>
            <div className="space-y-2">
              <a 
                href="/rss.xml"
                className="block text-sm text-gray-400 hover:text-white"
              >
                RSS Feed
              </a>
              <a 
                href="https://twitter.com/academic_journal"
                className="block text-sm text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a 
                href="https://github.com/academic_journal"
                className="block text-sm text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link 
                href="/terms"
                className="block text-sm text-gray-400 hover:text-white"
              >
                Terms of Use
              </Link>
              <Link 
                href="/privacy"
                className="block text-sm text-gray-400 hover:text-white"
              >
                Privacy Policy
              </Link>
              <p className="text-sm text-gray-400 mt-4">
                © {new Date().getFullYear()} Academic Journal.
                <br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}