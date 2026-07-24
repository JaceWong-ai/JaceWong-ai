import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
          <div className="article-breadcrumb">
            <Link href="/blog">Writing</Link>
            <span>/</span>
            <p>{post.number}</p>
          </div>
          <div className="article-kicker">
            <span>{post.category}</span>
            <span>{post.date}</span>
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
            <p>Field note / {post.number}</p>
            <span>Written by Jace Wong</span>
            <i />
          </aside>
          <div className="article-body">
            {post.blocks.map((block, index) => {
              if (block.type === "heading") {
                return <h2 key={index}>{block.text}</h2>;
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={index}>
                    <span>“</span>
                    {block.text}
                  </blockquote>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>
          <aside className="article-progress" aria-hidden="true">
            <span>01</span>
            <i />
            <span>{String(post.blocks.length).padStart(2, "0")}</span>
          </aside>
        </div>

        <footer className="article-end">
          <p>Next field note</p>
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
