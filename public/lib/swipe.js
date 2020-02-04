let iniciaX = null;
let iniciaY = null;
document.addEventListener('touchstart', evt => {
  const toqueInicial = evt.touches[0];
  iniciaX = toqueInicial.clientX;
  iniciaY = toqueInicial.clientY;
});
document.addEventListener('touchmove', evt => {
  if (iniciaX && iniciaY) {
    const mueve = evt.touches[0];
    var mueveX = mueve.clientX;
    var mueveY = mueve.clientY;
    var difX = mueveX - iniciaX;
    var difY = mueveY - iniciaY;
    // Checa que el movimiento no sea muy corto,
    if (Math.abs(difX) + Math.abs(difY) > 150) {
      if (Math.abs(difX) > Math.abs(difY)) {
        if (difX > 70) {
          dispatchEvent(new Event("swipederecho"));
        } else {
          dispatchEvent(new Event("swipeizquierdo"));
        }
      } else if (difY > 70) {
        dispatchEvent(new Event("swipeabajo"));
      } else {
        dispatchEvent(new Event("swipearriba"));
      }
      // Reinicia valores.
      iniciaX = null;
      iniciaY = null;
    }
  }
});
