/* ---------- scrollProgress.js ---------- */
/* Modulo per la barra di progresso dello scroll, ottimizzato con rAF */

import { SELECTORS, state } from './config.js';

/**
 * Inizializza la barra di scroll progress
 */
export function initScrollProgress() {
  const bar = document.querySelector(SELECTORS.scrollProgress);
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
    state.scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    // throttle con rAF
    if (!state.scrollTicking) {
      state.scrollTicking = true;
      requestAnimationFrame(updateProgress);
    }
  });

  // inizializza larghezza a caricamento (utile se la pagina è già scrollata)
  updateProgress();
}
//Come usarlo negli altri moduli JS:
//import { initScrollProgress } from './scrollProgress.js';
/* ---------- fine scrollProgress.js ---------- */