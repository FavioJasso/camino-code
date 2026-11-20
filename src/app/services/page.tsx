import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { proofBlocks } from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { servicePages, servicesIndex } from "@/content/service-pages";
import { services } from "@/content/services";
import { breadcrumbList } from "@/lib/structured-data";
import "./services.css";

export const metadata = pageMetadata({
  title: servicesIndex.title,
  description: servicesIndex.description,
  path: "/services",
});

export default function ServicesPage() {
  // Only services whose own page shows a case study appear under "Case studies"; the rest make no proof claim.
  const proofs = services.flatMap((service) => {
    const key = servicePages[service.slug].proof;
    return key ? [{ service, proof: proofBlocks[key] }] : [];
  });

  return (
    <>
      <PageBand stage={1} time="night" title="Services" />
      <section className="inner-sec in-dark on-dark in-intro">
        <div className="wrap">
          <p className="in-lead">{servicesIndex.intro}</p>
        </div>
      </section>
      {/* in-still: this section is at the bottom of the window when the page loads, so it does not fade in */}
      <section className="inner-sec in-light in-still" aria-labelledby="services-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> Services
          </p>
          <h2 id="services-title">What we do</h2>
          <ul className="in-svc-list">
            {services.map((service, i) => (
              <li className="in-svc" key={service.slug}>
                <span className="in-mono in-svc-key" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <h3>{service.name}</h3>
                <div className="in-svc-body">
                  <p>{service.line}</p>
                  <p className="in-svc-when">
                    <span className="in-mono">For when</span> {servicePages[service.slug].problems[0]}
                  </p>
                  <Link className="in-link" href={service.href}>
                    Read about {service.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="fit-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> Together
          </p>
          <h2 id="fit-title">How they fit together</h2>
          <p className="in-lead">{servicesIndex.fitLead}</p>
          <ol className="steps in-facts-gap">
            {servicesIndex.fit.map((f) => (
              <li key={f.name}>
                <div>
                  <h3>{f.name}</h3>
                  <p>{f.line}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="in-credit-gap">{servicesIndex.fitNote}</p>
          <Link className="in-link" href="/approach">
            See how we work
          </Link>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="proof-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> Proof
          </p>
          <h2 id="proof-title">Case studies</h2>
          <ul className="in-svc-proofs">
            {proofs.map(({ service, proof }) => (
              <li className="in-svc-proof" key={service.slug}>
                <p className="in-mono">{service.name}</p>
                <h3>{proof.name}</h3>
                <p className="in-svc-fig">
                  <b>{proof.figures[0].value}</b> {proof.figures[0].label}
                </p>
                <p>{proof.summary}</p>
                <p className="in-mono credit">{proof.wording}</p>
                <Link className="in-link" href={proof.href}>
                  Read the {proof.name} case study
                </Link>
              </li>
            ))}
          </ul>
          <Link className="in-link" href="/work">
            See all work
          </Link>
        </div>
      </section>
      <BookDiscovery />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
