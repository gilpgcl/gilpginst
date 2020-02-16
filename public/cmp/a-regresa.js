customElements.define("a-regresa", class extends HTMLAnchorElement {
  connectedCallback() {
    const href = encodeURIComponent(document.location.toString())
    const text = encodeURIComponent(document.title)
    this.href = `${this.dataset.href}?href=${href}&text=${text}`;
  }
}, { extends: "a" });