import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export const mailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendMail(opts: { subject: string; text: string; replyTo: string }) {
  if (!mailConfigured()) {
    // Sin SMTP en desarrollo: el mensaje se muestra en consola
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[contact] SMTP no configurado, mensaje no enviado:\n${opts.subject}\n${opts.text}\n`);
      return;
    }
    throw new Error("SMTP no configurado");
  }
  await getTransporter().sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to: process.env.MAIL_TO ?? process.env.SMTP_USER,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}
