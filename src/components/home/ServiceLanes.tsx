import Link from "next/link";
import { services } from "@/content/services";

export function ServiceLanes() {
  return (
    <section className="sec on-dark" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="mono">
            <i>01</i> Services{" "}
            <span className="t" aria-hidden="true">
              06:10 · Before dawn
            </span>
          </p>
          <h2 id="services-title">What we do</h2>
        </div>
        <ul className="lanes">
          {services.map((s, i) => (
            <li className="lane" key={s.slug}>
              <span className="mono" aria-hidden="true">
                {String.fromCharCode(65 + i)}
              </span>
              <h3>{s.name}</h3>
              <div className="lane-body">
                <p>{s.line}</p>
                {/* the one link in the row, worded as on /services; home.css stretches it over the whole row */}
                <Link className="link lane-link" href={s.href}>
                  Read about {s.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
