"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PlanetField } from "@/components/planet-field";
import { RevealWords } from "@/components/reveal-words";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SymbolStream } from "@/components/symbol-stream";
import { posts } from "@/lib/blog";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-words]")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-v2">
      <section className="home-hero">
        <PlanetField />
        <SymbolStream />
        <SiteNav />

        <div className="home-hero-copy">
          <div className="home-introduction">
            <h1>
              <RevealWords text="Essays and experiments" auto />
              <br />
              <RevealWords text="on intelligence." auto delay={240} />
            </h1>
            <p>
              Hi, I&apos;m Jace, and this is my blog. I write about AI,
              <em>software, mathematics,</em> and the books that shape how I
              think.
            </p>
          </div>

          <div className="home-notebook">
            <p>
              Each piece aims to make difficult ideas easier to explore through
              clear writing, <em>visualizations,</em> and small{" "}
              <em>interactive experiments.</em>
            </p>
            <Link href="/blog">
              Read the essays <span>↘</span>
            </Link>
          </div>
        </div>

        <div className="home-scroll-note" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <section className="home-writing" id="writing">
        <header data-reveal>
          <div>
            <p>Writing</p>
            <span>AI · Technology · Reading</span>
          </div>
          <h2>Latest blogs</h2>
          <Link href="/blog">All writing ↗</Link>
        </header>

        <div className="home-posts">
          {posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              className={`home-post accent-${post.accent}`}
              key={post.slug}
              data-reveal
            >
              <div className="home-post-timeline" aria-label={post.date}>
                <time dateTime={post.publishedAt}>{post.timelineDate}</time>
                <i aria-hidden="true" />
                <span>{post.number}</span>
              </div>
              <div>
                <p>{post.category}</p>
                <h3>
                  <RevealWords text={post.title} delay={index * 90} />
                </h3>
              </div>
              <div className="home-post-meta">
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
                <i>↗</i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
