// Lightbox gallery for every photo on the page
(function () {
  const figures = Array.from(document.querySelectorAll('figure.ph'));
  const box = document.getElementById('lightbox');
  const img = box.querySelector('.lightbox__img');
  const cap = box.querySelector('.lightbox__caption');
  let index = 0;
  let lastFocus = null;

  function show(i) {
    index = (i + figures.length) % figures.length;
    const src = figures[index].querySelector('img');
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    const fc = figures[index].querySelector('figcaption');
    cap.textContent = fc ? fc.textContent + ' · ' + src.alt : src.alt;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.lightbox__close').focus();
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  figures.forEach((fig, i) => {
    fig.tabIndex = 0;
    fig.addEventListener('click', () => open(i));
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
  box.querySelector('.lightbox__next').addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch screens
  let startX = null;
  box.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();

// Fade sections and images in as they scroll into view
(function () {
  const targets = document.querySelectorAll('.block, .ph:not(.hero), .caption');
  if (!('IntersectionObserver' in window)) return;
  targets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach((el) => io.observe(el));
})();

// Highlight the current section in the sticky nav
(function () {
  const links = Array.from(document.querySelectorAll('.topbar__nav a'));
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => s && io.observe(s));
})();
