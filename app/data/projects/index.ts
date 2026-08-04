export type Project = {
  id: number;
  name: string;
  features: string[];
  link: string | null;
  year: number;
  designer: {
    name: string;
    link: string;
  };
};

export const PROJECTS: Project[] = [
  {
    id: 8,
    name: "Hotel Izza",
    features: ["Next.js", "Storyblok CMS", "Motion"],
    link: "https://izza.com/",
    year: 2023,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 7,
    name: "Kinfolk",
    features: ["WordPress", "WooCommerce", "GSAP"],
    link: "https://www.kinfolk.com/",
    year: 2024,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 6,
    name: "Los York ®",
    features: ["Next.js", "Sanity CMS", "Motion"],
    link: "https://losyork.tv/",
    year: 2024,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },

  {
    id: 5,
    name: "Los ® Films",
    features: ["Next.js", "Sanity CMS", "Motion"],
    link: "https://losfilms.tv/",
    year: 2024,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 4,
    name: "Fellowship",
    features: ["WordPress", "GSAP"],
    link: null,
    year: 2023,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 3,
    name: "Title",
    features: ["Nuxt.js", "Storyblok CMS"],
    link: "https://www.title.org.uk/",
    year: 2022,
    designer: {
      name: "ZZ2C",
      link: "https://www.zz2c.studio/",
    },
  },
  {
    id: 2,
    name: "Berkley & Stuart",
    features: ["WordPress", "WooCommerce"],
    link: "https://www.berkeleyandstuart.com/",
    year: 2022,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
  {
    id: 1,
    name: "Huxley Parlour",
    features: ["WordPress", "GSAP"],
    link: "https://huxleyparlour.com/",
    year: 2022,
    designer: {
      name: "Six",
      link: "https://www.madebysix.com/",
    },
  },
];
