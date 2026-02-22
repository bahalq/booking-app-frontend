import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server : {
    allowedHosts : ['booking-app.unaux.com']
  },
  plugins: [
    tailwindcss(),
    react()],
});
