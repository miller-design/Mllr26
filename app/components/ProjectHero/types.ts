/**
 * Props for ProjectHero.
 *
 * @example
 * const props: ProjectHeroProps = { className: 'my-class' }
 */

export interface ProjectHeroProps {
  title: string;
  sizeOverride?: "xlarge" | "large" | "medium" | "small";
  className?: string;
}

export type NameSegment = {
  part: string;
  showMark: boolean;
};
