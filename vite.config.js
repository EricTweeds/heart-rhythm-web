import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import envCompatible from "vite-plugin-env-compatible";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    envCompatible(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx}"',
      },
    }),
    svgrPlugin({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  server: {
    port: 8080,
    open: true,
  },
});
