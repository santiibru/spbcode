import { useEffect, useRef, useState } from "react";
import { type Dict, type Locale, localePath, sectionIds, sectionKeys } from "../i18n";
import { LangSwitch } from "./LangSwitch";

// En móvil (≤ 820px) los enlaces pasan a un panel a pantalla completa que abre el botón de menú
const MOBILE = "(max-width: 820px)";

export function TopBar({ lang, dict }: { lang: Locale; dict: Dict }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // La barra es fija: sin fondo sobre el hero, con fondo apenas se hace scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Con el menú abierto, el resto de la página queda fuera del foco y sin scroll
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    behind.forEach((el) => (el.inert = true));
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const mq = matchMedia(MOBILE);
    const onResize = () => !mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);

    return () => {
      behind.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="topbar" data-open={open || undefined} data-scrolled={scrolled || undefined}>
      <div className="wrap">
        <a className="logo" href={localePath(lang)} aria-label="spbcode">
          spb<span>code</span>
        </a>
        <nav id="site-menu" className="site-nav" aria-label={dict.nav.menu}>
          <ul className="nav-links">
            {sectionKeys.map((k, i) => (
              <li key={k}>
                <a href={`#${sectionIds[lang][k]}`} onClick={() => setOpen(false)}>
                  <span className="nav-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {dict.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LangSwitch lang={lang} label={dict.nav.langLabel} />
        <button
          ref={button}
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
