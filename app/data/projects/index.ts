export type FeaturedImageRatio = "landscape" | "portrait" | "square";

export type Project = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  features?: string[];
  link: string | null;
  year?: number;
  featuredImage: string;
  featuredImageRatio: FeaturedImageRatio;
  designer: {
    name: string;
    link: string;
  };
};

/**
 * Finds a project by its URL slug.
 *
 * @param slug - URL segment, e.g. `"hotel-izza"`.
 * @returns The matching project, or undefined if none exists.
 * @example
 * getProjectBySlug("kinfolk") // => Project | undefined
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export const PROJECTS: Project[] = [
  {
    id: 10,
    slug: "hotel-izza",
    name: "Hotel Izza",
    features: ["Next.js", "Storyblok CMS", "Motion"],
    link: "https://izza.com/",
    featuredImage: "/projects/hotel-izza/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Developed for Hotel Izza, a characterful Marrakech hotel set across seven restored homes in the Medina, with rooms, courtyards, a rooftop restaurant and a large contemporary art collection. The site was built with Next.js, Storyblok CMS and Motion, creating a flexible editorial platform with elegant transitions, rich imagery and smooth content management for rooms, dining, art and bookings.",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 9,
    slug: "kinfolk",
    name: "Kinfolk",
    features: ["WordPress", "WooCommerce", "GSAP"],
    link: "https://www.kinfolk.com/",
    featuredImage: "/projects/kinfolk/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Built for Kinfolk, a global lifestyle publication covering home, work, style and culture through print, digital stories, subscriptions and commerce. The project used WordPress, WooCommerce and GSAP to support editorial publishing, product sales and animated browsing moments across a refined content experience, helping the brand balance magazine storytelling with a premium online shop.",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 8,
    slug: "los-york",
    name: "Los York ®",
    features: ["Next.js", "Sanity CMS", "Motion "],
    link: "https://losyork.tv/",
    featuredImage: "/projects/los-york/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Developed for Los York ®, an award-winning creative company working across design, writing, art direction and production for global brands. Built with Next.js, Sanity CMS and Motion, the site gives the team a fast, flexible platform for showcasing work, news and studio culture, with dynamic content structures and fluid transitions that match the energy of the brand.",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 7,
    slug: "assemblage",
    name: "Assemblage",
    features: ["Wordpress", "GSAP"],
    link: "https://views.assemblageworld.com/",
    featuredImage: "/projects/assemblage/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Built for Assemblage Views, a magazine exploring responsible global citizenship through creative, ecological and cultural perspectives. The site used WordPress and GSAP to create an editorial experience with a strong sense of movement, supporting long-form articles, issue-led publishing and immersive storytelling around habitat, nature, design and positive change.",
    designer: {
      name: "ZZ2C",
      link: "https://www.zz2c.studio/",
    },
  },
  {
    id: 6,
    slug: "los-films",
    name: "Los ® Films",
    features: ["Next.js", "Sanity CMS", "Motion (Framer Motion)"],
    link: "https://losfilms.tv/",
    featuredImage: "/projects/los-films/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Developed for Los ® Films, the production arm of the Los York family, focused on live action, directors and creative production. Built with Next.js, Sanity CMS and Motion, the site provides a sharp showcase for films, directors and selected work, combining structured content management with polished transitions and a visually led browsing experience.",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 5,
    slug: "theoneoff",
    name: "TheOneOff",
    features: ["Next.js", "Payload V3", "GSAP"],
    link: "https://theoneoff.com/",
    featuredImage: "/projects/theoneoff/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Built for The One Off, an award-winning retail design agency helping brands connect culture, commerce and customer experience across physical and digital channels. The site used Next.js, Payload V3 and GSAP to support flexible content publishing, case studies and animated interactions, giving the agency a modern platform for presenting retail, branding, interiors, digital and advertising work.",
    designer: {
      name: "TheOneOff",
      link: "https://theoneoff.com/",
    },
  },
  {
    id: 4,
    slug: "fellowship",
    name: "Fellowship",
    features: ["WordPress", "GSAP"],
    link: null,
    featuredImage: "/projects/fellowship/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Developed for Fellowship, a contemporary art gallery partnering with artists defining the digital age. Built with WordPress and GSAP, the site supports artists, exhibitions, films and editorial content through a cinematic, highly visual interface. Animation was used to add pace and atmosphere while keeping the focus on digital art, artist profiles and the gallery.\n\n <em>Unfortunately the site is no longer live.</em>",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 3,
    slug: "title",
    name: "Title",
    features: ["Nuxt.js", "Storyblok CMS", "GSAP"],
    link: "https://www.title.org.uk/",
    featuredImage: "/projects/title/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Built for Title, a curated platform sharing stories about the future of life on Earth, sustainability, climate and responsible action. The site used Nuxt.js, Storyblok CMS and GSAP to deliver a flexible editorial experience, supporting topics, stories and directory content with smooth animation and a lightweight structure for publishing global environmental perspectives.",
    designer: {
      name: "ZZ2C",
      link: "https://www.zz2c.studio/",
    },
  },
  {
    id: 2,
    slug: "berkeley-and-stuart",
    name: "Berkley & Stuart",
    features: ["WordPress", "WooCommerce", "GSAP"],
    link: "https://www.berkeleyandstuart.com/",
    featuredImage: "/projects/berkeley-and-stuart/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Developed for Berkeley & Stuart, an online wine merchant specialising in fine and rare wines from Europe and the New World. Built with WordPress and WooCommerce, the site supports product browsing, producer content and ecommerce journeys for a carefully curated wine collection, combining premium editorial detail with practical shopping flows.",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 1,
    slug: "huxley-parlour",
    name: "Huxley Parlour",
    features: ["WordPress", "GSAP"],
    link: "https://huxleyparlour.com/",
    featuredImage: "/projects/huxley-parlour/thumbnail.webp",
    featuredImageRatio: "landscape",
    description:
      "Built for Huxley Parlour, a London and Wiltshire gallery specialising in postwar and contemporary painting and photography. The project used WordPress and GSAP to support artists, exhibitions, fairs, critical texts and enquiries, creating a refined gallery experience with elegant motion, flexible content management and a strong visual structure for artworks and exhibition.",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
];

/**
 * Gallery image paths per project slug (excludes thumbnail.webp).
 * Sourced from public/projects/{slug}. Rebuild this file when gallery
 * images are added or renamed.
 */
