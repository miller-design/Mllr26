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
