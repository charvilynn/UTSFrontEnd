/**
 * data-books.js: Dataset Buku Charvlibrary
 * Cover: Open Library (covers.openlibrary.org/b/isbn/{ISBN}-L.jpg): free, no API key
 * Fallback: Unsplash curated book photography
 * Total: 80 buku, 14 genre
 */

const booksData = [
  /* ── LITERARY FICTION ─────────────────────────────────────────── */
  {
    id: 1, title: "Laskar Pelangi", author: "Andrea Hirata",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9789793062792-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    rating: 4.8, ratingCount: 2341, year: 2005, pages: 529,
    synopsis: "Kisah sepuluh anak miskin yang berjuang menggapai pendidikan di Belitung.",
    isbn: "978-979-3062-79-9", publisher: "Bentang Pustaka", language: "Indonesia",
    available: true, featured: true, tags: ["Indonesia", "Drama", "Pendidikan"]
  },
  {
    id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9789794612163-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    rating: 4.9, ratingCount: 3102, year: 1980, pages: 535,
    synopsis: "Tetralogi Buru pertama: kehidupan Hindia Belanda awal abad ke-20 melalui tokoh Minke.",
    isbn: "978-979-461-216-3", publisher: "Hasta Mitra", language: "Indonesia",
    available: true, featured: true, tags: ["Indonesia", "Sejarah", "Kolonialisme"]
  },
  {
    id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 4.4, ratingCount: 4201, year: 1925, pages: 180,
    synopsis: "Kemewahan, cinta, dan kerapuhan Mimpi Amerika pada era Jazz 1920-an.",
    isbn: "978-0-7432-7356-5", publisher: "Scribner", language: "English",
    available: true, featured: false, tags: ["Amerika", "Klasik", "Drama"]
  },
  {
    id: 4, title: "The Kite Runner", author: "Khaled Hosseini",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9781594480003-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
    rating: 4.7, ratingCount: 4567, year: 2003, pages: 371,
    synopsis: "Persahabatan dan pengkhianatan dua anak laki-laki dari Afghanistan hingga Amerika.",
    isbn: "978-1-59448-000-3", publisher: "Riverhead Books", language: "English",
    available: true, featured: false, tags: ["Afghanistan", "Drama", "Persahabatan"]
  },
  {
    id: 5, title: "Norwegian Wood", author: "Haruki Murakami",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780375704024-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
    rating: 4.5, ratingCount: 3456, year: 1987, pages: 296,
    synopsis: "Roman melankolis mengikuti Toru Watanabe di Tokyo akhir 1960-an.",
    isbn: "978-0-375-70402-2", publisher: "Vintage", language: "Japanese",
    available: true, featured: false, tags: ["Jepang", "Romansa", "Dewasa Muda"]
  },
  {
    id: 6, title: "To Kill a Mockingbird", author: "Harper Lee",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780061935466-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    rating: 4.8, ratingCount: 7829, year: 1960, pages: 324,
    synopsis: "Ketidakadilan rasial di Amerika Selatan melalui mata seorang anak perempuan kecil.",
    isbn: "978-0-06-193546-6", publisher: "HarperCollins", language: "English",
    available: true, featured: false, tags: ["Amerika", "Keadilan", "Klasik"]
  },
  {
    id: 7, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780060883287-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    rating: 4.7, ratingCount: 5312, year: 1967, pages: 417,
    synopsis: "Tujuh generasi keluarga Buendía di desa fiksi Macondo: epik realisme magis.",
    isbn: "978-0-06-088328-7", publisher: "Harper Perennial", language: "Spanish",
    available: false, featured: false, tags: ["Amerika Latin", "Realisme Magis", "Epik"]
  },
  {
    id: 8, title: "Midnight Library", author: "Matt Haig",
    genre: "Literary Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
    rating: 4.4, ratingCount: 5691, year: 2020, pages: 304,
    synopsis: "Di antara hidup dan mati ada perpustakaan berisi semua kemungkinan hidup yang bisa kamu jalani.",
    isbn: "978-0-525-55947-4", publisher: "Viking", language: "English",
    available: true, featured: true, tags: ["Kontemporer", "Fantasi", "Filosofi"]
  },

  /* ── SCIENCE FICTION ─────────────────────────────────────────── */
  {
    id: 9, title: "Dune", author: "Frank Herbert",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    rating: 4.8, ratingCount: 6782, year: 1965, pages: 896,
    synopsis: "Epik di planet gurun Arrakis: politik, agama, ekologi, dan nasib alam semesta.",
    isbn: "978-0-441-17271-9", publisher: "Ace Books", language: "English",
    available: true, featured: true, tags: ["Fiksi Ilmiah", "Epik", "Politik"]
  },
  {
    id: 10, title: "Project Hail Mary", author: "Andy Weir",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    rating: 4.9, ratingCount: 3201, year: 2021, pages: 476,
    synopsis: "Astronaut terbangun sendirian di luar angkasa, harus memecahkan misteri yang menentukan nasib manusia.",
    isbn: "978-0-593-13520-4", publisher: "Ballantine Books", language: "English",
    available: true, featured: true, tags: ["Fiksi Ilmiah", "Petualangan", "Sains"]
  },
  {
    id: 11, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.7, ratingCount: 8103, year: 1979, pages: 224,
    synopsis: "Perjalanan kosmik absurd seorang pria Inggris setelah Bumi dihancurkan untuk jalan tol antargalaksi.",
    isbn: "978-0-345-39180-3", publisher: "Del Rey", language: "English",
    available: true, featured: false, tags: ["Fiksi Ilmiah", "Komedi", "Petualangan"]
  },
  {
    id: 12, title: "Ender's Game", author: "Orson Scott Card",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    rating: 4.6, ratingCount: 5892, year: 1985, pages: 352,
    synopsis: "Anak jenius dilatih di luar angkasa untuk memimpin umat manusia melawan alien.",
    isbn: "978-0-8125-5070-2", publisher: "Tor Books", language: "English",
    available: false, featured: false, tags: ["Fiksi Ilmiah", "Militer", "Remaja"]
  },
  {
    id: 13, title: "Brave New World", author: "Aldous Huxley",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&q=80",
    rating: 4.5, ratingCount: 6321, year: 1932, pages: 311,
    synopsis: "Masyarakat masa depan yang stabil tapi tanpa kebebasan: sebuah distopia teknologis.",
    isbn: "978-0-06-085052-4", publisher: "Harper Perennial", language: "English",
    available: true, featured: false, tags: ["Distopia", "Klasik", "Teknologi"]
  },
  {
    id: 14, title: "The Martian", author: "Andy Weir",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    rating: 4.6, ratingCount: 7234, year: 2011, pages: 369,
    synopsis: "Astronaut tertinggal sendirian di Mars dan harus bertahan hidup menggunakan sains.",
    isbn: "978-0-553-41802-6", publisher: "Crown", language: "English",
    available: true, featured: false, tags: ["Fiksi Ilmiah", "Survival", "Sains"]
  },
  {
    id: 15, title: "Foundation", author: "Isaac Asimov",
    genre: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    rating: 4.7, ratingCount: 4901, year: 1951, pages: 244,
    synopsis: "Seorang matematikawan meramalkan runtuhnya galactic empire dan merencanakan jalan keluar.",
    isbn: "978-0-553-29335-7", publisher: "Bantam Spectra", language: "English",
    available: false, featured: false, tags: ["Fiksi Ilmiah", "Epik", "Psikosejarah"]
  },

  /* ── SELF-HELP & PERSONAL DEVELOPMENT ───────────────────────── */
  {
    id: 16, title: "Atomic Habits", author: "James Clear",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    rating: 4.7, ratingCount: 8921, year: 2018, pages: 320,
    synopsis: "Panduan praktis membangun kebiasaan baik melalui perubahan kecil yang konsisten.",
    isbn: "978-0-7352-1129-2", publisher: "Avery", language: "English",
    available: true, featured: true, tags: ["Produktivitas", "Psikologi", "Kebiasaan"]
  },
  {
    id: 17, title: "Ikigai", author: "Héctor García & Francesc Miralles",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?w=400&q=80",
    rating: 4.4, ratingCount: 2890, year: 2016, pages: 194,
    synopsis: "Rahasia panjang umur dan kebahagiaan orang Jepang: menemukan tujuan hidup.",
    isbn: "978-0-14-313072-7", publisher: "Penguin Life", language: "Spanish",
    available: true, featured: true, tags: ["Jepang", "Filosofi", "Kebahagiaan"]
  },
  {
    id: 18, title: "Think and Grow Rich", author: "Napoleon Hill",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9781593302009-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
    rating: 4.3, ratingCount: 7124, year: 1937, pages: 320,
    synopsis: "Prinsip sukses dari wawancara 500 orang terkaya di Amerika.",
    isbn: "978-1-59330-200-5", publisher: "Tarcher Perigee", language: "English",
    available: false, featured: false, tags: ["Bisnis", "Motivasi", "Sukses"]
  },
  {
    id: 19, title: "Deep Work", author: "Cal Newport",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    rating: 4.6, ratingCount: 4512, year: 2016, pages: 304,
    synopsis: "Kemampuan fokus tanpa gangguan adalah superpower terpenting di era digital.",
    isbn: "978-1-4555-8669-1", publisher: "Grand Central", language: "English",
    available: true, featured: false, tags: ["Produktivitas", "Fokus", "Karir"]
  },
  {
    id: 20, title: "Mindset", author: "Carol S. Dweck",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9780345472328-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
    rating: 4.5, ratingCount: 5678, year: 2006, pages: 277,
    synopsis: "Bagaimana cara berpikir kita tentang kemampuan menentukan kesuksesan dalam segala hal.",
    isbn: "978-0-345-47232-8", publisher: "Ballantine Books", language: "English",
    available: true, featured: false, tags: ["Psikologi", "Pertumbuhan", "Pendidikan"]
  },
  {
    id: 21, title: "Filosofi Teras", author: "Henry Manampiring",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9786020634753-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    rating: 4.6, ratingCount: 1893, year: 2019, pages: 262,
    synopsis: "Stoikisme ala Indonesia: filsafat Yunani kuno untuk menghadapi era media sosial.",
    isbn: "978-602-06-3475-3", publisher: "Kompas", language: "Indonesia",
    available: true, featured: false, tags: ["Filsafat", "Stoikisme", "Indonesia"]
  },
  {
    id: 22, title: "Grit: The Power of Passion and Perseverance", author: "Angela Duckworth",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9781501111112-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    rating: 4.4, ratingCount: 3901, year: 2016, pages: 352,
    synopsis: "Kombinasi kegigihan dan semangat: bukan bakat: yang menentukan keberhasilan jangka panjang.",
    isbn: "978-1-5011-1111-2", publisher: "Scribner", language: "English",
    available: true, featured: false, tags: ["Psikologi", "Kegigihan", "Sukses"]
  },
  {
    id: 23, title: "The Power of Now", author: "Eckhart Tolle",
    genre: "Self-Help",
    cover: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?w=400&q=80",
    rating: 4.5, ratingCount: 6234, year: 1997, pages: 229,
    synopsis: "Panduan spiritual untuk keluar dari pikiran dan hidup sepenuhnya di momen saat ini.",
    isbn: "978-1-57731-480-6", publisher: "New World Library", language: "English",
    available: false, featured: false, tags: ["Spiritual", "Mindfulness", "Kesadaran"]
  },

  /* ── NON-FICTION ─────────────────────────────────────────────── */
  {
    id: 24, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    rating: 4.6, ratingCount: 5473, year: 2011, pages: 443,
    synopsis: "Sejarah umat manusia dari zaman batu hingga revolusi ilmiah: perspektif yang menggugah.",
    isbn: "978-0-06-231609-7", publisher: "Harper", language: "Hebrew",
    available: false, featured: false, tags: ["Sejarah", "Antropologi", "Filsafat"]
  },
  {
    id: 25, title: "Educated", author: "Tara Westover",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    rating: 4.7, ratingCount: 4321, year: 2018, pages: 334,
    synopsis: "Memoar wanita yang tumbuh tanpa sekolah di keluarga survivalis dan meraih PhD dari Cambridge.",
    isbn: "978-0-399-59050-4", publisher: "Random House", language: "English",
    available: true, featured: false, tags: ["Memoar", "Pendidikan", "Inspirasi"]
  },
  {
    id: 26, title: "Brief Answers to the Big Questions", author: "Stephen Hawking",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9781473695702-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.5, ratingCount: 3210, year: 2018, pages: 256,
    synopsis: "Hawking menjawab pertanyaan terbesar: Tuhan, asal kehidupan, perjalanan waktu, masa depan manusia.",
    isbn: "978-1-473-69570-2", publisher: "John Murray", language: "English",
    available: true, featured: false, tags: ["Sains", "Fisika", "Kosmologi"]
  },
  {
    id: 27, title: "Thinking, Fast and Slow", author: "Daniel Kahneman",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
    rating: 4.6, ratingCount: 7890, year: 2011, pages: 499,
    synopsis: "Dua sistem berpikir manusia: cepat-intuitif dan lambat-rasional: mengungkap mengapa kita salah berpikir.",
    isbn: "978-0-374-53355-7", publisher: "Farrar, Straus and Giroux", language: "English",
    available: true, featured: false, tags: ["Psikologi", "Ekonomi Perilaku", "Keputusan"]
  },
  {
    id: 28, title: "Zero to One", author: "Peter Thiel & Blake Masters",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    rating: 4.5, ratingCount: 4512, year: 2014, pages: 224,
    synopsis: "Bagaimana membangun perusahaan baru yang benar-benar inovatif: bukan sekadar imitasi.",
    isbn: "978-0-8041-3902-1", publisher: "Crown Business", language: "English",
    available: true, featured: false, tags: ["Startup", "Inovasi", "Bisnis"]
  },
  {
    id: 29, title: "The Body: A Guide for Occupants", author: "Bill Bryson",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780385539302-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.5, ratingCount: 2901, year: 2019, pages: 464,
    synopsis: "Perjalanan menakjubkan mengelilingi tubuh manusia: dari sel hingga otak yang luar biasa.",
    isbn: "978-0-385-53930-2", publisher: "Doubleday", language: "English",
    available: true, featured: false, tags: ["Biologi", "Kesehatan", "Sains"]
  },
  {
    id: 30, title: "Homo Deus: A Brief History of Tomorrow", author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780062464316-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    rating: 4.4, ratingCount: 3102, year: 2015, pages: 450,
    synopsis: "Setelah menaklukkan penyakit dan kelaparan, manusia mengincar keabadian dan keilahian.",
    isbn: "978-0-06-246431-6", publisher: "Harper", language: "Hebrew",
    available: false, featured: false, tags: ["Futurisme", "Teknologi", "Filsafat"]
  },

  /* ── FANTASY ─────────────────────────────────────────────────── */
  {
    id: 31, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling",
    genre: "Fantasy",
    cover: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&q=80",
    rating: 4.8, ratingCount: 12450, year: 1997, pages: 309,
    synopsis: "Anak yatim piatu menemukan dirinya adalah penyihir dan memulai petualangan di Hogwarts.",
    isbn: "978-0-590-35340-3", publisher: "Bloomsbury", language: "English",
    available: false, featured: false, tags: ["Fantasi", "Petualangan", "Anak-anak"]
  },
  {
    id: 32, title: "The Hobbit", author: "J.R.R. Tolkien",
    genre: "Fantasy",
    cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&q=80",
    rating: 4.7, ratingCount: 9832, year: 1937, pages: 310,
    synopsis: "Bilbo Baggins, hobbit penyuka kenyamanan, terseret dalam petualangan epik bersama para dwarf.",
    isbn: "978-0-547-92822-7", publisher: "Houghton Mifflin", language: "English",
    available: true, featured: false, tags: ["Fantasi", "Petualangan", "Epik"]
  },
  {
    id: 33, title: "The Name of the Wind", author: "Patrick Rothfuss",
    genre: "Fantasy",
    cover: "https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&q=80",
    rating: 4.8, ratingCount: 6721, year: 2007, pages: 662,
    synopsis: "Kisah Kvothe: penyihir, musisi, dan pencuri terhebat zaman: diceritakan dalam tiga hari.",
    isbn: "978-0-7564-0407-9", publisher: "DAW Books", language: "English",
    available: true, featured: false, tags: ["Fantasi", "Epik", "Musik"]
  },
  {
    id: 34, title: "The Alchemist", author: "Paulo Coelho",
    genre: "Fantasy",
    cover: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80",
    rating: 4.5, ratingCount: 8923, year: 1988, pages: 197,
    synopsis: "Perjalanan gembala muda dari Spanyol ke piramida Mesir menemukan harta karun dan makna hidup.",
    isbn: "978-0-06-231500-7", publisher: "HarperOne", language: "Portuguese",
    available: true, featured: true, tags: ["Inspirasi", "Petualangan", "Spiritual"]
  },
  {
    id: 35, title: "A Game of Thrones", author: "George R.R. Martin",
    genre: "Fantasy",
    cover: "https://covers.openlibrary.org/b/isbn/9780553381689-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.7, ratingCount: 11234, year: 1996, pages: 694,
    synopsis: "Perang perebutan tahta di kerajaan Westeros: intrik, pengkhianatan, dan naga.",
    isbn: "978-0-553-38168-9", publisher: "Bantam", language: "English",
    available: false, featured: false, tags: ["Fantasi", "Epik", "Politik"]
  },

  /* ── HISTORICAL FICTION ──────────────────────────────────────── */
  {
    id: 36, title: "The Pillars of the Earth", author: "Ken Follett",
    genre: "Historical Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780451166890-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&q=80",
    rating: 4.8, ratingCount: 7823, year: 1989, pages: 973,
    synopsis: "Pembangunan katedral megah di Inggris abad ke-12: persaingan, cinta, dan iman.",
    isbn: "978-0-451-16689-0", publisher: "Signet", language: "English",
    available: true, featured: false, tags: ["Inggris Abad Pertengahan", "Arsitektur", "Epik"]
  },
  {
    id: 37, title: "All the Light We Cannot See", author: "Anthony Doerr",
    genre: "Historical Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9781501173219-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    rating: 4.7, ratingCount: 6341, year: 2014, pages: 531,
    synopsis: "Gadis Prancis buta dan pemuda Jerman terjalin takdirnya di Perang Dunia II.",
    isbn: "978-1-5011-7321-9", publisher: "Scribner", language: "English",
    available: true, featured: false, tags: ["Perang Dunia II", "Prancis", "Drama"]
  },
  {
    id: 38, title: "The Book Thief", author: "Markus Zusak",
    genre: "Historical Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780375831003-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    rating: 4.8, ratingCount: 8901, year: 2005, pages: 552,
    synopsis: "Dikisahkan oleh Kematian: seorang gadis kecil mencuri buku di Jerman Nazi.",
    isbn: "978-0-375-83100-3", publisher: "Knopf", language: "English",
    available: true, featured: true, tags: ["Perang Dunia II", "Jerman", "Anak-anak"]
  },
  {
    id: 39, title: "Perempuan di Titik Nol", author: "Nawal El Saadawi",
    genre: "Historical Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9781842770535-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    rating: 4.5, ratingCount: 1234, year: 1975, pages: 134,
    synopsis: "Firdaus, perempuan Mesir menunggu hukuman mati, mengisahkan hidupnya.",
    isbn: "978-1-84277-053-9", publisher: "Zed Books", language: "Arabic",
    available: false, featured: false, tags: ["Feminis", "Mesir", "Drama"]
  },
  {
    id: 40, title: "Pachinko", author: "Min Jin Lee",
    genre: "Historical Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9781455563920-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
    rating: 4.7, ratingCount: 4823, year: 2017, pages: 485,
    synopsis: "Empat generasi keluarga Korea yang berjuang di Jepang, dari 1910 hingga 1989.",
    isbn: "978-1-4555-6392-0", publisher: "Grand Central", language: "English",
    available: true, featured: false, tags: ["Korea", "Jepang", "Generasi"]
  },

  /* ── PHILOSOPHY ──────────────────────────────────────────────── */
  {
    id: 41, title: "Meditations", author: "Marcus Aurelius",
    genre: "Philosophy",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449334-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    rating: 4.7, ratingCount: 9201, year: 180, pages: 254,
    synopsis: "Catatan pribadi kaisar Roma tentang Stoikisme: kebijaksanaan abadi tentang tugas dan kematian.",
    isbn: "978-0-14-044933-4", publisher: "Penguin Classics", language: "Greek",
    available: true, featured: false, tags: ["Stoikisme", "Romawi", "Filsafat Klasik"]
  },
  {
    id: 42, title: "Sophie's World", author: "Jostein Gaarder",
    genre: "Philosophy",
    cover: "https://covers.openlibrary.org/b/isbn/9780374530716-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    rating: 4.5, ratingCount: 4312, year: 1991, pages: 518,
    synopsis: "Novel sejarah filsafat Barat melalui seorang gadis remaja dan gurunya yang misterius.",
    isbn: "978-0-374-53071-6", publisher: "Farrar Straus Giroux", language: "Norwegian",
    available: true, featured: false, tags: ["Filsafat", "Pendidikan", "Remaja"]
  },
  {
    id: 43, title: "Man's Search for Meaning", author: "Viktor E. Frankl",
    genre: "Philosophy",
    cover: "https://covers.openlibrary.org/b/isbn/9780807014271-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    rating: 4.8, ratingCount: 11203, year: 1946, pages: 165,
    synopsis: "Psikiater Yahudi bertahan di kamp konsentrasi Nazi: menemukan makna hidup di tengah penderitaan.",
    isbn: "978-0-8070-1427-1", publisher: "Beacon Press", language: "German",
    available: true, featured: true, tags: ["Holocaust", "Psikologi", "Makna Hidup"]
  },
  {
    id: 44, title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche",
    genre: "Philosophy",
    cover: "https://covers.openlibrary.org/b/isbn/9780140441185-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    rating: 4.4, ratingCount: 3812, year: 1883, pages: 352,
    synopsis: "Nietzsche melalui Zarathustra memproklamasikan kematian Tuhan dan kelahiran Übermensch.",
    isbn: "978-0-14-044118-5", publisher: "Penguin Classics", language: "German",
    available: false, featured: false, tags: ["Eksistensialisme", "Nietzsche", "Filsafat Barat"]
  },
  {
    id: 45, title: "The Stranger", author: "Albert Camus",
    genre: "Philosophy",
    cover: "https://covers.openlibrary.org/b/isbn/9780679720201-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 4.5, ratingCount: 6712, year: 1942, pages: 159,
    synopsis: "Meursault membunuh orang Arab di Aljir: eksplorasi absurdisme dalam ketidakpedulian manusia.",
    isbn: "978-0-679-72020-1", publisher: "Vintage", language: "French",
    available: true, featured: false, tags: ["Absurdisme", "Eksistensialisme", "Prancis"]
  },

  /* ── DYSTOPIAN ───────────────────────────────────────────────── */
  {
    id: 46, title: "1984", author: "George Orwell",
    genre: "Dystopian",
    cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&q=80",
    rating: 4.7, ratingCount: 9103, year: 1949, pages: 328,
    synopsis: "Distopia totalitarianisme: Big Brother mengawasi setiap aspek kehidupan warga Oceania.",
    isbn: "978-0-451-52493-5", publisher: "Signet Classic", language: "English",
    available: true, featured: false, tags: ["Distopia", "Politik", "Klasik"]
  },
  {
    id: 47, title: "The Handmaid's Tale", author: "Margaret Atwood",
    genre: "Dystopian",
    cover: "https://covers.openlibrary.org/b/isbn/9780385490818-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&q=80",
    rating: 4.6, ratingCount: 7234, year: 1985, pages: 311,
    synopsis: "Republik Gilead: teokrasi patriarkal di Amerika masa depan: ditolak dari perspektif seorang Handmaid.",
    isbn: "978-0-385-49081-8", publisher: "McClelland and Stewart", language: "English",
    available: true, featured: false, tags: ["Distopia", "Feminis", "Amerika"]
  },
  {
    id: 48, title: "Lord of the Flies", author: "William Golding",
    genre: "Dystopian",
    cover: "https://covers.openlibrary.org/b/isbn/9780399501487-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.3, ratingCount: 5891, year: 1954, pages: 224,
    synopsis: "Anak-anak terdampar di pulau terpencil: peradaban runtuh, sifat hewani muncul.",
    isbn: "978-0-399-50148-7", publisher: "Perigee", language: "English",
    available: false, featured: false, tags: ["Allegoris", "Survival", "Klasik"]
  },

  /* ── TECHNOLOGY ──────────────────────────────────────────────── */
  {
    id: 49, title: "Clean Code", author: "Robert C. Martin",
    genre: "Technology",
    cover: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    rating: 4.6, ratingCount: 5678, year: 2008, pages: 431,
    synopsis: "Panduan menulis kode bersih dan mudah dipelihara dari legenda software engineering.",
    isbn: "978-0-13-235088-4", publisher: "Prentice Hall", language: "English",
    available: true, featured: false, tags: ["Pemrograman", "Software Engineering", "Best Practices"]
  },
  {
    id: 50, title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt",
    genre: "Technology",
    cover: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    rating: 4.7, ratingCount: 4521, year: 1999, pages: 352,
    synopsis: "Filosofi dan praktik pragmatis untuk menjadi programmer yang benar-benar andal.",
    isbn: "978-0-13-595705-9", publisher: "Addison-Wesley", language: "English",
    available: true, featured: false, tags: ["Pemrograman", "Karir", "Filosofi Kode"]
  },
  {
    id: 51, title: "You Don't Know JS", author: "Kyle Simpson",
    genre: "Technology",
    cover: "https://covers.openlibrary.org/b/isbn/9781491924464-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    rating: 4.8, ratingCount: 3901, year: 2014, pages: 278,
    synopsis: "Deep dive ke JavaScript: cara kerjanya yang sebenarnya, bukan sekadar cara menggunakannya.",
    isbn: "978-1-491-92446-4", publisher: "O'Reilly", language: "English",
    available: true, featured: false, tags: ["JavaScript", "Web Development", "Pemrograman"]
  },
  {
    id: 52, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann",
    genre: "Technology",
    cover: "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    rating: 4.9, ratingCount: 3123, year: 2017, pages: 616,
    synopsis: "Prinsip dan praktik membangun sistem data yang andal, skalabel, dan mudah dipelihara.",
    isbn: "978-1-449-37332-0", publisher: "O'Reilly", language: "English",
    available: false, featured: false, tags: ["Database", "Sistem Terdistribusi", "Big Data"]
  },
  {
    id: 53, title: "The Algorithm Design Manual", author: "Steven Skiena",
    genre: "Technology",
    cover: "https://covers.openlibrary.org/b/isbn/9781848000698-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    rating: 4.6, ratingCount: 2341, year: 1997, pages: 730,
    synopsis: "Referensi praktis algoritma dan struktur data: dari masalah nyata ke solusi optimal.",
    isbn: "978-1-848-00069-8", publisher: "Springer", language: "English",
    available: true, featured: false, tags: ["Algoritma", "Pemrograman", "Komputer Sains"]
  },

  /* ── MYSTERY & THRILLER ──────────────────────────────────────── */
  {
    id: 54, title: "Gone Girl", author: "Gillian Flynn",
    genre: "Mystery",
    cover: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&q=80",
    rating: 4.5, ratingCount: 8934, year: 2012, pages: 422,
    synopsis: "Saat Amy Dunne menghilang pada hari ulang tahun pernikahan kelima, semua curiga ke suaminya.",
    isbn: "978-0-307-58837-1", publisher: "Crown", language: "English",
    available: true, featured: false, tags: ["Misteri", "Psikologis", "Thriller"]
  },
  {
    id: 55, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson",
    genre: "Mystery",
    cover: "https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&q=80",
    rating: 4.6, ratingCount: 7823, year: 2005, pages: 644,
    synopsis: "Jurnalis dan hacker berbakat menyelidiki misteri hilangnya wanita dari keluarga kaya Swedia.",
    isbn: "978-0-307-45454-6", publisher: "Knopf", language: "Swedish",
    available: false, featured: false, tags: ["Misteri", "Swedia", "Kriminal"]
  },
  {
    id: 56, title: "And Then There Were None", author: "Agatha Christie",
    genre: "Mystery",
    cover: "https://covers.openlibrary.org/b/isbn/9780062073488-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&q=80",
    rating: 4.7, ratingCount: 11203, year: 1939, pages: 264,
    synopsis: "Sepuluh orang terjebak di pulau terpencil, mati satu per satu: siapa pembunuhnya?",
    isbn: "978-0-06-207348-8", publisher: "HarperCollins", language: "English",
    available: true, featured: false, tags: ["Misteri", "Christie", "Klasik"]
  },
  {
    id: 57, title: "The Da Vinci Code", author: "Dan Brown",
    genre: "Mystery",
    cover: "https://covers.openlibrary.org/b/isbn/9780385504201-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&q=80",
    rating: 4.3, ratingCount: 14201, year: 2003, pages: 454,
    synopsis: "Profesor simbologi Harvard menyelidiki pembunuhan di Louvre yang membuka rahasia besar Kristen.",
    isbn: "978-0-385-50420-1", publisher: "Doubleday", language: "English",
    available: true, featured: false, tags: ["Misteri", "Sejarah", "Agama"]
  },
  {
    id: 58, title: "Big Little Lies", author: "Liane Moriarty",
    genre: "Mystery",
    cover: "https://covers.openlibrary.org/b/isbn/9781250069795-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&q=80",
    rating: 4.5, ratingCount: 5612, year: 2014, pages: 460,
    synopsis: "Tiga ibu rumah tangga di kota pantai kecil menyimpan rahasia yang ujungnya berakhir dalam tragedi.",
    isbn: "978-1-250-06979-5", publisher: "Flatiron Books", language: "English",
    available: true, featured: false, tags: ["Misteri", "Drama", "Wanita"]
  },

  /* ── MEMOIR & BIOGRAPHY ──────────────────────────────────────── */
  {
    id: 59, title: "Steve Jobs", author: "Walter Isaacson",
    genre: "Biography",
    cover: "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
    rating: 4.6, ratingCount: 8901, year: 2011, pages: 630,
    synopsis: "Biografi resmi pendiri Apple: visi, obsesi, dan eksentrisitas orang yang mengubah dunia teknologi.",
    isbn: "978-1-4516-4853-9", publisher: "Simon & Schuster", language: "English",
    available: true, featured: false, tags: ["Biografi", "Teknologi", "Kepemimpinan"]
  },
  {
    id: 60, title: "Becoming", author: "Michelle Obama",
    genre: "Biography",
    cover: "https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    rating: 4.7, ratingCount: 10234, year: 2018, pages: 448,
    synopsis: "Perjalanan hidup mantan First Lady AS dari South Side Chicago hingga Gedung Putih.",
    isbn: "978-1-5247-6313-8", publisher: "Crown", language: "English",
    available: false, featured: false, tags: ["Biografi", "Politik", "Inspirasi"]
  },
  {
    id: 61, title: "Long Walk to Freedom", author: "Nelson Mandela",
    genre: "Biography",
    cover: "https://covers.openlibrary.org/b/isbn/9780316548182-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    rating: 4.8, ratingCount: 7812, year: 1994, pages: 656,
    synopsis: "Autobiografi Nelson Mandela dari masa kecil di pedesaan Afrika Selatan hingga kepresidenan.",
    isbn: "978-0-316-54818-2", publisher: "Little, Brown", language: "English",
    available: true, featured: false, tags: ["Biografi", "Politik", "Afrika"]
  },
  {
    id: 62, title: "When Breath Becomes Air", author: "Paul Kalanithi",
    genre: "Biography",
    cover: "https://covers.openlibrary.org/b/isbn/9780812988406-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.8, ratingCount: 5678, year: 2016, pages: 228,
    synopsis: "Dokter bedah saraf muda didiagnosis kanker terminal: merenungkan makna hidup dan kematian.",
    isbn: "978-0-8129-8840-6", publisher: "Random House", language: "English",
    available: true, featured: false, tags: ["Memoar", "Kedokteran", "Kematian"]
  },

  /* ── ROMANCE ─────────────────────────────────────────────────── */
  {
    id: 63, title: "Pride and Prejudice", author: "Jane Austen",
    genre: "Romance",
    cover: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 4.7, ratingCount: 14532, year: 1813, pages: 432,
    synopsis: "Elizabeth Bennet bertemu Mr. Darcy yang sombong: satir masyarakat Inggris dengan cinta sebagai pusatnya.",
    isbn: "978-0-14-143951-8", publisher: "Penguin Classics", language: "English",
    available: true, featured: false, tags: ["Romansa", "Inggris", "Klasik"]
  },
  {
    id: 64, title: "Jane Eyre", author: "Charlotte Brontë",
    genre: "Romance",
    cover: "https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 4.6, ratingCount: 9234, year: 1847, pages: 532,
    synopsis: "Gubernur muda yatim piatu jatuh cinta pada majikannya yang misterius di Thornfield Hall.",
    isbn: "978-0-14-144114-6", publisher: "Penguin Classics", language: "English",
    available: false, featured: false, tags: ["Romansa", "Gothic", "Klasik"]
  },
  {
    id: 65, title: "The Fault in Our Stars", author: "John Green",
    genre: "Romance",
    cover: "https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 4.5, ratingCount: 13201, year: 2012, pages: 313,
    synopsis: "Dua remaja penyintas kanker jatuh cinta: menyentuh dan menggetarkan.",
    isbn: "978-0-525-47881-2", publisher: "Dutton Books", language: "English",
    available: true, featured: false, tags: ["Romansa", "Remaja", "Penyakit"]
  },

  /* ── HORROR ──────────────────────────────────────────────────── */
  {
    id: 66, title: "It", author: "Stephen King",
    genre: "Horror",
    cover: "https://covers.openlibrary.org/b/isbn/9781501142970-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    rating: 4.6, ratingCount: 8923, year: 1986, pages: 1138,
    synopsis: "Tujuh anak di Derry, Maine, menghadapi entitas jahat yang mengambil wujud ketakutan terdalammu.",
    isbn: "978-1-5011-4297-0", publisher: "Scribner", language: "English",
    available: false, featured: false, tags: ["Horror", "Stephen King", "Psikologis"]
  },
  {
    id: 67, title: "The Shining", author: "Stephen King",
    genre: "Horror",
    cover: "https://covers.openlibrary.org/b/isbn/9780307743657-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    rating: 4.7, ratingCount: 6712, year: 1977, pages: 447,
    synopsis: "Jack Torrance membawa keluarganya ke hotel terpencil di musim dingin: kegilaan perlahan menguasainya.",
    isbn: "978-0-307-74365-7", publisher: "Anchor", language: "English",
    available: true, featured: false, tags: ["Horror", "Psikologis", "Keluarga"]
  },

  /* ── SCIENCE ─────────────────────────────────────────────────── */
  {
    id: 68, title: "A Short History of Nearly Everything", author: "Bill Bryson",
    genre: "Science",
    cover: "https://covers.openlibrary.org/b/isbn/9780767908184-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.7, ratingCount: 7891, year: 2003, pages: 544,
    synopsis: "Semua yang perlu kamu ketahui tentang sains: dari Big Bang hingga manusia modern: ditulis dengan humor.",
    isbn: "978-0-767-90818-4", publisher: "Broadway Books", language: "English",
    available: true, featured: false, tags: ["Sains", "Populer", "Sejarah"]
  },
  {
    id: 69, title: "The Gene: An Intimate History", author: "Siddhartha Mukherjee",
    genre: "Science",
    cover: "https://covers.openlibrary.org/b/isbn/9781476733500-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.6, ratingCount: 3201, year: 2016, pages: 592,
    synopsis: "Sejarah penemuan gen, implikasi etis rekayasa genetika, dan masa depan umat manusia.",
    isbn: "978-1-476-73350-0", publisher: "Scribner", language: "English",
    available: true, featured: false, tags: ["Biologi", "Genetika", "Sejarah Sains"]
  },
  {
    id: 70, title: "Cosmos", author: "Carl Sagan",
    genre: "Science",
    cover: "https://covers.openlibrary.org/b/isbn/9780345539434-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.8, ratingCount: 5892, year: 1980, pages: 365,
    synopsis: "Carl Sagan membawa pembaca dalam perjalanan epik melintasi alam semesta yang tak terbatas.",
    isbn: "978-0-345-53943-4", publisher: "Ballantine Books", language: "English",
    available: true, featured: false, tags: ["Astronomi", "Kosmologi", "Sains Populer"]
  },
  {
    id: 71, title: "The Selfish Gene", author: "Richard Dawkins",
    genre: "Science",
    cover: "https://covers.openlibrary.org/b/isbn/9780198788607-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    rating: 4.5, ratingCount: 4512, year: 1976, pages: 360,
    synopsis: "Gen adalah unit evolusi yang sesungguhnya: organisme hanyalah kendaraan sementara.",
    isbn: "978-0-198-78860-7", publisher: "Oxford University Press", language: "English",
    available: false, featured: false, tags: ["Biologi", "Evolusi", "Genetika"]
  },

  /* ── BUSINESS & ECONOMICS ─────────────────────────────────────── */
  {
    id: 72, title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki",
    genre: "Business",
    cover: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=400&q=80",
    rating: 4.4, ratingCount: 12301, year: 1997, pages: 336,
    synopsis: "Perbedaan cara berpikir tentang uang antara 'ayah miskin' (berpendidikan tinggi) dan 'ayah kaya'.",
    isbn: "978-1-61268-019-4", publisher: "Plata Publishing", language: "English",
    available: true, featured: false, tags: ["Keuangan", "Investasi", "Mindset"]
  },
  {
    id: 73, title: "The Lean Startup", author: "Eric Ries",
    genre: "Business",
    cover: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=400&q=80",
    rating: 4.5, ratingCount: 6712, year: 2011, pages: 336,
    synopsis: "Metodologi build-measure-learn untuk membangun startup yang berhasil dengan cepat dan efisien.",
    isbn: "978-0-307-88789-4", publisher: "Crown Business", language: "English",
    available: true, featured: false, tags: ["Startup", "Metodologi", "Inovasi"]
  },
  {
    id: 74, title: "Good to Great", author: "Jim Collins",
    genre: "Business",
    cover: "https://covers.openlibrary.org/b/isbn/9780066620992-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=400&q=80",
    rating: 4.6, ratingCount: 5901, year: 2001, pages: 320,
    synopsis: "Apa yang membedakan perusahaan biasa dari perusahaan luar biasa? Penelitian 5 tahun menjawabnya.",
    isbn: "978-0-06-662099-2", publisher: "HarperBusiness", language: "English",
    available: false, featured: false, tags: ["Manajemen", "Strategi", "Kepemimpinan"]
  },
  {
    id: 75, title: "Freakonomics", author: "Steven D. Levitt & Stephen J. Dubner",
    genre: "Business",
    cover: "https://covers.openlibrary.org/b/isbn/9780060731335-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=400&q=80",
    rating: 4.4, ratingCount: 8923, year: 2005, pages: 315,
    synopsis: "Ekonom muda menjawab pertanyaan aneh: apakah nama anak berpengaruh terhadap hidupnya?",
    isbn: "978-0-06-073133-5", publisher: "William Morrow", language: "English",
    available: true, featured: false, tags: ["Ekonomi", "Sosial", "Data"]
  },
  {
    id: 76, title: "The Innovator's Dilemma", author: "Clayton Christensen",
    genre: "Business",
    cover: "https://covers.openlibrary.org/b/isbn/9780062060242-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=400&q=80",
    rating: 4.5, ratingCount: 4123, year: 1997, pages: 286,
    synopsis: "Mengapa perusahaan besar yang sukses sering kali gagal menghadapi inovasi disruptif.",
    isbn: "978-0-06-206024-2", publisher: "Harvard Business Review", language: "English",
    available: true, featured: false, tags: ["Inovasi", "Strategi", "Disrupsi"]
  },

  /* ── INDONESIAN LITERATURE ───────────────────────────────────── */
  {
    id: 77, title: "Perahu Kertas", author: "Dee Lestari",
    genre: "Indonesian Literature",
    cover: "https://covers.openlibrary.org/b/isbn/9789792258738-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 4.6, ratingCount: 2341, year: 2009, pages: 444,
    synopsis: "Kisah cinta Kugy si penulis dongeng dan Keenan si pelukis: mimpi dan takdir yang berliku.",
    isbn: "978-979-22-5873-8", publisher: "Bentang Pustaka", language: "Indonesia",
    available: true, featured: true, tags: ["Indonesia", "Romansa", "Mimpi"]
  },
  {
    id: 78, title: "Negeri 5 Menara", author: "Ahmad Fuadi",
    genre: "Indonesian Literature",
    cover: "https://covers.openlibrary.org/b/isbn/9789792249774-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    rating: 4.7, ratingCount: 1892, year: 2009, pages: 423,
    synopsis: "Enam santri di pesantren Gontor bermimpi menjangkau dunia dengan mantra 'man jadda wajada'.",
    isbn: "978-979-22-4977-4", publisher: "Gramedia", language: "Indonesia",
    available: true, featured: false, tags: ["Indonesia", "Pesantren", "Inspirasi"]
  },
  {
    id: 79, title: "Sang Pemimpi", author: "Andrea Hirata",
    genre: "Indonesian Literature",
    cover: "https://covers.openlibrary.org/b/isbn/9789793062051-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    rating: 4.6, ratingCount: 1723, year: 2006, pages: 292,
    synopsis: "Sekuel Laskar Pelangi: Ikal dan Arai berjuang meraih beasiswa ke Eropa dengan mimpi setinggi langit.",
    isbn: "978-979-3062-05-1", publisher: "Bentang Pustaka", language: "Indonesia",
    available: true, featured: false, tags: ["Indonesia", "Pendidikan", "Persahabatan"]
  },
  {
    id: 80, title: "Cantik Itu Luka", author: "Eka Kurniawan",
    genre: "Indonesian Literature",
    cover: "https://covers.openlibrary.org/b/isbn/9786020296241-L.jpg",
    coverFallback: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    rating: 4.7, ratingCount: 1534, year: 2002, pages: 505,
    synopsis: "Dewi Ayu bangkit dari kubur setelah 21 tahun: kisah perempuan dan tubuh dalam Indonesia pasca kolonial.",
    isbn: "978-602-03-1135-0", publisher: "Gramedia", language: "Indonesia",
    available: false, featured: false, tags: ["Indonesia", "Realisme Magis", "Sejarah"]
  }
];

