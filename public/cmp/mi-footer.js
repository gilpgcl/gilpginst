document.head.innerHTML += /* html */
  `<style>
    mi-footer {
      display: block;
      text-align: center;
      font-family: sans-serif;
      font-size: small;
      margin: 1em;
    }
  </style>`;
customElements.define("mi-footer", class extends HTMLElement {
  connectedCallback() {
    this.textContent = "Copyright © 2020 Gilberto Pacheco Gallegos.";
  }
});