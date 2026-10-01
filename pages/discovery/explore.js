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