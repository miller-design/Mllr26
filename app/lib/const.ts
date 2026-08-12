/**
 * Shared site constants.
 */

/** Default meta description used across SEO helpers and page fallbacks. */
export const SITE_DESCRIPTION =
  "Portfolio of Jack Miller, a creative developer based in the East Midlands (UK).";

/** Default Open Graph / Twitter share image (absolute path under `public/`). */
export const SITE_OG_IMAGE = "/TwitterCard.webp";

export type FooterLink = {
  id: number;
  text: string;
  url: string;
  external?: boolean;
};

export const FOOTER_LINKS: FooterLink[] = [
  {
    id: 1,
    text: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    id: 2,
    text: "Cookie Policy",
    url: "/cookie-policy",
  },
];

export const HERO_LEDE_TEXT = {
  title:
    "I am a full-stack developer building intentional, high performing digital experiences.",
  text: "With a background shaping experiences at studios like <a href='https://theoneoff.com/' target='_blank'>TheOneOff</a> [current] and <a href='https://www.madebysix.com/' target='_blank'>Madebysix</a>, I specialize in turning complex designs into fluid, responsive code. From interactive animations to full-scale web platforms or apps, I focus on the details that make the digital world feel alive.",
};
