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
  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 5.36l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>`;

  // Aggiorna icona del bottone in base al tema attuale
  function updateIcon() {
    const isLight = root.classList.contains('light');
    btn.innerHTML = isLight ? sunIcon : moonIcon;
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