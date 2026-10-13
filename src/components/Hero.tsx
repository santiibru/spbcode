import type { Dict } from "../i18n";
import { CodeBackground } from "./CodeBackground";
import { ArrowIcon } from "./icons";

export function Hero({ dict, contactId }: { dict: Dict; contactId: string }) {
  const t = dict.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <CodeBackground />
      <div className="veil" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-content">
          <p className="eyebrow">
            <span>{t.eyebrow}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <h1 id="hero-title">
            {t.titleBefore}
            <em>{t.titleEm}</em>
            {t.titleAfter}
          </h1>
          <p className="sub">{t.sub}</p>
          <div className="actions">
            <a className="cta" href={`#${contactId}`}>
              <span>{t.cta}</span>
              <ArrowIcon />
            </a>
            <span className="note">{t.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
