// Valores editables del sitio. Los que dependen del entorno se leen de .env (ver .env.example).
export const SITE = {
  name: "spbcode",
  author: "Santi",
  url: (import.meta.env.VITE_SITE_URL ?? "https://spbcode.com").replace(/\/$/, ""),
  email: import.meta.env.VITE_CONTACT_EMAIL ?? "ciao@spbcode.com",
  // Única mención técnica del sitio
  stack: "React · TypeScript · Node.js · PostgreSQL",
  // Foto opcional para "Chi sono / Sobre mí". Ej.:
  // { avif: "/img/santi.avif", webp: "/img/santi.webp", width: 640, height: 800 }
  photo: { avif: "/img/santi.avif", webp: "/img/santi.webp", width: 896, height: 1195 } as
    | null
    | { avif?: string; webp: string; width: number; height: number },
  // Imagen para compartir en redes (1200×630), ruta dentro de public/. Ej.: "/og.png"
  ogImage: null as null | string,
};
