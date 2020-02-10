registraServiceWorker();
async function registraServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registro = await navigator.serviceWorker.register("sw.js");
      console.log("Service Worker registrado.");
      console.log(registro);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }
}