// =============================
//  Vanilla JS for Monthsary Page
// =============================
(function () {
  const heartsBtn = document.getElementById('toggle-hearts');
  const themeBtn = document.getElementById('toggle-theme');
  const heartsContainer = document.getElementById('hearts-container');
  const body = document.body;

  // Theme: restore from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeBtn.setAttribute('aria-pressed', 'true');
    themeBtn.textContent = '☀️ Light Mode';
  }

  // Floating Hearts
  let heartsEnabled = true;
  let heartTimer = null;
  const heartColors = ['#ff4da6', '#ff70b8', '#ff99cc']; // required tones

  function makeHeart() {
    const h = document.createElement('span');
    h.className = 'heart';
    const size = Math.floor(Math.random() * 22) + 14; // 14 - 36px
    const left = Math.random() * 100; // vw percentage
    const dur = Math.random() * 6 + 6; // 6 - 12s
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];

    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.style.left = left + 'vw';
    h.style.background = color;
    h.style.animationDuration = dur + 's';
    heartsContainer.appendChild(h);

    h.addEventListener('animationend', () => h.remove());
  }

  function startHearts() {
    if (heartTimer) return;
    // burst start
    for (let i = 0; i < 8; i++) setTimeout(makeHeart, i * 150);
    heartTimer = setInterval(makeHeart, 650);
  }
  function stopHearts() {
    clearInterval(heartTimer); heartTimer = null;
    // remove existing hearts gradually
    document.querySelectorAll('.heart').forEach(el => el.remove());
  }

  startHearts();

  heartsBtn.addEventListener('click', () => {
    heartsEnabled = !heartsEnabled;
    heartsBtn.setAttribute('aria-pressed', String(heartsEnabled));
    heartsBtn.textContent = heartsEnabled ? '💗 Hearts: On' : '💗 Hearts: Off';
    heartsEnabled ? startHearts() : stopHearts();
  });

  themeBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    themeBtn.setAttribute('aria-pressed', String(isDark));
    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Lightbox / Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeEls = lightbox.querySelectorAll('[data-close]');
  let lastFocus = null;

  function openLightbox(src, alt, caption) {
    lastFocus = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.removeAttribute('hidden');
    // focus close
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lightboxImg.src = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.querySelectorAll('.card').forEach(card => {
    const img = card.querySelector('img');
    const cap = card.querySelector('figcaption')?.textContent || '';

    card.addEventListener('click', () => openLightbox(img.src, img.alt, cap));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.src, img.alt, cap);
      }
    });
  });

  closeEls.forEach(el => el.addEventListener('click', closeLightbox));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });
})();
