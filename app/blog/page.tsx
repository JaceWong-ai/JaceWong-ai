import type { Metadata } from "next";
import Link from "next/link";
import { RevealWords } from "@/components/reveal-words";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Field notes by Jace Wong on artificial intelligence, philosophy, reading, investing, and the moving edge of possibility.",
};

export default function BlogPage() {
  return (
    <main className="blog-index-page">
      <SiteNav />
      <section className="blog-masthead">
        <div className="blog-masthead-top">
          <div className="section-index">
            <span>INDEX</span>
            <p>Field notes · Vol. I</p>
          </div>
          <p className="blog-coordinate">INTELLIGENCE / MEANING / TIME</p>
        </div>
        <h1>
          <RevealWords text="Notes from the" auto />
          <br />
          <em>
            <RevealWords text="moving edge." auto />
          </em>
        </h1>
        <div className="blog-masthead-bottom">
          <p>
            Essays and fragments on the technologies we build, the ideas that
            build us, and the futures hiding in plain sight.
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
        <div className="catalog-labels" aria-hidden="true">
          <span>No.</span>
          <span>Essay</span>
          <span>Reading time</span>
        </div>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className={`catalog-entry accent-${post.accent}`}
            key={post.slug}
          >
            <span className="catalog-number">{post.number}</span>
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

      <section className="blog-afterword">
        <p>Not a newsletter. Not a feed.</p>
        <h2>A public record of changing my mind.</h2>
        <Link href="/#connect" className="text-link">
          Keep the conversation going <i>↗</i>
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
