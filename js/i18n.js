/**
 * i18n.js — Gestione multilingua IT / EN
 * ----------------------------------------
 * Uso:
 *   import { setLanguage, getCurrentLang } from './i18n.js';
 *
 *   setLanguage('en');   // passa all'inglese
 *   setLanguage('it');   // torna all'italiano
 *   getCurrentLang();    // restituisce 'it' o 'en'
 *
 * Il tuo bottone può fare semplicemente:
 *   btn.addEventListener('click', () => {
 *     setLanguage(getCurrentLang() === 'it' ? 'en' : 'it');
 *   });
 */

// ─── DIZIONARIO ──────────────────────────────────────────────────────────────

const translations = {

  it: {
    /* ── NAV ── */
    "nav.home":         "Home",
    "nav.about":        "Chi sono",
    "nav.skills":       "Competenze",
    "nav.experience":   "Esperienze",
    "nav.timeline":     "Formazione",
    "nav.certs":        "Certificazioni",
    "nav.projects":     "Progetti",
    "nav.contact":      "Contatti",

    /* ── HERO ── */
    "hero.title": "Alessio Ventura - progettista elettrico",
    "hero.sub":   "Progettista elettrico junior specializzato nella progettazione mediante EPLAN P8. Competenze nella realizzazione di schemi elettrici, elaborazione distinte basi, scelta della componentistica e gestione dei database per la progettazione. Conoscenza degli IDE TIA Portal e Machine Expert ed, a livello base, di Visual Studio Code per la programmazione in Python. Approccio orientato alla risoluzione dei problemi, con una forte passione per la tecnologia e per l'automazione industriale.",

    /* ── CHI SONO ── */
    "about.title": "Chi sono",
    "about.body":  "Ciao! Sono Alessio, 24 anni, ho lavorato come programmatore PLC ed attualmente lavoro come progettista elettrico, avendo quindi competenze sia in TIA Portal e Machine Expert per la parte di PLC che in EPLAN P8 per la progettazione elettrica. Mi appassiona tutto ciò che ha a che fare con l'elettronica e l'informatica e sono sempre alla ricerca di qualcosa di nuovo da imparare.",

    /* ── COMPETENZE ── */
    "skills.title":  "Competenze",
    "skills.item1":  "Progettazione elettrica industriale",
    "skills.item2":  "Utilizzo di EPLAN P8 per la creazione di schemi elettrici e distinte basi",
    "skills.item3":  "Programmazione PLC con TIA Portal e Machine Expert",
    "skills.item4":  "Conoscenza di base di Python e Visual Studio Code",
    "skills.item5":  "Problem solving e capacità di apprendimento rapido",

    /* ── ESPERIENZE ── */
    "experience.title":    "Esperienze",
    "exp1.title":          "2024 — In corso: Progettista Elettrico",
    "exp1.body":           "Progettazione elettrica industriale, selezione componenti, stesura schemi elettrici in EPLAN.",
    "exp2.title":          "2023 — 2024: Programmatore PLC",
    "exp2.body":           "Sviluppo logiche di controllo, collaudo funzionale e messa in servizio su PLC Siemens/Schneider.",

    /* ── FORMAZIONE ── */
    "timeline.title":  "Formazione",
    "edu1.title":      "2021 — 2023: ITS Meccatronica & Automazione",
    "edu1.body":       "Formazione di istruzione tecnica superiore in automazione e sistemi industriali.",
    "edu2.title":      "2015 — 2020: IISVE Chimica dei Materiali",
    "edu2.body":       "Diploma di maturità come perito chimico con competenze in chimica applicata e materiali industriali.",

    /* ── CERTIFICAZIONI ── */
    "certs.title":           "Certificazioni e corsi",
    "cert1.title":           "AI Fluency: Framework & Foundations",
    "cert1.body":            "Corso di AI Fluency di Anthropic",
    "cert2.title":           "Introduction to Generative AI",
    "cert2.body":            "Corso di introduzione all'AI generativa di Google Cloud",
    "cert3.title":           "EPLAN P8 2026",
    "cert3.body":            "EPLAN Update New Version '26",
    "cert4.title":           "D-FMEA",
    "cert4.body":            "Design Failure Mode and Effects Analysis",
    "cert5.title":           "EPLAN P8",
    "cert5.body":            "Corso eplan electric P8 base",
    "cert6.title":           "SOLIDWORKS 3D",
    "cert6.body":            "ECLD - CAD 3D meccanico",
    "cert7.title":           "ROBOTICA COMAU",
    "cert7.body":            "Comau use and programming",
    "cert8.title":           "INGLESE B2",
    "cert8.body":            "First Certificate in English",

    /* ── PROGETTI ── */
    "projects.title":   "Progetti",
    "proj1.title":      "data-analysis-pipeline",
    "proj1.body":       "Sviluppo in Python di una pipeline di analisi dei dati con generazione automatica di report e visualizzazioni interattive. Implementazione di modelli di machine learning per previsioni basate su dati storici, utilizzando scikit-learn. Competenze acquisite: data processing, data visualization con Matplotlib e Seaborn, progettazione di classi personalizzate e applicazione di algoritmi predittivi su dataset reali.",
    "proj1.details":    "Maggiori dettagli",

    /* ── CONTATTI ── */
    "contact.title":    "Contatti",
    "contact.email":    "Email:",
    "contact.linkedin": "LinkedIn:",

    /* ── FOOTER ── */
    "footer.copy":  "Portfolio di Alessio Ventura",
  },

  // ─────────────────────────────────────────────────────────────────────────

  en: {
    /* ── NAV ── */
    "nav.home":         "Home",
    "nav.about":        "About me",
    "nav.skills":       "Skills",
    "nav.experience":   "Experience",
    "nav.timeline":     "Education",
    "nav.certs":        "Certifications",
    "nav.projects":     "Projects",
    "nav.contact":      "Contact",

    /* ── HERO ── */
    "hero.title": "Alessio Ventura - Electrical Designer",
    "hero.sub":   "Junior electrical designer specialized in EPLAN P8. Skills in creating electrical schematics, bill of materials, component selection and database management for design. Knowledge of TIA Portal and Machine Expert IDEs and, at a basic level, Visual Studio Code for Python programming. Problem-solving oriented approach with a strong passion for technology and industrial automation.",

    /* ── ABOUT ── */
    "about.title": "About me",
    "about.body":  "Hi! I'm Alessio, 24 years old. I previously worked as a PLC programmer and currently work as an electrical designer, with skills in both TIA Portal and Machine Expert for PLC work and EPLAN P8 for electrical design. I'm passionate about everything related to electronics and IT, and I'm always looking for something new to learn.",

    /* ── SKILLS ── */
    "skills.title":  "Skills",
    "skills.item1":  "Industrial electrical design",
    "skills.item2":  "EPLAN P8 for electrical schematics and bill of materials",
    "skills.item3":  "PLC programming with TIA Portal and Machine Expert",
    "skills.item4":  "Basic knowledge of Python and Visual Studio Code",
    "skills.item5":  "Problem solving and fast learning ability",

    /* ── EXPERIENCE ── */
    "experience.title":    "Experience",
    "exp1.title":          "2024 — Present: Electrical Designer",
    "exp1.body":           "Industrial electrical design, component selection, electrical schematics in EPLAN.",
    "exp2.title":          "2023 — 2024: PLC Programmer",
    "exp2.body":           "Control logic development, functional testing and commissioning on Siemens/Schneider PLCs.",

    /* ── EDUCATION ── */
    "timeline.title":  "Education",
    "edu1.title":      "2021 — 2023: ITS Mechatronics & Automation",
    "edu1.body":       "Higher technical education in automation and industrial systems.",
    "edu2.title":      "2015 — 2020: IISVE Applied Chemistry & Materials",
    "edu2.body":       "High school diploma as a chemical technician with skills in applied chemistry and industrial materials.",

    /* ── CERTIFICATIONS ── */
    "certs.title":           "Certifications & Courses",
    "cert1.title":           "AI Fluency: Framework & Foundations",
    "cert1.body":            "Anthropic AI Fluency course",
    "cert2.title":           "Introduction to Generative AI",
    "cert2.body":            "Google Cloud introductory course on generative AI",
    "cert3.title":           "EPLAN P8 2026",
    "cert3.body":            "EPLAN Update New Version '26",
    "cert4.title":           "D-FMEA",
    "cert4.body":            "Design Failure Mode and Effects Analysis",
    "cert5.title":           "EPLAN P8",
    "cert5.body":            "EPLAN Electric P8 basic course",
    "cert6.title":           "SOLIDWORKS 3D",
    "cert6.body":            "ECLD - 3D mechanical CAD",
    "cert7.title":           "COMAU ROBOTICS",
    "cert7.body":            "Comau use and programming",
    "cert8.title":           "ENGLISH B2",
    "cert8.body":            "First Certificate in English",

    /* ── PROJECTS ── */
    "projects.title":   "Projects",
    "proj1.title":      "data-analysis-pipeline",
    "proj1.body":       "Python development of a data analysis pipeline with automatic report generation and interactive visualizations. Implementation of machine learning models for predictions based on historical data using scikit-learn. Skills gained: data processing, data visualization with Matplotlib and Seaborn, custom class design and predictive algorithm application on real datasets.",
    "proj1.details":    "More details",

    /* ── CONTACT ── */
    "contact.title":    "Contact",
    "contact.email":    "Email:",
    "contact.linkedin": "LinkedIn:",

    /* ── FOOTER ── */
    "footer.copy":  "Alessio Ventura's Portfolio",
  }
};

