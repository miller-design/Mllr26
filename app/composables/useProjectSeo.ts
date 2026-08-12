import type { Project } from "~/data/projects";
import {
  projectShareTitle,
  SITE_DESCRIPTION,
} from "~/lib/seo";

/**
 * Applies page SEO, Open Graph, and Schema.org metadata for a project.
 *
 * Uses the project featured image for shares (not the generated `Mllr` template).
 * Strips simple HTML (e.g. `<em>`) from descriptions so meta tags stay plain text.
 *
 * @param project - Portfolio project used to populate title, description, and image.
 * @example
 * const project = getProjectBySlug("kinfolk")!
 * useProjectSeo(project)
 */
export function useProjectSeo(project: Project) {
  const description =
    stripHtml(project.description ?? "") || SITE_DESCRIPTION;
  const title = project.name;
  const shareTitle = projectShareTitle(title);
  const ogImage = project.featuredImage;

  useSeoMeta({
    title,
    description,
    ogTitle: shareTitle,
    ogDescription: description,
    ogImage,
    twitterCard: "summary_large_image",
    twitterTitle: shareTitle,
    twitterDescription: description,
    twitterImage: ogImage,
  });

  useSchemaOrg([
    defineWebPage({
      name: title,
      description,
    }),
    defineBreadcrumb({
      itemListElement: [
        { name: "Home", item: "/" },
        { name: title, item: `/projects/${project.slug}` },
      ],
    }),
  ]);
}

/**
 * Removes HTML tags from a string for safe use in meta descriptions.
 *
 * @param value - Possibly rich-text string, e.g. `"Copy <em>note</em>."`.
 * @returns Plain text with tags removed.
 * @example
 * stripHtml("Copy <em>note</em>.") // => "Copy note."
 */
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}
