import { type FormEvent, useEffect, useState } from "react";
import { SITE } from "../config";
import type { Dict, Locale } from "../i18n";
import type { ContactStatus, NeedValue } from "../i18n/types";
import { SectionHead } from "./SectionHead";
import { ArrowIcon } from "./icons";

type Status = "idle" | "sending" | ContactStatus;
type Field = "name" | "email" | "need" | "message";

const statuses: ContactStatus[] = ["ok", "invalid", "rate", "error"];
const needs: NeedValue[] = ["appointments", "portfolio", "landing", "other"];

// El formulario funciona también sin JS (POST normal + redirección con ?contact=estado).
// Con JS se envía por fetch y el resultado se muestra sin recargar.
export function Contact({ lang, dict, id }: { lang: Locale; dict: Dict; id: string }) {
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Field[]>([]);

  useEffect(() => {
    const url = new URL(location.href);
    const s = url.searchParams.get("contact") as ContactStatus | null;
    if (s && statuses.includes(s)) {
      setStatus(s);
      url.searchParams.delete("contact");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setInvalid([]);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body: { ok?: boolean; fields?: Field[] } = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus("ok");
        form.reset();
      } else if (res.status === 429) {
        setStatus("rate");
      } else if (res.status === 400) {
        setStatus("invalid");
        setInvalid(body.fields ?? []);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const bad = (f: Field) => (invalid.includes(f) ? true : undefined);
  const message = status === "idle" || status === "sending" ? "" : t.status[status];

  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap contact">
        <div>
          <SectionHead id={id} kicker={t.kicker} title={t.title} lead={t.lead} />
          <p className="expectation">{t.expectation}</p>
          <p className="alt">
            {t.altEmail} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>

        <form className="form" action="/api/contact" method="post" onSubmit={onSubmit} noValidate={false}>
          <input type="hidden" name="lang" value={lang} />
          <div className="row row-2">
            <div className="field">
              <label htmlFor="cf-name">{t.fields.name}</label>
              <input id="cf-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={bad("name")} />
            </div>
            <div className="field">
              <label htmlFor="cf-email">{t.fields.email}</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={bad("email")} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-need">{t.fields.need}</label>
            <select id="cf-need" name="need" required defaultValue="" aria-invalid={bad("need")}>
              <option value="" disabled>
                {t.needPlaceholder}
              </option>
              {needs.map((n) => (
                <option key={n} value={n}>
                  {t.needs[n]}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cf-message">{t.fields.message}</label>
            <textarea id="cf-message" name="message" rows={6} required minLength={10} maxLength={5000} aria-invalid={bad("message")} />
          </div>
          {/* Honeypot: invisible para personas, los bots suelen completarlo */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="cf-website">{t.honeypot}</label>
            <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="form-foot">
            <button className="cta" type="submit" disabled={status === "sending"}>
              <span>{status === "sending" ? t.sending : t.submit}</span>
              <ArrowIcon />
            </button>
          </div>
          <p className={`status ${status === "ok" ? "ok" : "err"}`} role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
