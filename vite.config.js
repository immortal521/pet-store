import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "^/api/.*": {
                target: "https://yapi.pro/mock/341554",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },

    optimizeDeps: {
        include: ["@mapbox/node-pre-gyp"],
    },
});
