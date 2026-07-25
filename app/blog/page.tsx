import type { Metadata } from "next";
import Link from "next/link";
import { RevealWords } from "@/components/reveal-words";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays by Jace Wong on artificial intelligence, technology, mathematics, philosophy, and reading.",
};

export default function BlogPage() {
  return (
    <main className="blog-index-page">
      <SiteNav />
      <section className="blog-masthead">
        <div className="blog-signal-grid" aria-hidden="true" />
        <div className="blog-masthead-top">
          <div className="section-index">
            <span>LOG</span>
            <p>Jace Wong · Writing</p>
          </div>
          <p className="blog-coordinate">AI / TECHNOLOGY / READING</p>
        </div>
        <h1>
          <RevealWords text="Blogs, in" auto />
          <br />
          <em>
            <RevealWords text="working form." auto delay={240} />
          </em>
        </h1>
        <div className="blog-masthead-bottom">
          <p>
            Notes on artificial intelligence, software, mathematics, and
            reading.
          </p>
          <span>{String(posts.length).padStart(2, "0")} entries</span>
        </div>
        <div className="blog-arc" aria-hidden="true">
          <i />
          <i />
          <span>J · W</span>
        </div>
      </section>

      <section className="blog-catalog">
        <header className="blog-catalog-heading">
          <p>Archive · newest first</p>
          <h2>Latest blogs</h2>
        </header>
        <div className="catalog-labels" aria-hidden="true">
          <span>Date</span>
          <span>Blog</span>
          <span>Reading time</span>
        </div>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className={`catalog-entry accent-${post.accent}`}
            key={post.slug}
          >
            <div className="catalog-date">
              <time dateTime={post.publishedAt}>{post.timelineDate}</time>
              <i aria-hidden="true" />
              <span>{post.number}</span>
            </div>
            <div className="catalog-title">
              <p>{post.category}</p>
              <h2>{post.title}</h2>
              <span>{post.dek}</span>
            </div>
            <div className="catalog-meta">
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
              <i>↗</i>
            </div>
            <div className="catalog-visual" aria-hidden="true">
              <i />
            </div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
