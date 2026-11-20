import Link from "next/link";
import { transparentEnergy as te } from "@/content/proof";

/* SceneMount starts the live scene in #gl and draws its readouts into #scene-ui; #scene stays fixed behind the page. */
export function Scene() {
  return (
    <div id="scene" aria-hidden="true">
      <picture>
        <source media="(min-width: 900px)" srcSet="/stills/hero-desktop.svg" />
        <img src="/stills/hero-phone.svg" alt="" width="390" height="844" />
      </picture>
      <canvas id="gl" />
      <div id="scene-ui" className="scene-ui" />
    </div>
  );
}

/* The proof line under the actions: the first permitted Transparent Energy figure, read from the proof data. */
const headline = te.figures[0];

export function Hero() {
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-copy">
          {/* one line where it fits; on narrow phones the place takes a line of its own (home.css) */}
          <p className="mono eyebrow">
            <span>
              Software · Data · AI consulting
              <span className="eyebrow-dot">{" · "}</span>
              <span className="eyebrow-place">Newark, NJ</span>
            </span>
          </p>
          <h1 id="hero-title">Be on the trail before your competitors wake up.</h1>
          <p className="lead">
            We bring data, AI and the rules to run them safely into small and
            mid-sized businesses. It starts with a free discovery session.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-lg" href="/discovery">
              Book a discovery session
            </Link>
            <a className="link" href="#work">
              See what it did for Transparent Energy
            </a>
          </div>
          <p className="hero-proof">
            <b>{headline.value}</b>{" "}
            <span>
              {headline.label} · {te.name}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
