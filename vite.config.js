import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
    // لغينا الـ manualChunks عشان نمنع تداخل المكتبات
    rollupOptions: {
      output: {
        // ده هيخلي أسماء الملفات منظمة بس من غير ما يدمجهم في chunks تعمل مشاكل
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      },
    },
  },
});