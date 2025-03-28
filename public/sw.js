const c = "::pokedexServiceWorker", o = "v0.0.1", s = o + c, i = [
  "/",
  "/pokemons",
  "/pokemons/",
  "/manifest.json",
  "/favicon.ico",
  "/icons/blueprint-192x192.png",
  "/icons/blueprint-512x384.png",
  "/icons/blueprint-512x512.png"
  // '/assets/blueprint.png',
  // '/assets/screenshot-desktop.png',
  // '/assets/screenshot-mobile.png',
], a = ["/PokeAPI"];
self.addEventListener("install", (e) => {
  console.log("SW installing..."), e.waitUntil(
    caches.open(s).then((n) => n.addAll(i))
  ), self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  console.log("SW activating..."), e.waitUntil(
    caches.keys().then(
      (n) => Promise.all(
        n.filter((t) => t !== s).map((t) => caches.delete(t))
      )
    )
  ), self.clients.claim();
});
self.addEventListener("fetch", async (e) => {
  const n = new URL(e.request.url);
  a.some((t) => n.pathname.startsWith(t)) || e.respondWith(r(e));
});
async function r(e) {
  console.log("Using network-first strategy...");
  const n = await caches.open(s);
  try {
    const t = await fetch(e.request);
    return n.put(e.request, t.clone()), t;
  } catch {
    return await n.match(e.request) || new Response("Offline", { status: 503 });
  }
}
