"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PlanetField } from "@/components/planet-field";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { posts } from "@/lib/blog";

const focusAreas = [
  "AI systems",
  "Philosophy of technology",
  "Reading & learning",
  "Investing",
];

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
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-v2">
      <section className="home-hero">
        <PlanetField />
        <SiteNav />

        <div className="home-hero-copy">
          <div className="home-introduction">
            <p className="home-name">Jace Wong</p>
            <h1>
              AI, systems, and the
              <br />
              questions around them.
            </h1>
            <p>
              I build with artificial intelligence and study how it changes
              the way we think, decide, and create.
            </p>
          </div>

          <div className="home-notebook">
            <p>
              This is my public notebook—essays, research notes, and ideas in
              progress across technology, philosophy, reading, and capital.
            </p>
            <Link href="/blog">
              Read the writing <span>↗</span>
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
            <p>Selected writing</p>
            <span>Essays & notes</span>
          </div>
          <h2>Ideas, made public.</h2>
          <Link href="/blog">View all ↗</Link>
        </header>

        <div className="home-posts">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              className={`home-post accent-${post.accent}`}
              key={post.slug}
              data-reveal
            >
              <span className="home-post-number">{post.number}</span>
              <div>
                <p>{post.category}</p>
                <h3>{post.title}</h3>
                <span>{post.dek}</span>
              </div>
              <div className="home-post-meta">
                <span>{post.readingTime}</span>
                <i>↗</i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-about" id="about">
        <div className="home-about-label" data-reveal>
          <span>About</span>
          <i />
        </div>

        <div className="home-about-copy" data-reveal>
          <h2>
            I work with AI.
            <br />
            <em>I think beyond the model.</em>
          </h2>
          <p>
            I&apos;m Jace Wong, an AI practitioner interested in the systems
            behind intelligence and the human choices around it. My work and
            writing follow one question: what becomes possible—and what becomes
            important—when intelligence is abundant?
          </p>
        </div>

        <div className="home-focus" data-reveal>
          {focusAreas.map((area, index) => (
            <div key={area}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{area}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-contact" id="connect">
        <p data-reveal>Connect</p>
        <div data-reveal>
          <h2>Elsewhere on the web.</h2>
          <a
            href="https://github.com/JaceWong-ai"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span>↗</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
