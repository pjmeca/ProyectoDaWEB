const head = "/plantilla/_head.html";
const header = "/plantilla/_header.html";
const footer = "/plantilla/_footer.html";
const scripts = "/plantilla/_scripts.html";

// Función para cargar el contenido de las páginas dinámicamente
function cargarContenido() {
  cargarHead()
  cargar(header, 'header', true)
  cargar(footer, 'footer')
  cargar(scripts, 'scripts')
}

function cargar(url, etiqueta, first = false) {
  fetch(url)
    .then(respuesta => respuesta.text())
    .then(html => {
      const contenido = document.createElement(etiqueta);
      contenido.innerHTML = html;

      if(first){
        document.body.insertBefore(contenido, document.body.firstChild);
      } 
      else
        document.body.appendChild(contenido);
    });
}

function cargarHead() {
  fetch(head)
    .then(respuesta => respuesta.text())
    .then(html => {
      const contenido = document.createElement('div');
      contenido.innerHTML = html;
      document.head.appendChild(contenido);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  cargarContenido();
});