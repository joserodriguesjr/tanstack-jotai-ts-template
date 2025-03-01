// app.config.ts
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { defineConfig } from '@tanstack/react-start/config'
import { fileURLToPath } from 'url';
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      TanStackRouterVite(),
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './app'),
      },
    },
  },
})