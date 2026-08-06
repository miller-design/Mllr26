/**
 * Props for ProjectGallery.
 *
 * @param slug - Project folder under `public/projects`, e.g. `"hotel-izza"`.
 * @param className - Optional extra class on the root element.
 * @example
 * const props: ProjectGalleryProps = { slug: 'hotel-izza', className: 'my-class' }
 */
export interface ProjectGalleryProps {
  slug: string;
  className?: string;
}
