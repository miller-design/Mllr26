import type { ContactFormData } from "#shared/schemas/contact";
import { SITE_JOB_TITLE, SITE_PERSON_NAME } from "~/lib/seo";

/**
 * Email-safe tokens mapped from the site palette and type.
 *
 * Special Gothic loads where clients allow web fonts; Arial Narrow keeps the
 * condensed gothic feel everywhere else. Six-digit hex only — Outlook
 * mishandles 3-digit hex and CSS variables.
 */
const EMAIL = {
  width: 600,
  font: "'Special Gothic', 'Arial Narrow', Arial, Helvetica, sans-serif",
  colorText: "#111111",
  colorBg: "#f5f5f5",
  colorCard: "#ffffff",
  colorRule: "#111111",
} as const;

type EmailLayoutOptions = {
  /** Document title shown in some clients' title bars. */
  title: string;
  /** Hidden inbox preview line. */
  preheader: string;
  /** Visible heading inside the white content block. */
  heading: string;
  /** Inner HTML already escaped / built by the caller. */
  content: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    }[character]!;
  });
}

/**
 * Escapes a string then turns line breaks into `<br>` tags.
 *
 * Email clients ignore `white-space: pre-wrap`, so newlines must be
 * explicit markup.
 *
 * @param value - Raw user text, e.g. `"Hello\nWorld"`.
 * @returns Safe HTML such as `"Hello<br>World"`.
 * @example
 * toHtmlText("Hi &\nbye") // => "Hi &amp;<br>bye"
 */
function toHtmlText(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");
}

function textStyle(size: number, lineHeight: number, extra = ""): string {
  return `margin:0;font-family:${EMAIL.font};font-size:${size}px;line-height:${lineHeight}px;color:${EMAIL.colorText};${extra}`;
}

/**
 * Shared table-based chrome used by every transactional email.
 *
 * Mirrors the site shell: grey page, white main, MLLR wordmark, 1px black
 * rules, grey footer with the same copyright line as the site.
 *
 * @param options.title - Browser / client document title, e.g. `"Thanks for getting in touch"`.
 * @param options.preheader - Inbox preview text, e.g. `"I've received your message."`.
 * @param options.heading - Card heading, e.g. `"New contact form message"`.
 * @param options.content - Escaped inner HTML for the body of the card.
 * @returns A full HTML email document.
 * @example
 * wrapEmailHtml({
 *   title: "Thanks",
 *   preheader: "We got your message.",
 *   heading: "Thanks for getting in touch",
 *   content: "<p style=\"margin:0;\">Hello</p>",
 * })
 */
