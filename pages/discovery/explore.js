let activeGenre    = 'all';
let availableOnly  = false;
let sortMethod     = 'default';

document.addEventListener('DOMContentLoaded', () => {
  // cek URL param: bisa dari categories.html atau search
  const genreParam = getUrlParam('genre');
  if (genreParam) activeGenre = genreParam;

  // tampilkan skeleton dulu selagi "load"
  showSkeletons();

  setTimeout(() => {
    renderBooks();
    initFilters();
    initScrollReveal();
  }, 500); // simulate loading: cukup 500ms, cepat tapi terasa
});

/* ------------------------------------------------------------------
   SKELETON STATE
   ------------------------------------------------------------------ */

function showSkeletons() {
  const grid = document.getElementById('booksGrid');
  if (!grid) return;
  grid.innerHTML = renderSkeletonCards(12); // dari utils.js
}

/* ------------------------------------------------------------------
   RENDER BOOKS
   ------------------------------------------------------------------ */

function renderBooks(animate = false) {
  const grid      = document.getElementById('booksGrid');
  const countEl   = document.getElementById('countNum');
  const emptyEl   = document.getElementById('emptyState');
  if (!grid) return;

  // filter dan sort
  let filtered = getFilteredBooks();

  // update count
  if (countEl) countEl.textContent = filtered.length;

  // empty state
  const isEmpty = filtered.length === 0;
  if (emptyEl) emptyEl.hidden = !isEmpty;
  grid.style.display = isEmpty ? 'none' : '';

  if (isEmpty) return;

  // render HTML
  const html = filtered.map(book => renderBookCard(book, '../../')).join('');

  if (animate) {
    // animasi exit lalu enter
    const cards = grid.querySelectorAll('.book-card');
    cards.forEach(c => c.classList.add('filter-exit'));

    setTimeout(() => {
      grid.innerHTML = html;
      grid.querySelectorAll('.book-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.04}s`;
        card.classList.add('filter-enter');
      });
      addGlareElements();
      init3DTilt();
      initScrollReveal();
    }, 200);

  } else {
    grid.innerHTML = html;
    addGlareElements();
    init3DTilt();
    initScrollReveal();
  }
}

function getFilteredBooks() {
  let result = [...booksData];

  // filter genre: case-insensitive, match nama genre persis
  if (activeGenre && activeGenre !== 'all') {
    const q = activeGenre.toLowerCase();
    result = result.filter(b => b.genre.toLowerCase() === q);
  }

  // filter ketersediaan
  if (availableOnly) {
    result = result.filter(b => b.available);
  }

  // sort
  switch (sortMethod) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title, 'id'));
      break;
    case 'year':
      result.sort((a, b) => b.year - a.year);
      break;
    default:
      // default: featured dulu, lalu sisanya
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
}

/* ------------------------------------------------------------------
   FILTER LOGIC
   ------------------------------------------------------------------ */

function initFilters() {
  // Chips
  const chipsContainer = document.getElementById('genreChips');
  if (chipsContainer) {
    // set chip aktif dari URL param
    if (activeGenre !== 'all') {
      chipsContainer.querySelectorAll('.chip').forEach(c => {
        const isActive = c.dataset.genre === activeGenre;
        c.classList.toggle('active', isActive);
        c.setAttribute('aria-pressed', String(isActive));
      });
    }

    chipsContainer.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;

      // update active chip
      chipsContainer.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');

      activeGenre = chip.dataset.genre;
      renderBooks(true);
    });
  }

  // Availability toggle
  const toggleEl = document.getElementById('availableOnly');
  if (toggleEl) {
    toggleEl.addEventListener('change', () => {
      availableOnly = toggleEl.checked;
      renderBooks(true);
    });
  }

  // Sort
  const sortEl = document.getElementById('sortBooks');
  if (sortEl) {
    sortEl.addEventListener('change', () => {
      sortMethod = sortEl.value;
      renderBooks(true);
    });
  }

  // Reset filter button (di empty state)
  const resetBtn = document.getElementById('resetFilter');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeGenre   = 'all';
      availableOnly = false;
      sortMethod    = 'default';

      // reset UI state
      chipsContainer?.querySelectorAll('.chip').forEach((c, i) => {
        c.classList.toggle('active', i === 0);
        c.setAttribute('aria-pressed', String(i === 0));
      });
      if (toggleEl) toggleEl.checked = false;
      if (sortEl)   sortEl.value = 'default';

      renderBooks(true);
    });
  }
}

/* ------------------------------------------------------------------
   3D TILT EFFECT
   Vanilla JS: tidak butuh library.
   Kenapa ini original: dibuat dari nol dengan math yang spesifik
   untuk card buku, bukan copy-paste dari plugin.
   ------------------------------------------------------------------ */

function init3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // skip di touch device

  const cards = document.querySelectorAll('.tilt-grid .book-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
    card.addEventListener('focus', () => {
      // tidak tilt saat keyboard focus: aksesibilitas
    });
  });
}

function handleTilt(e) {
  const card   = e.currentTarget;
  const rect   = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // posisi mouse relatif terhadap pusat card (-1 sampai 1)
  const mouseX = (e.clientX - centerX) / (rect.width / 2);
  const mouseY = (e.clientY - centerY) / (rect.height / 2);

  // max tilt 12 derajat: cukup terlihat tanpa lebay
  const maxTilt = 12;
  const tiltX   = mouseY * -maxTilt; // rotateX (naik/turun)
  const tiltY   = mouseX * maxTilt;  // rotateY (kiri/kanan)

  // scale sedikit saat hover
  card.style.transition = 'box-shadow 0.15s ease';
  card.style.transform  = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  card.classList.remove('tilt-reset');

  // update box shadow supaya mengikuti arah "cahaya"
  const shadowX = mouseX * 10;
  const shadowY = mouseY * 10;
  card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(146, 64, 14, 0.2)`;
}

function resetTilt(e) {
  const card = e.currentTarget;
  card.classList.add('tilt-reset');
  card.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  card.style.boxShadow  = '';
  card.style.transition = '';
}

/* ------------------------------------------------------------------
   GLARE ELEMENT
   Efek cahaya pantulan di atas card: menambah kedalaman
   ------------------------------------------------------------------ */

function addGlareElements() {
  document.querySelectorAll('.tilt-grid .book-card').forEach(card => {
    if (!card.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      glare.setAttribute('aria-hidden', 'true');
      // pastikan card punya position relative
      if (getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }
      card.appendChild(glare);
    }
  });
}