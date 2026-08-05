export type FeaturedImageRatio = "landscape" | "portrait" | "square";

export type Project = {
  id: number;
  slug: string;
  name: string;
  features: string[];
  link: string | null;
  year: number;
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
    year: 2023,
    featuredImage: "https://picsum.photos/seed/hotel-izza/1200/800",
    featuredImageRatio: "landscape",
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
    year: 2024,
    featuredImage: "https://picsum.photos/seed/kinfolk/600/720",
    featuredImageRatio: "portrait",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 8,
    slug: "los-york",
    name: "Los York ®",
    features: ["Next.js", "Sanity CMS", "Motion"],
    link: "https://losyork.tv/",
    year: 2024,
    featuredImage: "https://picsum.photos/seed/los-york/800/800",
    featuredImageRatio: "square",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 7,
    slug: "gianni",
    name: "Gianni",
    features: ["Next.js", "Payload V3", "Motion"],
    link: "https://www.gianniscumaci.com/",
    year: 2025,
    featuredImage: "https://picsum.photos/seed/gianni/600/720",
    featuredImageRatio: "portrait",
    designer: {
      name: "TheOneOff",
      link: "https://theoneoff.com/",
    },
  },
  {
    id: 6,
    slug: "los-films",
    name: "Los ® Films",
    features: ["Next.js", "Sanity CMS", "Motion"],
    link: "https://losfilms.tv/",
    year: 2024,
    featuredImage: "https://picsum.photos/seed/los-films/1200/800",
    featuredImageRatio: "landscape",
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
    link: null,
    year: 2026,
    featuredImage: "https://picsum.photos/seed/theoneoff/800/800",
    featuredImageRatio: "square",
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
    year: 2023,
    featuredImage: "https://picsum.photos/seed/fellowship/600/720",
    featuredImageRatio: "portrait",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 3,
    slug: "title",
    name: "Title",
    features: ["Nuxt.js", "Storyblok CMS"],
    link: "https://www.title.org.uk/",
    year: 2022,
    featuredImage: "https://picsum.photos/seed/title/800/800",
    featuredImageRatio: "square",
    designer: {
      name: "ZZ2C",
      link: "https://www.zz2c.studio/",
    },
  },
  {
    id: 2,
    slug: "berkeley-and-stuart",
    name: "Berkley & Stuart",
    features: ["WordPress", "WooCommerce"],
    link: "https://www.berkeleyandstuart.com/",
    year: 2022,
    featuredImage: "https://picsum.photos/seed/berkeley-and-stuart/1200/800",
    featuredImageRatio: "landscape",
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
    year: 2022,
    featuredImage: "https://picsum.photos/seed/huxley-parlour/600/720",
    featuredImageRatio: "portrait",
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
];
