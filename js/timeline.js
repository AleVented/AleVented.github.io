/* ---------- timeline.js ---------- */
/* Modulo per gestire timeline-card cliccabili e supporto reduced motion */

import { safeOpen } from './utils.js';
import { SELECTORS } from './config.js';

/**
 * Inizializza le timeline-card cliccabili e apre PDF se presente
 */
export function initTimelineToggle() {
  const cards = document.querySelectorAll(SELECTORS.timelineCard);
  if (!cards || cards.length === 0) return;

  cards.forEach(card => {
    // Gestione tastiera per accessibilità
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });

    // Click handler principale
    card.addEventListener('click', () => toggleCard(card));
  });

  function toggleCard(cardEl) {
    const isOpen = cardEl.classList.toggle('open');
    cardEl.classList.toggle('collapsed', !isOpen);
    cardEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    const pdf = cardEl.dataset.pdf;
    if (isOpen && pdf) {
      safeOpen(pdf);
    }
  }
}

/**
 * Rispetta le preferenze dell'utente per reduced motion
 * Disattiva animazioni/transizioni pesanti
 */
export function respectReducedMotion() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.appear, .project-card, #bg-anim span').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('appeared');
    });
  }
}
//Come usarlo negli altri moduli JS:
//import { initTimelineToggle, respectReducedMotion } from './timeline.js';
/* ---------- fine timeline.js ---------- */