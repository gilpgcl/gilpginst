const CACHE = "gilpginst";
const CACHE_EXTRA = "gilpginstExtra";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "cmp/mi-diapo.css",
  "cmp/mi-diapo.js",
  "css/colores.css",
  "css/estilos.css",
  "img/icono.png",
  "lib/polycustom.js",
  "lib/registraServiceWorker.js",
  "lib/util.js",
  "cuenta_gmail.html",
  "cuenta_oracle.html",
  "favicon.ico",
  "git.html",
  "github.html",
  "index.html",
  "jdk8.html",
  "jelastic.html",
  "jeliot3.html",
  "manifest.json",
  "netbeans.html",
  "payara.html",
  '/'
];

self.addEventListener("install",
  /** @param {InstallEvent} evt */
  evt => {
    console.log("Service Worker instalado.");
    // Realiza la instalación: carga los archivos requeridos en la caché.
    evt.waitUntil(cargaCache());
  });
self.addEventListener("fetch",
  /** @param {FetchEvent} evt */
  evt => {
    if (evt.request.method === "GET") {
      evt.respondWith(cargaRequest(evt));
    }
  });
self.addEventListener("activate", () => console.log("Service Worker activo."));

async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}
/**
* @param {FetchEvent} evt
* @returns {Promise<Response>} */
async function cargaRequest(evt) {
  const cache = await caches.open(CACHE);
  const respCache =
    await cache.match(evt.request, { ignoreSearch: true });
  if (respCache) {
    // Si lo encuentra en la caché pequeña devuelve esta y actualiza.
    actualizaResponse(cache, evt.request);
    return respCache;
  } else {
    // Como no está en la caché pequeña, lo busca en la grande.
    const cacheImg = await caches.open(CACHE_EXTRA);
    const respCacheImg =
      await cacheImg.match(evt.request, { ignoreSearch: true });
    // Actualiza en la grande esté o no y recupera el Promise<Response>.
    const respFetch = actualizaResponse(cacheImg, evt.request);
    // Si está en la caché lo devuelve y si no, devuelve el fetch.
    return respCacheImg ? respCacheImg : respFetch;
  }
}
/**
 * @param {Cache} cache
 * @param {Request} request
 * @returns {Promise<Response>} */
function actualizaResponse(cache, request) {
  const respFetch = fetch(request);
  respFetch.then(async response => {
    try {
      await cache.put(request, response.clone());
    } catch (e) {
      console.log(e);
      // Cuando la caché se llena, la vacía.
      const keys = await cache.keys();
      Promise.all(keys.map(key => cache.delete(key)));
    }
  });
  return respFetch;
}