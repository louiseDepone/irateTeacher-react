import path from "path";
import react from "@vitejs/plugin-react";
import http from "https";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
