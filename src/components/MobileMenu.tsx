"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { currentState } from "./NavLink";

type MenuLink = { href: string; label: string; sub?: MenuLink[] };

/* The header's order, with the three services listed under Services. */
const LINKS: MenuLink[] = [
  {
    href: "/services",
    label: "Services",
    sub: [
      { href: "/services/software", label: "Software" },
      { href: "/services/data", label: "Data" },
      { href: "/services/ai-governance", label: "AI & governance" },
    ],
  },
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
];

/**
 * Phone menu: shown when the header has no room for its links (under 900 px, or with large text; CSS).
 * The toggle stays above the panel and doubles as the close button.
 */
export function MobileMenu() {
  // the menu is open only on the page it was opened from, so navigating closes it
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenOn(next ? pathname : null),
    [pathname],
  );
  const button = useRef<HTMLButtonElement>(null);

  const close = useCallback(
    (returnFocus: boolean) => {
      setOpen(false);
      if (returnFocus) button.current?.focus();
    },
    [setOpen],
  );

  // while open: page behind is inert and does not scroll; Escape closes; widening past the phone layout closes
  useEffect(() => {
    if (!open) return;
    const behind = [
      document.getElementById("content"),
      document.querySelector(".site-foot"),
    ];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const wide = window.matchMedia("(min-width: 900px)");
    const onWide = () => wide.matches && close(false);
    // with large text the desktop row comes back at a width of its own: close once the button is gone
    const onResize = () => {
      if (button.current && getComputedStyle(button.current).display === "none") close(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    window.addEventListener("resize", onResize);
    return () => {
      behind.forEach((el) => el?.removeAttribute("inert"));
      document.documentElement.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  // a row with pages under it is current only on its own page: on one of those pages, that page's row carries the mark
  const item = (l: MenuLink) => (
    <Link
      href={l.href}
      aria-current={l.sub ? (pathname === l.href ? "page" : undefined) : currentState(pathname, l.href)}
      onClick={() => setOpen(false)}
    >
      {l.label}
    </Link>
  );

  return (
    <>
      <button
        ref={button}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <span className="menu-icon" aria-hidden="true">
          <i />
          <i />
        </span>
        <span className="sr-only">Menu</span>
      </button>
      <div id="mobile-menu" className="menu-panel on-dark" data-open={open}>
        <nav aria-label="Menu">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                {item(l)}
                {l.sub ? (
                  <ul className="menu-sub">
                    {l.sub.map((s) => (
                      <li key={s.href}>{item(s)}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <Link
          className="btn menu-cta"
          href="/discovery"
          aria-current={currentState(pathname, "/discovery")}
          onClick={() => setOpen(false)}
        >
          Book discovery
        </Link>
      </div>
    </>
  );
}
