import { type ReactNode, useEffect, useRef, useState } from "react";
import type { Dict } from "../i18n";
import { SectionHead } from "./SectionHead";

type Demo = Dict["works"]["demo"];

// Animaciones de demostración (decorativas, con datos ficticios). Cada escena avanza por
// pasos: la raíz lleva data-step y las clases s0…sN acumuladas, y el CSS hace el resto.
// Duración de cada paso en ms y paso que se muestra fijo con "reducir movimiento".
const SCENES = [
  { steps: [1500, 1100, 1300, 3200, 2400, 3200], poster: 5 },
  { steps: [2200, 1600, 2200, 1500], poster: 0 },
  { steps: [1300, 1900, 1700, 1000, 800, 2800], poster: 5 },
];

// Solo corre mientras se ve en pantalla y la pestaña está activa
function useScene(kind: number) {
  const { steps, poster } = SCENES[kind];
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setStep(poster);
      return;
    }
    let i = 0, timer = 0, visible = false;
    const tick = () => {
      setStep(i);
      timer = window.setTimeout(() => {
        i = (i + 1) % steps.length;
        tick();
      }, steps[i]);
    };
    const start = () => { if (!timer && visible && !document.hidden) tick(); };
    const stop = () => { clearTimeout(timer); timer = 0; };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    }, { threshold: 0.35 });
    io.observe(ref.current!);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [steps, poster]);

  const cls = Array.from({ length: step + 1 }, (_, k) => "s" + k).join(" ");
  return { ref, step, still, cls };
}

// Texto que se "escribe" letra por letra mientras el paso está activo
function Typed({ text, active, still, delay = 0 }: { text: string; active: boolean; still: boolean; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return setN(0);
    if (still) return setN(text.length);
    let k = 0, iv = 0;
    const d = window.setTimeout(() => {
      iv = window.setInterval(() => {
        setN(++k);
        if (k >= text.length) clearInterval(iv);
      }, 60);
    }, delay);
    return () => { clearTimeout(d); clearInterval(iv); };
  }, [active, still, text, delay]);
  return <>{text.slice(0, n)}</>;
}

function Frame({ kind, children }: { kind: number; children: (s: ReturnType<typeof useScene>) => ReactNode }) {
  const scene = useScene(kind);
  return (
    <div ref={scene.ref} className={`frame dm-${"abc"[kind]} ${scene.cls}`} data-step={scene.step} aria-hidden="true">
      <div className="frame-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="dm-screen">
        <div className="dm-ui">{children(scene)}</div>
      </div>
    </div>
  );
}

function Booking({ t }: { t: Demo["booking"] }) {
  return (
    <Frame kind={0}>
      {({ step, still }) => (
        <>
          <div className="dm-view dm-client">
            <div className="dm-head">
              <div className="dm-title">{t.title}</div>
              <div className="dm-sub">{t.sub}</div>
              <div className="dm-days">
                {t.days.map((d, i) => (
                  <span key={i} className={i === 2 ? "dm-day sel" : "dm-day"}>
                    <i>{d}</i>
                    {19 + i}
                  </span>
                ))}
              </div>
            </div>
            <div className="dm-slots">
              <div className="dm-slot first">
                <div className="dm-row">
                  <span>19:00 – 19:30</span>
                  <span className="dm-btn">{t.book}</span>
                </div>
                <div className="dm-form">
                  <div className="dm-lbl">{t.name}</div>
                  <div className="dm-field"><Typed text="Mario Rossi" active={step >= 3} still={still} /></div>
                  <div className="dm-lbl">Email</div>
                  <div className="dm-field"><Typed text="mario@email.com" active={step >= 3} still={still} delay={1100} /></div>
                  <div className="dm-btns">
                    <span>{t.cancel}</span>
                    <span className="ok">{t.confirm}</span>
                  </div>
                </div>
              </div>
              {["19:30 – 20:00", "20:00 – 20:30"].map((h) => (
                <div key={h} className="dm-slot">
                  <div className="dm-row">
                    <span>{h}</span>
                    <span className="dm-btn">{t.book}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="dm-done">
              <div className="dm-check">✓</div>
              <div>{t.done}</div>
            </div>
          </div>
          <div className="dm-view dm-panel">
            <div className="dm-ptitle">
              <span>{t.agenda}</span>
              <small>{t.agendaDay}</small>
            </div>
            <div className="dm-prow">
              <span><b>18:30</b>Giulia Bianchi</span>
              <span className="dm-tag">{t.confirmed}</span>
            </div>
            <div className="dm-prow new">
              <span><b>19:00</b>Mario Rossi</span>
              <span className="dm-tag">{t.isNew}</span>
            </div>
            <div className="dm-prow free">
              <span><b>19:30</b>{t.free}</span>
            </div>
          </div>
        </>
      )}
    </Frame>
  );
}

// Imágenes de la galería; las marcadas como "rep" se apagan al filtrar
const tiles = [
  { src: "g3", rep: false },
  { src: "g5", rep: false },
  { src: "g1", rep: true },
  { src: "g4", rep: false },
  { src: "g6", rep: false },
  { src: "g2", rep: true },
];

function Gallery({ t }: { t: Demo["gallery"] }) {
  return (
    <Frame kind={1}>
      {() => (
        <>
          <div className="dm-gbar">
            <span className="brand">Elena M.</span>
            <span className="nav">
              {t.nav.map((n, i) => (
                <span key={i} className={i === 3 ? "on" : undefined}>{n}</span>
              ))}
            </span>
          </div>
          <div className="dm-gtitle">{t.title}</div>
          <div className="dm-pills">
            {t.filters.map((f, i) => (
              <span key={i} className={`dm-pill p${i + 1}`}>{f}</span>
            ))}
          </div>
          <div className="dm-tiles">
            {tiles.map(({ src, rep }) => (
              <img key={src} className={rep ? "rep" : undefined} src={`/img/works/${src}.webp`} width="420" height="315" alt="" loading="lazy" decoding="async" />
            ))}
          </div>
          <div className="dm-lb">
            <img src="/img/works/gl.webp" width="760" height="570" alt="" loading="lazy" decoding="async" />
          </div>
        </>
      )}
    </Frame>
  );
}

function Rsvp({ t }: { t: Demo["rsvp"] }) {
  return (
    <Frame kind={2}>
      {({ step, still }) => (
        <>
          <div className="dm-eyebrow">RSVP</div>
          <div className="dm-ctitle">{t.title}</div>
          <div className="dm-cform">
            <div className="dm-clabel">{t.name}</div>
            <div className="dm-cfield"><Typed text="Lucía Fernández" active={step >= 1} still={still} /></div>
            <div className="dm-clabel">Email</div>
            <div className="dm-cfield"><Typed text="lucia@email.com" active={step >= 2} still={still} /></div>
            <div className="dm-clabel">{t.attend}</div>
            <div className="dm-rads">
              <span className="dm-rad yes"><span className="dm-dot" />{t.yes}</span>
              <span className="dm-rad"><span className="dm-dot" />No</span>
            </div>
            <div className="dm-cbtn">{t.submit}</div>
          </div>
          <div className="dm-thanks">{t.thanks}</div>
        </>
      )}
    </Frame>
  );
}

function Preview({ kind, demo }: { kind: number; demo: Demo }) {
  return (
    <figure className="dm">
      {kind === 0 && <Booking t={demo.booking} />}
      {kind === 1 && <Gallery t={demo.gallery} />}
      {kind === 2 && <Rsvp t={demo.rsvp} />}
      <figcaption className="dm-cap">{demo.note}</figcaption>
    </figure>
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
              <Preview kind={i} demo={t.demo} />
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