/* ==========================================================================
   GENRE DATA: satu sumber kebenaran untuk categories.html dan index.html
   Count dihitung dinamis dari booksData di atas
   ========================================================================== */
const genresData = [
  { id: "literary-fiction",     name: "Literary Fiction",      icon: "feather",      color: "#92400E", desc: "Novel penuh makna dan gaya bahasa" },
  { id: "science-fiction",      name: "Science Fiction",       icon: "telescope",    color: "#1E40AF", desc: "Masa depan, teknologi, dan imajinasi tanpa batas" },
  { id: "self-help",            name: "Self-Help",             icon: "lightbulb",    color: "#D97706", desc: "Kembangkan diri, bangun kebiasaan terbaik" },
  { id: "non-fiction",          name: "Non-Fiction",           icon: "newspaper",    color: "#7C3AED", desc: "Fakta, data, dan perspektif nyata dunia" },
  { id: "fantasy",              name: "Fantasy",               icon: "sparkles",     color: "#B45309", desc: "Dunia magis, naga, dan petualangan epik" },
  { id: "historical-fiction",   name: "Historical Fiction",    icon: "clock",        color: "#BE123C", desc: "Sejarah dihidupkan lewat fiksi yang kuat" },
  { id: "philosophy",           name: "Philosophy",            icon: "brain",        color: "#0F766E", desc: "Pertanyaan besar tentang hidup dan makna" },
  { id: "technology",           name: "Technology",            icon: "cpu",          color: "#1D4ED8", desc: "Kode, sistem, dan inovasi digital" },
  { id: "mystery",              name: "Mystery",               icon: "alert-circle", color: "#374151", desc: "Teka-teki, detektif, dan kejutan di akhir" },
  { id: "dystopian",            name: "Dystopian",             icon: "atom",         color: "#DC2626", desc: "Dunia yang salah: peringatan bagi masa depan" },
  { id: "biography",            name: "Biography",             icon: "user",         color: "#065F46", desc: "Hidup tokoh nyata yang mengubah dunia" },
  { id: "science",              name: "Science",               icon: "atom",         color: "#0369A1", desc: "Penemuan ilmiah yang mengubah cara pandang" },
  { id: "romance",              name: "Romance",               icon: "feather",      color: "#BE185D", desc: "Cinta, hubungan, dan momen yang menghangatkan hati" },
  { id: "horror",               name: "Horror",                icon: "alert-circle", color: "#1F2937", desc: "Ketegangan, rasa takut, dan kegelapan" },
  { id: "business",             name: "Business",              icon: "lightbulb",    color: "#78350F", desc: "Strategi, keuangan, dan kesuksesan" },
  { id: "indonesian-literature",name: "Sastra Indonesia",      icon: "book-open",    color: "#166534", desc: "Karya terbaik penulis Indonesia terkini & klasik" }
];

