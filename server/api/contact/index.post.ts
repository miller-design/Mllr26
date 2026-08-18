import { contactSchema } from "#shared/schemas/contact";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactSchema.parse);

  // Hidden honeypot: a filled value usually indicates an automated submission.
  if (body.website) {
    return { ok: true, message: "Message received." };
  }

  // send email here
  return { ok: true, message: "Message received." };
});
