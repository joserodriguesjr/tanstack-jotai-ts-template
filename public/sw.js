console.log("sw.ts");
const o = "::pokedexServiceWorker", c = "v0.0.1", n = c + o, a = [
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
], i = ["/PokeAPI"];
self.addEventListener("install", (e) => {
  console.log("SW installing..."), e.waitUntil(
    caches.open(n).then((t) => t.addAll(a))
  ), self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  console.log("SW activating..."), e.waitUntil(
    caches.keys().then(
      (t) => Promise.all(
        t.filter((s) => s !== n).map((s) => caches.delete(s))
      )
    )
  ), self.clients.claim();
});
self.addEventListener("fetch", async (e) => {
  const t = new URL(e.request.url);
  i.some((s) => t.pathname.startsWith(s)) || e.respondWith(r(e));
});
async function r(e) {
  console.log("Using network-first strategy...");
  const t = await caches.open(n);
  try {
    const s = await fetch(e.request);
    return t.put(e.request, s.clone()), s;
  } catch {
    return await t.match(e.request) || new Response("Offline", { status: 503 });
  }
}
