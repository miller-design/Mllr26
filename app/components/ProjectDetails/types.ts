import type { Project } from "~/data/projects";

/**
 * Props for ProjectDetails.
 *
 * @example
 * const props: ProjectDetailsProps = { className: 'my-class' }
 */
export interface ProjectDetailsProps {
  project: Project;
  className?: string;
}
