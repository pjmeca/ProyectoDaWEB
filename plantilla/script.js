/* Script para cargar el contenido de las páginas dinámicamente (plantilla) */

// Ubicación de los archivos que conforman la plantilla
const head = "/plantilla/_head.html";
const header = "/plantilla/_header.html";
const navbar = "/plantilla/_navbar.html";
const footer = "/plantilla/_footer.html";
const scripts = "/plantilla/_scripts.html";

// Cuando se carga la página, se ejecuta este script
document.addEventListener('DOMContentLoaded', function () {
  cargarContenido();
});

function cargarContenido() {
  cargarHeadLiteral()
  cargarHeader()
  cargar(footer, 'footer')
  cargar(scripts, 'scripts')
  mainNavLoad()
  location.hash = "#page-top"

  document.getElementById('loadScript').remove() // una vez ejecutado, no es necesario mantenerlo en el html
}

// Auxiliares

function cargarHead() { // No funciona (carga, pero no funciona f-ont-awesome)
  fetch(head)
    .then(respuesta => respuesta.text())
    .then(html => {
      const head = document.getElementsByTagName('head')[0];
      head.insertAdjacentHTML('afterbegin', html);
    });
}

function cargarHeadLiteral() {
  const metaCharset = document.createElement('meta');
  metaCharset.setAttribute('charset', 'utf-8');
  document.head.appendChild(metaCharset);

  const metaViewport = document.createElement('meta');
  metaViewport.setAttribute('name', 'viewport');
  metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
  document.head.appendChild(metaViewport);

  const metaDesc = document.createElement('meta');
  metaDesc.setAttribute('name', 'description');
  metaDesc.setAttribute('content', '');
  document.head.appendChild(metaDesc);

  const metaAuthor = document.createElement('meta');
  metaAuthor.setAttribute('name', 'author');
  metaAuthor.setAttribute('content', '');
  document.head.appendChild(metaAuthor);

  const linkFavicon = document.createElement('link');
  linkFavicon.setAttribute('rel', 'icon');
  linkFavicon.setAttribute('type', 'image/x-icon');
  linkFavicon.setAttribute('href', '/assets/favicon.ico');
  document.head.appendChild(linkFavicon);

  const scriptFontAwesome = document.createElement('script');
  scriptFontAwesome.setAttribute('src', 'https://use.fontawesome.com/releases/v6.1.0/js/all.js');
  scriptFontAwesome.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(scriptFontAwesome);

  const linkGoogleFontsMontserrat = document.createElement('link');
  linkGoogleFontsMontserrat.setAttribute('href', 'https://fonts.googleapis.com/css?family=Montserrat:400,700');
  linkGoogleFontsMontserrat.setAttribute('rel', 'stylesheet');
  linkGoogleFontsMontserrat.setAttribute('type', 'text/css');
  document.head.appendChild(linkGoogleFontsMontserrat);

  const linkGoogleFontsRobotoSlab = document.createElement('link');
  linkGoogleFontsRobotoSlab.setAttribute('href', 'https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700');
  linkGoogleFontsRobotoSlab.setAttribute('rel', 'stylesheet');
  linkGoogleFontsRobotoSlab.setAttribute('type', 'text/css');
  document.head.appendChild(linkGoogleFontsRobotoSlab);

  const linkStyles = document.createElement('link');
  linkStyles.setAttribute('href', '/css/styles.css');
  linkStyles.setAttribute('rel', 'stylesheet');
  document.head.appendChild(linkStyles);

}

function cargarHeader() {
  fetch(header)
    .then(respuesta => respuesta.text())
    .then(html => {
      fetch(navbar)
        .then(response => response.text())
        .then(data => {
          const nuevoElemento = data;
          const posicion = html.indexOf('<!-- El navbar va aquí -->');
          const nuevoHtml = html.slice(0, posicion) + nuevoElemento + html.slice(posicion);
          document.body.insertAdjacentHTML('afterbegin', nuevoHtml);
        });
    });
}

function cargar(url, etiqueta) {
  fetch(url)
    .then(respuesta => respuesta.text())
    .then(html => {
      const contenido = document.createElement(etiqueta);
      contenido.innerHTML = html;
      document.body.appendChild(contenido);
    });
}

function mainNavLoad() {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.location.pathname == '/index.html') {
      navbarCollapsible.classList.add('fixed-top')
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink')
      } else {
        navbarCollapsible.classList.add('navbar-shrink')
      }
    }
    else {
      // Si no es la página de inicio, cambia 
      // a sticky para que no se superponga al contenido
      navbarCollapsible.classList.add('sticky-top')
    }
  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
}