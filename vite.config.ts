import { exec } from 'child_process';

import type { Plugin } from 'vite';
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

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
  }, 300);

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
    port: 3000,
  },
  ssr: { external: ['drizzle-orm'] },
  plugins: [
    watchServiceWorker(),

    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      spa: {enabled: true},
  //     // target: 'digital-ocean', // old preset
  //     tsr:{
  //       srcDirectory: './app',
  //       target: 'react',
  //       autoCodeSplitting: true,
  //       target: 'react',
  //       routesDirectory: './app/routes',
  //       generatedRouteTree: './app/routeTree.gen.ts',
  //     }
    }),

    tailwindcss(),
  ],
});
// .then((config) => {
//   return config.addRouter({
//     name: 'websocket',
//     type: 'http',
//     handler: './app/ws.ts',
//     target: 'server',
//     base: '/_ws',
//   });
// });
