import { SITE } from "../config";
import type { Dict } from "../i18n";
import { SectionHead } from "./SectionHead";

export function About({ dict, id }: { dict: Dict; id: string }) {
  const t = dict.about;
  const photo = SITE.photo;
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className={photo ? "wrap about has-photo" : "wrap about"}>
        <div>
          <SectionHead id={id} kicker={t.kicker} title={t.title} />
          <div className="about-text">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="stack">
            {(Object.keys(SITE.stack) as (keyof typeof SITE.stack)[]).map((k) => (
              <div key={k}>
                <dt>{t.stackLabels[k]}</dt>
                <dd>{SITE.stack[k].join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        {photo && (
          <picture className="photo">
            {photo.avif && <source srcSet={photo.avif} type="image/avif" />}
            <img
              src={photo.webp}
              width={photo.width}
              height={photo.height}
              alt={t.photoAlt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        )}
      </div>
    </section>
  );
}
