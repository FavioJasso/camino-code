import Link from "next/link";
import { services } from "@/content/services";

export function ServiceLanes() {
  return (
    <section className="sec on-dark" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="mono">
            <i>01</i> Services
          </p>
          <h2 id="services-title">What we do</h2>
        </div>
        <ul className="lanes">
          {services.map((s, i) => (
            <li className="lane" key={s.slug}>
              <span className="mono" aria-hidden="true">
                {String.fromCharCode(65 + i)}
              </span>
              <h3>
                <Link href={s.href}>{s.name}</Link>
              </h3>
              <p>{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
