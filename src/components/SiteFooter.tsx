import Link from "next/link";

const SITE_LINKS = [
  { href: "/services/software", label: "Software" },
  { href: "/services/data", label: "Data" },
  { href: "/services/ai-governance", label: "AI & governance" },
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="site-foot on-dark">
      <div className="wrap">
        <div>
          <h2>Camino Code</h2>
          <p>Newark, New Jersey</p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>contact@caminocode.com</p>
          <p>+1 973-234-2073</p>
        </div>
        <nav aria-label="Site">
          <h2>Site</h2>
          <ul>
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2>Legal</h2>
          <ul>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