export const PROJECT_IMAGES: Record<string, string[]> = {
  assemblage: [
    "/projects/assemblage/assemblage-1.webp",
    "/projects/assemblage/assemblage-2.webp",
    "/projects/assemblage/assemblage-3.webp",
    "/projects/assemblage/assemblage-4.webp",
    "/projects/assemblage/assemblage-5.webp",
    "/projects/assemblage/assemblage-6.webp",
    "/projects/assemblage/assemblage-7.webp",
    "/projects/assemblage/assemblage-8.webp",
    "/projects/assemblage/assemblage-9.webp",
    "/projects/assemblage/assemblage-10.webp",
    "/projects/assemblage/assemblage-11.webp",
    "/projects/assemblage/assemblage-12.webp",
  ],
  "berkeley-and-stuart": [
    "/projects/berkeley-and-stuart/berkley-and-stuart-1.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-2.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-3.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-4.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-5.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-6.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-7.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-8.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-9.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-10.webp",
    "/projects/berkeley-and-stuart/berkley-and-stuart-11.webp",
  ],
  fellowship: [
    "/projects/fellowship/fellowship-1.webp",
    "/projects/fellowship/fellowship-2.webp",
    "/projects/fellowship/fellowship-3.webp",
    "/projects/fellowship/fellowship-4.webp",
    "/projects/fellowship/fellowship-5.webp",
    "/projects/fellowship/fellowship-6.webp",
    "/projects/fellowship/fellowship-7.webp",
    "/projects/fellowship/fellowship-8.webp",
    "/projects/fellowship/fellowship-9.webp",
  ],
  "hotel-izza": [
    "/projects/hotel-izza/hotel-izza-1.webp",
    "/projects/hotel-izza/hotel-izza-2.webp",
    "/projects/hotel-izza/hotel-izza-3.webp",
    "/projects/hotel-izza/hotel-izza-4.webp",
    "/projects/hotel-izza/hotel-izza-5.webp",
    "/projects/hotel-izza/hotel-izza-6.webp",
    "/projects/hotel-izza/hotel-izza-7.webp",
    "/projects/hotel-izza/hotel-izza-8.webp",
    "/projects/hotel-izza/hotel-izza-11.webp",
    "/projects/hotel-izza/hotel-izza-12.webp",
    "/projects/hotel-izza/hotel-izza-13.webp",
    "/projects/hotel-izza/hotel-izza-14.webp",
    "/projects/hotel-izza/hotel-izza-15.webp",
    "/projects/hotel-izza/hotel-izza-16.webp",
  ],
  "huxley-parlour": [
    "/projects/huxley-parlour/huxley-parlour-1.webp",
    "/projects/huxley-parlour/huxley-parlour-2.webp",
    "/projects/huxley-parlour/huxley-parlour-3.webp",
    "/projects/huxley-parlour/huxley-parlour-4.webp",
    "/projects/huxley-parlour/huxley-parlour-5.webp",
    "/projects/huxley-parlour/huxley-parlour-6.webp",
    "/projects/huxley-parlour/huxley-parlour-7.webp",
    "/projects/huxley-parlour/huxley-parlour-8.webp",
    "/projects/huxley-parlour/huxley-parlour-9.webp",
    "/projects/huxley-parlour/huxley-parlour-10.webp",
    "/projects/huxley-parlour/huxley-parlour-11.webp",
  ],
  kinfolk: [
    "/projects/kinfolk/kinfolk-1.webp",
    "/projects/kinfolk/kinfolk-2.webp",
    "/projects/kinfolk/kinfolk-3.webp",
    "/projects/kinfolk/kinfolk-4.webp",
    "/projects/kinfolk/kinfolk-5.webp",
    "/projects/kinfolk/kinfolk-6.webp",
    "/projects/kinfolk/kinfolk-7.webp",
    "/projects/kinfolk/kinfolk-8.webp",
    "/projects/kinfolk/kinfolk-9.webp",
    "/projects/kinfolk/kinfolk-10.webp",
    "/projects/kinfolk/kinfolk-11.webp",
    "/projects/kinfolk/kinfolk-12.webp",
    "/projects/kinfolk/kinfolk-13.webp",
    "/projects/kinfolk/kinfolk-14.webp",
  ],
  "los-films": [
    "/projects/los-films/los-films-1.webp",
    "/projects/los-films/los-films-2.webp",
    "/projects/los-films/los-films-3.webp",
    "/projects/los-films/los-films-4.webp",
    "/projects/los-films/los-films-5.webp",
    "/projects/los-films/los-films-6.webp",
    "/projects/los-films/los-films-7.webp",
    "/projects/los-films/los-films-8.webp",
    "/projects/los-films/los-films-9.webp",
  ],
  "los-york": [
    "/projects/los-york/los-york-1.webp",
    "/projects/los-york/los-york-2.webp",
    "/projects/los-york/los-york-3.webp",
    "/projects/los-york/los-york-4.webp",
    "/projects/los-york/los-york-5.webp",
    "/projects/los-york/los-york-6.webp",
    "/projects/los-york/los-york-7.webp",
    "/projects/los-york/los-york-8.webp",
    "/projects/los-york/los-york-9.webp",
  ],
  theoneoff: [
    "/projects/theoneoff/theoneoff-1.webp",
    "/projects/theoneoff/theoneoff-2.webp",
    "/projects/theoneoff/theoneoff-3.webp",
    "/projects/theoneoff/theoneoff-4.webp",
    "/projects/theoneoff/theoneoff-5.webp",
    "/projects/theoneoff/theoneoff-6.webp",
    "/projects/theoneoff/theoneoff-7.webp",
    "/projects/theoneoff/theoneoff-8.webp",
  ],
  title: [
    "/projects/title/title-1.webp",
    "/projects/title/title-2.webp",
    "/projects/title/title-3.webp",
    "/projects/title/title-4.webp",
    "/projects/title/title-5.webp",
    "/projects/title/title-6.webp",
  ],
};

/**
 * Returns gallery image URLs for a project slug.
 *
 * @param slug - Project folder under public/projects, e.g. "hotel-izza".
 * @returns Absolute public paths for gallery images (empty if unknown).
 * @example
 * getProjectImages("assemblage")
 * // => ["/projects/assemblage/assemblage-1.webp", ...]
 */
export function getProjectImages(slug: string): string[] {
  return PROJECT_IMAGES[slug] ?? [];
}
