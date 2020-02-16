if (this.customElements)
  try { customElements.define('built-in', document.createElement('p').constructor, { 'extends': 'p' }) }
  catch (s) { document.write(unescape('%3Cscript%20src%3D%22lib/min.js%22%3E%3C/script%3E')) }
else
  document.write(unescape('%3Cscript%20src%3D%22lib/document-register-element.js%22%3E%3C/script%3E'));