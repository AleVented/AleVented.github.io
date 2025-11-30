/* ---------- utils.js ---------- */
/* Funzioni utility generiche per manipolazione DOM, scroll, timing e apertura link */

import { SELECTORS } from './config.js'; // importiamo solo se serve getTopOffset

/**
 * Selettore singolo DOM in modo sicuro.
 * @param {string} sel - selector CSS
 * @returns {HTMLElement|null}
 */
export function $(sel) {
  return document.querySelector(sel);
}

/**
 * Selettore multiplo DOM in modo sicuro.
 * @param {string} sel - selector CSS
 * @returns {NodeListOf<HTMLElement>}
 */
export function $all(sel) {
  return document.querySelectorAll(sel);
}

/**
 * Calcola l'offset superiore considerando la topbar, utile per scroll con offset.
 * @returns {number} - offset in px
 */
export function getTopOffset() {
  const topbar = $(SELECTORS.topbar);
  return topbar ? (topbar.offsetHeight + 8) : 20;
}

/**
 * Scrolla ad un elemento rispettando l'offset superiore e comportamento smooth o auto.
 * @param {HTMLElement} targetEl
 * @param {Object} options - { behavior: 'smooth'|'auto' }
 */
export function scrollToElementWithOffset(targetEl, options = { behavior: 'smooth' }) {
  if (!targetEl) return;
  const rect = targetEl.getBoundingClientRect();
  const topOffset = getTopOffset();
  const scrollTop = window.pageYOffset + rect.top - topOffset;
  window.scrollTo({ top: scrollTop, behavior: options.behavior });
}

/**
 * Promessa delay per animazioni o sequenze async.
 * @param {number} ms - millisecondi da attendere
 * @returns {Promise<void>}
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Apre una URL in nuova tab in modo sicuro, fallback se necessario.
 * @param {string} url
 */
export function safeOpen(url) {
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (err) {
    // fallback raro
    window.location.href = url;
  }
}

//Come usarlo negli altri moduli JS:
//import { $, $all, getTopOffset, scrollToElementWithOffset, wait, safeOpen } from './utils.js';
/* ---------- fine utils.js ---------- */