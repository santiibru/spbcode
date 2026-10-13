import type { Dict } from "../i18n";
import { SectionHead } from "./SectionHead";

export function Method({ dict, id }: { dict: Dict; id: string }) {
  const t = dict.method;
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHead id={id} kicker={t.kicker} title={t.title} />
        <ol className="steps">
          {t.steps.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
