/* ---------- smoothAnchors.js ---------- */
/* Modulo per gestire scroll smooth su link interni (#ancora) e hash iniziale */

import { scrollToElementWithOffset } from './utils.js';

/**
 * Inizializza lo smooth scrolling per anchor link e hash di pagina
 */
export function initSmoothAnchors() {

  // --------------------------------------
  // 1) CLICK SU LINK CHE INIZIANO PER "#"
  // --------------------------------------
  function offsetScrollHandler(e) {
    const href = e.currentTarget.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    scrollToElementWithOffset(target, { behavior: 'smooth' });
    history.replaceState(null, '', href);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '' || href === '#!') return;
    a.addEventListener('click', offsetScrollHandler);
  });

  // --------------------------------------
  // 2) SCROLL CORRETTO SE LA PAGINA SI APRE GIÀ CON UN HASH
  // --------------------------------------
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const target = document.querySelector(hash);
    if (target) {
      window.addEventListener('load', () => {
        // piccolo delay per sicurezza layout + loader
        setTimeout(() => {
          scrollToElementWithOffset(target, { behavior: 'auto' });
        }, 150);
      });
    }
  }

  // --------------------------------------
  // 3) BLOCCA LA PAGINA FINO A CARICAMENTO COMPLETO
  // --------------------------------------
  (function initSafeScroll() {
    // Blocca scroll automatico del browser
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Ripristina scroll behavior normale appena caricato
    window.addEventListener('load', () => {
      document.documentElement.style.scrollBehavior = '';
    });
  })();
}
//Come usarlo negli altri moduli JS:
//import { initSmoothAnchors } from './smoothAnchors.js';
/* ---------- fine smoothAnchors.js ---------- */  