/// <reference lib="WebWorker" />

// import { get, set } from 'idb-keyval';

export type {};
declare const self: ServiceWorkerGlobalScope;

console.log('sw.ts');

const SW_NAME = '::pokedexServiceWorker';
const VERSION = 'v0.0.1';
const CACHE_NAME = VERSION + SW_NAME;

// const OFFLINE_URL = '/';
const ASSETS = [
  '/',
  '/pokemons',
  '/pokemons/',
  '/manifest.json',
  '/favicon.ico',

  // '/assets/blueprint-192x192.png',
  // '/assets/blueprint-512x384.png',
  // '/assets/blueprint-512x512.png',
  // '/assets/blueprint.png',
  // '/assets/screenshot-desktop.png',
  // '/assets/screenshot-mobile.png',

  '/icons/logo192.png',
  '/icons/logo512.png',
];

const IGNORED_PATHS = [
  '/_build/@react-refresh',
  '/_build/@vite/client',
  '/_build/node_modules',
  '/PokeAPI',
];

self.addEventListener('install', (event) => {
  console.log('SW installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW activating...');

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );

  self.clients.claim();
});

self.addEventListener('fetch', async (event) => {
  const request = event.request;
  const url = new URL(event.request.url);

  // Ignore Vite's dev assets (avoids caching problems in dev mode)
  if (IGNORED_PATHS.some((ignored) => url.pathname.startsWith(ignored))) {
    return;
  }

  // console.log('url.pathname = ', url.pathname);

  // Serve from cache first, then fallback to network
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          })
        );
      });
    }),
  );

  return;

  // // Handle navigation requests (HTML pages)
  // if (request.mode === 'navigate') {
  //   console.log('NAVIGATE');
  //   // console.log('request = ', request);
  //   // console.log('url = ', url);
  //   // console.log('url.pathname = ', url.pathname);
  //   event.respondWith(fetch(request).catch(() => caches.match('/pokemons')));
  //   return;
  // }

  // // Cache static assets (CSS, JS, images, fonts, etc.)
  // if (
  //   url.pathname.endsWith('.css') ||
  //   url.pathname.endsWith('.js') ||
  //   url.pathname.endsWith('.jsx') ||
  //   url.pathname.endsWith('.ts') ||
  //   url.pathname.endsWith('.tsx') ||
  //   url.pathname.endsWith('.png') ||
  //   url.pathname.endsWith('.jpg') ||
  //   url.pathname.endsWith('.svg') ||
  //   url.pathname.endsWith('.ico') ||
  //   url.pathname.endsWith('.woff') ||
  //   url.pathname.endsWith('.woff2') ||
  //   url.pathname.endsWith('.ttf') ||
  //   url.pathname.endsWith('.json')
  // ) {
  //   console.log('CACHE');
  //   // console.log('request = ', request);
  //   // console.log('url = ', url);
  //   // console.log('url.pathname = ', url.pathname);
  //   event.respondWith(
  //     caches.open(CACHE_NAME).then((cache) => {
  //       return cache.match(request).then((cachedResponse) => {
  //         return (
  //           cachedResponse ||
  //           fetch(request).then((networkResponse) => {
  //             cache.put(request, networkResponse.clone());
  //             return networkResponse;
  //           })
  //         );
  //       });
  //     }),
  //   );
  //   return;
  // }

  // if (url.pathname.startsWith('/_server/')) {
  //   console.log('SERVER');

  //   const serverFn = url.pathname.split('/_server/')[1];
  //   const payload = JSON.parse(
  //     decodeURIComponent(url.searchParams.get('payload')),
  //   );
  //   let data = payload.data;

  //   if (typeof data === 'object' && data !== null) {
  //     data = `search:${data['search']},pageParam:${data['pageParam']}`;
  //   }

  //   const key = `[serverFn=${serverFn}+data=${data}]`;

  //   const cachedResponse = await get(key);
  //   if (cachedResponse) {
  //     console.log('[SW] Getting from cache...');
  //     return new Response(JSON.stringify(cachedResponse.response), {
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //   }

  //   try {
  //     const response = await fetch(request);
  //     console.log('Response = ', response);
  //     if (response.ok) {
  //       const data = await response.clone().json();
  //       console.log('Data = ', data);
  //       console.log('[SW] Saving to cache...');
  //       await set(key, { response: data, timestamp: Date.now() });
  //     }
  //     return response;
  //   } catch (error) {
  //     return cachedResponse
  //       ? new Response(JSON.stringify(cachedResponse.response), {
  //           headers: { 'Content-Type': 'application/json' },
  //         })
  //       : new Response('Network error', { status: 500 });
  //   }
  // }
});

// const storeAssets = (request) => {};
