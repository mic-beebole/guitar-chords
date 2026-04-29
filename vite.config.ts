import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/guitar-chords/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        diatonic: resolve(__dirname, "diatonic.html"),
        compact: resolve(__dirname, "compact.html"),
        standards: resolve(__dirname, "standards.html"),
      },
    },
  },
});
