import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // public/ solo se copia en el build del cliente
    copyPublicDir: !isSsrBuild,
  },
  server: {
    // en desarrollo, la API corre aparte con `npm run dev:server`
    proxy: { "/api": "http://localhost:3000" },
  },
}));
