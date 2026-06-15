# BAB I
# PENDAHULUAN

---

## 1.1 Latar Belakang

Perkembangan teknologi informasi dan komunikasi (TIK) yang semakin pesat di era digital saat ini telah mendorong berbagai sektor kehidupan untuk bertransformasi menuju sistem yang lebih modern, efisien, dan terintegrasi. Salah satu konsep yang lahir dari perkembangan tersebut adalah *Smart City* atau kota pintar, yaitu sebuah pendekatan pembangunan kota yang memanfaatkan teknologi digital untuk meningkatkan kualitas hidup masyarakat, mengoptimalkan pelayanan publik, serta mendorong pertumbuhan ekonomi yang berkelanjutan. Di Indonesia, konsep *Smart City* telah menjadi bagian dari program nasional **Gerakan Menuju 100 Smart City** yang diinisiasi oleh pemerintah pusat guna mendorong pemerintah daerah dalam mengadopsi teknologi digital secara komprehensif.

Kabupaten Tangerang, sebagai salah satu kabupaten terbesar di Provinsi Banten dengan luas wilayah 959 km², populasi lebih dari 1,5 juta jiwa, 29 kecamatan, dan 246 kelurahan/desa, memiliki tantangan tersendiri dalam memberikan pelayanan publik yang merata dan berkualitas kepada seluruh lapisan masyarakat. Kompleksitas permasalahan perkotaan seperti tata kelola pemerintahan, kualitas hidup, pembangunan ekonomi, kelestarian lingkungan, partisipasi masyarakat, serta pencitraan daerah memerlukan sebuah pendekatan yang terintegrasi dan berbasis teknologi. Oleh karena itu, Pemerintah Kabupaten Tangerang telah menginisiasi program **Smart City Kabupaten Tangerang** yang mencakup enam dimensi utama, yaitu *Smart Governance*, *Smart Living*, *Smart Society*, *Smart Economy*, *Smart Environment*, dan *Smart Branding*.

Dalam rangka mendukung implementasi program tersebut, diperlukan sebuah platform digital berupa website yang mampu menyajikan informasi terkait program *Smart City* secara terpusat, interaktif, dan mudah diakses oleh seluruh pemangku kepentingan. Website ini berfungsi sebagai portal informasi publik yang menampilkan profil program, dimensi-dimensi *Smart City*, agenda dan kegiatan, publikasi dokumen, katalog layanan digital, serta saluran komunikasi antara pemerintah dan masyarakat. Dengan adanya website ini, diharapkan transparansi informasi dan partisipasi masyarakat dalam pembangunan daerah dapat semakin meningkat.

Berdasarkan latar belakang tersebut, penelitian ini difokuskan pada perancangan dan pembangunan **website front-end SmartCity Kabupaten Tangerang** menggunakan teknologi modern berbasis **React.js** dengan *build tool* **Vite**, yang terintegrasi dengan *backend* API (*Application Programming Interface*) untuk pengelolaan data secara dinamis. Website ini dirancang dengan pendekatan *Single Page Application* (SPA), dilengkapi fitur multibahasa (*internationalization*), optimasi SEO (*Search Engine Optimization*), serta dukungan *Progressive Web App* (PWA) agar dapat memberikan pengalaman pengguna yang optimal di berbagai perangkat.

## 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, maka rumusan masalah dalam penelitian ini adalah sebagai berikut:

1. Bagaimana merancang dan membangun website front-end SmartCity Kabupaten Tangerang yang mampu menyajikan informasi enam dimensi *Smart City* (*Smart Governance*, *Smart Living*, *Smart Society*, *Smart Economy*, *Smart Environment*, dan *Smart Branding*) secara interaktif dan informatif?

2. Bagaimana mengintegrasikan website front-end dengan *backend* API sehingga data seperti dimensi, agenda kegiatan, publikasi dokumen, inovasi, dan menu navigasi dapat dikelola secara dinamis melalui *Content Management System* (CMS)?

3. Bagaimana membangun antarmuka pengguna (*user interface*) yang responsif, modern, dan mudah diakses (*accessible*) oleh masyarakat luas dengan memanfaatkan teknologi React.js dan Vite?

