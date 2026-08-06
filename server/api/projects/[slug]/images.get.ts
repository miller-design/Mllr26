import { readdir } from "node:fs/promises";
import { join } from "node:path";

const IMAGE_EXT = /\.(webp|jpe?g|png|gif|avif)$/i;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXCLUDED = new Set(["thumbnail.webp"]);

/**
 * Lists gallery image URLs for a project slug from `public/projects/{slug}`.
 *
 * Excludes `thumbnail.webp` (used as the featured/card image). Returns paths
 * sorted in natural numeric order (e.g. hotel-izza-2 before hotel-izza-10).
 *
 * @param event - Nitro event; router param `slug` is the project folder name.
 * @returns Absolute public paths, e.g. `["/projects/hotel-izza/hotel-izza-1.webp"]`.
 * @example
 * // GET /api/projects/hotel-izza/images
 * // => ["/projects/hotel-izza/hotel-izza-1.webp", ...]
 */
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);

  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project slug",
    });
  }

  const dir = join(process.cwd(), "public", "projects", slug);

  try {
    const files = await readdir(dir);

    return files
      .filter((file) => IMAGE_EXT.test(file) && !EXCLUDED.has(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/projects/${slug}/${file}`);
  } catch (error) {
    const code =
      error instanceof Error && "code" in error
        ? (error as NodeJS.ErrnoException).code
        : undefined;

    if (code === "ENOENT") {
      return [];
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to read project images",
    });
  }
});
