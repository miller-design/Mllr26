import { z } from "zod";

/**
 * Shared contact form schema used by the client and server.
 *
 * @example
 * contactSchema.parse({ name: "Ada", email: "ada@example.com", message: "Hello" })
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  company: z.string().trim().optional(),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(1, "Please enter a message."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
