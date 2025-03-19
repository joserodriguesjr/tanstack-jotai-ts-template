import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
//import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      //VitePWA({
      //registerType: 'autoUpdate',
      // injectManifest: {},
      //injectRegister: 'inline',
      // manifest: {
      //   name: 'Pokemon App',
      //   short_name: 'Pokemon',
      //   description: 'A PWA for browsing Pokémon data',
      //   theme_color: '#ffffff',
      //   background_color: '#ffffff',
      //   display: 'standalone',
      //   icons: [
      //     { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', },
      //     { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', },
      //   ],
      // },
      //workbox: {
      // globPatterns: ['*/*.*', '*.*'],
      // globPatterns: ['**/*.{js,css}'],
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ request }) => request.destination === 'document',
      //       handler: 'NetworkFirst',
      //     },
      //     {
      //       urlPattern: ({ request }) =>
      //         ['style', 'script', 'image'].includes(request.destination),
      //       handler: 'CacheFirst',
      //     },
      //     {
      //       urlPattern: /^https:\/\/pokeapi\.co\//,
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'pokemon-api-cache',
      //         expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
      //       },
      //     },
      //     {
      //       urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/, // Match image requests
      //       handler: 'CacheFirst', // Serve from cache first
      //       options: {
      //         cacheName: 'pokemon-image-cache',
      //         expiration: {
      //           maxEntries: 100, // Limit stored images
      //           maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      //         },
      //       },
      //   }
      // ],
      //  },
      //}),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './app'),
      },
    },
  },
});
