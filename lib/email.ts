import { Resend } from "resend";

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

const DEFAULT_FROM = "Houston Home Help <notifications@houstonhomehelp.com>";

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { skipped: true as const };
  }

  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo
    });
    return { skipped: false as const, result };
  } catch (error) {
    return { skipped: false as const, error: error instanceof Error ? error.message : String(error) };
  }
}

export function adminRecipients(): string[] {
  const raw = process.env.HHH_ADMIN_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function emailLayout(title: string, bodyHtml: string) {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; background:#faf7f2; padding:32px;">
    <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:16px; padding:32px; border:1px solid rgba(26,35,33,0.06);">
      <p style="font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#2d7067; margin:0 0 12px;">Houston Home Help</p>
      <h1 style="margin:0 0 16px; font-size:22px; color:#1a2321;">${title}</h1>
      <div style="color:#2a3632; font-size:15px; line-height:1.55;">${bodyHtml}</div>
      <hr style="border:none; border-top:1px solid rgba(26,35,33,0.08); margin:24px 0;" />
      <p style="font-size:12px; color:#8a938e; margin:0;">Non-medical companion & household support · Greater Houston</p>
    </div>
  </div>`;
}
