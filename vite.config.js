import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "redux",
      "framer-motion",
      "lucide-react",
      "d3",
      "axios",
    ],
  },
});
