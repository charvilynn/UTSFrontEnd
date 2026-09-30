/**
 
 Fitur:
 Floating particles di hero
 Scroll-reveal via Intersection Observer (dari utils.js)
 Parallax ringan pada hero background
 Featured books carousel (swipe + arrow + dots)
 Genre grid render dari data-books.js
 Recent books render
 Scroll-down button
 */

document.addEventListener('DOMContentLoaded', () => {
  renderMarquee();    // infinite book cover scroll
  createParticles();
  renderCarousel();
  renderGenreGrid();
  renderRecentBooks();
  initScrollDownBtn();
  initScrollReveal(); // dari utils.js
  initParallax();
  initQuoteCycle();   // rotating book quotes di banner
});

/* 
   INFINITE BOOK MARQUEE
   Mengisi dua row dengan cover buku dari booksData.
 */

function renderMarquee() {
  const track1 = document.getElementById('marqueeTrack1');
  const track2 = document.getElementById('marqueeTrack2');
  if (!track1 || !track2) return;

  // Cek reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Row 1: semua buku berurutan
  const books1 = [...booksData];
  // Row 2: order berbeda (mulai dari tengah) untuk variasi visual
  const books2 = [...booksData.slice(Math.floor(booksData.length / 2)), ...booksData.slice(0, Math.floor(booksData.length / 2))];

  function buildItems(books) {
    return books.map(book => {
      const fallback = book.coverFallback ? book.coverFallback : '';
      const onerror  = fallback
        ? `this.onerror=null;this.src='${fallback}'`
        : `this.onerror=null;this.style.background='linear-gradient(135deg,#92400E,#D97706)'`;
      return `
        <a
          href="pages/discovery/book-detail.html?id=${book.id}"
          class="marquee-book"
          title="${book.title}: ${book.author}"
          tabindex="-1"
        >
          <img
            class="marquee-cover"
            src="${book.cover}"
            alt="${book.title}"
            loading="lazy"
            onerror="${onerror}"
            draggable="false"
          >
        </a>
      `;
    }).join('');
  }

  // Original items + duplikat: total 2x → CSS -50% translateX = seamless loop
  const html1 = buildItems(books1) + buildItems(books1);
  const html2 = buildItems(books2) + buildItems(books2);

  track1.innerHTML = html1;
  track2.innerHTML = html2;

  // Sesuaikan durasi animasi berdasarkan jumlah buku
  // Semakin banyak buku → lebih lama per loop agar kecepatan per-buku konsisten
  const baseSpeed = 3.5; // detik per buku
  const dur1 = (books1.length * baseSpeed).toFixed(0) + 's';
  const dur2 = (books2.length * baseSpeed * 1.4).toFixed(0) + 's'; // row 2 lebih lambat
  track1.style.animationDuration = dur1;
  track2.style.animationDuration = dur2;
}


/* 
   PARTICLES: floating dots di hero background
   Dibuat di JS supaya bisa random tapi tetap ringan
 */

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // skip kalau user prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = 12; // tidak terlalu banyak: ornamen, bukan spam

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size     = Math.random() * 6 + 4; // 4–10px
    const left     = Math.random() * 100;
    const duration = Math.random() * 20 + 15; // 15–35 detik
    const delay    = Math.random() * -20; // negatif supaya langsung terlihat

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(p);
  }
}

/* 
   PARALLAX RINGAN
   Hero background bergerak lebih lambat dari scroll: kedalaman visual
 */

