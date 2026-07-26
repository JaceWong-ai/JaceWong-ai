import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/article-content";
import { ArticleToc, type TocItem } from "@/components/article-toc";
import { RevealWords } from "@/components/reveal-words";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { draftPosts, getPost, headingId, posts } from "@/lib/blog";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...posts, ...draftPosts].map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((entry) => entry.slug === slug);
  const nextPost = posts[(currentIndex + 1) % posts.length];
  const tocItems: TocItem[] = post.blocks.flatMap((block) =>
    block.type === "heading"
      ? [{ id: headingId(block.text), label: block.text }]
      : [],
  );
  if (post.references.length) {
    tocItems.push({ id: "references", label: "References" });
  }

  return (
    <main className={`article-page accent-${post.accent}`}>
      <SiteNav />
      <article>
        <header className="article-header">
          <div className="blog-signal-grid" aria-hidden="true" />
          <Link href="/blog" className="article-back-link">
            ← All blogs
          </Link>
          <div className="article-kicker">
            <span>{post.category}</span>
            <time dateTime={post.publishedAt}>{post.date}</time>
            <span>{post.readingTime} read</span>
          </div>
          <h1>
            <RevealWords text={post.title} auto />
          </h1>
          <p className="article-dek">{post.dek}</p>
          <div className="article-emblem" aria-hidden="true">
            <i />
            <i />
          </div>
        </header>

        <div className="article-layout">
          <ArticleToc items={tocItems} />
          <ArticleContent post={post} />
        </div>

        <footer className="article-end">
          <p>Continue reading</p>
          <Link href={`/blog/${nextPost.slug}`}>
            <h2>{nextPost.title}</h2>
            <i>↗</i>
          </Link>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}
