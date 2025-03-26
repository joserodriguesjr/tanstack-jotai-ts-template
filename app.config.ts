import { exec } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import type { Plugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function watchServiceWorker(): Plugin {
  const rebuildSW = debounce(() => {
    console.log('⚡ Rebuilding SW...');
    exec('npm run build:sw', (err) => {
      if (err) {
        console.error('❌ SW build error:', err);
      } else {
        console.log('✔ SW rebuilt successfully.');
      }
    });
  }, 300); // 300ms debounce to avoid multiple triggers

  return {
    name: 'watch-sw',
    configureServer(server) {
      server.watcher.add('app/sw.ts');
      server.watcher.on('change', (file) => {
        if (file.endsWith('app/sw.ts')) {
          rebuildSW();
        }
      });
    },
  };
}

export default defineConfig({
  server: {
    https: {
      key: './.cert/key.pem',
      cert: './.cert/cert.pem',
    },
  },
  vite: {
    ssr: { external: ['drizzle-orm'] },
    plugins: [
      watchServiceWorker(),

      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),

      tailwindcss(),

      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './app/routes',
        generatedRouteTree: './app/routeTree.gen.ts',
      }),
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, './app'),
        '@server': resolve(__dirname, './server'),
      },
    },
  },
});
