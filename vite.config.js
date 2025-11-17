import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Required for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/tracker/",   // <-- MUST match repo name
});
