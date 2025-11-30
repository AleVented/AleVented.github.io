/* ---------- bgParticles.js ---------- */
/* Modulo per creare particelle animate nello sfondo */

import { $ } from './utils.js';
import { SELECTORS, BG_PARTICLE } from './config.js';

/**
 * Inizializza le particelle di sfondo nel container #bg-anim
 */
export function initBgParticles() {
  const container = $(SELECTORS.bgAnim);
  if (!container) return;

  // Numero di particelle: almeno MIN_COUNT, proporzionale alla larghezza della finestra
  const count = Math.max(Math.floor(window.innerWidth / BG_PARTICLE.WIDTH_DIV), BG_PARTICLE.MIN_COUNT);

  // Palette di colori delle particelle
  const colors = [
    'rgba(79,129,199,0.10)',
    'rgba(79,129,199,0.07)',
    'rgba(47,106,166,0.07)'
  ];

  /**
   * Crea e anima una singola particella
   */
  function createParticle() {
    const el = document.createElement('span');

    // dimensione random tra SIZE_MIN e SIZE_MAX
    const size = Math.random() * (BG_PARTICLE.SIZE_MAX - BG_PARTICLE.SIZE_MIN) + BG_PARTICLE.SIZE_MIN;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    // posizione iniziale random
    el.style.position = 'absolute';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';

    // colore e opacità random
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.opacity = (Math.random() * 0.5 + 0.08).toString();

    // trasformazione iniziale e transition
    el.style.transform = 'translateY(0)';
    el.style.transition = `transform ${12 + Math.random() * 18}s linear, opacity ${8 + Math.random() * 10}s linear`;

    container.appendChild(el);

    // animazione ricorsiva
    (function animate(p) {
      const dur = 10 + Math.random() * 12; // durata in secondi

      requestAnimationFrame(() => {
        p.style.transform = `translateY(${BG_PARTICLE.TRANSFORM_DISTANCE}vh)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        // reset senza transizione
        p.style.transition = 'none';
        p.style.top = (Math.random() * 120) + 'vh';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.opacity = (Math.random() * 0.45 + 0.08).toString();

        // ripristina transition e rilancia animazione
        p.style.transition = `transform ${10 + Math.random() * 14}s linear, opacity ${8 + Math.random() * 10}s linear`;
        animate(p);
      }, (dur * 1000) + 300);

    })(el);
  }

  // crea tutte le particelle
  for (let i = 0; i < count; i++) {
    createParticle();
  }
}
//Come usarlo negli altri moduli JS:
//import { initBgParticles } from './bgParticles.js';
/* ---------- fine bgParticles.js ---------- */