import "@/app/inner.css";

type Time = "night" | "morning" | "day";

/** Header band for inner pages: a build-time still of the ridge at that hour, with the title on a solid panel. */
export function PageBand({ time, title, kicker }: { time: Time; title: string; kicker?: string }) {
  return (
    <section className={`band band-${time}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="band-still" src={`/stills/band-${time}.svg`} alt="" width="1440" height="324" />
      <div className="wrap">
        <div className="band-panel">
          {kicker ? <p className="in-mono band-kicker">{kicker}</p> : null}
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
}
