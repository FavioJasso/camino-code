import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { site } from "@/content/site";

/* Listed down two columns: the services on the left, the rest of the site on the right. */
const SITE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/services/software", label: "Software" },
  { href: "/services/data", label: "Data" },
  { href: "/services/ai-governance", label: "AI & governance" },
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
];

/* The page ends in Day on every route. The phone menu makes .site-foot inert while it is open. */
export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-id">
          <p className="foot-brand">
            <BrandMark tone="light" />
            <span>{site.name}</span>
          </p>
          <p>{site.contact.place}</p>
        </div>
        <nav className="foot-site" aria-label="Site">
          <h2>Site</h2>
          <ul className="foot-cols">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={site.contact.emailHref}>{site.contact.email}</a>
            </li>
            <li>
              <a className="nowrap" href={site.contact.phoneHref}>
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
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
