/** Funciones para html.
 *  @module */

export const urlSearchParams = new URLSearchParams(location.search);

/** devuelve el valor de un parámetro de la página.
 * @param {?string} name nombre del parámetro que se busca.
 * @returns {?string} valor del parámetro, o null si no lo encuentra. */
export function getURLSearchParam(name) {
  return name ? urlSearchParams.get(name) : null;
}