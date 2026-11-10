import Link from "next/link";

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
