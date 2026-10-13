import express, { type Request, type Response, Router } from "express";
import { sendMail } from "./mailer.ts";
import { rateLimit } from "./rateLimit.ts";

type Lang = "it" | "es";
type Status = "ok" | "invalid" | "rate" | "error";
type Field = "name" | "email" | "need" | "message";

// Deben coincidir con src/i18n/locales.ts
const contactIds: Record<Lang, string> = { it: "contatto", es: "contacto" };
const needLabels: Record<string, string> = {
  appointments: "Gestione appuntamenti / Gestión de turnos",
  portfolio: "Portfolio",
  landing: "Landing page",
  other: "Altro / Otra cosa",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

function validate(body: Record<string, unknown>) {
  const data = {
    name: oneLine(str(body.name)),
    email: str(body.email),
    need: str(body.need),
    message: str(body.message),
  };
  const fields: Field[] = [];
  if (data.name.length < 2 || data.name.length > 100) fields.push("name");
  if (data.email.length > 254 || !EMAIL_RE.test(data.email)) fields.push("email");
  if (!(data.need in needLabels)) fields.push("need");
  if (data.message.length < 10 || data.message.length > 5000) fields.push("message");
  return { data, fields };
}

export const contactRouter = Router();

contactRouter.post(
  "/contact",
  express.json({ limit: "16kb" }),
  express.urlencoded({ extended: false, limit: "16kb" }),
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }),
  async (req: Request, res: Response) => {
    const body: Record<string, unknown> = req.body ?? {};
    const lang: Lang = body.lang === "es" ? "es" : "it";
    // fetch pide JSON; el formulario sin JS recibe una redirección a la página
    const wantsJson = req.is("application/json") || req.accepts(["html", "json"]) === "json";

    const reply = (status: Status, code: number, extra: object = {}) => {
      if (wantsJson) return res.status(code).json({ ok: status === "ok", error: status === "ok" ? undefined : status, ...extra });
      res.redirect(303, `/${lang}/?contact=${status}#${contactIds[lang]}`);
    };

    if (res.locals.limited) return reply("rate", 429);

    // Honeypot completado: se responde como si todo hubiera ido bien, sin enviar nada
    if (str(body.website)) return reply("ok", 200);

    const { data, fields } = validate(body);
    if (fields.length) return reply("invalid", 400, { fields });

    try {
      await sendMail({
        subject: `[spbcode] ${needLabels[data.need]} — ${data.name}`,
        replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
        text: [
          `Nombre: ${data.name}`,
          `Email: ${data.email}`,
          `Necesita: ${needLabels[data.need]}`,
          `Idioma: ${lang}`,
          `IP: ${req.ip}`,
          "",
          data.message,
        ].join("\n"),
      });
      reply("ok", 200);
    } catch (err) {
      console.error("[contact] error al enviar:", err);
      reply("error", 500);
    }
  },
);
