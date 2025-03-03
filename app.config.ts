// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default defineConfig({
  vite: {
    ssr: { external: ['drizzle-orm'] },
    plugins: [
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './app/routes',
        generatedRouteTree: './app/routeTree.gen.ts',
      }),
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './app'),
      },
    },
  },
})