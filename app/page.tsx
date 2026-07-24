"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RevealWords } from "@/components/reveal-words";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { posts } from "@/lib/blog";

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  depth: number;
  phase: number;
};

const practices = [
  {
    number: "01",
    title: "Artificial intelligence",
    subtitle: "The medium",
    description:
      "I build with models, agents, and systems—not to automate the familiar, but to make new forms of thought and action possible.",
    signal: "BUILD / TEST / EXTEND",
  },
  {
    number: "02",
    title: "Philosophy",
    subtitle: "The compass",
    description:
      "Technology answers how. Philosophy keeps the harder questions alive: why this future, for whom, and what must remain human?",
    signal: "QUESTION / REFRAME / RETURN",
  },
  {
    number: "03",
    title: "Reading",
    subtitle: "The long input",
    description:
      "Books are a way to think with minds that move at a different speed. I read to expand the vocabulary of what can be imagined.",
    signal: "READ / ANNOTATE / CONNECT",
  },
  {
    number: "04",
    title: "Investing",
    subtitle: "The time horizon",
    description:
      "Investing is applied belief under uncertainty. I am interested in durable shifts, asymmetric ideas, and the discipline of patience.",
    signal: "NOTICE / WEIGH / COMPOUND",
  },
];

const questions = [
  {
    id: "01",
    question: "What happens when intelligence becomes abundant?",
    answer:
      "The scarce thing changes. Judgment, taste, trust, and the courage to choose a direction become more valuable than the ability to produce an answer.",
  },
  {
    id: "02",
    question: "Can tools expand us without quietly defining us?",
    answer:
      "Only if we keep examining their defaults. Every interface carries a philosophy; every optimization decides what should count.",
  },
  {
    id: "03",
    question: "How do we build for a future that refuses prediction?",
    answer:
      "By preferring adaptable systems, long time horizons, and reversible decisions—while holding a clear view of what should not be compromised.",
  },
];

