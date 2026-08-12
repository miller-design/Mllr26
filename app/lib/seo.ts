/**
 * Centralised SEO / Open Graph copy.
 *
 * Keep titles and descriptions here so site-wide meta can be updated in one place.
 * Page components should import from this file rather than hardcoding strings.
 *
 * Note: `public/site.webmanifest` description must be updated manually to match
 * `SITE_DESCRIPTION` (static JSON cannot import this module).
 */

/** Site / brand name used in config, schema, and OG defaults. */
export const SITE_NAME = "Mllr26";

/** Person name used in titles, schema.org identity, and share suffixes. */
export const SITE_PERSON_NAME = "Jack Miller";

/** Job title used in schema.org Person identity. */
export const SITE_JOB_TITLE = "Creative Developer";

/** Default meta description used across SEO helpers and page fallbacks. */
export const SITE_DESCRIPTION =
  "Portfolio of Jack Miller, a creative developer based in the East Midlands (UK).";

/** Default Open Graph / Twitter share image (absolute path under `public/`). */
export const SITE_OG_IMAGE = "/TwitterCard.webp";

/**
 * Homepage document + share meta.
 *
 * @example
 * useSeoMeta({
 *   title: HOME_SEO.title,
 *   description: HOME_SEO.description,
 *   ogTitle: HOME_SEO.shareTitle,
 * })
 */
export const HOME_SEO = {
  title: SITE_PERSON_NAME,
  shareTitle: `${SITE_PERSON_NAME} — ${SITE_JOB_TITLE}`,
  description: SITE_DESCRIPTION,
} as const;

/**
 * Privacy policy document meta.
 *
 * @example
 * useSeoMeta({ title: PRIVACY_SEO.title, description: PRIVACY_SEO.description })
 */
export const PRIVACY_SEO = {
  title: "Privacy Policy",
  description:
    "How Mllr26 collects, uses, and protects personal information on this site.",
} as const;

/**
 * Cookie policy document meta.
 *
 * @example
 * useSeoMeta({ title: COOKIE_SEO.title, description: COOKIE_SEO.description })
 */
export const COOKIE_SEO = {
  title: "Cookie Policy",
  description: "How Mllr26 uses cookies and similar technologies on this site.",
} as const;

/**
 * Builds a topic-first share title for a project page.
 *
 * Kept under the ~60 character SEO guideline.
 *
 * @param projectName - Display name of the project, e.g. `"Kinfolk"`.
 * @returns Share title like `"Kinfolk — Jack Miller"`.
 * @example
 * projectShareTitle("Kinfolk") // => "Kinfolk — Jack Miller"
 */
export function projectShareTitle(projectName: string): string {
  return `${projectName} — ${SITE_PERSON_NAME}`;
}
