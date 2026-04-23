// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// Stat counters
const easeOut = t => 1 - Math.pow(1 - t, 3);
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const isFloat = !Number.isInteger(target);
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const v = target * easeOut(p);
    el.textContent = isFloat ? v.toFixed(1) : Math.round(v).toString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = isFloat ? target.toFixed(1) : target.toString();
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-n').forEach(el => io.observe(el));