4. Bagaimana menerapkan fitur-fitur pendukung seperti *internationalization* (multibahasa), optimasi SEO, *Progressive Web App* (PWA), serta *performance monitoring* (Core Web Vitals) pada website SmartCity Kabupaten Tangerang?

## 1.3 Tujuan Penelitian

Adapun tujuan dari penelitian ini adalah:

1. Merancang dan membangun website front-end SmartCity Kabupaten Tangerang yang menyajikan informasi enam dimensi *Smart City* secara komprehensif, interaktif, dan terstruktur melalui halaman-halaman khusus untuk setiap dimensi yang dilengkapi dengan konten berita dan inovasi.

2. Mengimplementasikan integrasi antara website front-end dengan *backend* REST API menggunakan library **Axios** untuk pengambilan data dinamis, termasuk data dimensi, agenda kegiatan, publikasi dokumen, gambar dari penyimpanan cloud (Amazon S3), serta konfigurasi menu navigasi dari CMS.

3. Membangun antarmuka pengguna yang modern dan responsif dengan memanfaatkan komponen-komponen React.js, termasuk *lazy loading*, *code splitting*, transisi halaman yang halus, animasi interaktif, *virtual tour*, serta formulir kontak dengan sistem verifikasi CAPTCHA.

4. Menerapkan fitur multibahasa menggunakan **i18next**, optimasi SEO melalui meta tags dan *structured data* (JSON-LD), dukungan PWA melalui *service worker* dan *manifest*, serta *performance monitoring* melalui Core Web Vitals untuk memastikan kualitas dan aksesibilitas website.

## 1.4 Manfaat Kegiatan

Kegiatan penelitian ini diharapkan dapat memberikan manfaat sebagai berikut:

### A. Manfaat Bagi Pemerintah Kabupaten Tangerang
1. Menyediakan platform digital yang terpusat untuk mempublikasikan informasi terkait program *Smart City*, termasuk enam dimensi, agenda kegiatan, dan publikasi dokumen resmi.
2. Meningkatkan transparansi dan akuntabilitas pemerintah daerah melalui penyajian data dan informasi yang mudah diakses oleh publik.
3. Memfasilitasi komunikasi dua arah antara pemerintah dan masyarakat melalui fitur halaman kontak yang terintegrasi.
4. Mendukung promosi dan branding Kabupaten Tangerang sebagai daerah yang inovatif dan berbasis teknologi melalui katalog layanan digital seperti **Tangerang Gemilang**, **Geo Maps**, **Mata Hub**, dan **D'Naker Digi**.

### B. Manfaat Bagi Masyarakat
1. Memudahkan masyarakat dalam mengakses informasi terkait program dan layanan *Smart City* Kabupaten Tangerang melalui satu platform yang terintegrasi.
2. Meningkatkan partisipasi masyarakat dalam pembangunan daerah melalui saluran aspirasi dan umpan balik yang disediakan.
3. Memberikan akses terhadap katalog layanan digital dan aplikasi unggulan pemerintah daerah seperti aplikasi **Tangerang Gemilang** yang dapat diunduh melalui Google Play dan App Store.

### C. Manfaat Bagi Pengembang (*Developer*)
1. Menjadi referensi dalam pengembangan aplikasi web berbasis React.js dengan arsitektur yang terstruktur, termasuk penerapan *lazy loading*, *dynamic routing*, *custom hooks*, dan integrasi REST API.
2. Memberikan contoh implementasi praktis dari konsep *Progressive Web App* (PWA), *internationalization*, dan optimasi performa web menggunakan teknologi modern.

## 1.5 Metode Penelitian

Metode penelitian yang digunakan dalam pengembangan website front-end SmartCity Kabupaten Tangerang ini meliputi:

