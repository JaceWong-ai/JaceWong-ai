import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="footer-signature">
          Jace Wong
        </Link>
        <p>AI · Technology · Reading</p>
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
      <p className="footer-meta">© {new Date().getFullYear()}</p>
    </footer>
  );
}
