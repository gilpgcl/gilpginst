if (this.customElements)
  try { customElements.define('built-in', document.createElement('p').constructor, { 'extends': 'p' }) }
  catch (s) { document.write(unescape('%3Cscript%20src%3D%22https%3A//unpkg.com/@ungap/custom-elements-builtin%22%3E%3C/script%3E')) }
else
  document.write(unescape('%3Cscript%20src%3D%22https%3A//unpkg.com/document-register-element%22%3E%3C/script%3E'));
