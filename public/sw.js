const CACHE = "gilpginst";
self.addEventListener("fetch",
  /** @param {FetchEvent} evt */
  evt => {
    if (evt.request.method === "GET") {
      evt.respondWith(cargaPágina(evt));
    }
  });
/**
 * @param {FetchEvent} evt
 * @returns Promise<Response> */
async function cargaPágina(evt) {
  const cache = await caches.open(CACHE);
  const respFetch = fetch(evt.request);
  respFetch.then(response => cache.put(evt.request, response.clone()));
  const respCache =
    await cache.match(evt.request, { ignoreSearch: true });
  return respCache ? respCache : respFetch;
}