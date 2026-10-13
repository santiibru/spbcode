// Para sumar un idioma: agregarlo acá, crear su diccionario (p. ej. en.ts) y sus ids de sección.
export const locales = ["it", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export const localeNames: Record<Locale, string> = { it: "Italiano", es: "Español" };
export const ogLocales: Record<Locale, string> = { it: "it_IT", es: "es_ES" };

// Clave de localStorage con la elección explícita del usuario
export const LANG_KEY = "spb-lang";

export const isLocale = (v: unknown): v is Locale => locales.includes(v as Locale);

export const sectionKeys = ["services", "works", "method", "about", "contact"] as const;
export type SectionKey = (typeof sectionKeys)[number];

export const sectionIds: Record<Locale, Record<SectionKey, string>> = {
  it: { services: "servizi", works: "lavori", method: "metodo", about: "chi-sono", contact: "contatto" },
  es: { services: "servicios", works: "trabajos", method: "metodo", about: "sobre-mi", contact: "contacto" },
};

export const localePath = (l: Locale) => `/${l}/`;