/* ==========================================================================
   BLOG DATA
   ========================================================================== */
const blogData = [
  {
    id: 1,
    title: "10 Buku Wajib Baca Mahasiswa yang Sering Diabaikan",
    category: "Rekomendasi",
    author: "Aurel", authorAvatar: "Au",
    date: "2026-09-10", readTime: 8,
    excerpt: "Deretan buku ini sering dilewatkan padahal isinya mengubah cara pandang terhadap dunia akademik dan kehidupan.",
    content: "Menjadi mahasiswa bukan hanya tentang menyelesaikan SKS dan lulus tepat waktu. Ada banyak buku yang bisa memperluas perspektif kamu...",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    featured: true, tags: ["mahasiswa", "rekomendasi", "pendidikan"]
  },
  {
    id: 2,
    title: "Cara Membangun Kebiasaan Membaca 30 Menit Sehari",
    category: "Tips",
    author: "Aurel", authorAvatar: "Au",
    date: "2026-09-05", readTime: 6,
    excerpt: "Tidak perlu langsung membaca berjam-jam. Mulai dari 30 menit sehari dan lihat bagaimana kebiasaan ini mengubah hidupmu.",
    content: "Banyak orang ingin membaca lebih banyak, tapi selalu gagal memulai. Rahasianya bukan waktu yang lebih banyak: melainkan konsistensi...",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    featured: false, tags: ["tips", "kebiasaan", "produktivitas"]
  },
  {
    id: 3,
    title: "Atomic Habits: Buku yang Mengubah Cara Kerja Otak",
    category: "Ulasan",
    author: "Aurel", authorAvatar: "Au",
    date: "2026-08-28", readTime: 10,
    excerpt: "James Clear berhasil menjelaskan ilmu psikologi perilaku dengan cara yang sederhana dan bisa langsung diterapkan.",
    content: "Atomic Habits adalah salah satu buku self-help terbaik yang pernah diterbitkan...",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: false, tags: ["ulasan", "self-help", "kebiasaan"]
  },
  {
    id: 4,
    title: "Review: Project Hail Mary - Buku Sci-Fi Terbaik 2021",
    category: "Ulasan",
    author: "Aurel", authorAvatar: "Au",
    date: "2026-08-20", readTime: 7,
    excerpt: "Andy Weir kembali dengan karya yang mendebarkan. Bukan hanya tentang sains, tapi juga persahabatan luar angkasa.",
    content: "Project Hail Mary membawa pembaca ke dalam misi penyelamatan kepunahan matahari bersama Ryland Grace...",
    cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    featured: false, tags: ["ulasan", "sci-fi", "astronomi"]
  },
  {
    id: 5,
    title: "5 Genre Buku yang Wajib Kamu Eksplorasi di 2026",
    category: "Tips",
    author: "Aurel", authorAvatar: "Au",
    date: "2026-08-15", readTime: 5,
    excerpt: "Jangan hanya baca genre yang itu-itu saja. Keluar dari zona nyaman dan temukan bacaan baru yang mengejutkan.",
    content: "Mengeksplorasi genre baru membuka jendela pemikiran dan memperkaya kosakata serta empati sosial kita...",
    cover: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    featured: false, tags: ["tips", "genre", "eksplorasi"]
  }
];