function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const targetCanvas = canvasRef.current;
    if (!targetCanvas) return;
    const canvas: HTMLCanvasElement = targetCanvas;
    const targetContext = canvas.getContext("2d");
    if (!targetContext) return;
    const context: CanvasRenderingContext2D = targetContext;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const particles: Particle[] = Array.from({ length: 92 }, (_, index) => ({
      angle: (index / 92) * Math.PI * 2 + Math.random() * 0.15,
      radius: 0.12 + Math.pow(Math.random(), 0.72) * 0.42,
      speed: 0.0007 + Math.random() * 0.0018,
      size: 0.45 + Math.random() * 1.55,
      depth: 0.35 + Math.random() * 0.65,
      phase: Math.random() * Math.PI * 2,
    }));

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      pointer.tx = (event.clientX - bounds.left) / bounds.width;
      pointer.ty = (event.clientY - bounds.top) / bounds.height;
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.035;
      pointer.y += (pointer.ty - pointer.y) * 0.035;

      const dark = document.documentElement.dataset.theme === "dark";
      const centerX = width * (0.67 + (pointer.x - 0.5) * 0.025);
      const centerY = height * (0.47 + (pointer.y - 0.5) * 0.035);
      const scale = Math.min(width, height);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.13 + (pointer.x - 0.5) * 0.06);
      context.scale(1, 0.43);
      [0.19, 0.3, 0.415].forEach((radius, index) => {
        context.beginPath();
        context.arc(0, 0, scale * radius, 0, Math.PI * 2);
        context.strokeStyle = dark
          ? `rgba(182, 202, 255, ${0.12 - index * 0.018})`
          : `rgba(41, 36, 30, ${0.115 - index * 0.016})`;
        context.lineWidth = index === 1 ? 0.8 : 0.55;
        context.stroke();
      });
      context.restore();

      particles.forEach((particle, index) => {
        const movement = reducedMotion ? 0 : frame * particle.speed;
        const angle = particle.angle + movement;
        const pulse = Math.sin(frame * 0.008 + particle.phase) * 0.012;
        const radius = scale * (particle.radius + pulse);
        const x =
          centerX +
          Math.cos(angle) * radius +
          (pointer.x - 0.5) * 18 * particle.depth;
        const y =
          centerY +
          Math.sin(angle) * radius * 0.43 +
          (pointer.y - 0.5) * 12 * particle.depth;
        const alpha =
          0.16 + particle.depth * 0.55 + Math.sin(index + frame * 0.01) * 0.08;

        context.beginPath();
        context.arc(x, y, particle.size * particle.depth, 0, Math.PI * 2);
        context.fillStyle =
          index % 11 === 0
            ? dark
              ? `rgba(197, 255, 208, ${alpha})`
              : `rgba(59, 96, 68, ${alpha})`
            : dark
              ? `rgba(224, 228, 242, ${alpha})`
              : `rgba(37, 33, 29, ${alpha})`;
        context.fill();
      });

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        scale * 0.24,
      );
      glow.addColorStop(
        0,
        dark ? "rgba(146, 121, 255, .17)" : "rgba(129, 106, 255, .10)",
      );
      glow.addColorStop(0.55, dark ? "rgba(73, 180, 170, .06)" : "rgba(120, 184, 169, .045)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.fillRect(
        centerX - scale * 0.3,
        centerY - scale * 0.3,
        scale * 0.6,
        scale * 0.6,
      );

      frame += 1;
      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="field-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [openQuestion, setOpenQuestion] = useState("01");

  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    const updateScroll = () => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--scroll-progress",
        `${distance > 0 ? window.scrollY / distance : 0}`,
      );
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

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
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <main>
      <div className="pointer-aura" aria-hidden="true" />
      <div className="scroll-rail" aria-hidden="true">
        <span />
      </div>

      <section className="hero" id="top">
        <FieldCanvas />
        <div className="hero-grid" aria-hidden="true" />
        <SiteNav />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span>01</span>
              <p>AI practitioner · perennial student</p>
            </div>
            <h1>
              <span className="hero-line hero-line-one">
                <span className="hero-line-content">I work with</span>
              </span>
              <span className="hero-line hero-line-two">
                <strong className="hero-line-content">intelligence.</strong>
              </span>
              <span className="hero-line hero-line-three">
                <em className="hero-line-content">I live beyond it.</em>
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                I&apos;m <strong>Jace Wong</strong>—an AI practitioner exploring
                the border between what machines can do and what humans still
                need to ask.
              </p>
              <div className="hero-links">
                <a href="#practice" className="text-link">
                  Explore my practice <i>↘</i>
                </a>
                <Link href="/blog" className="text-link text-link-muted">
                  Read the field notes <i>↗</i>
                </Link>
              </div>
            </div>
          </div>

          <div className="orbit-system" aria-hidden="true">
            <div className="orbit-core">
              <span>∞</span>
              <i />
            </div>
            <div className="orbit orbit-one">
              <span>AI</span>
            </div>
            <div className="orbit orbit-two">
              <span>THOUGHT</span>
            </div>
            <div className="orbit orbit-three">
              <span>CAPITAL</span>
            </div>
            <p className="orbit-caption">
              <span>FIELD / 001</span>
              <span>Move your cursor</span>
            </p>
          </div>
        </div>

        <div className="hero-foot">
          <p>
            Currently following
            <span>where models end and meaning begins</span>
          </p>
          <div className="scroll-cue">
            <span>Scroll to wander</span>
            <i />
          </div>
        </div>
      </section>

      <div className="signal-ticker" aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, loop) => (
            <span key={loop}>
              Intelligence <i>✦</i> Systems <i>✦</i> Philosophy <i>✦</i>{" "}
              Reading <i>✦</i> Investing <i>✦</i> Frontier <i>✦</i>{" "}
            </span>
          ))}
        </div>
      </div>

      <section className="manifesto section-shell">
        <div className="section-index" data-reveal>
          <span>02</span>
          <p>A practice of attention</p>
        </div>
        <div className="manifesto-statement" data-reveal>
          <p className="manifesto-lead">
            <RevealWords text="AI is my medium," />{" "}
            <em>
              <RevealWords text="not my boundary." />
            </em>
          </p>
          <p className="manifesto-body">
            I&apos;m interested in the forces that quietly shape tomorrow:
            intelligence becoming abundant, attention becoming scarce, and
            long-term thinking becoming a form of rebellion.
          </p>
        </div>
        <div className="manifesto-aside" data-reveal>
          <span className="axis-line">
            <i />
          </span>
          <p>
            The work is to expand what is possible without shrinking what is
            meaningful.
          </p>
        </div>
      </section>

      <section className="practice section-shell" id="practice">
        <div className="section-heading" data-reveal>
          <div className="section-index">
            <span>03</span>
            <p>Fields of practice</p>
          </div>
          <h2>
            <RevealWords text="Four ways of looking" />
            <br />
            <RevealWords text="at the" />{" "}
            <em>
              <RevealWords text="same horizon." />
            </em>
          </h2>
        </div>

        <div className="practice-grid">
          {practices.map((practice) => (
            <article className="practice-card" key={practice.number} data-reveal>
              <div className="card-topline">
                <span>{practice.number}</span>
                <i />
                <p>{practice.subtitle}</p>
              </div>
              <h3>{practice.title}</h3>
              <p className="card-description">{practice.description}</p>
              <div className="card-signal">
                <span>{practice.signal}</span>
                <i>↗</i>
              </div>
              <div className="card-glow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="questions section-shell">
        <div className="questions-intro" data-reveal>
          <div className="section-index">
            <span>04</span>
            <p>Open questions</p>
          </div>
          <h2>
            <RevealWords text="I collect questions that resist becoming conclusions." />
          </h2>
          <p>
            A good question is not an empty space. It is an instrument for
            seeing.
          </p>
        </div>
        <div className="question-list" data-reveal>
          {questions.map((item) => {
            const open = openQuestion === item.id;
            return (
              <article className={open ? "question is-open" : "question"} key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenQuestion(open ? "" : item.id)}
                  aria-expanded={open}
                >
                  <span>{item.id}</span>
                  <h3>{item.question}</h3>
                  <i>{open ? "−" : "+"}</i>
                </button>
                <div className="question-answer">
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="writing section-shell" id="writing">
        <div className="section-heading writing-heading" data-reveal>
          <div className="section-index">
            <span>05</span>
            <p>Field notes</p>
          </div>
          <h2>
            <RevealWords text="Fragments from the" />
            <br />
            <em>
              <RevealWords text="moving edge." />
            </em>
          </h2>
          <Link href="/blog" className="round-link" aria-label="View all writing">
            <span>All writing</span>
            <i>↗</i>
          </Link>
        </div>

        <div className="post-list">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              className={`post-row accent-${post.accent}`}
              key={post.slug}
              data-reveal
            >
              <span className="post-number">{post.number}</span>
              <div className="post-main">
                <p>{post.category}</p>
                <h3>{post.title}</h3>
                <span>{post.dek}</span>
              </div>
              <div className="post-meta">
                <span>{post.readingTime}</span>
                <i>↗</i>
              </div>
              <div className="post-orb" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="contact section-shell" id="connect">
        <div className="contact-noise" aria-hidden="true" />
        <div className="section-index contact-index" data-reveal>
          <span>06</span>
          <p>An open channel</p>
        </div>
        <div className="contact-copy" data-reveal>
          <p>Have a question worth keeping?</p>
          <h2>
            <RevealWords text="If you're mapping an edge" />
            <br />
            <RevealWords text="I haven't seen," />{" "}
            <em>
              <RevealWords text="tell me." />
            </em>
          </h2>
          <a
            className="contact-link"
            href="https://github.com/JaceWong-ai"
            target="_blank"
            rel="noreferrer"
          >
            <span>Start a conversation on GitHub</span>
            <i>↗</i>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
