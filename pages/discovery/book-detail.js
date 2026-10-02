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

  // cover
  const coverImg = document.getElementById('bookCoverImg');
  if (coverImg) {
    coverImg.src = book.cover;
    coverImg.alt = `Sampul buku: ${book.title}`;
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

  // title, author
  setTextContent('bookTitle',    book.title);
  setTextContent('bookAuthor',   book.author);
  setTextContent('bookPublisher',book.publisher);
  setTextContent('bookYear',     String(book.year));
  setTextContent('bookPages',    `${book.pages} halaman`);
  setTextContent('bookIsbn',     book.isbn);
  setTextContent('bookSynopsis', book.synopsis);
  setTextContent('bookRatingNum',String(book.rating));
}