/**
 * -------------------------
 * MAIN ENTRY POINT
 * -------------------------
 * Inizializza tutte le funzionalità del portfolio in modo modulare:
 * - Loader
 * - Background particles
 * - Animazioni on scroll
 * - Theme toggle
 * - Smooth anchors
 * - Timeline cliccabile
 * - Scroll progress
 * - Rispetto delle preferenze di ridotto movimento
 */

import { SELECTORS, BG_PARTICLE, SMOOTH_DELAY_STEP, IO_OPTIONS, state } from './js/config.js';
import { initLoader } from './js/loader.js';
import { initBgParticles } from './js/bgParticles.js';
import { initAppearOnScroll } from './js/appear.js';
import { initThemeToggle } from './js/themeToggle.js';
import { initSmoothAnchors } from './js/smoothAnchors.js';
import { initTimelineToggle, respectReducedMotion } from './js/cards.js';
import { initScrollProgress } from './js/scrollProgress.js';
import { initGoatCounter, showCurrentYear } from './js/counter&data.js';
import { $, $all, getTopOffset, scrollToElementWithOffset, wait, safeOpen } from './js/utils.js';

/**
 * Avvio dell'app:
 * - se DOM non è pronto, attendi DOMContentLoaded
 * - altrimenti esegui immediatamente
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * Funzione principale di inizializzazione.
 * Esegue tutte le funzioni in ordine logico.
 */
function init() {
  // -----------------------------
  // Loader (preloader + animazioni iniziali)
  // -----------------------------
  initLoader();

  // -----------------------------
  // Background animato con particelle
  // -----------------------------
  initBgParticles();

  // -----------------------------
  // Animazioni progressive degli elementi on-scroll
  // -----------------------------
  initAppearOnScroll();

  // -----------------------------
  // Gestione toggle tema scuro/chiaro
  // -----------------------------
  initThemeToggle();

  // -----------------------------
  // Smooth scroll per link con hash
  // -----------------------------
  initSmoothAnchors();

  // -----------------------------
  // Timeline cliccabile e PDF toggle
  // -----------------------------
  initTimelineToggle();

  // -----------------------------
  // Rispetto delle preferenze "prefers-reduced-motion"
  // -----------------------------
  respectReducedMotion();

  // -----------------------------
  // Barra di progresso scroll
  // -----------------------------
  initScrollProgress();

  // -----------------------------
  // Inizializzazione GoatCounter
  // -----------------------------
  initGoatCounter();

  // -----------------------------
  // Inizializzazione CurrentYear
  // -----------------------------
  showCurrentYear();
}

/* ---------- fine main.js ---------- */
