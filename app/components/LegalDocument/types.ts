/**
 * Props for LegalDocument.
 *
 * @example
 * const props: LegalDocumentProps = {
 *   title: "Privacy Policy",
 *   updated: "12 August 2026",
 *   className: "my-class",
 * }
 */
export interface LegalDocumentProps {
  /** Page heading, e.g. `"Privacy Policy"`. */
  title: string;
  /** Human-readable last-updated date, e.g. `"12 August 2026"`. */
  updated: string;
  /** Optional class for the root element. */
  className?: string;
}
