/**
 * nav.js: Navbar & Footer Logic (Shared)
 * Dipakai di semua 30 halaman
 *
 * Fitur:
 * - Hamburger menu toggle (mobile)
 * - Navbar shadow saat scroll
 * - Active nav link detection
 * - Live search (ketik di navbar → redirect ke search-results)
 * - Wishlist counter badge
 * - Footer current year
 */

document.addEventListener('DOMContentLoaded', () => {
  autoLoadInteractions();
  initNavbar();
  initSearch();
  initWishlistBadge();
  setFooterYear();
  initGlobalWishlistButtons();
});

/* ------------------------------------------------------------------
   AUTO-LOAD interactions.js
   Detects depth and injects script so every page gets effects
   without manually editing 30 HTML files
   ------------------------------------------------------------------ */

function autoLoadInteractions() {
  // Skip if already loaded (statically or previously injected)
  if (document.querySelector('script[data-Charvlibrary-interactions]')) return;
  if (document.querySelector('script[src*="interactions.js"]')) return;

  // Calculate relative path to assets/ from current page
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // depth 0 = root (index.html), depth 2 = pages/folder/file.html
  const prefix = depth >= 2 ? '../../' : depth === 1 ? '../' : '';

  const script = document.createElement('script');
  script.src = prefix + 'assets/js/interactions.js';
  script.defer = true;
  script.dataset.CharvlibraryInteractions = '1';
  document.head.appendChild(script);
}


/* ------------------------------------------------------------------
   NAVBAR
   ------------------------------------------------------------------ */

function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.querySelector('.navbar-toggle');
  const drawer   = document.querySelector('.navbar-drawer');

  if (!navbar) return;

  // Shadow saat scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Hamburger
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      drawer.classList.toggle('open', !isOpen);

      // tutup drawer saat klik di luar
      if (!isOpen) {
        document.addEventListener('click', closeDrawerOutside, { once: true, capture: true });
      }
    });

    // tutup dengan Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer(toggle, drawer);
      }
    });
  }

  // Tandai link aktif berdasarkan URL
  highlightActiveNav();
}

function closeDrawer(toggle, drawer) {
  toggle.setAttribute('aria-expanded', 'false');
  drawer.classList.remove('open');
}

function closeDrawerOutside(e) {
  const drawer = document.querySelector('.navbar-drawer');
  const toggle = document.querySelector('.navbar-toggle');
  if (drawer && !drawer.contains(e.target) && !toggle.contains(e.target)) {
    closeDrawer(toggle, drawer);
  }
}

function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav a, .navbar-drawer .navbar-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    // cocokkan path akhir dari href dengan current path
    const linkPath = href.split('?')[0]; // abaikan query string
    if (linkPath && currentPath.endsWith(linkPath)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ------------------------------------------------------------------
   SEARCH
   ------------------------------------------------------------------ */

function initSearch() {
  const searchInputs = document.querySelectorAll('.navbar-search input, .navbar-search-input');

  searchInputs.forEach(input => {
    // Enter key → redirect
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          navigateToSearch(query);
        }
      }
    });

    // Isi input dari URL param (untuk search-results.html)
    const q = getUrlParam('q');
    if (q) input.value = q;
  });
}

function navigateToSearch(query) {
  // hitung path ke root dari halaman saat ini
  const depth = window.location.pathname.split('/').length - 2;
  const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';

  // cari apakah kita sudah di dalam pages/
  const inPages = window.location.pathname.includes('/pages/');
  const searchPath = inPages
    ? prefix + 'pages/discovery/search-results.html'
    : 'pages/discovery/search-results.html';

  window.location.href = `${searchPath}?q=${encodeURIComponent(query)}`;
}

/* ------------------------------------------------------------------
   WISHLIST BADGE
   ------------------------------------------------------------------ */

function initWishlistBadge() {
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badge = document.querySelector('.wishlist-count-badge');
  if (!badge) return;

  const count = getWishlist().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

/* ------------------------------------------------------------------
   GLOBAL WISHLIST BUTTON HANDLER
   Tangkap klik pada .book-wishlist-btn di mana pun di halaman
   ------------------------------------------------------------------ */

function initGlobalWishlistButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.book-wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const bookId = parseInt(btn.dataset.bookId);
    const added  = toggleWishlist(bookId);

    // update icon fill
    const svg = btn.querySelector('path');
    if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
    btn.classList.toggle('active', added);
    btn.setAttribute('aria-label', added ? 'Hapus dari wishlist' : 'Tambah ke wishlist');

    // notifikasi
    const book = getBookById(bookId);
    const bookName = book ? book.title : 'Buku';
    showToast(
      added ? `"${bookName}" ditambahkan ke wishlist` : `"${bookName}" dihapus dari wishlist`,
      added ? 'success' : 'info'
    );

    updateWishlistBadge();
  });
}

/* ------------------------------------------------------------------
   FOOTER YEAR
   ------------------------------------------------------------------ */

function setFooterYear() {
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------------
   HELPER: getUrlParam (duplikat dari utils.js kalau utils belum load)
   ------------------------------------------------------------------ */

function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ------------------------------------------------------------------
   HELPER: getWishlist (nav.js butuh ini untuk badge)
   Fungsi ini juga ada di utils.js: kalau utils sudah diload, ini
   akan di-override. Aman karena same logic.
   ------------------------------------------------------------------ */

if (typeof getWishlist === 'undefined') {
  window.getWishlist = function() {
    try {
      return JSON.parse(localStorage.getItem('Charvlibrary_wishlist')) || [];
    } catch { return []; }
  };
}
