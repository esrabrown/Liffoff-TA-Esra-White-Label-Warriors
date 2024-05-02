import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    server: {
        port:3000,
        proxy: {
            '/api': {
                target: "https://lidta.com/erp/public/epi/v1/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})