import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <SiteNav />
      <div>
        <span>404 / UNMAPPED TERRITORY</span>
        <h1>
          This edge has
          <br />
          <em>moved elsewhere.</em>
        </h1>
        <Link href="/" className="text-link">
          Return to the known map <i>↙</i>
        </Link>
      </div>
    </main>
  );
}
