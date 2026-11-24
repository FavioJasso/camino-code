import "./work.css";
import Link from "next/link";

/** One level of the trail, as breadcrumbList() in src/lib/structured-data.ts takes it. */
type Crumb = { name: string; path: string };

/**
 * The trail above a case study's first section: Home / Work / this study. The same markup as the
 * service pages' breadcrumb (src/app/services/[slug]/page.tsx): the levels above are links, the
 * page itself is text marked aria-current. Pass the trail the page also gives to breadcrumbList(),
 * so the visible trail and the structured data cannot drift apart.
 */
export function StudyCrumbs({ trail }: { trail: readonly Crumb[] }) {
  const current = trail[trail.length - 1];
  return (
    <nav className="in-crumbs in-mono" aria-label="Breadcrumb">
      <ol>
        {trail.slice(0, -1).map((level) => (
          <li key={level.path}>
            <Link href={level.path}>{level.name}</Link>
          </li>
        ))}
        <li aria-current="page">{current.name}</li>
      </ol>
    </nav>
  );
}
