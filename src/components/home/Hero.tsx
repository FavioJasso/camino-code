import Link from "next/link";

/* Task 5 mounts the live scene into #gl; #scene stays fixed behind the page. */
export function Scene() {
  return (
    <div id="scene" aria-hidden="true">
      <picture>
        <source media="(min-width: 900px)" srcSet="/stills/hero-desktop.svg" />
        <img src="/stills/hero-phone.svg" alt="" width="390" height="844" />
      </picture>
      <canvas id="gl" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-copy">
          <p className="mono eyebrow">Software · Data · AI consulting · Newark, NJ</p>
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
        </div>
      </div>
    </section>
  );
}
