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
        "demo-transporte": "demos/muster-transporte/index.html",
        "demo-logistik": "demos/muster-logistik/index.html",
      },
    },
  },
});