// ─── MOTORE i18n ──────────────────────────────────────────────────────────────

let currentLang = localStorage.getItem("lang") || "it";

/**
 * Applica la lingua a tutti gli elementi con data-i18n presenti nel DOM.
 * @param {string} lang - 'it' | 'en'
 */
export function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`[i18n] Lingua "${lang}" non trovata.`);
    return;
  }

  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = translations[lang][key];

    if (text !== undefined) {
      // Se è un input/textarea aggiorna placeholder, altrimenti textContent
      if (el.hasAttribute("placeholder")) {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    } else {
      console.warn(`[i18n] Chiave mancante: "${key}" per lingua "${lang}"`);
    }
  });

  // Aggiorna anche aria-label dove definito con data-i18n-label
  document.querySelectorAll("[data-i18n-label]").forEach(el => {
    const key = el.getAttribute("data-i18n-label");
    const text = translations[lang][key];
    if (text !== undefined) el.setAttribute("aria-label", text);
  });
}

/**
 * Restituisce la lingua attualmente attiva.
 * @returns {string} 'it' | 'en'
 */
export function getCurrentLang() {
  return currentLang;
}

// ─── INIZIALIZZAZIONE AUTOMATICA ──────────────────────────────────────────────
// Applica subito la lingua salvata (o 'it' di default) non appena il DOM è pronto.

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setLanguage(currentLang));
} else {
  setLanguage(currentLang);
}