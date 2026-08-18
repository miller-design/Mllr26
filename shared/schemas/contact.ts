import { z } from "zod";

/**
 * Shared contact form schema used by the client and server.
 *
 * @example
 * contactSchema.parse({ name: "Ada", email: "ada@example.com", message: "Hello" })
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Your name must be 100 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(100, "Your company must be 100 characters or fewer.")
    .optional(),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5_000, "Your message must be 5,000 characters or fewer."),
  website: z.string().trim().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
