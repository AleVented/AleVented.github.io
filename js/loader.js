/* ---------- loader.js ---------- */
/* Modulo per gestire il loader iniziale della pagina */

import { $ } from './utils.js';
import { SELECTORS } from './config.js';
import { wait } from './utils.js';

/**
 * Inizializza il loader della pagina.
 * Mostra il loader fino a quando la finestra non ha completato il caricamento.
 */
export function initLoader() {
  const loader = $(SELECTORS.loader);
  if (!loader) return;

  // Quando tutte le risorse della finestra sono caricate
  window.addEventListener('load', async () => {
    // Piccola attesa per dare respiro all'animazione del loader
    await wait(450);

    // Effetto fade out
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';

    // Rimuovi dal DOM dopo animazione di fade (600ms per sicurezza)
    await wait(600);
    loader.remove();
  });

  // Gestione fallback per eventuale elemento #preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      // Rimuovi completamente dopo 2 secondi
      setTimeout(() => preloader.remove(), 2000);
    }
  });
}
//Come usarlo negli altri moduli JS:
//import { initLoader } from './loader.js';
/* ---------- fine loader.js ---------- */