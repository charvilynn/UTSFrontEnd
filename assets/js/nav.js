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
  if (document.querySelector('script[data-Charvlibrary-interactions]')) return;
  if (document.querySelector('script[src*="interactions.js"]')) return;

  const path = window.location.pathname.replace(/\\/g, '/');
  const inPages = path.includes('/pages/');
  const prefix = inPages ? '../../' : '';

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
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const drawer = document.querySelector('.navbar-drawer');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  if (toggle && drawer) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const newState = !isOpen;

      toggle.setAttribute('aria-expanded', String(newState));
      toggle.classList.toggle('active', newState);
      drawer.classList.toggle('open', newState);
      drawer.classList.toggle('active', newState);

      if (newState) {
        document.addEventListener('click', closeDrawerOutside, { once: true, capture: true });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && (drawer.classList.contains('open') || drawer.classList.contains('active'))) {
        closeDrawer(toggle, drawer);
      }
    });
  }

  highlightActiveNav();
}

function closeDrawer(toggle, drawer) {
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('active');
  }
  if (drawer) {
    drawer.classList.remove('open');
    drawer.classList.remove('active');
  }
}

function closeDrawerOutside(e) {
  const drawer = document.querySelector('.navbar-drawer');
  const toggle = document.querySelector('.navbar-toggle');
  if (drawer && !drawer.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
    closeDrawer(toggle, drawer);
  }
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  const navLinks = document.querySelectorAll('.navbar-nav a, .navbar-drawer .navbar-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.split('?')[0].replace(/^(\.\.\/)+/, '');
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
  const searchInputs = document.querySelectorAll('.navbar-search input, .navbar-search-input, #navbar-search-input');

  searchInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          navigateToSearch(query);
        }
      }
    });

    const q = getUrlParam('q');
    if (q) input.value = q;
  });
}

function navigateToSearch(query) {
  const path = window.location.pathname.replace(/\\/g, '/');
  let searchPath = '';

  if (path.includes('/pages/discovery/')) {
    searchPath = 'search-results.html';
  } else if (path.includes('/pages/')) {
    searchPath = '../discovery/search-results.html';
  } else {
    searchPath = 'pages/discovery/search-results.html';
  }

  window.location.href = `${searchPath}?q=${encodeURIComponent(query)}`;
}

/* ------------------------------------------------------------------
   WISHLIST BADGE
   ------------------------------------------------------------------ */

function initWishlistBadge() {
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badges = document.querySelectorAll('.wishlist-count-badge');
  if (!badges.length) return;

  const count = typeof getWishlist === 'function' ? getWishlist().length : 0;
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

/* ------------------------------------------------------------------
   GLOBAL WISHLIST BUTTON HANDLER
   ------------------------------------------------------------------ */

function initGlobalWishlistButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.book-wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const bookId = parseInt(btn.dataset.bookId);
    if (isNaN(bookId)) return;

    const added = toggleWishlist(bookId);

    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', added ? 'currentColor' : 'none');
    }
    btn.classList.toggle('active', added);
    btn.setAttribute('aria-label', added ? 'Hapus dari wishlist' : 'Tambah ke wishlist');

    if (typeof showToast === 'function') {
      const book = typeof getBookById === 'function' ? getBookById(bookId) : null;
      const bookName = book ? book.title : 'Buku';
      showToast(
        added ? `"${bookName}" ditambahkan ke wishlist` : `"${bookName}" dihapus dari wishlist`,
        added ? 'success' : 'info'
      );
    }

    updateWishlistBadge();
  });
}

/* ------------------------------------------------------------------
   FOOTER YEAR
   ------------------------------------------------------------------ */

function setFooterYear() {
  const yearEl = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearEl.forEach(el => {
    el.textContent = currentYear;
  });
}

/* ------------------------------------------------------------------
   HELPERS
   ------------------------------------------------------------------ */

function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

if (typeof getWishlist === 'undefined') {
  window.getWishlist = function() {
    try {
      return JSON.parse(localStorage.getItem('Charvlibrary_wishlist')) || [];
    } catch {
      return [];
    }
  };
}