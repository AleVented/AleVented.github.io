/* ---------- helper: wait for DOM ---------- */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- LOADER ---------- */
  const loader = document.getElementById('site-loader');
  window.addEventListener('load', () => {
    // small delay for smoothness
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(()=> loader.remove(), 600);
    }, 450);
  });

  /* ---------- BACKGROUND PARTICLES PREMIUM ---------- */
  (function bgParticles(){
    const container = document.getElementById('bg-anim');
    if(!container) return;
    const count = Math.max(Math.floor(window.innerWidth / 28), 36);
    const colors = ['rgba(79,129,199,0.12)', 'rgba(79,129,199,0.08)', 'rgba(47,106,166,0.08)'];

    for(let i=0;i<count;i++){
      const el = document.createElement('span');
      const size = Math.random() * 10 + 2;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = Math.random()*100 + 'vw';
      el.style.top = Math.random()*100 + 'vh';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.opacity = (Math.random()*0.5 + 0.05).toString();
      el.style.transform = `translateY(0)`;
      el.style.transition = `transform ${10 + Math.random()*18}s linear, opacity ${6 + Math.random()*10}s linear`;
      container.appendChild(el);

      (function animate(p){
        const dur = 8 + Math.random()*12;
        requestAnimationFrame(()=> {
          p.style.transform = `translateY(-120vh)`;
          p.style.opacity = '0';
        });
        setTimeout(()=>{
          p.style.transition = 'none';
          p.style.top = (Math.random()*120) + 'vh';
          p.style.left = Math.random()*100 + 'vw';
          p.style.opacity = (Math.random()*0.45 + 0.05).toString();
          p.style.transition = `transform ${8 + Math.random()*12}s linear, opacity ${6 + Math.random()*10}s linear`;
          animate(p);
        }, (dur*1000) + 300);
      })(el);
    }
  })();

  /* ---------- APPEAR ON SCROLL (IntersectionObserver) ---------- */
  (function appearObserver(){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('appeared');
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    document.querySelectorAll('.appear').forEach(el => io.observe(el));
    document.querySelectorAll('.project-card').forEach(el => io.observe(el));
    document.querySelectorAll('.timeline-card').forEach(el => io.observe(el));
  })();

  /* ---------- THEME TOGGLE (store in localStorage) ---------- */
  (function themeToggle(){
    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('site-theme');
    if(saved === 'light') root.classList.add('light');

    const update = () => {
      btn.textContent = root.classList.contains('light') ? '☀️' : '🌙';
    };
    update();

    btn.addEventListener('click', () => {
      root.classList.toggle('light');
      const now = root.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('site-theme', now);
      update();
    });
  })();

  /* ---------- SIDEBAR / HAMBURGER ---------- */
  (function sideToggle(){
    const side = document.getElementById('side');
    const toggle = document.getElementById('sideToggle');
    const hamburger = document.getElementById('hamburger');
    const sideLinks = side.querySelectorAll('.side-link');

    // mobile hamburger shows sidebar as overlay
    hamburger.addEventListener('click', () => {
      side.classList.toggle('open-mobile');
      side.style.transform = side.classList.contains('open-mobile') ? 'translateX(0)' : '';
    });

    toggle.addEventListener('click', () => {
      // collapse/expand position (desktop)
      side.classList.toggle('collapsed');
    });

    sideLinks.forEach(a => a.addEventListener('click', () => {
      // close on mobile
      if(window.innerWidth < 760) side.classList.remove('open-mobile');
    }));
  })();

  /* ---------- SMOOTH SCROLL POLISH: anchor offset (account for sticky sidebar/top) ---------- */
  (function smoothAnchors(){
    function offsetScroll(e){
      const href = e.currentTarget.getAttribute('href');
      if(!href || href.charAt(0) !== '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if(!target) return;
      const topOffset = 20;
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - topOffset;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', offsetScroll));
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

}); // DOMContentLoaded
