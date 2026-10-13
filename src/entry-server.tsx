import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { type Dict, type Locale, locales } from "./i18n";
import es from "./i18n/es";
import it from "./i18n/it";

export { locales };
export { renderHead, renderRootPage, renderNotFoundPage, renderSitemap, renderRobots } from "./seo";

const dicts: Record<Locale, Dict> = { it, es };

export function render(lang: Locale) {
  const dict = dicts[lang];
  return {
    dict,
    html: renderToString(
      <StrictMode>
        <App lang={lang} dict={dict} />
      </StrictMode>,
    ),
  };
}
