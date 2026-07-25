"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const frame = requestAnimationFrame(() => setTheme(current));
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("jace-theme", next);
  }

  const links = [
    { label: "Index", href: "/" },
    { label: "Writing", href: "/blog" },
    { label: "About", href: "/#about" },
  ];

  return (
    <header className="site-header">
      <Link
        href="/"
        className="brand-mark"
        aria-label="Jace Wong — home"
        onClick={() => setMenuOpen(false)}
      >
        <span>JW</span>
        <i aria-hidden="true" />
      </Link>

      <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
        {links.map((link) => {
          const active =
            link.href === "/blog"
              ? pathname.startsWith("/blog")
              : pathname === "/" && link.href === "/";
          return (
            <Link
              key={link.label}
              href={link.href}
              className={active ? "is-active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="theme-orbit" aria-hidden="true">
            <i />
          </span>
          <span>{theme === "light" ? "Nocturne" : "Daylight"}</span>
        </button>
        <button
          className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
