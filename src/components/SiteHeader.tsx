import Link from "next/link";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-head on-dark">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Camino Code home">
          <svg viewBox="0 0 26 30" aria-hidden="true" fill="none">
            <path
              d="M3 27 L22 22 L6 16 L20 10 L13 5"
              stroke="var(--haze)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle cx="13" cy="4" r="3" fill="var(--ember)" />
          </svg>
          <span>Camino Code</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn" href="/discovery">
          Book discovery
        </Link>
      </div>
    </header>
  );
}
