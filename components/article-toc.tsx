"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

type ArticleTocProps = {
  items: TocItem[];
};

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const triggerLine = window.innerHeight * 0.3;
      let nextActive = items[0]?.id ?? "";

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= triggerLine) {
          nextActive = item.id;
        } else {
          break;
        }
      }

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 24
      ) {
        nextActive = items.at(-1)?.id ?? nextActive;
      }

      setActiveId((current) =>
        current === nextActive ? current : nextActive,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [items]);

  useEffect(() => {
    const nav = navRef.current;
    const activeLink = nav?.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`,
    );
    if (!nav || !activeLink) return;

    nav.scrollTo({
      left: Math.max(
        0,
        activeLink.offsetLeft - nav.clientWidth / 2 + activeLink.clientWidth / 2,
      ),
      behavior: "smooth",
    });
  }, [activeId]);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );
  const progress = items.length > 1 ? activeIndex / (items.length - 1) : 1;

  return (
    <aside
      className="article-toc"
      aria-label="Table of contents"
      style={{ "--toc-progress": progress } as CSSProperties}
    >
      <div className="article-toc-inner">
        <p>Contents</p>
        <span className="toc-track" aria-hidden="true">
          <i />
        </span>
        <nav ref={navRef}>
          {items.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              data-toc-id={item.id}
              className={item.id === activeId ? "is-active" : undefined}
              aria-current={item.id === activeId ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
            >
              <i aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
