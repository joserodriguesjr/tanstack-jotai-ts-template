console.log("sw.ts");
const c = "::pokedexServiceWorker", a = "v0.0.1", o = a + c, r = [
  "/",
  "/pokemons",
  "/pokemons/",
  "/manifest.json",
  "/favicon.ico",
  // '/assets/blueprint-192x192.png',
  // '/assets/blueprint-512x384.png',
  // '/assets/blueprint-512x512.png',
  // '/assets/blueprint.png',
  // '/assets/screenshot-desktop.png',
  // '/assets/screenshot-mobile.png',
  "/icons/logo192.png",
  "/icons/logo512.png"
], d = [
  "/_build/@react-refresh",
  "/_build/@vite/client",
  "/_build/node_modules",
  "/PokeAPI"
];
self.addEventListener("install", (e) => {
  console.log("SW installing..."), e.waitUntil(
    caches.open(o).then((t) => t.addAll(r))
  ), self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  console.log("SW activating..."), e.waitUntil(
    caches.keys().then(
      (t) => Promise.all(
        t.filter((n) => n !== o).map((n) => caches.delete(n))
      )
    )
  ), self.clients.claim();
});
self.addEventListener("fetch", async (e) => {
  const t = e.request, n = new URL(e.request.url);
  d.some((s) => n.pathname.startsWith(s)) || e.respondWith(
    caches.open(o).then((s) => s.match(t).then((i) => i || fetch(t).then((l) => (s.put(t, l.clone()), l))))
  );
});