/* ==========================================================================
   EVENTS DATA
   ========================================================================== */
const eventsData = [
  {
    id: 1, title: "Reading Club: Membahas Bumi Manusia",
    type: "reading-club", category: "Reading Club",
    date: "2026-10-05", time: "15:00", location: "Online via Zoom",
    description: "Diskusi bulanan Bumi Manusia karya Pramoedya. Siapkan catatan dan pendapatmu!",
    cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    participants: 34, maxParticipants: 50
  },
  {
    id: 2, title: "Workshop: Teknik SQ3R untuk Baca Lebih Efektif",
    type: "workshop", category: "Workshop",
    date: "2026-10-12", time: "09:00", location: "Aula Perpustakaan Pusat",
    description: "Pelajari teknik membaca aktif SQ3R yang terbukti meningkatkan retensi bacaan hingga 70%.",
    cover: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    participants: 18, maxParticipants: 30
  },
  {
    id: 3, title: "Peluncuran: Koleksi 80 Buku Baru Oktober 2026",
    type: "info", category: "Event",
    date: "2026-10-15", time: "10:00", location: "Charvlibrary (Online)",
    description: "Kami menambahkan 80 judul baru! Dapatkan akses lebih awal dengan mendaftar sekarang.",
    cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
    participants: 89, maxParticipants: 200
  },
  {
    id: 4, title: "Webinar: Literasi Digital di Era AI",
    type: "webinar", category: "Webinar",
    date: "2026-10-20", time: "13:00", location: "Online via Google Meet",
    description: "Bagaimana literasi membaca membantu kita menavigasi era AI?",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    participants: 45, maxParticipants: 100
  },
  {
    id: 5, title: "Diskusi: Sastra Indonesia Kontemporer",
    type: "diskusi", category: "Diskusi",
    date: "2026-10-25", time: "14:00", location: "Ruang Diskusi Perpustakaan",
    description: "Mari diskusikan perkembangan sastra Indonesia terkini.",
    cover: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=600&q=80",
    participants: 12, maxParticipants: 25
  }
];

