/* ===== script.js =====
 - crea particelle background
 - gestisce IntersectionObserver per le animazioni on-scroll
 - toggle tema (salva in localStorage)
 - hamburger menu
*/

/* BACKGROUND: crea particelle leggere */
(function bgParticles(){
  const container = document.getElementById('bg-anim');
  if(!container) return;
  const count = Math.max(Math.floor(window.innerWidth / 30), 30);
  const colors = ['rgba(79,129,199,0.06)', 'rgba(79,129,199,0.04)'];

  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'bg-particle';
    const size = Math.random() * 6 + 2;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.position = 'absolute';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.borderRadius = '50%';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.opacity = (Math.random()*0.6 + 0.05).toString();
    el.style.transform = `translateY(0)`;
    el.style.pointerEvents = 'none';
    el.style.transition = `transform ${8 + Math.random()*12}s linear, opacity ${6 + Math.random()*8}s linear`;
    container.appendChild(el);

    // anima spostamento verso l'alto e loop
    (function animateParticle(p){
      const dur = 8 + Math.random()*12;
      p.style.transition = `transform ${dur}s linear, opacity ${dur/2}s linear`;
      requestAnimationFrame(()=> {
        p.style.transform = `translateY(-120vh)`;
        p.style.opacity = '0';
      });
      // reset ciclo dopo durata
      setTimeout(()=> {
        p.style.transition = 'none';
        p.style.transform = 'translateY(0)';
        p.style.top = Math.random() * 120 + 'vh';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.opacity = (Math.random()*0.6 + 0.05).toString();
        // riparti
        setTimeout(()=> animateParticle(p), 200 + Math.random()*2000);
      }, (dur*1000) + 200);
    })(el);
  }
})();

/* IntersectionObserver per "appear" elements */
(function appearObserver(){
  const opts = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('appeared');
        entry.target.classList.add('appeared'); // for cards also
        entry.target.classList.remove('appear');
        // if project-card -> add class for fine tuned
        if(entry.target.classList.contains('project-card')) {
          entry.target.classList.add('appeared');
        }
      }
    });
  }, opts);

  document.querySelectorAll('.appear').forEach(el => io.observe(el));
  document.querySelectorAll('.project-card').forEach(el => io.observe(el));
})();

/* THEME TOGGLE */
(function themeToggle(){
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;

  // carica preferenza
  const saved = localStorage.getItem('site-theme');
  if(saved) root.setAttribute('data-theme', saved);

  // sync button icon
  const updateBtn = () => {
    const theme = root.getAttribute('data-theme') || 'dark';
    btn.textContent = (theme === 'dark') ? '🌙' : '☀️';
  };
  updateBtn();

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateBtn();
  });
})();

/* HAMBURGER MENU */
(function burgerMenu(){
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // chiudi quando clicchi un link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* miglioramento: riduce animazioni su mobile per batteria */
(function prefersReducedMotion(){
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    document.querySelectorAll('.project-card, .appear').forEach(el=>{
      el.style.transition = 'none';
      el.classList.add('appeared');
    });
  }
})();
