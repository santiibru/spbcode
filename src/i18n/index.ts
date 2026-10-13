import type { Dict } from "./types";
import type { Locale } from "./locales";

export * from "./locales";
export type { Dict } from "./types";

// En el cliente cada página carga solo su diccionario
export const loadDict: Record<Locale, () => Promise<Dict>> = {
  it: () => import("./it").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
};
