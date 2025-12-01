/* ---------- themeToggle.js ---------- */
/* Modulo per gestire il toggle tema chiaro/scuro */

import { SELECTORS } from './config.js';
import { $ } from './utils.js'; // funzione helper per querySelector

/**
 * Inizializza il bottone per cambiare tema e salvare preferenza
 */
export function initThemeToggle() {
  const btn = $(SELECTORS.themeToggleBtn);
  const root = document.documentElement;
  if (!btn || !root) return;

  // Recupera preferenza tema salvata in localStorage
  const saved = localStorage.getItem('site-theme');
  if (saved === 'light') root.classList.add('light');

  // SVG icone per i due temi
  const sunIcon = 'logo/yellowSun.svg';
  const moonIcon = 'logo/yellowMoon.svg';

  // Aggiorna icona del bottone in base al tema attuale
  function updateIcon() {
  const isLight = root.classList.contains('light');
  btn.innerHTML = `<img src="${isLight ? sunIcon : moonIcon}" alt="${isLight ? 'Sole' : 'Luna'}" width="22" height="22">`;
  btn.setAttribute('aria-label', isLight ? 'Tema chiaro' : 'Tema scuro');
}

  updateIcon();

  // Click handler per cambiare tema
  btn.addEventListener('click', () => {
    root.classList.toggle('light');
    const now = root.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('site-theme', now);

    // feedback visivo del toggle (può essere animato in CSS)
    btn.classList.add('toggled');
    setTimeout(() => btn.classList.remove('toggled'), 280);

    updateIcon();
  });
}
//Come usarlo negli altri moduli JS:
//import { initThemeToggle } from './themeToggle.js';
/* ---------- fine themeToggle.js ---------- */