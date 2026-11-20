import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-head on-dark">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Camino Code home">
          <BrandMark />
          <span>Camino Code</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="btn" href="/discovery">
          Book discovery
        </NavLink>
        <MobileMenu />
      </div>
    </header>
  );
}
