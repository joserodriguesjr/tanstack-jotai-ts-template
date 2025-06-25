// vite.sw.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: ".temp/",
    emptyOutDir: false,
    lib: {
      entry: "src/sw.ts",
      formats: ["es"],
      fileName: () => "sw.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
