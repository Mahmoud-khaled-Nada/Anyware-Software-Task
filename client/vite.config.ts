import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // I added this
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@assets": "/public/assets",
      // Add more aliases as needed
    },
  },
  server: {
    port: 3001,
  },
});
