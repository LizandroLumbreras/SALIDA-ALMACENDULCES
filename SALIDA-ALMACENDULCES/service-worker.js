const CACHE_NAME = "provsoft-dulces-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./logo_proveedora.webp",
  "./manifest.json"
];

// Instalar y guardar en caché
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  console.log("🟢 Service Worker instalado");
});

// Responder desde caché si no hay conexión
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

// Actualizar caché si hay nueva versión
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  console.log("🟢 Service Worker activado y actualizado");
});
