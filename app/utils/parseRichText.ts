/**
 * Normalizes line-break input from CMS/JSON strings and JavaScript literals.
 *
 * @param value - Input that may contain `\n`, `\r\n`, or literal `\n` sequences.
 * @returns String with normalized newline characters.
 */
function normalizeLineBreaks(value: string): string {
  return value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
}

/**
 * Prepares a content string for `v-html` by converting line breaks to `<br />`.
 * Existing HTML markup (links, emphasis, etc.) is left intact.
 *
 * Square brackets and other plain text are preserved as-is for styling.
 *
 * @param input - Content string that may include HTML and/or newlines.
 * @returns HTML string ready for `v-html`.
 *
 * @example
 * parseRichText(
 *   "Studios like <a href='https://theoneoff.com/' target='_blank'>TheOneOff</a> [current role]\\nand more.",
 * )
 * // =>
 * // "Studios like <a href='https://theoneoff.com/' target='_blank'>TheOneOff</a> [current role]<br />and more."
 */
export function parseRichText(input: string): string {
  return normalizeLineBreaks(input).replace(/\n/g, "<br />");
}
