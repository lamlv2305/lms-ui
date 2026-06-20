import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// Same-origin proxy to the Kratos public API so the browser avoids CORS.
// Backup POC reached Kratos at /.ory/kratos via nginx; mirror that path here.
const KRATOS_TARGET = process.env.KRATOS_URL ?? "http://localhost:4433"

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), reactRouter()],
  server: {
    proxy: {
      "/.ory/kratos": {
        target: KRATOS_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/\.ory\/kratos/, ""),
      },
    },
  },
})
