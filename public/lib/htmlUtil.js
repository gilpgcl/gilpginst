/** Funciones para html.
 *  @module */

export const urlSearchParams = new URLSearchParams(location.search);

/** devuelve el valor de un parámetro de la página.
 * @param {?string} name nombre del parámetro que se busca.
 * @returns {?string} valor del parámetro, o null si no lo encuentra. */
export function getURLSearchParam(name) {
  return name ? urlSearchParams.get(name) : null;
}

/** Elimina todas las etiquetas que abren o cierran los element script, de un
 * texto HTML.
 * @param {string} html texto HTML.
 * @returns {string} texto HTML sin las etiquetas que abren o cierran los
 * element script */
export function sinScript(html) {
  // Reemplaza todas las ocurrencias de <script> y </script> por texto vacío.
  return (html || "").replace(/(\<script\>)|(\<\/script\>)/g, "");
}

/** Map que contiene el texto de escape de los caracteres especiales de
 * HTML.
 * @type {Readonly<Map<string, string>> } */
const codMap = Object.freeze(new Map([['&', '&amp;'], ['<', '&lt;'],
['>', '&gt;'], ['"', '&quot;'], ["'", '&#039;']]));

/** Codifica un texto para que escape los caracteres especiales y no se
 * pueda interpretar como HTML. Esta técnica evita la inyección de código.
 * @param {string} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
export function cod(texto) {
  return (texto || "").replace(/[&<>"']/g, letra => codMap.get(letra));
}

/** codifica una url para que se interprede correctamente en un element a.
 * @param {string} url url que se codifica.
 * @returns {string} la url codificada. */
export function url(url) {
  return cod(encodeURIComponent(url));
}
/** Indica si un input type="file" tiene un archivo seleccionado.
 * @param {HTMLInputElement} file input que se analiza.
 * @returns {File} devuelve el archivo seleccionado; en otro caso, false. */
export function fileSeleccionado(file) {
  return file.files && file.files[0];
}