function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3; // bergerak 30% dari scroll
        heroBg.style.transform = `translateY(${rate}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* 
   FEATURED BOOKS CAROUSEL
 */

let carouselIndex   = 0;
let carouselCardWidth = 0;
let featuredBooks   = [];
let visibleCount    = 0;

function renderCarousel() {
  const track    = document.getElementById('carouselTrack');
  const dotsEl   = document.getElementById('carouselDots');
  const prevBtn  = document.getElementById('carouselPrev');
  const nextBtn  = document.getElementById('carouselNext');

  if (!track) return;

  featuredBooks = getFeaturedBooks(); // dari data-books.js

  // render cards
  track.innerHTML = featuredBooks.map(book => renderBookCard(book)).join('');

  // hitung berapa card yang muat
  setTimeout(() => {
    const firstCard = track.querySelector('.book-card');
    if (!firstCard) return;

    const trackWrap = track.closest('.carousel-track-wrap');
    carouselCardWidth = firstCard.offsetWidth + 20; // gap 20px
    visibleCount = Math.floor(trackWrap.offsetWidth / carouselCardWidth);

    // build dots
    const pageCount = Math.max(1, featuredBooks.length - visibleCount + 1);
    dotsEl.innerHTML = Array.from({ length: pageCount }, (_, i) => `
      <button
        class="carousel-dot${i === 0 ? ' active' : ''}"
        aria-label="Halaman carousel ${i + 1}"
        data-idx="${i}"
        role="tab"
        aria-selected="${i === 0}"
      ></button>
    `).join('');

    dotsEl.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => goToCarousel(parseInt(dot.dataset.idx)));
    });

    updateCarouselState();
  }, 100);

  // Arrow buttons
  prevBtn?.addEventListener('click', () => goToCarousel(carouselIndex - 1));
  nextBtn?.addEventListener('click', () => goToCarousel(carouselIndex + 1));

  // Swipe support (touch)
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToCarousel(diff > 0 ? carouselIndex + 1 : carouselIndex - 1);
    }
  });

  // Keyboard arrows saat carousel focused
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goToCarousel(carouselIndex + 1);
    if (e.key === 'ArrowLeft')  goToCarousel(carouselIndex - 1);
  });
}

function goToCarousel(idx) {
  const maxIdx = Math.max(0, featuredBooks.length - visibleCount);
  carouselIndex = Math.max(0, Math.min(idx, maxIdx));
  updateCarouselState();
}

function updateCarouselState() {
  const track   = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dots    = document.querySelectorAll('.carousel-dot');
  const maxIdx  = Math.max(0, featuredBooks.length - visibleCount);

  if (track) {
    track.style.transform = `translateX(-${carouselIndex * carouselCardWidth}px)`;
  }

  if (prevBtn) prevBtn.disabled = carouselIndex === 0;
  if (nextBtn) nextBtn.disabled = carouselIndex >= maxIdx;

  dots.forEach((dot, i) => {
    const isActive = i === carouselIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

/* 
   GENRE GRID
 */

function renderGenreGrid() {
  const grid = document.getElementById('genreGrid');
  if (!grid) return;

  // ambil 8 genre teratas untuk preview di homepage
  const displayGenres = genresData.slice(0, 8);

  grid.innerHTML = displayGenres.map(genre => {
    // hitung buku nyata dari booksData untuk genre ini
    const count = booksData.filter(b =>
      b.genre.toLowerCase() === genre.name.toLowerCase()
    ).length;

    return `
      <a
        href="pages/discovery/explore.html?genre=${encodeURIComponent(genre.name)}"
        class="genre-card fade-up"
        style="--genre-color: ${genre.color};"
        aria-label="${genre.name}: ${count} buku"
      >
        <div class="genre-icon" aria-hidden="true">
          ${getGenreIcon(genre.icon)}
        </div>
        <p class="genre-name">${genre.name}</p>
        <p class="genre-count">${count} buku</p>
      </a>
    `;
  }).join('');
}


/* SVG icons per genre: tidak pakai library, custom inline SVG */
function getGenreIcon(name) {
  const icons = {
    'book-open':   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    'telescope':   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>',
    'lightbulb':   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
    'newspaper':   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>',
    'sparkles':    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    'clock':       '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'brain':       '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>',
    'cpu':         '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>',
    'user':        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    'alert-circle':'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    'atom':        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>',
    'feather':     '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
  };

  return icons[name] || icons['book-open'];
}

/* 
   RECENT BOOKS GRID
 */

function renderRecentBooks() {
  const grid = document.getElementById('recentBooksGrid');
  if (!grid) return;

  // tampilkan buku yang bukan featured (supaya tidak double), max 8
  const recent = booksData
    .filter(b => !b.featured)
    .slice(0, 8);

  grid.innerHTML = recent.map(book => renderBookCard(book)).join('');
}

/* 
   SCROLL-DOWN BUTTON
 */

function initScrollDownBtn() {
  const btn = document.getElementById('scrollDown');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const featured = document.getElementById('featured');
    if (featured) {
      featured.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // sembunyikan scroll indicator kalau sudah scroll jauh
  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 100 ? '0' : '1';
    btn.style.pointerEvents = window.scrollY > 100 ? 'none' : 'auto';
  }, { passive: true });
}

/* 
   ROTATING BOOK QUOTES
   Tiga kutipan dari synopsis buku pilihan, ganti setiap 5 detik.

 */

function initQuoteCycle() {
  const textEl   = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const dotsEl   = document.querySelectorAll('.quote-dot');

  if (!textEl || !authorEl) return;

  const quotes = [
    {
      text: "Setiap halaman adalah sebuah dunia yang belum kita kunjungi.",
      author: "Charvlibrary"
    },
    {
      text: "Membaca adalah cara kita melarikan diri sambil tetap berada di tempat yang sama.",
      author: "Haruki Murakami"
    },
    {
      text: "Buku yang baik tidak pernah benar-benar berakhir: hanya berhenti sebentar.",
      author: "R.D. Cumming"
    }
  ];

  let current = 0;

  function switchQuote(idx) {
    // Fade out
    textEl.classList.add('fade-out');
    authorEl.classList.add('fade-out');

    setTimeout(() => {
      textEl.textContent   = quotes[idx].text;
      authorEl.textContent = quotes[idx].author;

      // Fade in
      textEl.classList.remove('fade-out');
      authorEl.classList.remove('fade-out');

      // Update dots
      dotsEl.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 400);
  }

  // Mulai cycling setelah 5 detik
  setInterval(() => {
    current = (current + 1) % quotes.length;
    switchQuote(current);
  }, 5000);
}

