import { contactSchema } from "#shared/schemas/contact";
import { contactConfirmationEmailHtml, contactEmailHtml } from "~/lib/email";
import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactSchema.parse);

  // Hidden honeypot: a filled value usually indicates an automated submission.
  if (body.website) {
    return { ok: true, message: "Message received." };
  }

  const config = useRuntimeConfig(event);

  if (!config.resendApiKey || !config.resendFromName || !config.resendEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: "Contact email is not configured.",
    });
  }

  const resend = new Resend(config.resendApiKey);
  // admin email
  const { error } = await resend.emails.send({
    from: `Site Contact Form <${config.resendEmail}>`,
    to: config.resendEmail,
    replyTo: body.email,
    subject: `New contact form message from ${body.name}`,
    text: `Name: ${body.name}\nCompany: ${body.company || "Not provided"}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
    html: contactEmailHtml(body),
  });

  if (error) {
    console.error("Unable to send contact email", error);
    throw createError({
      statusCode: 502,
      statusMessage: "Unable to send your message. Please try again.",
    });
  }

  const { error: confirmationError } = await resend.emails.send({
    from: `${config.resendFromName} <${config.resendEmail}>`,
    to: body.email,
    subject: "We received your message",
    text: "Thanks for getting in touch. I've received your message and will get back to you soon.",
    html: contactConfirmationEmailHtml(body.name),
  });

  if (confirmationError) {
    console.error("Unable to send contact confirmation", confirmationError);
  }

  return { ok: true, message: "Message received." };
});
