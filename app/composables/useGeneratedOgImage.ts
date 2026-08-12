/**
 * Registers a per-page generated Open Graph image via the `Mllr` Satori template.
 *
 * Pages that skip this (and don't set their own `ogImage`) fall back to
 * `SITE_OG_IMAGE` (`/TwitterCard.webp`) from `nuxt.config` app head.
 * Project pages should use the featured image via `useSeoMeta` instead.
 *
 * @param options - Copy rendered on the OG card.
 * @param options.title - Primary headline, e.g. `"Jack Miller — Creative Developer"`.
 * @param options.description - Supporting line under the title.
 * @example
 * useGeneratedOgImage({
 *   title: HOME_SEO.shareTitle,
 *   description: HOME_SEO.description,
 * })
 */
export function useGeneratedOgImage(options: {
  title: string;
  description: string;
}) {
  defineOgImage("Mllr", {
    title: options.title,
    description: options.description,
  });
}
