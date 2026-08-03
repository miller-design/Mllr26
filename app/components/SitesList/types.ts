import type { Project } from "~/data/projects";

/**
 * Props for SitesList.
 *
 * @example
 * const props: SitesListProps = { className: 'my-class' }
 */
export interface SitesListProps {
  projects?: Project[];
  className?: string;
}
