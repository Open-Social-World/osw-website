import Head from "next/head";
import { FrontMatter } from "@/types/article";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
  frontMatter?: FrontMatter;
}

export default function Layout({ children, frontMatter }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>{frontMatter?.title || "Academic Article"}</title>
      </Head>

      <Header frontMatter={frontMatter} />

      <main className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Remove the prose class from here */}
        <article className="w-full overflow-x-hidden">{children}</article>
      </main>

      <Footer frontMatter={frontMatter} />
    </div>
  );
}
