import { FounderPhoto } from "@/components/FounderPhoto";

export function Founder() {
  return (
    <section className="sec light day" id="founder" aria-labelledby="founder-title">
      <div className="wrap founder">
        <FounderPhoto className="portrait" sizes="(max-width: 599px) 160px, 176px" />
        <div>
          <p className="mono">
            <i>03</i> Founder
          </p>
          <h2 id="founder-title">Favio Jasso, founder</h2>
          <p>
            Favio founded Camino Code in Newark, New Jersey, and led the build
            for Transparent Energy.
          </p>
          <p>
            He works with small and mid-sized businesses on data, software and
            AI, one stage at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
