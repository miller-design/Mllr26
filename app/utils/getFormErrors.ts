import { FetchError } from "ofetch";

/**
 * Maps a failed contact form submission into a user-facing message.
 *
 * @param error Unknown error thrown by `$fetch` or local validation.
 * @example
 * getSubmitErrorMessage(new FetchError("Server error", { statusCode: 500 }))
 * // "Something went wrong on our end. Please try again in a moment."
 */
export function submissionErrorMessage(error: unknown): string {
  if (error instanceof FetchError) {
    if (error.statusCode === 400 || error.statusCode === 422) {
      return "Some details look incorrect. Please check the fields above.";
    }

    if (error.statusCode === 429) {
      return "Too many attempts. Please wait a moment and try again.";
    }

    if (error.statusCode && error.statusCode >= 500) {
      return "Something went wrong on our end. Please try again in a moment.";
    }

    if (!error.statusCode) {
      return "Unable to reach the server. Check your connection and try again.";
    }
  }

  return "Something went wrong. Please try again.";
}
