import { cod } from "../lib/htmlUtil.js";
import { enlazaAcciones } from "../lib/databind.js";
document.head.innerHTML += /* html */
  `<style>
    body, mi-diapo, mi-diapo .nota, mi-diapo nav {
      top: 0;
      left: 0;
      width:100%;
      height: 100%;
    }
    body, mi-diapo {
      position: fixed;
      overflow: hidden;
    }
    body {
      margin: 0;
      z-index: 1;
    }
    mi-diapo {
      display: block;
      z-index: 2;
    }
    mi-diapo .nota {
      position: absolute;
      overflow: auto;
      display: flex;
      z-index: 3;
    }
    mi-diapo img.ancha {
      display: block;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    mi-diapo img.alta {
      display: block;
      width: 100%;
      margin-top: auto;
      margin-bottom: auto;
    }
    mi-diapo nav {
      position: absolute;
      width:100%;
      height: 100%;
      background-color: var(--color-fondo-dialogo);
      overflow: auto;
      z-index: 4;
    }
    mi-diapo nav p {
      margin: 1em;
    }
    mi-diapo .nota p {
      background-color: var(--color-fondo-nota);
      box-shadow: 0 7px 5px 3px var(--color-sombra);
      margin: auto;
      padding: 1em;
    }
  </style>`;

customElements.define("mi-diapo", class extends HTMLElement {
  connectedCallback() {
    const urlanterior =
      this.dataset.urlanterior ? encodeURI(this.dataset.urlanterior) : "";
    const textoanterior = cod(this.dataset.textoanterior);
    const urlmenu =
      this.dataset.urlmenu ? encodeURI(this.dataset.urlmenu) : "";
    const textomenu = cod(this.dataset.textomenu);
    this.urlsiguiente =
      this.dataset.urlsiguiente ? encodeURI(this.dataset.urlsiguiente) : "";
    this.textosiguiente = cod(this.dataset.textosiguiente);
    this.innerHTML = /* html */
      `<img>
      <div class="nota" data-eventos="click" data-acciones="muestraNav"></div>
      <nav hidden>
        <header>
          <button type="button" data-eventos="click" data-acciones="cierra"
              title="Cerrar">
            <i class="material-icons">close</i>
          </button>
          <h1></h1>
          <button class="btnRetrocede" data-eventos="click"
              data-acciones="retrocede">
            <i class="material-icons">skip_previous</i></button>
          <button class="btnAvanza" data-eventos="click" data-acciones="avanza">
            <i class="material-icons">skip_next</i>
          </button>
      </header>
        <div class="marco-640">
          <p>
            Diapositiva <output class="outputActual"></output> /
            <output class="outputTotal"></output>
          </p>`
      + (urlanterior ? /*html*/
        `<p>
            <a href="${urlanterior}"><i
              class="material-icons">navigate_before</i>${textoanterior}</a>
          </p>`: "")
      + (urlmenu ? /*html*/
        `<p><a href="${urlmenu}">${textomenu}</a></p>` : "")
      + (this.urlsiguiente ? /*html*/
        `<p>
            <a href="${this.urlsiguiente}">${this.textosiguiente}<i
              class="material-icons">navigate_next</i></a>
          </p>`: "")
      + /*html*/
      ` <p>Para avanzar diapositivas tienes las siguientes opciones:</p>
          <ul>
            <li>Las flechas de izquierda o derecha de un teclado.</li> 
            <li>Swipe izquierdo o derecho en una pantalla tactil.</li>
          </ul>
          <mi-footer></mi-footer>
        </nav>
      </div>`;
    const fragmento = location.hash.trim().replace(/^\#/, "");
    this.actual = fragmento ? parseInt(fragmento, 10) : 1;
    this.total = this.dataset.total ? parseInt(this.dataset.total, 10) : 1000;
    this.url = this.dataset.url || "";
    this.extensión = this.dataset.extension || ".png";
    /** @type {HTMLOutputElement} */
    this.outputActual = this.querySelector(".outputActual");
    /** @type {HTMLOutputElement} */
    const outputTotal = this.querySelector(".outputTotal");
    outputTotal.value = this.total.toString();
    this.img = this.querySelector("img");
    /** @type {HTMLElement} */
    this.nota = this.querySelector(".nota");
    this.nav = this.querySelector("nav");
    /** @type {HTMLButtonElement} */
    this.btnRetrocede = this.querySelector(".btnRetrocede");
    /** @type {HTMLButtonElement} */
    this.btnAvanza = this.querySelector(".btnAvanza");
    enlazaAcciones(this, this);
    addEventListener("resize", this.resize.bind(this));
    this.muestra();
    this.resize();
    document.addEventListener("keydown", evt => {
      switch (evt.key) {
        case "ArrowLeft":
          this.retrocede();
          break;
        case "ArrowRight":
          this.avanza();
          break;
        case "ArrowUp":
          this.muestraNav();
          break;
      }
    });
    addEventListener("swipeizquierdo", this.avanza.bind(this));
    addEventListener("swipederecho", this.retrocede.bind(this));
    addEventListener("swipearriba", this.muestraNav.bind(this));
  }
  muestraNav() {
    this.nav.hidden = false;
  }
  /**
   * 
   * @param {Event} evt 
   */
  cierra(evt) {
    evt.preventDefault();
    this.nav.hidden = true;
  }
  /** @todo Mejorar el algoritmo. */
  resize() {
    if (document.documentElement.clientHeight
      >= document.documentElement.clientWidth) {
      this.img.classList.add("alta");
      this.img.classList.remove("ancha");
    } else {
      this.img.classList.add("ancha");
      this.img.classList.remove("alta");
    }
  }
  avanza() {
    if (this.actual < this.total) {
      ++this.actual;
      this.muestra();
    }
  }
  retrocede() {
    if (this.actual > 1) {
      --this.actual;
      this.muestra();
    }
  }
  async muestra() {
    this.img.src = encodeURI(this.url + this.actual + this.extensión);
    location.hash = "#" + this.actual;
    this.outputActual.value = this.actual.toString();
    this.nota.innerHTML = "";
    this.btnAvanza.hidden = this.actual === this.total;
    this.btnRetrocede.hidden = this.actual === 1;
    const res = await fetch(encodeURI(this.url + this.actual + ".html"));
    if (res.ok) {
      this.nota.innerHTML = await res.text();
    }
  }
  siguiente() {
    if (this.urlsiguiente) {
      location.href = this.urlsiguiente;
    }
  }
});