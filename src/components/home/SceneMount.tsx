"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneHandle } from "@/scene/scene";

const PAUSE_KEY = "camino:motion-paused";

function readPaused(): boolean {
  try {
    return sessionStorage.getItem(PAUSE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Elements that carry text: the Motion control must never sit over one. */
const TEXT_TAGS = new Set(["A", "BUTTON", "P", "H1", "H2", "H3", "H4", "LI", "DT", "DD", "SPAN", "EM", "STRONG", "SMALL", "LABEL", "FIGCAPTION", "BLOCKQUOTE"]);

/**
 * The control shows only while the scene is what fills the bottom of the viewport (the hero area, or the
 * sunrise window covering the bottom edge) and no text lies under it. Elsewhere there is nothing to pause.
 */
function controlFits(button: HTMLElement): boolean {
  const vh = innerHeight;
  const services = document.getElementById("services");
  const dawn = document.getElementById("dawn-window");
  const heroArea = !services || services.getBoundingClientRect().top >= vh;
  const d = dawn?.getBoundingClientRect();
  const sunrise = !!d && d.top < vh - 80 && d.bottom >= vh;
  if (!heroArea && !sunrise) return false;
  const r = button.getBoundingClientRect();
  const pad = 8;
  for (const fx of [0, 0.5, 1]) {
    for (const fy of [0, 0.5, 1]) {
      const x = r.left - pad + fx * (r.width + 2 * pad);
      const y = r.top - pad + fy * (r.height + 2 * pad);
      for (const el of document.elementsFromPoint(x, y)) {
        if (el === button || button.contains(el)) continue;
        if (TEXT_TAGS.has(el.tagName)) return false;
        break; // only the topmost element under the control matters
      }
    }
  }
  return true;
}

/**
 * Starts the live scene after first paint, unless the visitor prefers reduced motion (the scene code
 * is then never loaded). Renders the Motion control only while the scene is live.
 */
export function SceneMount() {
  const handle = useRef<SceneHandle | null>(null);
  const button = useRef<HTMLButtonElement | null>(null);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [away, setAway] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.getElementById("scene");
    if (!root) return;
    let cancelled = false;
    const initialPaused = readPaused();

    const start = () => {
      import("@/scene/scene")
        .then(({ startScene }) => {
          if (cancelled) return;
          setPaused(initialPaused);
          handle.current = startScene(root, { paused: initialPaused, onLive: setLive });
        })
        .catch(() => {
          // the still stays: nothing else to do
        });
    };
    const idle = "requestIdleCallback" in window;
    const id = idle ? requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      if (idle) cancelIdleCallback(id);
      else window.clearTimeout(id);
      handle.current?.destroy();
      handle.current = null;
      setLive(false);
    };
  }, []);

  // keep the control out of the way of text while the page scrolls
  useEffect(() => {
    if (!live) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      if (button.current) setAway(!controlFits(button.current));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [live]);

  if (!live) return null;

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    handle.current?.setPaused(next);
    try {
      sessionStorage.setItem(PAUSE_KEY, next ? "1" : "0");
    } catch {
      // private mode: the choice lasts for this page only
    }
  };

  return (
    <button
      ref={button}
      type="button"
      className={away ? "motion-toggle is-away" : "motion-toggle"}
      aria-pressed={paused}
      onClick={toggle}
    >
      Pause animation
    </button>
  );
}
