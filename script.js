/* global document, window, requestAnimationFrame, history */
/* ---------- portfolio.js (refactor) ---------- */
/* Versione: ingegnere-del-software
   Obiettivo: conserva tutte le funzionalità del file originale ma con struttura modulare,
   responsabilità separate, commenti esplicativi e piccoli miglioramenti di performance.
*/

'use strict';

(function App() {

  /**
   * -------------------------
   * CONFIGURAZIONE / COSTANTI
   * -------------------------
   */
  const SELECTORS = {
    loader: '#site-loader',
    bgAnim: '#bg-anim',
    appearItems: '.appear, .project-card, .timeline-card',
    themeToggleBtn: '#themeToggle',
    timelineCard: '.timeline-card',
    topbar: '.topbar',
    scrollProgress: '#scroll-progress'
  };

  const BG_PARTICLE = {
    MIN_COUNT: 30,
    WIDTH_DIV: 32, // più grande = meno particelle
    SIZE_MIN: 3,
    SIZE_MAX: 13,
    TRANSFORM_DISTANCE: -140 // unit: vh
  };

  const SMOOTH_DELAY_STEP = 0.1; // secondi tra una card e la successiva per il reveal
  const IO_OPTIONS = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 };

  // Stato semplice per evitare registrazioni multiple di listener costosi
  const state = {
    scrollTicking: false, // per throttle del progress bar via rAF
  };

  /**
   * -------------------------
   * UTILITY FUNCTIONS
   * -------------------------
   */

  /**
   * Legge un elemento DOM in modo sicuro.
   * @param {string} sel - selector CSS
   * @returns {HTMLElement|null}
   */
  function $(sel) {
    return document.querySelector(sel);
  }

  /**
   * Legge tutti gli elementi matching.
   * @param {string} sel - selector CSS
   * @returns {NodeListOf<HTMLElement>}
   */
  function $all(sel) {
    return document.querySelectorAll(sel);
  }

  /**
   * Restituisce l'offset superiore da usare per lo scroll (considera la topbar se presente).
   * @returns {number}
   */
  function getTopOffset() {
    const topbar = $(SELECTORS.topbar);
    return topbar ? (topbar.offsetHeight + 8) : 20;
  }

  /**
   * Scrolla ad un elemento con offset corretto (usa smooth o istantaneo)
   * @param {HTMLElement} targetEl
   * @param {Object} options - { behavior: 'smooth'|'auto' }
   */
  function scrollToElementWithOffset(targetEl, options = { behavior: 'smooth' }) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const topOffset = getTopOffset();
    const scrollTop = window.pageYOffset + rect.top - topOffset;
    window.scrollTo({ top: scrollTop, behavior: options.behavior });
  }

  /**
   * Sostituisce l'uso diretto di setTimeout per delay asincroni (promisified).
   * Utile per sequencing leggibile nei test o nelle animazioni.
   * @param {number} ms
   * @returns {Promise<void>}
   */
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Safe open: apre una URL in tab nuova in modo compatibile.
   * @param {string} url
   */
  function safeOpen(url) {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      // fallback: naviga nella stessa tab se window.open fallisce (raro)
      window.location.href = url;
    }
  }

  /**
   * -------------------------
   * LOADER
   * -------------------------
   * Mostra / rimuove elemento loader all'onload della finestra.
   */
  function initLoader() {
    const loader = $(SELECTORS.loader);
    if (!loader) return;

    // Quando la finestra ha finito di caricare le risorse, svanisce il loader.
    window.addEventListener('load', async () => {
      // piccola attesa per dare respiro all'animazione
      await wait(450);
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      // rimuovi dal DOM dopo l'animazione di fade (600ms per sicurezza)
      await wait(600);
      loader.remove();
    });
  }

  /**
   * -------------------------
   * BACKGROUND PARTICLES
   * -------------------------
   * Crea particelle dinamiche nel container #bg-anim.
   */
  function initBgParticles() {
    const container = $(SELECTORS.bgAnim);
    if (!container) return;

    const count = Math.max(Math.floor(window.innerWidth / BG_PARTICLE.WIDTH_DIV), BG_PARTICLE.MIN_COUNT);
    const colors = ['rgba(79,129,199,0.10)', 'rgba(79,129,199,0.07)', 'rgba(47,106,166,0.07)'];

    // Funzione che crea una singola particella e ne gestisce l'animazione "loop".
    function createParticle() {
      const el = document.createElement('span');
      const size = Math.random() * (BG_PARTICLE.SIZE_MAX - BG_PARTICLE.SIZE_MIN) + BG_PARTICLE.SIZE_MIN;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.position = 'absolute';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = Math.random() * 100 + 'vh';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.opacity = (Math.random() * 0.5 + 0.08).toString();
      el.style.transform = 'translateY(0)';
      el.style.transition = `transform ${12 + Math.random() * 18}s linear, opacity ${8 + Math.random() * 10}s linear`;
      container.appendChild(el);

      // funzione ricorsiva che esegue l'animazione e poi resetta la particella
      (function animate(p) {
        const dur = 10 + Math.random() * 12; // durata in secondi
        // usa requestAnimationFrame per aggiornare proprietà di layout in modo fluido
        requestAnimationFrame(() => {
          p.style.transform = `translateY(${BG_PARTICLE.TRANSFORM_DISTANCE}vh)`;
          p.style.opacity = '0';
        });
        setTimeout(() => {
          // reset senza transizione per riposizionare
          p.style.transition = 'none';
          p.style.top = (Math.random() * 120) + 'vh';
          p.style.left = Math.random() * 100 + 'vw';
          p.style.opacity = (Math.random() * 0.45 + 0.08).toString();
          // ripristina transition e rilancia l'animazione
          p.style.transition = `transform ${10 + Math.random() * 14}s linear, opacity ${8 + Math.random() * 10}s linear`;
          animate(p);
        }, (dur * 1000) + 300);
      })(el);
    }

    // Crea tutte le particelle
    for (let i = 0; i < count; i++) {
      createParticle();
    }
  }

  /**
   * -------------------------
   * APPEAR ON SCROLL (Intersection Observer)
   * -------------------------
   * Aggiunge delay progressivo a ogni elemento e li osserva via IntersectionObserver.
   */
  function initAppearOnScroll() {
    const cards = document.querySelectorAll(SELECTORS.appearItems);
    if (!cards || cards.length === 0) return;

    // assegna transition-delay progressivo per il "smooth reveal"
    cards.forEach((el, i) => {
      // step progressivo: 0.1s, 0.2s, ...
      el.style.transitionDelay = `${i * SMOOTH_DELAY_STEP}s`;
    });

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appeared');
          observer.unobserve(entry.target);
        }
      });
    }, IO_OPTIONS);

    cards.forEach(el => io.observe(el));
  }

  /**
   * -------------------------
   * THEME TOGGLE
   * -------------------------
   * Gestisce il bottone che alterna tema scuro/chiaro e salva la preferenza.
   */
  function initThemeToggle() {
    const btn = $(SELECTORS.themeToggleBtn);
    const root = document.documentElement;
    if (!btn || !root) return;

    // recupera preferenza salvata
    const saved = localStorage.getItem('site-theme');
    if (saved === 'light') root.classList.add('light');

    // icone semplici (SVG inline) - manteniamo contrasti alti
    const sunIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 5.36l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>`;

    const moonIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>`;

    function updateIcon() {
      const isLight = root.classList.contains('light');
      btn.innerHTML = isLight ? sunIcon : moonIcon;
      btn.setAttribute('aria-label', isLight ? 'Tema chiaro' : 'Tema scuro');
    }

    updateIcon();

    btn.addEventListener('click', () => {
      root.classList.toggle('light');
      const now = root.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('site-theme', now);

      // piccolo feedback visivo: class che può essere usata in CSS per animare
      btn.classList.add('toggled');
      setTimeout(() => btn.classList.remove('toggled'), 280);

      updateIcon();
    });
  }

  /**
   * -------------------------
   * SMOOTH ANCHORS (gestione click su link #ancora)
   * -------------------------
   * Intercetta i click sui link con href che cominciano per '#'
   * e scorre rispettando l'offset della topbar.
   *
   * Inoltre gestisce il caso in cui la pagina venga caricata con un hash già presente
   * (esempio: aprendo /index.html#about direttamente) - in questo caso applichiamo
   * uno scroll "corretto" che considera la topbar.
   */
  function initSmoothAnchors() {
    function offsetScrollHandler(e) {
      const href = e.currentTarget.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      scrollToElementWithOffset(target, { behavior: 'smooth' });
    }

    // registra listener per i click
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', offsetScrollHandler));

    // Se la pagina viene caricata e l'URL contiene un hash, effettua uno scroll corretto
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        // scroll istantaneo (senza smooth) per evitare comportamento "strano" al load
        // e per rispettare l'offset della topbar
        // Ritardiamo di pochissimo per lasciare il layout stabilizzarsi (es. immagini/caricamento)
        setTimeout(() => {
          scrollToElementWithOffset(target, { behavior: 'auto' });
        }, 50);
      }
    }
  }

  /**
   * -------------------------
   * TIMELINE CLICKABLE (apre PDF se presente)
   * -------------------------
   * Rende le timeline-card cliccabili, toggle open/closed e apre il PDF (in nuova tab)
   * se l'attributo data-pdf è presente.
   */
  function initTimelineToggle() {
    const cards = document.querySelectorAll(SELECTORS.timelineCard);
    if (!cards || cards.length === 0) return;

    cards.forEach(card => {
      // abilitare la gestione della tastiera per accessibilità
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });

      // click handler principale
      card.addEventListener('click', () => toggleCard(card));
    });

    function toggleCard(cardEl) {
      // toggle stato open / collapsed
      const isOpen = cardEl.classList.toggle('open');
      cardEl.classList.toggle('collapsed', !isOpen);
      cardEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // se la card ha data-pdf e viene aperta, apri il PDF in nuova tab
      const pdf = cardEl.dataset.pdf;
      if (isOpen && pdf) {
        safeOpen(pdf);
      }
    }
  }

  /**
   * -------------------------
   * REDUCED MOTION
   * -------------------------
   * Se l'utente ha impostato prefers-reduced-motion, disattiviamo le transizioni/animazioni
   * più pesanti e mostriamo gli elementi come "già apparsi".
   */
  function respectReducedMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.appear, .project-card, #bg-anim span').forEach(el => {
        el.style.transition = 'none';
        el.classList.add('appeared');
      });
    }
  }

  /**
   * -------------------------
   * SCROLL PROGRESS BAR (ottimizzato con rAF)
   * -------------------------
   * Mostra la percentuale di scroll attraverso una barra fissa in cima.
   * L'evento scroll è throttled tramite requestAnimationFrame per migliorare le perf.
   */
  function initScrollProgress() {
    const bar = $(SELECTORS.scrollProgress);
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

  /**
   * -------------------------
   * INIZIALIZZAZIONE GENERALE
   * -------------------------
   * Inizializza tutti i moduli in ordine determinato.
   */
  function init() {
    initLoader();
    initBgParticles();
    initAppearOnScroll();
    initThemeToggle();
    initSmoothAnchors();
    initTimelineToggle();
    respectReducedMotion();
    initScrollProgress();
  }

  // Esegui inizializzazione quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* --------------------------
   WAIT FOR DOM
--------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------
     LOADER
  --------------------------- */
  const loader = document.getElementById('site-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.remove(), 600);
    }, 600);
  });

  /* --------------------------
     BACKGROUND PARTICLES
  --------------------------- */
  const bg = document.getElementById('bg-anim');
  if (bg) {
    const total = 40;
    for (let i = 0; i < total; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.animationDuration = 4 + Math.random() * 6 + 's';
      bg.appendChild(s);
    }
  }

  /* --------------------------
     THEME TOGGLE (LIGHT/DARK)
  --------------------------- */
  const themeBtn = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Carica tema salvato
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  // Aggiorna icone
  function updateThemeIcon() {
    if (!themeBtn) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeBtn.innerHTML = isDark
      ? '🌙'
      : '☀️';
  }
  updateThemeIcon();

  // Click toggle
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();
    });
  }

  /* --------------------------
     MOBILE MENU (Hamburger)
  --------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* --------------------------
     APPEAR ON SCROLL
  --------------------------- */
  const appearElements = document.querySelectorAll('.appear');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.2 });

  appearElements.forEach(el => observer.observe(el));

  /* --------------------------
     CERTIFICATI → APRI PDF
  --------------------------- */
  const certs = document.querySelectorAll('.timeline-card[data-pdf]');
  certs.forEach(card => {
    card.addEventListener('click', () => {
      const pdf = card.dataset.pdf;
      if (pdf) window.open(pdf, '_blank');
    });
  });

});


})(); // fine IIFE
