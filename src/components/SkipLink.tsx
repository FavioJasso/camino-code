"use client";

import type { MouseEvent } from "react";

/**
 * The skip link moves keyboard focus into main in every browser, not only the scroll position
 * (the GOV.UK skip-link pattern). Main is focusable only for that moment: a main that always
 * carries tabindex="-1" takes focus on any click on page text, and the next Tab then starts
 * again from the top of main instead of from where the visitor clicked.
 */
function focusTarget(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById(event.currentTarget.hash.slice(1));
  if (!target) return;
  target.setAttribute("tabindex", "-1");
  target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  target.focus();
}

export function SkipLink() {
  return (
    <a className="skip-link" href="#content" onClick={focusTarget}>
      Skip to content
    </a>
  );
}
