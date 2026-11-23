"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps the Back and Forward buttons working around jumps within a page ("#id" links, the skip link,
 * a hash typed into the address bar).
 *
 * The browser makes the history entry for such a jump itself, with no state on it, and Next's router
 * ignores a Back or Forward that arrives at an entry with no state: the address changes and the page
 * that was showing stays on screen. The same holds for the entry a page was opened on when a jump is
 * pressed before the page's scripts have run, because the router then writes its state onto the jump's
 * entry only.
 *
 * So this remembers the router's state for each address (path and query) while it is on show, and
 * whenever the visitor arrives at an entry of that address that has no state, copies it on. If another
 * page is showing at that moment (the router has just ignored the arrival), the arrival is announced
 * again with the state, and the router shows the right page.
 *
 * The links themselves stay plain anchors: the browser does the scrolling and the focus, and without
 * JavaScript nothing here runs or is needed.
 */

/** The router's state by address, most recent last. A handful of pages is all a visit needs. */
const states = new Map<string, unknown>();
const KEPT = 30;
/** The address whose page the router last showed, as far as this module has seen. */
let showing = "";

const address = () => window.location.pathname + window.location.search;

function remember() {
  const state: unknown = window.history.state;
  if (state === null) return;
  const here = address();
  states.delete(here);
  states.set(here, state);
  showing = here;
  if (states.size > KEPT) states.delete(states.keys().next().value as string);
}

function repair(event: Event) {
  if (window.history.state !== null) return remember();
  const here = address();
  const state = states.get(here);
  if (state === undefined) return;
  // Next passes a state that carries its own keys straight through to the browser
  window.history.replaceState(state, "", window.location.href);
  // a Back or Forward from another page to this entry: the router let it pass, so say it again with the state
  if (event.type === "popstate" && showing !== here) {
    window.dispatchEvent(new PopStateEvent("popstate", { state }));
  }
}

export function HistoryRepair() {
  const pathname = usePathname();

  // the router has written its state for this page by the time effects run
  useEffect(remember, [pathname]);

  useEffect(() => {
    // a press on any link, before the browser or the router acts on it: the state is read while it is still there
    document.addEventListener("click", remember, true);
    window.addEventListener("popstate", repair);
    window.addEventListener("hashchange", repair);
    return () => {
      document.removeEventListener("click", remember, true);
      window.removeEventListener("popstate", repair);
      window.removeEventListener("hashchange", repair);
    };
  }, []);

  return null;
}
