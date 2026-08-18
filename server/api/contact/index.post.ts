import { contactSchema } from "#shared/schemas/contact";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactSchema.parse);
  // send email here
  return { ok: true, message: "Message received." };
});