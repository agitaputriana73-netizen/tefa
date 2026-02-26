/* ========================================================
   TEFA SMKN 1 GONDANG — Main Script
   ======================================================== */

/* ── Header scroll effect ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile burger menu ── */
const burger = document.getElementById('burger');
const nav    = document.querySelector('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const isOpen = nav.classList.contains('open');
  burger.children[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  burger.children[1].style.opacity   = isOpen ? '0' : '1';
  burger.children[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.children[0].style.transform = '';
  burger.children[1].style.opacity   = '1';
  burger.children[2].style.transform = '';
}));

/* ── Scroll-reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ── Add reveal classes to program cards ── */
document.querySelectorAll('.prog-card').forEach((card, i) => {
  card.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`);
  revealObs.observe(card);
});

/* ── Add reveal to stats ── */
document.querySelectorAll('.stat-item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  revealObs.observe(el);
});

/* ── Add reveal to gallery items ── */
document.querySelectorAll('.gal-item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${(i % 3) + 1}`);
  revealObs.observe(el);
});

/* ── Counter animation ── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = document.querySelectorAll('.stat-num');
      const data = [
        { val: 7,    suffix: '+' },
        { val: 1200, suffix: '+' },
        { val: 25,   suffix: '+' },
        { val: 95,   suffix: '%' },
      ];
      nums.forEach((el, i) => {
        animateCounter(el, data[i].val, data[i].suffix);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id], div[id="home"]');
const navLinks  = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--green2)' : '';
  });
});

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Contact form submit handler ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '✅ Pesan Terkirim!';
  btn.style.background = '#27ae60';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

/* ── Lightbox for gallery ── */
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display:none; position:fixed; inset:0; z-index:9998;
  background:rgba(0,0,0,0.92); align-items:center; justify-content:center;
  cursor:zoom-out; backdrop-filter:blur(8px);
`;
lightbox.innerHTML = `
  <img id="lb-img" style="max-width:92vw;max-height:88vh;border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,0.8);" />
  <button id="lb-close" style="position:absolute;top:20px;right:24px;background:rgba(255,255,255,0.12);border:none;color:#fff;font-size:24px;width:44px;height:44px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
`;
document.body.appendChild(lightbox);

document.querySelectorAll('.gal-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    document.getElementById('lb-img').src = img.src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
lightbox.addEventListener('click', closeLightbox);
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

console.log('%c🌾 TEFA SMKN 1 Gondang Nganjuk', 'color:#2ecc71;font-size:18px;font-weight:bold;');
console.log('%cSMK Pusat Keunggulan · @smkn1gondangnganjuk', 'color:#888;font-size:13px;');
