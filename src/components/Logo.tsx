import { useEffect, useId, useRef } from "react";
import markSvg from "../assets/logo-animated.svg?raw";

// Duración de la animación del SVG (dur="5s")
const DUR = 5;

// El SVG va inline para poder reiniciar la animación; el id del filtro se hace único
// porque el logo aparece dos veces en la página (barra y footer)
export const logoMark = (id: string) => markSvg.replace(/glow/g, id);

export function Logo({ href }: { href: string }) {
  const id = "glow" + useId().replace(/[^\w-]/g, "");
  const mark = useRef<HTMLSpanElement>(null);
  const svg = () => mark.current?.querySelector("svg") ?? null;

  // Con "reducir movimiento" se muestra directamente el último fotograma
  useEffect(() => {
    const s = svg();
    if (s && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s.pauseAnimations();
      s.setCurrentTime(DUR);
    }
  }, []);

  // Al pasar por encima se repite, solo si ya terminó
  const replay = () => {
    const s = svg();
    if (s && !s.animationsPaused() && s.getCurrentTime() >= DUR) s.setCurrentTime(0);
  };

  return (
    <a className="logo" href={href} aria-label="spbcode" onMouseEnter={replay}>
      <span ref={mark} className="logo-mark" aria-hidden="true" dangerouslySetInnerHTML={{ __html: logoMark(id) }} />
      <span className="logo-text">
        spb<span>code</span>
      </span>
    </a>
  );
}
