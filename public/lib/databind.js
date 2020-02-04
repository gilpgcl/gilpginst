
/** Enlaza los eventos indicados en el atributo "data-eventos" en el element
 * padre o sus hijos con los métodos del objeto indicados en atributo
 * "data-acciones", o si no tienen este atributo, el método debe llamarse como
 * el evento.
 * @param {HTMLElement} padre element con el que se enlazan las acciones.
 * @param {Object} obj objeto con el que se enlazan las acciones. */
export function enlazaAcciones(padre, obj) {
  if (padre.dataset.eventos) {
    enlazaAcción(padre, obj);
  }
  /** @type {HTMLElement[]} */
  const elements = Array.from(padre.querySelectorAll(`[data-eventos]`));
  for (const element of elements) {
    enlazaAcción(element, obj);
  }
}

/**
 * @param {HTMLElement} element
 * @param {Object} obj */
function enlazaAcción(element, obj) {
  const eventos =
    element.dataset.eventos ? element.dataset.eventos.split(/\s+/g) : [];
  const acciones =
    element.dataset.acciones ? element.dataset.acciones.split(/\s+/g) : [];
  for (let i = 0, len = eventos.length, aclen = acciones.length; i < len; i++) {
    const evento = eventos[i];
    const acción = i < aclen ? acciones[i] : evento;
    if (typeof obj[acción] === "function") {
      element.addEventListener(evento, evt => obj[acción].call(obj, evt));
    }
  }
}