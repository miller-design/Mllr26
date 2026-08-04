/**
 * Shared site constants.
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
