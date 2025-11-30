/* ---------- appear.js ---------- */
/* Modulo per far comparire gli elementi al scroll usando IntersectionObserver */

import { SELECTORS, SMOOTH_DELAY_STEP, IO_OPTIONS } from './config.js';

/**
 * Inizializza l'effetto "appear on scroll" sugli elementi selezionati
 */
export function initAppearOnScroll() {
  // seleziona tutti gli elementi che devono apparire
  const cards = document.querySelectorAll(SELECTORS.appearItems);
  if (!cards || cards.length === 0) return;

  // assegna transition-delay progressivo per effetto "smooth reveal"
  cards.forEach((el, i) => {
    // delay progressivo: 0.1s, 0.2s, 0.3s, ...
    el.style.transitionDelay = `${i * SMOOTH_DELAY_STEP}s`;
  });

  // crea IntersectionObserver per rivelare elementi quando entrano in viewport
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // aggiunge classe per triggerare animazione CSS
        entry.target.classList.add('appeared');
        // smette di osservare l'elemento una volta apparso
        observer.unobserve(entry.target);
      }
    });
  }, IO_OPTIONS);

  // inizia a osservare tutti gli elementi
  cards.forEach(el => io.observe(el));
}

//come usarlo negli altri moduli JS:
//import { initAppearOnScroll } from './appear.js';
/* ---------- fine appear.js ---------- */