function wrapEmailHtml({
  title,
  preheader,
  heading,
  content,
}: EmailLayoutOptions): string {
  const safeTitle = escapeHtml(title);
  const safePreheader = escapeHtml(preheader);
  const safeHeading = escapeHtml(heading);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${safeTitle}</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Special+Gothic:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css2?family=Special+Gothic:wght@400;500;600;700&display=swap");
      :root { color-scheme: light; }
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
      p { margin: 0; }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${EMAIL.colorBg};width:100%;">
    <div style="display:none;font-size:1px;color:${EMAIL.colorBg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
      ${safePreheader}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL.colorBg}" style="border-collapse:collapse;background-color:${EMAIL.colorBg};width:100%;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <!--[if mso]>
          <table role="presentation" width="${EMAIL.width}" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>
          <![endif]-->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL.colorCard}" style="border-collapse:collapse;background-color:${EMAIL.colorCard};max-width:${EMAIL.width}px;width:100%;">
            <tr>
              <td bgcolor="${EMAIL.colorCard}" style="padding:32px 32px 0;background-color:${EMAIL.colorCard};">
                <p style="${textStyle(28, 22, "font-weight:700;letter-spacing:-0.02em;")}">MLLR26</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="${EMAIL.colorCard}" style="padding:40px 32px 24px;background-color:${EMAIL.colorCard};">
                <p style="${textStyle(20, 24, "font-weight:500;")}">${safeHeading}</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="${EMAIL.colorCard}" style="padding:0 32px 40px;background-color:${EMAIL.colorCard};">
                ${content}
              </td>
            </tr>
            <tr>
              <td bgcolor="${EMAIL.colorBg}" style="padding:24px 32px 8px;background-color:${EMAIL.colorBg};border-top:1px solid ${EMAIL.colorRule};">
                <p style="${textStyle(12, 12, "letter-spacing:0.05em;")}">&copy;${year} MLLR. All rights reserved.</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="${EMAIL.colorBg}" style="padding:0 32px 24px;background-color:${EMAIL.colorBg};">
                <p style="${textStyle(12, 16, "letter-spacing:0.05em;")}">${escapeHtml(SITE_PERSON_NAME)} &middot; ${escapeHtml(SITE_JOB_TITLE)}</p>
              </td>
            </tr>
          </table>
          <!--[if mso]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Stacked label + value row styled like the site contact fields.
 *
 * Uppercase 12px labels and a 1px black underline match the form inputs.
 *
 * @param label - Field name, e.g. `"Email"`.
 * @param valueHtml - Already-escaped (or linked) value HTML.
 * @returns A table row string.
 * @example
 * detailRow("Name", "Ada")
 */
function detailRow(label: string, valueHtml: string): string {
  return `<tr>
    <td style="padding:12px 0 4px;">
      <p style="${textStyle(12, 12, "font-weight:500;letter-spacing:0.05em;text-transform:uppercase;")}">${escapeHtml(label)}</p>
    </td>
  </tr>
  <tr>
    <td style="padding:4px 0 12px;border-bottom:1px solid ${EMAIL.colorRule};">
      <p style="${textStyle(16, 20, "font-weight:400;")}">${valueHtml}</p>
    </td>
  </tr>`;
}

/**
 * Builds the HTML body for the internal contact-form notification.
 *
 * @param data - Validated contact form fields.
 * @returns A full HTML email document.
 * @example
 * contactEmailHtml({
 *   name: "Ada",
 *   company: "Analytical Engine",
 *   email: "ada@example.com",
 *   message: "Hello",
 *   website: "",
 * })
 */
export function contactEmailHtml({
  name,
  company,
  email,
  message,
}: ContactFormData): string {
  const safeEmail = escapeHtml(email);
  const details = [
    detailRow("Name", escapeHtml(name)),
    detailRow("Company", escapeHtml(company || "Not provided")),
    detailRow(
      "Email",
      `<a href="mailto:${safeEmail}" style="color:${EMAIL.colorText};text-decoration:underline;text-underline-offset:0.15em;">${safeEmail}</a>`,
    ),
    detailRow("Message", toHtmlText(message)),
  ].join("");

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
      ${details}
    </table>`;

  return wrapEmailHtml({
    title: "New contact form message",
    preheader: `New message from ${name}`,
    heading: "New contact form message",
    content,
  });
}

/**
 * Builds the HTML body for the visitor confirmation email.
 *
 * @param name - Submitter's name, e.g. `"Ada"`.
 * @returns A full HTML email document.
 * @example
 * contactConfirmationEmailHtml("Ada")
 */
export function contactConfirmationEmailHtml(name: string): string {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
      <tr>
        <td style="padding:0 0 16px;">
          <p style="${textStyle(16, 20, "font-weight:400;")}">Hi ${escapeHtml(name)},</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style="${textStyle(16, 20, "font-weight:400;")}">I&rsquo;ve received your message and will get back to you soon.</p>
        </td>
      </tr>
    </table>`;

  return wrapEmailHtml({
    title: "Thanks for getting in touch",
    preheader: "I've received your message and will get back to you soon.",
    heading: "Thanks for getting in touch",
    content,
  });
}
