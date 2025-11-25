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
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('appeared');
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    document.querySelectorAll('.appear, .project-card, .timeline-card').forEach(el => io.observe(el));
  })();

  /* ---------- THEME TOGGLE ---------- */
  (function themeToggle(){
    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('site-theme');
    if(saved === 'light') root.classList.add('light');

    // SVG con contrasto alto per entrambi i temi
    const sunIcon = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0 1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4V1h-2v3h2zm0 19v-3h-2v3h2zm8-9h3v-2h-3v2zM4 12H1v-2h3v2zm13.24 7.16 1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM6.76 19.16l-1.8 1.79-1.41-1.41 1.79-1.8 1.42 1.42zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>`;
    const moonIcon = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M21.752 15.002A9 9 0 019.001 2.251a9.002 9.002 0 1012.751 12.751z"/>
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