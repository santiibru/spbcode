import type { Dict, Locale } from "../i18n";
import { localePath } from "../i18n";
import { Logo } from "./Logo";


export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <Logo href={localePath(lang)} />
        <small>
          © spbcode · {new Date().getFullYear()} · {dict.footer.rights}
        </small>
      </div>
    </footer>
  );
}
