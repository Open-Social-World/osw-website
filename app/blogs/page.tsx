import Link from "next/link";
import { getAllBlogs, extractDescription } from "./utils";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blogs</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thoughts, insights, and reflections on life, technology, and everything in between.
          </p>
        </div>

        <div className="space-y-12">
          {blogs.map((blog) => {
            const description = blog.frontMatter.description || extractDescription(blog.content);
            const publishedDate = blog.frontMatter.publishedDate;
            
            return (
              <article key={blog.slug} className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start">
                  {/* Left column: Date */}
                  <div className="flex flex-row md:flex-col gap-4 md:gap-2 self-start">
                    {publishedDate && (
                      <time
                        dateTime={publishedDate}
                        className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400"
                      >
                        {new Date(publishedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>

                  {/* Right column: Blog content */}
                  <div className="flex-1 self-start">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="group-hover:text-blue-600 transition-colors"
                    >
                      <h2 className="text-2xl font-semibold mb-3">
                        {blog.title}
                      </h2>
                    </Link>

                    {blog.frontMatter.author && (
                      <div className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                        By {blog.frontMatter.author}
                      </div>
                    )}

                    {description && (
                      <p className="leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                        {description}
                      </p>
                    )}

                    {blog.frontMatter.tags && blog.frontMatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.frontMatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>

                {/* Bottom border */}
                <div className="absolute -bottom-6 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700" />
              </article>
            );
          })}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts found. Check back later for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}