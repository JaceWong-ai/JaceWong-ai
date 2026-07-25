import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/article-content";
import { RevealWords } from "@/components/reveal-words";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getPost, posts } from "@/lib/blog";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
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

  return (
    <main className={`article-page accent-${post.accent}`}>
      <SiteNav />
      <article>
        <header className="article-header">
          <div className="blog-signal-grid" aria-hidden="true" />
          <div className="article-breadcrumb">
            <Link href="/blog">Blogs</Link>
            <span>/</span>
            <p>{post.number}</p>
          </div>
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
            <span>{post.number}</span>
          </div>
          <div className="article-scroll-note">
            <span>Begin</span>
            <i />
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-aside">
            <p>Blog / {post.number}</p>
            <span>Written by Jace Wong</span>
            <span>Published {post.date}</span>
            <i />
          </aside>
          <ArticleContent post={post} />
          <aside className="article-progress" aria-hidden="true">
            <span>01</span>
            <i />
            <span>{String(post.blocks.length).padStart(2, "0")}</span>
          </aside>
        </div>

        <footer className="article-end">
          <p>Continue reading</p>
          <Link href={`/blog/${nextPost.slug}`}>
            <span>{nextPost.number}</span>
            <h2>{nextPost.title}</h2>
            <i>↗</i>
          </Link>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}
