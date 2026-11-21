import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        impressum: "impressum.html",
        datenschutz: "datenschutz.html",
        "entwurf-transporte": "demos/entwurf-muster-transporte/index.html",
        "entwurf-logistik": "demos/entwurf-muster-logistik/index.html",
      },
    },
  },
});
