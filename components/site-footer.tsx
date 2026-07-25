import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="footer-signature">
          Jace Wong
        </Link>
        <p>AI, ideas, and long horizons.</p>
      </div>
      <div className="footer-links">
        <Link href="/blog">Writing</Link>
        <a
          href="https://github.com/JaceWong-ai"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </div>
      <p className="footer-meta">© {new Date().getFullYear()} · Made with attention</p>
    </footer>
  );
}
