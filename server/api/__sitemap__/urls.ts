import { PROJECTS } from "~/data/projects";

/**
 * Supplies dynamic project URLs to `@nuxtjs/sitemap`.
 *
 * Static routes are discovered automatically; this handler adds each
 * `/projects/[slug]` entry with its featured image for the image sitemap.
 *
 * @returns Sitemap URL entries for all portfolio projects.
 * @example
 * // GET /api/__sitemap__/urls
 * // => [{ loc: '/projects/kinfolk', images: [...] }, ...]
 */
export default defineSitemapEventHandler(() => {
  return PROJECTS.map((project) => ({
    loc: `/projects/${project.slug}`,
    images: [
      {
        loc: project.featuredImage,
        title: project.name,
      },
    ],
  }));
});
