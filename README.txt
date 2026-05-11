==============================================================
  SISTEM INFORMASI PERPUSTAKAAN - LibraTech
==============================================================

Deskripsi Umum:
Web ini adalah sistem informasi perpustakaan digital bernama
"LibraTech" yang terdiri dari 3 halaman utama: Beranda (index),
Koleksi Buku (buku), dan Peminjaman (pinjam).

==============================================================
DAFTAR FILE & FUNGSINYA
==============================================================

1. index.html
   - Halaman utama / landing page
   - Menampilkan hero section dengan background perpustakaan
   - 3 carousel (1 kiri besar, 2 kanan kecil) untuk promosi
   - Navbar dengan link ke Buku dan Pinjam (tanpa active state)

2. buku.html
   - Halaman koleksi buku
   - 4 thumbnail kategori (Komik, Novel, Ensiklopedia, Sejarah)
   - Book grid dinamis yang load dari file terpisah
   - JavaScript fetch() untuk ambil konten dari file .html lain
   - Navbar: Buku active (btn-warning), Pinjam inactive

3. pinjam.html
   - Halaman formulir peminjaman
   - Form dengan 7 field (Nama, No Anggota, Judul, Kategori,
     Tanggal Pinjam, Tanggal Kembali, Catatan)
   - Data disimpan ke localStorage browser
   - Tabel daftar peminjaman di bawah form
   - Fitur hapus per-item dan hapus semua
   - Navbar: Pinjam active, Buku inactive

4. style.css
   - CSS kustom (selain Bootstrap)
   - Font Ubuntu global
   - Hero section dengan background image
   - Overlay gradient gelap
   - Animasi fadeInDown
   - Hover effect untuk navbar inactive links
   - Responsive breakpoints (768px, 480px)

5. cards-komik.html
   - Berisi 8 card buku komik
   - Gambar: chiruran, sololeveling, jojo, naruto,
     dandadan, onepiece, masle, evangelion
   - Format: blurred background + foreground image

6. cards-novel.html
   - Berisi 4 card buku novel
   - Gambar: bigfour, milea, nadira, hafalansolat

7. cards-ensiklopedia.html
   - Berisi 4 card ensiklopedia
   - Gambar: ensklaxtek, ensklmesur, ensklmobil, ensklyunani

8. cards-sejarah.html
   - Berisi 6 card buku sejarah
   - Gambar: sjrhMuhammad, sjrhpai, sjrhperangsalib,
     sjrhroma, sjrhdisembunyikanb, pesawat

==============================================================
LOGIKA / ALUR KERJA
==============================================================

A. Navigasi antar halaman
   - Setiap halaman punya navbar yang sama
   - Halaman aktif menggunakan class "btn btn-warning"
   - Halaman tidak aktif menggunakan class "nav-inactive"
   - CSS hover: nav-inactive diberi background putih
     transparan saat di-hover

B. Filter Buku berdasarkan Kategori (buku.html)
   - Setiap thumbnail punya atribut data-category
     (komik, novel, ensiklopedia, sejarah)
   - Saat thumbnail diklik, JavaScript panggil
     loadCards(category)
   - loadCards() melakukan fetch() ke file HTML
     yang sesuai (cards-komik.html, dll)
   - Hasil fetch() dimasukkan ke dalam div#bookGrid
   - Saat pertama load, default kategori "komik"

C. Card Buku dengan Efek Blur
   - Setiap card menggunakan 2 image layer:
     1. Background: gambar yang sama tapi di-blur
        (filter: blur(20px)) dan di-scale (1.1)
     2. Foreground: gambar normal, di-contain dengan
        height 85%, di-center
   - Container menggunakan overflow:hidden dan
     position:relative/absolute

D. Form Peminjaman & localStorage (pinjam.html)
   - Data disimpan di localStorage dengan key "peminjaman"
   - Format data: array of objects
     [{ nama, nomorAnggota, judulBuku, kategori,
        tglPinjam, tglKembali, catatan }]
   - Fungsi: getPeminjaman() = ambil dari localStorage
              savePeminjaman(data) = simpan ke localStorage
              renderTable() = render tabel dari data
   - Setiap submit form:
     1. preventDefault() (gak reload page)
     2. Baca nilai dari tiap input
     3. Push ke array
     4. Simpan ke localStorage
     5. Render ulang tabel
     6. Reset form
     7. Tampilkan alert sukses
   - Hapus per-item: splice array berdasarkan index,
     lalu simpan & render ulang
   - Hapus semua: set array kosong, simpan, render

E. Teknologi yang Digunakan
   - Bootstrap 5.3.8 (CDN) - layout, card, navbar, form
   - Google Fonts (Ubuntu) - tipografi
   - localStorage - penyimpanan data client-side
   - Fetch API - load konten dinamis
   - CSS Flexbox/Grid - responsive layout
   - AVIF image format - kompresi gambar modern