import "@/app/inner.css";
import { BAND_SCENE_ID, SceneMount } from "@/components/home/SceneMount";
import type { BandStage } from "@/scene/terrain";

type Time = "night" | "morning" | "day";

/**
 * Header band for inner pages: a build-time still of the ridge at that hour, with the title on a solid panel.
 * With a `stage`, a live band of the same ridge (framed at that point on the trail) fades in over the still
 * after first paint; without one (legal pages, 404) the still is all there is and no scene code loads.
 */
export function PageBand({ time, title, kicker, stage }: { time: Time; title: string; kicker?: string; stage?: BandStage }) {
  return (
    <section id={stage ? BAND_SCENE_ID : undefined} className={`band band-${time}${stage ? " band-live" : ""}`}>
      <div className="band-art" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="band-still" src={`/stills/band-${time}.svg`} alt="" width="1440" height="324" />
        {stage ? <canvas className="band-gl" /> : null}
      </div>
      {/* early in the focus order, inside the space the band reserves for it */}
      {stage ? <SceneMount band={{ stage, time }} /> : null}
      <div className="wrap">
        <div className="band-panel">
          {kicker ? <p className="in-mono band-kicker">{kicker}</p> : null}
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
}
