import { error } from "./util.js";
registraServiceWorker();
/* Registra un service worker para instalar la aplicación en el
 * caché del navegador. */
async function registraServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registro = await navigator.serviceWorker.register("sw.js");
      console.log("Service Worker registrado.");
      console.log(registro);
    } catch (e) {
      error(e);
    }
  }
}