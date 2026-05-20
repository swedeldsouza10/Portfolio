import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT) || 587;

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Keep total worst-case under Vercel's 15s function budget.
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 8000,
});

export interface MailOptions {
  name: string;
  email: string;
  message: string;
}

/** Escape user-controlled input before placing it in the email HTML. */
function esc(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail({ name, email, message }: MailOptions) {
  const safeName = esc(name);
  const safeEmail = esc(email);
  const safeMessage = esc(message).replace(/\r?\n/g, "<br />");

  const sentAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // Theme palette (blue → sky → cyan)
  const BLUE = "#2563EB";
  const SKY = "#38BDF8";
  const CYAN = "#22D3EE";
  const BG = "#060A14";
  const CARD = "#0F1626";
  const PANEL = "#131C2E";
  const BORDER = "#243246";
  const TEXT = "#E6EDF7";
  const MUTED = "#94A3B8";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
<!-- preheader (hidden inbox preview) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BG};font-size:1px;line-height:1px;">
  New message from ${safeName} — ${safeEmail}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${CARD};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

        <!-- gradient header band -->
        <tr>
          <td style="background:${BLUE};background:linear-gradient(120deg,${BLUE} 0%,${SKY} 55%,${CYAN} 100%);padding:28px 36px;">
            <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.85);font-weight:600;">
              Portfolio &middot; Contact
            </div>
            <div style="margin-top:8px;font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">
              New Portfolio Message
            </div>
          </td>
        </tr>

        <!-- intro -->
        <tr>
          <td style="padding:32px 36px 8px 36px;">
            <p style="margin:0;font-size:15px;line-height:1.6;color:${MUTED};">
              Someone reached out via your portfolio contact form.
            </p>
          </td>
        </tr>

        <!-- details -->
        <tr>
          <td style="padding:16px 36px 8px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid ${BORDER};width:90px;font-size:13px;color:${MUTED};">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:15px;color:${TEXT};font-weight:600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:13px;color:${MUTED};">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:15px;">
                  <a href="mailto:${safeEmail}" style="color:${SKY};text-decoration:none;font-weight:600;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:13px;color:${MUTED};">Received</td>
                <td style="padding:10px 0;font-size:14px;color:${TEXT};">${sentAt} IST</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- message -->
        <tr>
          <td style="padding:20px 36px 8px 36px;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};font-weight:600;margin-bottom:10px;">
              Message
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PANEL};border:1px solid ${BORDER};border-left:3px solid ${SKY};border-radius:10px;">
              <tr>
                <td style="padding:18px 20px;font-size:15px;line-height:1.7;color:${TEXT};">
                  ${safeMessage}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:24px 36px 32px 36px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:10px;background:${BLUE};background:linear-gradient(120deg,${BLUE},${CYAN});">
                  <a href="mailto:${safeEmail}?subject=Re:%20your%20message%20via%20my%20portfolio"
                     style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">
                    Reply to ${safeName} &rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid ${BORDER};background:${BG};">
            <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">
              Sent automatically from your portfolio contact form.
              Reply directly to this email to respond to ${safeName}.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = `New Portfolio Message
Someone reached out via your portfolio contact form.

Name:     ${name}
Email:    ${email}
Received: ${sentAt} IST

Message:
${message}

— Reply directly to this email to respond.`;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_TO,
    replyTo: `"${name}" <${email}>`,
    subject: `New message from ${name} via Portfolio`,
    text,
    html,
  });
}
