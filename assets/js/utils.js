/**
 * utils.js: Helper Functions untuk Charvlibrary
 * Dipakai di semua halaman, load setelah data-books.js
 */

/* ==========================================================================
   String Utilities
   ========================================================================== */

/**
 * Potong teks ke panjang tertentu, tambahkan '...' di akhir
 * @param {string} text
 * @param {number} maxLength
 */
function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Format tanggal ke format Indonesia
 * @param {string} dateStr - format YYYY-MM-DD
 */
function formatDate(dateStr) {
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const d = new Date(dateStr);
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Hitung estimasi waktu baca
 * @param {number} pages
 */
function estimateReadTime(pages) {
  const menit = Math.round(pages * 1.5); // ~1.5 menit per halaman
  if (menit < 60) return `${menit} menit`;
  const jam = Math.floor(menit / 60);
  const sisaMenit = menit % 60;
  return sisaMenit > 0 ? `${jam} jam ${sisaMenit} menit` : `${jam} jam`;
}

/* ==========================================================================
   Rating Utilities
   ========================================================================== */

/**
 * Render bintang HTML berdasarkan rating
 * @param {number} rating - 0 sampai 5
 * @param {boolean} interactive - apakah bisa diklik
 */
function renderStars(rating, interactive = false) {
  const full   = Math.floor(rating);
  const half   = rating % 1 >= 0.5;
  const empty  = 5 - full - (half ? 1 : 0);

  if (interactive) {
    // Untuk halaman reviews: bintang bisa diklik
    return Array.from({ length: 5 }, (_, i) => `
      <button
        class="star-btn"
        data-value="${i + 1}"
        aria-label="Beri rating ${i + 1} bintang"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    `).join('');
  }

  // Render bintang statis
  let html = '<span class="stars" aria-label="Rating ' + rating + ' dari 5">';

  for (let i = 0; i < full; i++) {
    html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  if (half) {
    html += '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="h"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#h)" stroke="currentColor" stroke-width="1"/></svg>';
  }
  for (let i = 0; i < empty; i++) {
    html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }

  html += '</span>';
  return html;
}

/* ==========================================================================
   localStorage Utilities
   ========================================================================== */

/**
 * Simpan data ke localStorage
 * @param {string} key
 * @param {*} value
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage tidak tersedia:', e);
  }
}

/**
 * Ambil data dari localStorage
 * @param {string} key
 * @param {*} defaultValue - nilai default kalau tidak ada
 */
function getFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

/* ==========================================================================
   Wishlist Utilities
   ========================================================================== */

function getWishlist() {
  return getFromStorage('Charvlibrary_wishlist', []);
}

function addToWishlist(bookId) {
  const list = getWishlist();
  if (!list.includes(bookId)) {
    list.push(bookId);
    saveToStorage('Charvlibrary_wishlist', list);
    return true;
  }
  return false;
}

function removeFromWishlist(bookId) {
  const list = getWishlist().filter(id => id !== bookId);
  saveToStorage('Charvlibrary_wishlist', list);
}

function toggleWishlist(bookId) {
  const list = getWishlist();
  if (list.includes(bookId)) {
    removeFromWishlist(bookId);
    return false; // dihapus
  } else {
    addToWishlist(bookId);
    return true; // ditambahkan
  }
}

function isInWishlist(bookId) {
  return getWishlist().includes(bookId);
}

/* ==========================================================================
   Borrowed Books Utilities
   ========================================================================== */

function getBorrowedBooks() {
  return getFromStorage('Charvlibrary_borrowed', []);
}

/* ==========================================================================
   Notifications Utilities
   ========================================================================== */

function getNotificationsList() {
  const customNotifs = getFromStorage('Charvlibrary_custom_notifs', []);
  const baseNotifs = typeof notificationsData !== 'undefined' ? notificationsData : [];
  return [...customNotifs, ...baseNotifs];
}

function addNotification(type, title, message) {
  const customNotifs = getFromStorage('Charvlibrary_custom_notifs', []);
  const newNotif = {
    id: Date.now(),
    type,
    title,
    message,
    date: new Date().toISOString().split('T')[0],
    read: false
  };
  customNotifs.unshift(newNotif);
  saveToStorage('Charvlibrary_custom_notifs', customNotifs);
  return newNotif;
}

function getUnreadNotificationsCount() {
  const readMap = getFromStorage('Charvlibrary_notif_read', {});
  const list = getNotificationsList();
  return list.filter(n => !readMap[n.id] && n.read !== true).length;
}

function markAllNotificationsAsRead() {
  const readMap = getFromStorage('Charvlibrary_notif_read', {});
  const list = getNotificationsList();
  list.forEach(n => { readMap[n.id] = true; });
  saveToStorage('Charvlibrary_notif_read', readMap);
}

function borrowBook(bookId) {
  const borrowed = getBorrowedBooks();
  const today = new Date();
  const returnDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  if (!borrowed.find(b => b.bookId === bookId)) {
    borrowed.push({
      bookId,
      borrowDate: today.toISOString().split('T')[0],
      returnDate: returnDate.toISOString().split('T')[0],
      status: 'active'
    });
    saveToStorage('Charvlibrary_borrowed', borrowed);

    const book = typeof getBookById === 'function' ? getBookById(bookId) : null;
    const bookTitle = book ? book.title : `Buku #${bookId}`;
    const dueStr = typeof formatDate === 'function' ? formatDate(returnDate.toISOString().split('T')[0]) : returnDate.toISOString().split('T')[0];
    addNotification('borrow', 'Peminjaman Berhasil', `Kamu berhasil meminjam "${bookTitle}". Batas pengembalian: ${dueStr}.`);

    return true;
  }
  return false;
}

function returnBook(bookId) {
  const borrowed = getBorrowedBooks().map(b => {
    if (b.bookId === bookId) return { ...b, status: 'returned' };
    return b;
  });
  saveToStorage('Charvlibrary_borrowed', borrowed);

  const book = typeof getBookById === 'function' ? getBookById(bookId) : null;
  const bookTitle = book ? book.title : `Buku #${bookId}`;
  addNotification('reminder', 'Pengembalian Berhasil', `Buku "${bookTitle}" telah berhasil dikembalikan ke perpustakaan.`);
}

/* ==========================================================================
   User Profile Utilities
   ========================================================================== */

function getUser() {
  return getFromStorage('Charvlibrary_user', {
    name: 'Pengguna Charvlibrary',
    email: '',
    avatar: '',
    favoriteGenres: [],
    joinDate: new Date().toISOString().split('T')[0]
  });
}

function saveUser(userData) {
  saveToStorage('Charvlibrary_user', userData);
}

/* ==========================================================================
   Toast Notification
   ========================================================================== */

let toastContainer = null;

function showToast(message, type = 'info', duration = 3000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('role', 'region');
    toastContainer.setAttribute('aria-label', 'Notifikasi');
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const icons = {
    success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    error:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  };

  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  // animasi masuk
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ==========================================================================
   Render Book Card
   Satu fungsi untuk render card buku secara konsisten di semua halaman
   ========================================================================== */

/**
 * @param {Object} book - objek dari booksData
 * @param {string} basePath - path relatif ke root (untuk link)
 */
function renderBookCard(book, basePath = '') {
  const inWishlist = isInWishlist(book.id);
  const detailPath = basePath + 'pages/discovery/book-detail.html?id=' + book.id;
  const coverSrc = book.coverFallback || book.cover;
  const fallback = `this.onerror=null; this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80'`;

  return `
    <article class="book-card fade-up" data-book-id="${book.id}">
      <div class="book-cover-wrap">
        <a href="${detailPath}" tabindex="-1" aria-hidden="true">
          <img
            src="${coverSrc}"
            alt="Sampul buku ${book.title}"
            onerror="${fallback}"
          >
        </a>
        ${book.available
          ? '<span class="badge badge--available book-available-badge">Tersedia</span>'
          : '<span class="badge badge--borrowed book-available-badge">Dipinjam</span>'
        }
        <button
          class="book-wishlist-btn${inWishlist ? ' active' : ''}"
          data-book-id="${book.id}"
          aria-label="${inWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}: ${book.title}"
          title="${inWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="${inWishlist ? 'currentColor' : 'none'}">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="book-info">
        <span class="book-genre">${book.genre}</span>
        <a href="${detailPath}" class="book-title-link" style="text-decoration: none;">
          <h3 class="book-title">${book.title}</h3>
        </a>
        <p class="book-author">${book.author}</p>
        ${book.publisher ? `<p class="book-publisher" style="font-size:var(--font-size-xs);color:var(--color-muted-foreground);margin-top:-4px;">${book.publisher} · ${book.year}</p>` : ''}
        <div class="book-rating">
          ${renderStars(book.rating)}
          <span class="book-rating-count">(${book.ratingCount.toLocaleString('id-ID')})</span>
        </div>
      </div>
    </article>
  `;
}


/**
 * Render skeleton card untuk loading state
 * @param {number} count - jumlah skeleton yang ditampilkan
 */
function renderSkeletonCards(count = 8) {
  return Array.from({ length: count }, () => `
    <div class="book-card" aria-hidden="true">
      <div class="book-cover-wrap">
        <div class="skeleton skeleton-cover"></div>
      </div>
      <div class="book-info" style="gap: var(--space-3);">
        <div class="skeleton skeleton-text" style="width: 40%;"></div>
        <div class="skeleton skeleton-text" style="width: 80%;"></div>
        <div class="skeleton skeleton-text" style="width: 60%;"></div>
        <div class="skeleton skeleton-text" style="width: 30%;"></div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Intersection Observer: Scroll Reveal
   Tambahkan class .fade-up ke elemen, lalu panggil initScrollReveal()
   ========================================================================== */

function initScrollReveal(selector = '.fade-up, .fade-in') {
  // kalau user prefer reduced motion, langsung tampilin aja
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // berhenti observe setelah tampil: performance
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

/* ==========================================================================
   URL Parameter Utilities
   ========================================================================== */

function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ==========================================================================
   DOM Utilities
   ========================================================================== */

/**
 * Shorthand querySelector
 */
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
