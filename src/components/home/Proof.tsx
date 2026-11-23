import Link from "next/link";
import { transparentEnergy as te } from "@/content/proof";

export function Proof() {
  return (
    <section className="sec light" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="mono">
            <i>02</i> Proof{" "}
            <span className="t" aria-hidden="true">
              06:40 · Morning
            </span>
          </p>
          <h2 id="work-title">{te.name}</h2>
        </div>
        <ul className="proof-grid">
          {te.figures.map((f) => (
            <li className="fig" key={f.value}>
              <b>{f.value}</b>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
        <div className="proof-body">
          <div>
            <p>{te.summary}</p>
            <p className="proof-credit mono">{te.wording}</p>
          </div>
          <div className="proof-links">
            <Link className="link" href={te.href}>
              Read the case study
            </Link>
            <Link className="link" href="/work">
              See all work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
