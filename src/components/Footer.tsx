import type { Dict, Locale } from "../i18n";
import { localePath } from "../i18n";


export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <a className="logo" href={localePath(lang)} aria-label="spbcode">
          spb<span>code</span>
        </a>
        <small>
          © spbcode · {new Date().getFullYear()} · {dict.footer.rights}
        </small>
      </div>
    </footer>
  );
}
