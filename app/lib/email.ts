import type { ContactFormData } from "#shared/schemas/contact";

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

export function contactEmailHtml({
  name,
  company,
  email,
  message,
}: ContactFormData): string {
  const details: Array<[label: string, value: string]> = [
    ["Name", name],
    ["Company", company || "Not provided"],
    ["Email", email],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f5f5;color:#111;font-family:Arial,sans-serif;">
    <main style="max-width:600px;margin:32px auto;padding:32px;background:#fff;">
      <h1 style="margin:0 0 24px;font-size:24px;">New contact form message</h1>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${details
          .map(
            ([label, value]) =>
              `<tr><th align="left" style="padding:8px 0;border-bottom:1px solid #ddd;">${label}</th><td style="padding:8px 0;border-bottom:1px solid #ddd;">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h2 style="margin:0 0 8px;font-size:16px;">Message</h2>
      <p style="margin:0;white-space:pre-wrap;line-height:1.5;">${escapeHtml(message)}</p>
    </main>
  </body>
</html>`;
}

export function contactConfirmationEmailHtml(name: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f5f5;color:#111;font-family:Arial,sans-serif;">
    <main style="max-width:600px;margin:32px auto;padding:32px;background:#fff;">
      <h1 style="margin:0 0 24px;font-size:24px;">Thanks for getting in touch</h1>
      <p style="margin:0;line-height:1.5;">Hi ${escapeHtml(name)},</p>
      <p style="margin:16px 0 0;line-height:1.5;">I&rsquo;ve received your message and will get back to you soon.</p>
    </main>
  </body>
</html>`;
}
