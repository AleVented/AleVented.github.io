/* ---------- helper: wait for DOM ---------- */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('site-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(()=> loader.remove(), 600);
    }, 450);
  });

  /* ---------- BACKGROUND PARTICLES ---------- */
  (function bgParticles(){
    const container = document.getElementById('bg-anim');
    if(!container) return;
    const count = Math.max(Math.floor(window.innerWidth / 32), 30);
    const colors = ['rgba(79,129,199,0.10)', 'rgba(79,129,199,0.07)', 'rgba(47,106,166,0.07)'];

    for(let i=0;i<count;i++){
      const el = document.createElement('span');
      const size = Math.random() * 10 + 3;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = Math.random()*100 + 'vw';
      el.style.top = Math.random()*100 + 'vh';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.opacity = (Math.random()*0.5 + 0.08).toString();
      el.style.transform = `translateY(0)`;
      el.style.transition = `transform ${12 + Math.random()*18}s linear, opacity ${8 + Math.random()*10}s linear`;
      container.appendChild(el);

      (function animate(p){
        const dur = 10 + Math.random()*12;
        requestAnimationFrame(()=> {
          p.style.transform = `translateY(-140vh)`;
          p.style.opacity = '0';
        });
        setTimeout(()=>{
          p.style.transition = 'none';
          p.style.top = (Math.random()*120) + 'vh';
          p.style.left = Math.random()*100 + 'vw';
          p.style.opacity = (Math.random()*0.45 + 0.08).toString();
          p.style.transition = `transform ${10 + Math.random()*14}s linear, opacity ${8 + Math.random()*10}s linear`;
          animate(p);
        }, (dur*1000) + 300);
      })(el);
    }
  })();

  /* ---------- APPEAR ON SCROLL ---------- */
(function appearObserver(){
  const cards = document.querySelectorAll('.appear, .project-card, .timeline-card');

  // ➤ Step Smooth Reveal: assegna transition-delay progressivo
  cards.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;  // 0.1s per ogni card successiva
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('appeared');
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  cards.forEach(el => io.observe(el));
})();


  /* ---------- THEME TOGGLE ---------- */
  (function themeToggle(){
    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('site-theme');
    if(saved === 'light') root.classList.add('light');

    // SVG con contrasto alto per entrambi i temi
    const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 5.36l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

    const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>`;


    const update = () => {
      const isLight = root.classList.contains('light');
      btn.innerHTML = isLight ? sunIcon : moonIcon;
      btn.setAttribute('aria-label', isLight ? 'Tema chiaro' : 'Tema scuro');
    };
    update();

    btn.addEventListener('click', () => {
      root.classList.toggle('light');
      const now = root.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('site-theme', now);
      update();
    });
  })();

  /* ---------- SMOOTH SCROLL con offset dinamico ---------- */
  (function smoothAnchors(){
    function getTopOffset() {
      const topbar = document.querySelector('.topbar');
      return topbar ? topbar.offsetHeight + 8 : 20;
    }
    function offsetScroll(e){
      const href = e.currentTarget.getAttribute('href');
      if(!href || href.charAt(0) !== '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if(!target) return;
      const topOffset = getTopOffset();
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - topOffset;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', offsetScroll));
  })();

  /* ---------- TIMELINE CLICCABILE ---------- */
(function timelineToggle(){
  document.querySelectorAll('.timeline-card').forEach(card => {

    const toggle = () => {
      const isOpen = card.classList.toggle('open');
      card.classList.toggle('collapsed', !isOpen);
      card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // --- Se è stata aperta e ha un PDF, lo apro ---
      const pdf = card.dataset.pdf;
      if (isOpen && pdf) {
        window.open(pdf, '_blank');
      }
    };

    card.addEventListener('click', toggle);

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

  });
})();


  /* ---------- reduce-motion respect ---------- */
  (function reducedMotion(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.querySelectorAll('.appear, .project-card, #bg-anim span').forEach(el => {
        el.style.transition = 'none';
        el.classList.add('appeared');
      });
    }
  })();

});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});