### 1. Metode Pengumpulan Data
   - **Observasi**: Melakukan pengamatan langsung terhadap sistem dan layanan digital yang telah berjalan di lingkungan Pemerintah Kabupaten Tangerang, termasuk aplikasi Tangerang Gemilang, Geo Maps, Mata Hub, dan D'Naker Digi.
   - **Studi Literatur**: Mengkaji literatur dan referensi terkait konsep *Smart City*, masterplan SmartCity Kabupaten Tangerang, serta teknologi pengembangan web modern berbasis React.js.
   - **Wawancara**: Melakukan wawancara dengan pihak terkait di lingkungan Pemerintah Kabupaten Tangerang untuk memahami kebutuhan dan spesifikasi sistem yang diharapkan.

### 2. Metode Pengembangan Sistem
Pengembangan website ini menggunakan pendekatan **Agile Development** dengan tahapan sebagai berikut:

   - **Tahap Perencanaan (*Planning*)**: Menyusun kebutuhan fungsional dan non-fungsional website, menentukan arsitektur sistem, serta merumuskan *user stories* dan *wireframe* tampilan antarmuka.

   - **Tahap Perancangan (*Design*)**: Merancang desain antarmuka pengguna (UI/UX) yang modern dan responsif, merancang struktur komponen React.js, serta mendesain alur integrasi dengan *backend* API.

   - **Tahap Implementasi (*Development*)**: Membangun website menggunakan teknologi sebagai berikut:
     - **React.js 18** sebagai library utama untuk membangun antarmuka pengguna berbasis komponen.
     - **Vite 5** sebagai *build tool* dan *development server* yang cepat dan efisien.
     - **React Router DOM 6** untuk pengelolaan navigasi dan routing halaman.
     - **Axios** untuk komunikasi HTTP dengan *backend* REST API.
     - **i18next** dan **react-i18next** untuk implementasi fitur multibahasa (*internationalization*).
     - **Lucide React** sebagai library ikon yang ringan dan konsisten.
     - **Swiper** untuk implementasi komponen *carousel/slider* interaktif pada halaman timeline sejarah.
     - **Vanilla CSS** dengan arsitektur modular untuk *styling* yang terstruktur dan mudah dipelihara.

   - **Tahap Pengujian (*Testing*)**: Melakukan pengujian fungsional pada setiap fitur website, pengujian responsivitas pada berbagai perangkat dan ukuran layar, pengujian integrasi API, serta pengujian performa menggunakan metrik Core Web Vitals (LCP, FID, CLS).

   - **Tahap Deployment dan Pemeliharaan (*Deployment & Maintenance*)**: Melakukan *deployment* website ke server produksi dan melakukan pemeliharaan berkala termasuk perbaikan bug dan penambahan fitur sesuai kebutuhan.

## 1.6 Sistematika Penulisan

Sistematika penulisan laporan ini disusun dalam beberapa bab sebagai berikut:

**BAB I PENDAHULUAN**
Bab ini berisi latar belakang masalah, rumusan masalah, tujuan penelitian, manfaat kegiatan, metode penelitian, serta sistematika penulisan laporan.

**BAB II LANDASAN TEORI**
Bab ini membahas teori-teori dan konsep yang menjadi dasar dalam penelitian, meliputi konsep *Smart City* dan enam dimensinya, teknologi pengembangan web modern (React.js, Vite, SPA), arsitektur REST API, konsep *Progressive Web App* (PWA), *internationalization* (i18n), optimasi SEO, serta *performance monitoring* menggunakan Core Web Vitals.

**BAB III ANALISIS DAN PERANCANGAN SISTEM**
Bab ini menguraikan analisis kebutuhan sistem baik fungsional maupun non-fungsional, analisis sistem yang sedang berjalan, perancangan arsitektur sistem, perancangan basis data, perancangan antarmuka pengguna (UI/UX), serta perancangan struktur komponen dan alur navigasi website.

**BAB IV IMPLEMENTASI DAN PENGUJIAN**
Bab ini menjelaskan implementasi website berdasarkan perancangan yang telah dibuat, termasuk implementasi setiap halaman dan komponen, integrasi dengan *backend* API, serta hasil pengujian fungsional, pengujian responsivitas, dan pengujian performa website.

**BAB V PENUTUP**
Bab ini berisi kesimpulan dari keseluruhan penelitian yang telah dilakukan serta saran-saran untuk pengembangan website SmartCity Kabupaten Tangerang di masa mendatang.
