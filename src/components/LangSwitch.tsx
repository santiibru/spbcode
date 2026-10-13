import type { MouseEvent } from "react";
import { LANG_KEY, type Locale, localeNames, localePath, locales, sectionIds, sectionKeys } from "../i18n";

interface Props {
  lang: Locale;
  label: string;
}

// Enlaces reales a /it/ y /es/: funcionan sin JS y los buscadores los siguen.
// Con JS, además guardan la elección y conservan la sección actual.
export function LangSwitch({ lang, label }: Props) {
  function go(e: MouseEvent<HTMLAnchorElement>, target: Locale) {
    e.preventDefault();
    if (target === lang) return;
    try {
      localStorage.setItem(LANG_KEY, target);
    } catch {
      /* almacenamiento no disponible: la navegación sigue igual */
    }
    const hash = decodeURIComponent(location.hash.slice(1));
    const key = sectionKeys.find((k) => sectionIds[lang][k] === hash);
    location.assign(localePath(target) + (key ? `#${sectionIds[target][key]}` : ""));
  }

  return (
    <div className="lang" role="group" aria-label={label}>
      {locales.map((l) => (
        <a
          key={l}
          href={localePath(l)}
          hrefLang={l}
          lang={l}
          title={localeNames[l]}
          aria-current={l === lang ? "page" : undefined}
          onClick={(e) => go(e, l)}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
