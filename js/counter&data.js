//GoatCounter
export function initGoatCounter() {
    var gc = document.createElement("script");
    gc.setAttribute("data-goatcounter", "https://alevented.goatcounter.com/count");
    gc.async = true;
    gc.src = "//gc.zgo.at/count.js";
    document.head.appendChild(gc);
};

//Mostra l'anno corrente
export function showCurrentYear() {
    var span = document.getElementById("current-year");
    if(span) {
        span.textContent = new Date().getFullYear();
    }
};

//Come usarlo negli altri moduli JS:
//import { initGoatCounter, showCurrentYear } from './counter&data.js';
/* ---------- fine counter&data.js ---------- */