/* ---------- config.js ---------- */
/* Contiene tutte le costanti e configurazioni globali del portfolio
   - Selettori CSS
   - Parametri delle animazioni
   - Opzioni per IntersectionObserver
   - Stati condivisi (semplici)
*/

export const SELECTORS = {
  loader: '#site-loader',              // elemento loader
  bgAnim: '#bg-anim',                  // container particelle di background
  appearItems: '.appear, .project-card, .timeline-card', // elementi da animare on scroll
  themeToggleBtn: '#themeToggle',      // bottone per toggle tema
  timelineCard: '.timeline-card',      // card timeline cliccabili
  topbar: '.topbar',                   // topbar per calcolo offset scroll
  scrollProgress: '#scroll-progress'   // barra di progresso dello scroll
};

export const BG_PARTICLE = {
  MIN_COUNT: 30,            // numero minimo di particelle
  WIDTH_DIV: 32,            // più grande = meno particelle
  SIZE_MIN: 3,              // dimensione minima particelle
  SIZE_MAX: 13,             // dimensione massima particelle
  TRANSFORM_DISTANCE: -140  // distanza Y in vh per animazione particelle
};

// Delay progressivo per le animazioni di apparizione
export const SMOOTH_DELAY_STEP = 0.1; // secondi tra una card e la successiva

// Opzioni generali per IntersectionObserver
export const IO_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.06
};

// Stato globale semplice per throttling scroll, etc.
// Non contiene logica, solo flag condivisi tra funzioni
export const state = {
  scrollTicking: false // evita troppi aggiornamenti della barra scroll via rAF
};


//Come usarlo negli altri moduli JS:
//import { SELECTORS, BG_PARTICLE, SMOOTH_DELAY_STEP, IO_OPTIONS, state } from './config.js';
/* ---------- fine config.js ---------- */