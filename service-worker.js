const CACHE_NAME = "provsoft-main-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./logo_proveedora.webp",
  "./manifest.json",
  "./SALIDA-ALMACENDULCES/index.html",
  "./almacen_liquido/index.html"
];

// Instala el service worker
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  console.log("✅ Service Worker instalado (raíz)");
});

// Intercepta peticiones
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

// Actualiza versión del caché
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  console.log("♻️ Caché actualizado (raíz)");
});
