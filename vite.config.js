import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server : {
    allowedHosts : ['41240f34f5c0.ngrok-free.app']
  },
  plugins: [
    tailwindcss(),
    react()],
});
