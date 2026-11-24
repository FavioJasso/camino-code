import { site } from "@/content/site";

/*
 * The published email and phone as real links, so a visitor can tap to write or call.
 * The visible text is exactly site.contact.email and site.contact.phone. The link targets
 * come from site.contact too (the tel: value is the phone number in E.164 form), so the
 * footer and these links can never disagree. Use them inside an inner-page section
 * (inner.css draws the underline there).
 */
export const EMAIL_HREF = site.contact.emailHref;
export const PHONE_HREF = site.contact.phoneHref;

export function EmailLink() {
  return (
    <a href={EMAIL_HREF}>{site.contact.email}</a>
  );
}

export function PhoneLink() {
  return (
    <a className="nowrap" href={PHONE_HREF}>
      {site.contact.phone}
    </a>
  );
}
