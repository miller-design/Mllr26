/**
 * Shared site constants (non-SEO).
 *
 * SEO / Open Graph copy lives in `~/lib/seo`.
 */

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
