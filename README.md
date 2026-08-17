# 📄 MyCivy | ATS-Friendly Professional CV Generator & Builder

Selamat datang di repositori dokumentasi publik **MyCivy**. MyCivy adalah platform generator & pembangun resume ATS-friendly (*Applicant Tracking System*) yang dirancang khusus untuk para profesional tingkat menengah hingga eksekutif. Aplikasi ini mempermudah pembuatan CV yang presisi, adaptif, dan siap kerja dengan menyajikan berbagai fitur otomatisasi instan.

---

## 🚀 Fitur Otomatisasi URL Instan (Auto-Actions)

Anda dapat mengakses atau membagikan halaman MyCivy dengan menambahkan parameter query pada URL untuk melakukan otomatisasi tindakan secara langsung tanpa konfigurasi manual.

### 1. Mode Preview Otomatis (`?preview=code`)
Membuka halaman web, secara otomatis memuat preset peran pilihan, dan langsung menampilkan modal pratinjau PDF.
*   **Format:** `https://mycivy.vercel.app?preview=CODE`
*   **Contoh:** [https://mycivy.vercel.app?preview=swe](https://mycivy.vercel.app?preview=swe) (Membuka Pratinjau Software Developer)

### 2. Mode Download Otomatis (`?download=code`)
Memuat preset peran pilihan secara latar belakang dan langsung mengunduh berkas PDF yang sudah terintegrasi tanpa perlu menekan tombol apa pun di layar.
*   **Format:** `https://mycivy.vercel.app?download=CODE`
*   **Contoh:** [https://mycivy.vercel.app?download=mkt](https://mycivy.vercel.app?download=mkt) (Mengunduh CV Digital Marketing)

### 3. Mode Cetak Otomatis (`?print=code`)
Memuat preset peran pilihan secara langsung dan langsung memicu perintah cetak standar sistem/browser (*Print Dialog*) untuk dicetak langsung ke printer fisik atau disimpan sebagai dokumen lokal.
*   **Format:** `https://mycivy.vercel.app?print=CODE`
*   **Contoh:** [https://mycivy.vercel.app?print=ops](https://mycivy.vercel.app?print=ops) (Mencetak CV Business Operations)

---

## 📋 Tabel Kode Preset Peran (Preset Codes)

Berikut adalah daftar kode singkat (*3-letter code*) dan kata kunci lengkap (*full preset name*) yang didukung oleh sistem untuk parameter URL di atas:

| Kode Singkat | Nama Preset Lengkap | Deskripsi Peran (Indonesia / English) |
| :---: | :--- | :--- |
| **`OPT`** | `optimal` | Management Professional, Strategic Operations & Digital Solutions Specialist (Default) |
| **`ALL`** | `all` | Semua Informasi / Komprehensif (All Content) |
| **`OPS`** | `business_operations` | Business Operations / Operations Manager |
| **`PMO`** | `project_management` | Project Management / Project Operations Specialist |
| **`BDV`** | `business_development` | Business Development / Account Manager |
| **`DIG`** | `digital_transformation`| Digital Transformation / Process Improvement |
| **`HRS`** | `hr_operations` | HR Operations / People Development |
| **`MGT`** | `strategic_management` | Management / Strategic Management |
| **`MKT`** | `marketing` | Marketing / Digital Marketing |
| **`ACC`** | `finance_accounting` | Finance / Accounting |
| **`SWE`** | `software_development` | Software / Web Development |
| **`BRN`** | `branch_manager` | Branch Manager / Multi-Unit Operations |
| **`ADM`** | `office_administration`| Office Administration & Executive Support |
| **`PRS`** | `public_relations` | Public Relations & Corporate Communications |
| **`SLS`** | `sales_executive` | Sales Executive & B2B Account Specialist |
| **`SCM`** | `supply_chain_logistics`| Supply Chain & Logistics Operations |

*Catatan: Parameter masukan bersifat tidak sensitif terhadap huruf besar/kecil (case-insensitive). Anda dapat menggunakan huruf kecil seperti `swe` atau huruf besar seperti `SWE`.*

---

## 🌟 Fitur Utama Platform

*   **Preset Peran Spesifik:** Muat profil kualifikasi, riwayat pekerjaan, proyek digital, dan sertifikasi yang telah dikurasi secara otomatis sesuai dengan posisi incaran Anda.
*   **Seleksi Item Fleksibel:** Centang atau hilangkan item secara detail (seperti metrik performa atau pencapaian) untuk mempersonalisasi resume sesuai kebutuhan spesifik.
*   **Ekspor PDF Instan & Presisi Tinggi:** Hasil PDF telah diuji agar lolos sistem pemindaian ATS dengan struktur font, ukuran margin, dan urutan seksi yang optimal.
*   **Dukungan Multi-Bahasa:** Antarmuka dan dokumen yang siap diterjemahkan ke dalam Bahasa Indonesia maupun Bahasa Inggris secara mulus.
*   **Pilihan Desain ATS Modern:** Sediakan tema *Block*, *Line*, *Badge*, dan *Plain* sesuai dengan karakteristik industri perusahaan yang Anda lamar.

---

## 🛠️ Pengembangan & Menjalankan Lokal

Jika Anda ingin menjalankan aplikasi ini di komputer lokal Anda:

1.  **Instalasi Dependensi:**
    ```bash
    npm install
    ```
2.  **Menjalankan Server Pengembangan (Dev Mode):**
    ```bash
    npm run dev
    ```
3.  **Membangun Aplikasi untuk Produksi (Build Output):**
    ```bash
    npm run build
    ```
4.  **Menjalankan Mode Produksi:**
    ```bash
    npm run start
    ```

---

Dibuat dengan dedikasi penuh untuk membantu Anda menembus tahapan rekrutmen impian. 🚀  
**MyCivy — Your ATS Success Navigator**
