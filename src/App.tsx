import { type Dict, type Locale, sectionIds } from "./i18n";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Method } from "./components/Method";
import { Services } from "./components/Services";
import { TopBar } from "./components/TopBar";
import { Works } from "./components/Works";

export function App({ lang, dict }: { lang: Locale; dict: Dict }) {
  const ids = sectionIds[lang];
  return (
    <>
      <a className="skip" href="#main">
        {dict.nav.skip}
      </a>
      <TopBar lang={lang} dict={dict} />
      <main id="main" tabIndex={-1}>
        <Hero dict={dict} contactId={ids.contact} />
        <Services dict={dict} id={ids.services} />
        <Works dict={dict} id={ids.works} />
        <Method dict={dict} id={ids.method} />
        <About dict={dict} id={ids.about} />
        <Contact lang={lang} dict={dict} id={ids.contact} />
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
