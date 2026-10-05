import type { Project } from "~/data/projects";
import { projectShareTitle, SITE_DESCRIPTION } from "~/lib/seo";

/**
 * Applies page SEO, Open Graph, and Schema.org metadata for a project.
 *
 * Prefer `project.metaDescription` (~150–160 chars) when set; otherwise falls
 * back to the on-page `description` (HTML stripped). Uses the project featured
 * image for shares; other pages use `SITE_OG_IMAGE`.
 *
 * @param project - Portfolio project used to populate title, description, and image.
 * @example
 * const project = getProjectBySlug("kinfolk")!
 * useProjectSeo(project)
 */
export function useProjectSeo(project: Project) {
  const description =
    stripHtml(project.metaDescription ?? project.description ?? "") || SITE_DESCRIPTION;
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

  const { url: siteUrl } = useSiteConfig();
  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const workId = `${pageUrl}#work`;

  useSchemaOrg([
    defineWebPage({
      name: title,
      description,
      mainEntity: { "@id": workId },
    }),
    {
      "@type": "CreativeWork",
      "@id": workId,
      name: title.trim(),
      description,
      url: pageUrl,
      image: new URL(project.featuredImage, siteUrl).href,
      ...(project.year && { dateCreated: String(project.year) }),
      ...(project.features?.length && {
        keywords: project.features.map((feature) => feature.trim()),
      }),
      ...(project.link && { sameAs: project.link }),
      creator: { "@id": `${siteUrl}/#identity` },
      contributor: {
        "@type": "Organization",
        name: project.designer.name,
        url: project.designer.link,
      },
      ...(project.link && { workExample: { "@type": "WebSite", url: project.link } }),
    },
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