/* ==========================================================================
   NOTIFICATIONS DATA
   ========================================================================== */
const notificationsData = [
  {
    id: 1, type: 'borrow', title: 'Peminjaman Berhasil',
    message: 'Kamu berhasil meminjam "Atomic Habits". Batas pengembalian: 15 Oktober 2026.',
    date: new Date().toISOString().split('T')[0], read: false
  },
  {
    id: 2, type: 'reminder', title: 'Pengingat Pengembalian',
    message: '"Laskar Pelangi" harus dikembalikan dalam 3 hari (8 Oktober 2026).',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], read: false
  },
  {
    id: 3, type: 'info', title: 'Koleksi Baru Tersedia',
    message: '80 judul baru telah ditambahkan ke koleksi bulan Oktober 2026.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], read: true
  },
  {
    id: 4, type: 'event', title: 'Reading Club Besok',
    message: 'Jangan lupa Reading Club: Bumi Manusia besok pukul 15:00 WIB via Zoom.',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], read: true
  },
  {
    id: 5, type: 'info', title: 'Selamat Datang di Charvlibrary',
    message: 'Akun kamu berhasil dibuat. Mulai jelajahi 1.200+ koleksi buku kami!',
    date: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0], read: true
  }
];

/* ==========================================================================
   HELPERS
   ========================================================================== */

function getBookById(id) {
  return booksData.find(b => b.id === parseInt(id)) || null;
}

function getBooksByGenre(genre) {
  if (!genre || genre === 'all') return booksData;
  const q = genre.toLowerCase().replace(/[\s&]+/g, '-');
  return booksData.filter(b => {
    const bg = b.genre.toLowerCase().replace(/[\s&]+/g, '-');
    return bg === q || b.genre.toLowerCase() === genre.toLowerCase();
  });
}

function searchBooks(query) {
  const q = query.trim().toLowerCase();
  if (!q) return booksData;
  return booksData.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.genre.toLowerCase().includes(q) ||
    (b.publisher || '').toLowerCase().includes(q) ||
    b.tags.some(t => t.toLowerCase().includes(q))
  );
}

function getFeaturedBooks() {
  return booksData.filter(b => b.featured);
}

function getGenreCount(genreId) {
  const g = genresData.find(g => g.id === genreId);
  if (!g) return 0;
  return booksData.filter(b => {
    const bg = b.genre.toLowerCase().replace(/[\s&]+/g, '-');
    return bg === genreId || b.genre.toLowerCase() === g.name.toLowerCase();
  }).length;
}
