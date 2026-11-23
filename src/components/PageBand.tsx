import "@/app/inner.css";
import type { Ref } from "react";
import { BAND_SCENE_ID, SceneMount } from "@/components/home/SceneMount";
import { BAND_LAYOUT_MIN, type BandStage } from "@/scene/terrain";

type Time = "night" | "morning" | "day";

/**
 * Header band for inner pages: a build-time still of the ridge at that hour, with the title on a solid panel.
 * With a `stage`, a live band of the same ridge (framed at that point on the trail) fades in over the still
 * after first paint; without one (legal pages, 404) the still is all there is and no scene code loads.
 */
export function PageBand({
  time,
  title,
  kicker,
  stage,
  lazyStill,
  titleRef,
}: {
  time: Time;
  title: string;
  kicker?: string;
  stage?: BandStage;
  /** For the 404 screen, which Next carries inside every page's payload: a lazy image is not preloaded site-wide. */
  lazyStill?: boolean;
  /** Lets a page move focus to its title (the error pages do, when they replace a page that failed). */
  titleRef?: Ref<HTMLHeadingElement>;
}) {
  return (
    <section id={stage ? BAND_SCENE_ID : undefined} className={`band band-${time}${stage ? " band-live" : ""}`}>
      <div className="band-art" aria-hidden="true">
        {stage ? (
          // the stills are framed exactly as the live band (scripts/render-stills.ts), so the canvas fades in without a jump
          <picture>
            <source media={`(min-width: ${BAND_LAYOUT_MIN.desktop}px)`} srcSet={`/stills/band-s${stage}-${time}-desktop.svg`} />
            <source media={`(min-width: ${BAND_LAYOUT_MIN.tablet}px)`} srcSet={`/stills/band-s${stage}-${time}-tablet.svg`} />
            <img className="band-still" src={`/stills/band-s${stage}-${time}-phone.svg`} alt="" width="390" height="250" />
          </picture>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="band-still"
            src={`/stills/band-${time}.svg`}
            alt=""
            width="1440"
            height="324"
            loading={lazyStill ? "lazy" : undefined}
          />
        )}
        {stage ? <canvas className="band-gl" /> : null}
      </div>
      {/* early in the focus order, inside the space the band reserves for it */}
      {stage ? <SceneMount band={{ stage, time }} /> : null}
      <div className="wrap">
        <div className="band-panel">
          {kicker ? <p className="in-mono band-kicker">{kicker}</p> : null}
          <h1 ref={titleRef} tabIndex={titleRef ? -1 : undefined}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
