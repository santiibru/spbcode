import type { ReactNode } from "react";
import type { Dict } from "../i18n";
import { SectionHead } from "./SectionHead";
import { CalendarIcon, CheckIcon, LayoutIcon, TargetIcon } from "./icons";

const icons: ReactNode[] = [<CalendarIcon />, <LayoutIcon />, <TargetIcon />];

// Agenda ilustrativa del servicio principal (decorativa)
const slots = [
  { time: "09:00", state: "taken" },
  { time: "10:30", state: "" },
  { time: "12:00", state: "picked" },
  { time: "15:00", state: "taken" },
  { time: "16:30", state: "" },
  { time: "18:00", state: "" },
];

export function Services({ dict, id }: { dict: Dict; id: string }) {
  const t = dict.services;
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHead id={id} kicker={t.kicker} title={t.title} lead={t.lead} />
        <ul className="services">
          {t.items.map((item, i) => (
            <li key={item.title} className={i === 0 ? "card featured" : "card"}>
              <div className="card-top">
                <span className="icon">{icons[i]}</span>
                {i === 0 && <span className="tag">{t.featuredTag}</span>}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {i === 0 && (
                <div className="slots" aria-hidden="true">
                  <div className="slots-box">
                    <div className="slots-head">
                      <span>{t.demo.day}</span>
                      <span>‹ ›</span>
                    </div>
                    <div className="slot-grid">
                      {slots.map((s) => (
                        <span key={s.time} className={`slot ${s.state}`}>
                          {s.time}
                        </span>
                      ))}
                    </div>
                    <div className="slots-foot">
                      <CheckIcon />
                      {t.demo.confirmed}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="services-note">{t.note}</p>
      </div>
    </section>
  );
}
