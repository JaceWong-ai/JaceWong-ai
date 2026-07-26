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
        </div>
        <div className="blog-arc" aria-hidden="true">
          <i />
          <i />
        </div>
      </section>

      <section className="blog-catalog">
        <header className="blog-catalog-heading">
          <h2>Latest blogs</h2>
        </header>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className={`catalog-entry accent-${post.accent}`}
            key={post.slug}
          >
            <div className="catalog-date">
              <time dateTime={post.publishedAt}>{post.timelineDate}</time>
              <i aria-hidden="true" />
            </div>
            <div className="catalog-title">
              <p>{post.category}</p>
              <h2>{post.title}</h2>
              <span>{post.dek}</span>
            </div>
            <div className="catalog-meta">
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
