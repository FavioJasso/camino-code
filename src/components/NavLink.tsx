"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * aria-current for a navigation link: "page" on the link to the page being viewed,
 * "true" on the link to the section that page sits in (Work while reading a case study).
 */
export function currentState(pathname: string | null, href: string): "page" | "true" | undefined {
  if (!pathname) return undefined;
  if (pathname === href) return "page";
  return href !== "/" && pathname.startsWith(`${href}/`) ? "true" : undefined;
}

/** A next/link that marks itself as current. Style the state with the [aria-current] selector. */
export function NavLink({ href, ...rest }: Omit<ComponentProps<typeof Link>, "href" | "aria-current"> & { href: string }) {
  const pathname = usePathname();
  return <Link href={href} aria-current={currentState(pathname, href)} {...rest} />;
}
