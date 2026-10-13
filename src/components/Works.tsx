import type { Dict } from "../i18n";
import { SectionHead } from "./SectionHead";

// Vistas esquemáticas de cada proyecto (decorativas). Si más adelante hay capturas,
// reemplazar por <img> WebP/AVIF con width/height y loading="lazy".
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const booked = new Set([3, 8, 9, 15, 17, 22, 24]);

function Preview({ kind }: { kind: number }) {
  return (
    <div className="frame" aria-hidden="true">
      <div className="frame-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="frame-body">
        {kind === 0 && (
          <div className="mock-cal">
            {range(28).map((i) => (
              <i key={i} className={booked.has(i) ? "on" : i % 7 > 4 ? "off" : ""} />
            ))}
          </div>
        )}
        {kind === 1 && (
          <div className="mock-gallery">
            {range(5).map((i) => (
              <i key={i} />
            ))}
          </div>
        )}
        {kind === 2 && (
          <div className="mock-rsvp">
            <i className="l1" />
            <i className="l2" />
            <i className="field" />
            <i className="field" />
            <span>
              <i className="pill on" />
              <i className="pill" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Works({ dict, id }: { dict: Dict; id: string }) {
  const t = dict.works;
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHead id={id} kicker={t.kicker} title={t.title} lead={t.lead} />
        <ul className="works">
          {t.items.map((item, i) => (
            <li key={item.title} className={i === 0 ? "card work featured" : "card work"}>
              <Preview kind={i} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className="tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
