import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: resolve("./static"),
    base: "/static/",
    build: {
        emptyOutDir: true,
        manifest: "manifest.json",
        outDir: resolve("./static/directory/dist"),
        rollupOptions: {
            input: {
                index: resolve("./static/directory/js/index.jsx"),
                css: resolve("./static/directory/css/styles.css"),
            },
        },
    },
});
