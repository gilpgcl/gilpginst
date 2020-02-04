/** @module
 * Funciones que se usan en varios proyectos. */

/** Muestra una instancia de Error en la consola y muestra un diálogo
 * alert con la propiedad message del objeto.
 * @param {Error} e instancia que contiene el error. */
export function error(e) {
  console.error(e);
  alert(e.message);
}

/** Quita los espacios al inicio y al final. Sustituye cualquier secuencia de
 * espacios y saltos de línea por un solo espacio.
 * @param {string=} texto el texto a procesar.
 * @returns {string} el texto procesado*/
export function colapsaEspacios(texto) {
  return (texto || "").trim().replace(/\s+/g, " ");
}

/** Prepara un téxto para los algoritmos de búsqueda: Colapsa espacios,
 * convierte el texto a mayúsculas y finalmente, quita los acentos y tildes.
 * @param {string} texto el texto procesado. */
export function preparaParaBúsqueda(texto) {
  return colapsaEspacios(texto).toUpperCase()
    .replace(/(á|Á|é|É|í|Í|ó|Ó|ú|Ú|ñ|Ñ)/g,
      /** Sustituye un caracter acentuado por su versión no acentuada y
       * mayúscula.
       * @param {string} letra texto a reemplazar.
       * @returns {string} el texto reemplazado. */
      letra => {
        switch (letra) {
          case "á":
          case "Á": return "A";
          case "é":
          case "É": return "E";
          case "í":
          case "Í": return "I";
          case "ó":
          case "Ó": return "O";
          case "ú":
          case "Ú": return "U";
          case "ñ":
          case "Ñ": return "N";
          default: return letra;
        }
      });
}