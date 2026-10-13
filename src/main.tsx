import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { defaultLocale, isLocale, loadDict } from "./i18n";
import "./styles.css";

const root = document.getElementById("root")!;
const fromPath = location.pathname.split("/")[1];
const lang = isLocale(fromPath) ? fromPath : isLocale(document.documentElement.lang) ? document.documentElement.lang : defaultLocale;

loadDict[lang]().then((dict) => {
  const app = (
    <StrictMode>
      <App lang={lang} dict={dict} />
    </StrictMode>
  );
  // En producción el HTML ya viene prerenderizado; en desarrollo se renderiza desde cero
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
