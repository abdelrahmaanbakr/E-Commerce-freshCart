import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Use absolute asset paths so Vercel serves bundles correctly on nested routes.
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("@tanstack/react-query")
          ) {
            return "react-vendor";
          }

          if (
            id.includes("axios") ||
            id.includes("formik") ||
            id.includes("yup") ||
            id.includes("jwt-decode")
          ) {
            return "data-vendor";
          }

          if (
            id.includes("swiper") ||
            id.includes("react-toastify") ||
            id.includes("lucide-react") ||
            id.includes("@fortawesome") ||
            id.includes("styled-components")
          ) {
            return "ui-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
