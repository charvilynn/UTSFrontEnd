document.addEventListener('DOMContentLoaded', () => {
  const bookId = getUrlParam('id');

  if (!bookId) {
    // Tidak ada ID sama sekali di URL
    redirectTo404('Tidak ada ID buku yang diberikan.');
    return;
  }

  const book = getBookById(parseInt(bookId));

  if (!book) {
    // ID ada tapi buku tidak ditemukan di database
    redirectTo404(`Buku dengan ID ${bookId} tidak ditemukan.`);
    return;
  }

  renderBookDetail(book);
  renderRelatedBooks(book);
  initActions(book);
  initScrollReveal();

  document.title = `${book.title}: Charvlibrary`;
});

/*
   RENDER BOOK DETAIL
*/

function renderBookDetail(book) {
  const loading = document.getElementById('bookLoading');
  const content = document.getElementById('bookContent');

  // hide loading, show content
  if (loading) loading.hidden = true;
  if (content) content.hidden = false;

  const coverImg = document.getElementById('bookCoverImg');
  if (coverImg) {
    coverImg.src = book.coverFallback || book.cover;
    coverImg.alt = `Sampul buku: ${book.title}`;
    coverImg.onerror = function() {
      this.onerror = null;
      this.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80';
    };
  }

  // breadcrumb
  const breadcrumbTitle = document.getElementById('breadcrumbTitle');
  if (breadcrumbTitle) breadcrumbTitle.textContent = truncateText(book.title, 40);

  // genre badge
  const genreBadge = document.getElementById('bookGenre');
  if (genreBadge) genreBadge.textContent = book.genre;

  // availability
  const availBadge = document.getElementById('bookAvailBadge');
  if (availBadge) {
    availBadge.innerHTML = book.available
      ? '<span class="badge badge--available">Tersedia untuk dipinjam</span>'
      : '<span class="badge badge--borrowed">Sedang dipinjam</span>';
  }

  setTextContent('bookTitle',    book.title);
  const authorEl = document.getElementById('bookAuthor');
  if (authorEl) {
    authorEl.innerHTML = `Oleh <a href="../community/author-profile.html?author=${encodeURIComponent(book.author)}" style="color:var(--color-secondary);font-weight:var(--font-weight-semibold);text-decoration:underline;" title="Lihat profil dan biografi ${book.author}">${book.author}</a>`;
  } else {
    setTextContent('bookAuthor', book.author);
  }
  setTextContent('bookPublisher',book.publisher);
  setTextContent('bookYear',     String(book.year));
  setTextContent('bookPages',    `${book.pages} halaman`);
  setTextContent('bookIsbn',     book.isbn);
  setTextContent('bookSynopsis', book.synopsis);
  setTextContent('bookRatingNum',String(book.rating));
  setTextContent('bookRatingCount', `(${book.ratingCount.toLocaleString('id-ID')} ulasan)`);

  // stars
  const starsEl = document.getElementById('bookStars');
  if (starsEl) starsEl.innerHTML = renderStars(book.rating);

  // tags
  const tagsEl = document.getElementById('bookTags');
  if (tagsEl) {
    tagsEl.innerHTML = book.tags
      .map(tag => `<span class="chip" style="cursor: default;">${tag}</span>`)
      .join('');
  }
}

function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/*
   ACTIONS: Borrow & Wishlist
*/

function initActions(book) {
  const borrowBtn   = document.getElementById('borrowBtn');
  const wishlistBtn = document.getElementById('wishlistBtn');
  const wishlistTxt = document.getElementById('wishlistBtnText');
  const wishlistIco = document.getElementById('wishlistIcon');

  // update wishlist button state
  function updateWishlistBtn() {
    const inList = isInWishlist(book.id);
    if (wishlistTxt) wishlistTxt.textContent = inList ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist';
    if (wishlistIco) wishlistIco.setAttribute('fill', inList ? 'currentColor' : 'none');
    if (wishlistBtn) wishlistBtn.classList.toggle('btn-primary', inList);
    if (wishlistBtn) wishlistBtn.classList.toggle('btn-secondary', !inList);
    wishlistBtn?.setAttribute('aria-label', inList ? 'Hapus dari wishlist' : 'Tambah ke wishlist');
  }

  updateWishlistBtn();

  // Borrow
  if (borrowBtn) {
    if (!book.available) {
      borrowBtn.disabled = true;
      borrowBtn.textContent = 'Tidak Tersedia';
      borrowBtn.classList.add('btn-ghost');
      borrowBtn.classList.remove('btn-primary');
    } else {
      borrowBtn.addEventListener('click', () => {
        // redirect ke checkout page
        window.location.href = `../library/borrow-checkout.html?id=${book.id}`;
      });
    }
  }

  // Wishlist toggle
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const added = toggleWishlist(book.id);
      updateWishlistBtn();
      showToast(
        added ? `"${book.title}" ditambahkan ke wishlist` : `"${book.title}" dihapus dari wishlist`,
        added ? 'success' : 'info'
      );
      updateWishlistBadge?.();
    });
  }
}

/*
   RELATED BOOKS
   Ambil buku dari genre sama, exclude buku ini sendiri
*/

function renderRelatedBooks(currentBook) {
  const container = document.getElementById('relatedBooks');
  if (!container) return;

  const related = booksData
    .filter(b => b.id !== currentBook.id && b.genre === currentBook.genre)
    .slice(0, 4);

  // kalau tidak cukup dari genre yang sama, tambah random
  if (related.length < 4) {
    const extra = booksData
      .filter(b => b.id !== currentBook.id && !related.find(r => r.id === b.id))
      .slice(0, 4 - related.length);
    related.push(...extra);
  }

  container.innerHTML = related.map(book => renderBookCard(book, '../../')).join('');
}

/*
   REDIRECT KE 404
   Kalau buku tidak ditemukan, arahkan ke halaman 404 dengan
*/

function redirectTo404(reason) {
  const loading = document.getElementById('bookLoading');
  if (loading) {
    loading.hidden = false;
  }

  // Beri sedikit jeda agar transisi tidak tiba-tiba
  setTimeout(() => {
    const base = '../../pages/support/404.html';
    const url  = `${base}?reason=${encodeURIComponent(reason)}&from=book-detail`;
    window.location.replace(url);
  }, 400);
}