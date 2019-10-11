document.head.innerHTML +=/*html*/
  `<link rel="stylesheet" href="/cmp/mi-diapo.css">`;
customElements.define("mi-diapo", class extends HTMLImageElement {
  connectedCallback() {
    const fragmento = location.hash.trim().replace(/^\#/, "");
    let actual = fragmento ? parseInt(fragmento, 10) : 1;
    let xDown = null;
    let yDown = null;
    muestra(this);
    window.addEventListener("resize", resize.bind(null, this));
    resize(this);

    /**
     * @param {HTMLImageElement} obj */
    function resize(obj) {
      if (obj.parentElement.clientHeight >= obj.parentElement.clientWidth) {
        // vertical.
        obj.style.width = "100%";
        obj.style.height = "";
      } else {
        // horizontal
        obj.style.width = "";
        obj.style.height = "100%";
      }
    }
    document.addEventListener("keydown", evt => {
      switch (evt.keyCode) {
        case 37: // izq
          retrocede(this);
          break;
        case 39: // der
          avanza(this);
      }
    });
    document.addEventListener('touchstart', evt => {
      const toquInicial = evt.touches[0];
      xDown = toquInicial.clientX;
      yDown = toquInicial.clientY;
    });
    document.addEventListener('touchmove', evt => {
      if (xDown && yDown) {
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
          if (xDiff > 0) {
            /* left swipe */
            retrocede(this);
          } else {
            /* right swipe */
            avanza(this);
          }
        } else {
          if (yDiff > 0) {
            /* up swipe */
          } else {
            /* down swipe */
          }
        }
        /* reset values */
        xDown = null;
        yDown = null;
      }
    });

    /**
     * @param {HTMLImageElement} obj */
    function avanza(obj) {
      if (actual < parseInt(obj.dataset.total, 10)) {
        ++actual;
        muestra(obj);
      }
    }
    /**
     * @param {HTMLImageElement} obj */
    function retrocede(obj) {
      if (actual > 1) {
        --actual;
        muestra(obj);
      }
    }
    /**
     * @param {HTMLImageElement} obj */
    function muestra(obj) {
      obj.src = (obj.dataset.url + actual) + ".jpg";
      location.hash = "#" + actual;
    }
  }
}, { extends: "img" });