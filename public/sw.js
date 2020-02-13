const CACHE = "gilpginst-1.008";
const CACHE_EXTRA = "gilpginstExtra";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "cmp/mi-diapo.js",
  "cmp/mi-footer.js",
  "css/codepoints",
  "css/colores.css",
  "css/estilos.css",
  "css/material-icons.css",
  "css/MaterialIcons-Regular.eot",
  "css/MaterialIcons-Regular.ijmap",
  "css/MaterialIcons-Regular.svg",
  "css/MaterialIcons-Regular.ttf",
  "css/MaterialIcons-Regular.woff",
  "css/MaterialIcons-Regular.woff2",
  "lib/databind.js",
  "lib/htmlUtil.js",
  "lib/registraServiceWorker.js",
  "lib/swipe.js",
  "lib/title.js",
  "chrome.html",
  "cuenta_gmail.html",
  "cuenta_oracle.html",
  "favicon.ico",
  "firebcli.html",
  "firefox.html",
  "git.html",
  "github.html",
  "icono.png",
  "index.html",
  "jdk8.html",
  "jeliot3.html",
  "manifest.json",
  "netbeans.html",
  "payara.html",
  '/'
];

// @ts-ignore
self.addEventListener("install",
  /** @param {{waitUntil:(pr:Promise)=>void}} evt */
  evt => {
    console.log("Service Worker instalado.");
    // Realiza la instalación: carga los archivos requeridos en la caché.
    evt.waitUntil(cargaCache());
  });
// @ts-ignore
self.addEventListener("fetch",
  /**@param {{request: Request;respondWith:(pr:Promise<Response>) =>void}} ev*/
  ev => {
    if (ev.request.method === "GET") {
      ev.respondWith(cargaRequest(ev));
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
 * @param {{ request: Request; }} evt
 * @returns {Promise<Response>}*/
async function cargaRequest(evt) {
  const cache = await caches.open(CACHE);
  const respCache = await cache.match(evt.request, { ignoreSearch: true });
  if (respCache) {
    // Si lo encuentra en la caché pequeña devuelve esta.
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