# 📄 ANALISIS SISTEM MENYELURUH & DOKUMENTASI LENGKAP PLATFORM "MYCIVY"
**ATS-Friendly Professional CV Generator, Dynamic Preset Engine, Full-Page PDF View & Multi-Channel Sharing Ecosystem**

---

## 📌 1. RINGKASAN EKSEKUTIF & IDENTITAS PLATFORM

**MyCivy** adalah platform aplikasi web canggih (*Full-Stack Single Page Application*) yang dirancang khusus sebagai **Pembangun, Penyesuai & Penjana Resume ATS-Compliant (Applicant Tracking System)** berstandar industri internasional yang sangat presisi, dinamis, dan terstruktur.

Platform ini menyajikan profil karir profesional eksekutif **Alvareza Hilka Pratama, S.IP** secara kontekstual, terukur, dan adaptif terhadap lebih dari **75 posisi jabatan spesifik (LinkedIn-relevant)** di berbagai sektor industri (Mulai dari Manajemen Operasional, SDM/HR, Manajemen Proyek/PMO, Business Development, Rantai Pasok/Logistik, hingga Pemasaran Digital dan Rekayasa Perangkat Lunak).

### 🎯 Pilar Utama Platform:
1. **Personalisasi CV Otomatis Berbasis Peran (*Targeted Resume Tailoring*)**: Memuat preset kualifikasi yang relevan secara instan sesuai kriteria lowongan kerja (*Job Description*) dari 11 klaster industri.
2. **Halaman Khusus Full PDF View & URL Dinamis (`/{role}`)**: Antarmuka tampilan penuh dokumen PDF responsif dengan dukungan permalink bersih (`/opt`, `/all`, `/swe`, `/pmo`, `/adm`, dll.) yang langsung menampilkan dokumen siap baca dan cetak.
3. **Konfigurasi Desain & Tipografi Fleksibel**: Kustomisasi visual dokumen secara langsung (Ubah Tema Header, Ubah Warna Aksen HEX, serta Perataan Teks *Left Align* atau *Justify*).
4. **Ekosistem Berbagi Cerdas & QR Code Terintegrasi**: Bagikan CV melalui URL terparameterisasi, ekspor PDF instan, integrasi WhatsApp otomatis, dan QR Code tersemat dengan branding MyCivy.
5. **Kepatuhan ATS 100% (*ATS Compliance & Parser Optimization*)**: Menghasilkan dokumen PDF berstandar vektor murni tanpa grafik tertanam (*embedded images/canvases*) yang menghambat parser ATS (Workday, Taleo, Greenhouse, Lever, BambooHR).
6. **Optimasi SEO & Metatag Kartu Sosial Dinamis**: Metatag Open Graph & Twitter Cards berkualitas tinggi dengan kartu gambar universal (`/public/metatag.webp`) serta diferensiasi judul dan deskripsi antara halaman web builder dan pratinjau dokumen PDF.

---

## 🏗️ 2. ARSITEKTUR TEKNOLOGI & SPESIFIKASI STACK

Platform ini dibangun di atas infrastruktur modern dengan *bundle size* yang sangat efisien dan performa *render* yang tinggi:

```
                  ┌───────────────────────────────────────────────┐
                  │            React 19 + TypeScript              │
                  │           (Vite 6 Single Page App)            │
                  └───────────────────────┬───────────────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
  ┌───────────────────┐         ┌───────────────────┐         ┌───────────────────┐
  │  Language Context │         │ Role Preset Engine│         │ Tailwind CSS v4   │
  │  (ID / EN State)  │         │ (41+ Presets/SOP) │         │ (Lucide + Motion) │
  └─────────┬─────────┘         └─────────┬─────────┘         └─────────┬─────────┘
            │                             │                             │
            ├─────────────────────────────┼─────────────────────────────┤
            ▼                             ▼                             ▼
  ┌───────────────────┐         ┌───────────────────┐         ┌───────────────────┐
  │ FullPagePdfView   │         │ Dynamic SEO Hook  │         │ QR Code Engine    │
  │ (Dynamic Route)   │         │ (useMetaTags)     │         │ (qrcode.react)    │
  └─────────┬─────────┘         └─────────┬─────────┘         └─────────┬─────────┘
            │                             │                             │
            └─────────────────────────────┼─────────────────────────────┘
                                          │
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │           jsPDF 4.2 Vector Engine             │
                  │       (Plain Text + ATS Multi-Style)          │
                  └───────────────────────────────────────────────┘
```

| Komponen / Lapisan | Teknologi / Pustaka | Peran & Fungsi Utama |
| :--- | :--- | :--- |
| **Frontend Framework** | `React 19.0.1` | Mengelola reaktivitas UI, state seleksi item, dan siklus hidup komponen antarmuka. |
| **Language & Typings** | `TypeScript 5.8.2` | Menjamin *type safety* pada struktur data CV, preset peran, dan opsi generator PDF. |
| **Build Tool & Bundler** | `Vite 6.2.3` | Menyediakan server pengembang super cepat (Port 3000) dan *production bundling* teroptimasi. |
| **Styling & Animasi** | `Tailwind CSS 4.1.14` & `Motion 12.23` | Tata letak responsif, transisi halus, dan sistem visual kontras tinggi. |
| **Iconography** | `Lucide React 0.546.0` | Ikonografi modern dan konsisten untuk navigasi, menu popup, badge, dan kontrol status. |
| **QR Code Generator** | `qrcode.react 4.2.0` | Pembuatan kode QR vektor SVG interaktif dengan logo embedded MyCivy. |
| **PDF Generation Engine** | `jsPDF 4.2.1` | Penjana berkas PDF berbasis instruksi vektor murni (teks terindeks & aman parser ATS). |
| **Dynamic SEO & Metatags**| `useMetaTags` + Vite Static Plugin | Pengelolaan metadata OpenGraph & Twitter Cards secara dinamis dan saat waktu build (*SSG-style*). |
| **Backend Integration** | `@google/genai` & `Express 4.21` | Kesiapan integrasi layanan AI server-side dan proxy API jika diperlukan. |

---

## 📄 3. SISTEM FULL-PAGE PDF VIEW & NAVIGASI RUTE DINAMIS

Selain antarmuka builder interaktif di root (`/`), MyCivy dilengkapi dengan antarmuka **Full Page PDF View** (`src/components/FullPagePdfView.tsx`) yang didesain khusus untuk menampilkan dokumen CV utuh langsung di layar tanpa gangguan panel editor:

### 🌟 Fitur Unggulan Full Page PDF View:
1. **Header Minimalis 2-Aksi**:
   - **Tombol Desain (Palette Icon)**: Membuka menu popup kustom untuk mengubah tema, warna aksen, dan perataan teks.
   - **Tombol Share (Share2 Icon)**: Membuka menu popup aksi lengkap untuk menyalin tautan, mengunduh PDF, berbagi ke WhatsApp, dan menampilkan modal QR Code.
2. **Struktur Pola URL Parameter Fleksibel**:
   ```
   https://mycivy.vercel.app/{role}?theme={design}&color={hex}&align={justify}
   ```
   - `{role}`: Kode peran preset (`opt`, `all`, `swe`, `pmo`, `adm`, `ops`, `mkt`, dll.).
   - `theme`: Pilihan tema dokumen (`block`, `line`, `badge`, `plain`).
   - `color`: Kode warna heksadesimal tanpa pagar (misal: `0F172A`, `0062E3`, `059669`, `DC2626`).
   - `align`: Opsi perataan teks paragraf (`justify` untuk rata kanan-kiri, atau default rata kiri).
   - *Contoh Lengkap*: `https://mycivy.vercel.app/swe?theme=line&color=0062E3&align=justify`
3. **Sinkronisasi State & URL Tanpa Reload**:
   - Setiap perubahan tema, warna, atau perataan langsung memperbarui URL di address bar peramban menggunakan `window.history.replaceState` secara instan dan mulus.
4. **Fokus Bebas Gangguan (Modal Scroll Lock)**:
   - Ketika modal atau bottom sheet dibuka (Ubah Tema, Ubah Warna, Share, atau QR Code), scrollbar halaman dan progress bar dokumen otomatis dinonaktifkan (`overflow-hidden max-h-screen`) agar fokus pengguna tetap terjaga.

---

## 🎨 4. DESAIN ATS & SISTEM KUSTOMISASI VISUAL

Platform MyCivy menyediakan engine kustomisasi tampilan dokumen yang tetap menjaga **100% Kompatibilitas ATS**:

### 🌟 4 Opsi Desain Header ATS:
1. **Block (Header Blok Solid)**:
   - Menggunakan banner blok persegi panjang dengan teks putih kontras tinggi di setiap judul seksi.
   - Memberikan kesan tegas, terstruktur, dan formal.
2. **Line (Underline Minimalis)**:
   - Menggunakan garis bawah horizontal tegas di bawah setiap judul seksi.
   - Gaya klasik yang paling disukai oleh perekrut internasional dan perusahaan Fortune 500.
3. **Badge (Kapsul Header)**:
   - Judul seksi dibingkai dalam bentuk kapsul (*pill badge*) dengan sudut lembut.
   - Tampilan segar, modern, dan ramah untuk industri teknologi atau startup.
4. **Plain (Minimalis Murni)**:
   - Tanpa garis atau latar dekoratif. Fokus murni pada kejelasan tipografi dan ruang negatif (*white space*).

### 🎨 Pilihan Palet Warna Aksen:
- **Hitam Slate**: `#0F172A` (Default Elegan)
- **Biru Profesional**: `#0062E3` (Korporat & IT)
- **Hijau Zamrud**: `#059669` (Operasional & Keuangan)
- **Merah Karmin**: `#DC2626` (Pemasaran & Bisnis)
- **Ungu Slate**: `#7C3AED` (Kreatif & Desain)
- **Dukungan Warna Hex Kustom**: Bebas menginputkan kode hex warna perusahaan sesuai kebutuhan.

### 📐 Opsi Perataan Teks (Text Alignment):
- **Rata Kiri (*Left Align*)**: Standar industri tradisional yang memprioritaskan ritme baca alami mata manusia.
- **Rata Kanan-Kiri (*Justify*)**: Tata letak dokumen formal dengan margin rata kanan-kiri yang rapi dan simetris.

---

## 📱 5. EKOSISTEM BERBAGI & MODAL QR CODE MYCIVY

Menu Berbagi cerdas terintegrasi langsung pada tampilan Full PDF View:

1. **Unduh PDF Instan**: Mengekspor dokumen langsung dari instruksi vektor `jsPDF` berkecepatan tinggi.
2. **Salin Tautan**: Menyalin URL spesifik lengkap dengan preset peran, tema, warna, dan perataan yang sedang aktif.
3. **Bagikan ke WhatsApp**: Menyiapkan teks salam profesional otomatis dan tautan pratinjau yang langsung dapat dikirim ke rekruter atau kolega.
4. **Modal QR Code Vektor**:
   - Menghasilkan QR Code SVG dari URL aktif.
   - Dilengkapi logo tengah bertuliskan **MyCivy** (berbasis teks rata tengah tanpa garis outline tebal) yang presisi dan mudah dipindai oleh kamera ponsel.
   - Tombol unduh langsung gambar QR Code (SVG/PNG).
5. **Web Share API**: Terhubung ke sistem *native share* bawaan perangkat (iOS / Android / macOS / Windows).

---

## 🌐 6. ARSITEKTUR METATAG & SEO DINAMIS

Platform ini mengimplementasikan strategi SEO canggih untuk memastikan pratinjau kartu sosial (*Open Graph & Twitter Cards*) tampil optimal di seluruh platform perpesanan dan media sosial (WhatsApp, Telegram, LinkedIn, Facebook, Discord, X):

### 🖼️ Universal Social Card Image:
- Seluruh tautan web menggunakan aset gambar resolusi tinggi dari:
  ```
  https://mycivy.vercel.app/metatag.webp
  ```
- Format WebP berukuran 1200 x 630 px dengan kompresi optimal untuk waktu muat pratinjau instan.

### 🏷️ Diferensiasi Konten Metatag:
1. **Halaman Utama / Web Builder (`/`)**:
   - **Judul**: *MyCivy | Generator & Builder CV ATS Professional*
   - **Deskripsi**: *Platform CV ATS-Friendly & Portfolio Professional. Kustomisasi preset peran kerja spesifik, sesuaikan tata letak dan tema, lalu unduh resume PDF siap kirim ke HRD instan.*
2. **Halaman Full PDF View (`/{role}`)**:
   - **Judul**: Menyesuaikan dengan kode peran aktif, misal: *Curriculum Vitae (CV) ATS - Alvareza H. Pratama (ALL) | MyCivy PDF Preview*.
   - **Deskripsi**: *Lihat pratinjau Curriculum Vitae (CV) ATS-Friendly resmi Alvareza H. Pratama. Format standar industri dengan struktur terverifikasi, siap cetak dan diunduh langsung dalam format PDF.*

### ⚡ Strategi Prarating Ganda (SSG + Client-Side Hook):
- **Build-Time Prerender (Vite Plugin)**: Secara otomatis menghasilkan file `index.html` statis pada folder dist rute seperti `/all`, `/opt`, `/swe`, `/pmo`, `/adm`, `/ops`, `/mkt`, `/fin`, `/hr` agar bot *crawler* yang tidak menjalankan JavaScript (seperti WhatsApp dan Telegram) langsung membaca metatag dokumen secara akurat.
- **Client-Side Hook (`useMetaTags`)**: Memperbarui tag `<title>`, `<meta>`, `<link rel="canonical">`, dan `<link rel="image_src">` di runtime saat pengguna berpindah halaman tanpa memicu *full page reload*.

---

## 🗂️ 7. KELOMPOK INDUSTRI & 75+ PRESET PERAN (LINKEDIN TARGETED)

Platform mendukung lebih dari **75 preset kualifikasi karir spesifik** yang terbagi ke dalam 11 klaster industri, disesuaikan langsung dengan kata kunci dan kriteria pencarian rekruter di LinkedIn:

1. **Featured Profiles**: `OPT` (Rekomendasi Utama), `ALL` (Profil Lengkap Komprehensif).
2. **Administrasi & Kesekretariatan**: `ADM` (Admin Perkantoran), `AST` (Sekretaris Eksekutif), `PJA` (Project Administration), `PRA` (Procurement Administration), `DEA` (Data Entry & Database Admin), `WIA` (Warehouse & Inventory Admin), `HOS` (Admin Rumah Sakit), `LGL` (Admin Legal), `SAD` (Admin Penjualan), `FBA` (Admin Keuangan & Kasir), `HRA` (Admin Personalia).
3. **Operasional & Manajemen Ritel**: `OPS` (Operations Manager), `OPX` (Operational Excellence & Continuous Improvement), `SOM` (Service Operations Manager), `COS` (Chief of Staff / BizOps), `FRE` (Retail Expansion & Franchise Ops), `BRN` (Branch Manager), `RTL` (Supervisor Toko), `GAF` (General Affairs), `QAC` (QA & Kepatuhan SOP), `MFG` (Operasional Produksi), `FLD` (Koordinator Lapangan), `UTL` (Utilitas Publik & Air).
4. **Manajemen Proyek & PMO**: `PMO` (Project Manager Umum), `ASM` (Agile Scrum Master), `PRO` (Product Operations), `CLT` (Client Implementation Manager), `CPM` (Creative Project Manager), `ITP` (IT Project Manager), `EVM` (Event Project Manager), `NGO` (Program Lead Nirlaba).
5. **Business Development & Penjualan**: `BDV` (Business Development), `CSD` (Channel Sales & Distribution), `CSE` (Enterprise Corporate Sales), `SOP` (Sales Operations & Enablement), `TND` (Commercial Tender & RFP Specialist), `SLS` (Sales Executive B2B), `KAM` (Key Account Manager), `GOV` (Government Relations), `CSM` (Client Success Manager).
6. **Rantai Pasok & Logistik**: `SCM` (Supply Chain Lead), `LDC` (Logistics Fleet & Dispatch), `VMR` (Vendor & Supplier Relations), `DIP` (Demand & Inventory Planning), `PPC` (PPIC & Stok FIFO), `PRC` (Procurement & Purchasing), `WHS` (Kepala Pergudangan).
7. **Sumber Daya Manusia (HR)**: `HRS` (HR Operations), `HBP` / `HRBP` (HR Business Partner), `CNB` (Comp-Ben & Payroll Specialist), `IRL` (Industrial Relations & Labor Compliance), `PAS` / `HRIS` (People Analytics & HRIS), `EBR` (Employer Branding & Campus Relations), `REC` (Talent Acquisition / Rekruter), `LND` (Learning & Development), `ODD` (Organizational Development).
8. **Pemasaran, Humas & CX**: `MKT` (Digital Marketing), `PMA` (Performance Marketing & Ads), `ECO` (E-Commerce & Marketplace Ops), `SMM` (Social Media & Content Strategy), `GRM` (Growth Marketing & B2B Lead Gen), `BRM` (Brand Manager & Creative Comms), `PRS` (Public Relations), `CSO` (Customer Service & CX), `MCB` (Marcom & Brand Activation).
9. **Keuangan & Akuntansi**: `ACC` (Finance & Accounting), `APA` (AP/AR Specialist), `PSC` (Commercial Pricing Analyst), `IAF` (Internal Audit & Financial Compliance), `FAC` (Financial Analyst & Cost Control), `TAX` (Akuntansi Perpajakan).
10. **Teknologi, ERP & Rekayasa Perangkat Lunak**: `DIG` (Digital Transformation Lead), `FED` (Frontend Web Developer), `PDM` (Product Manager / APM), `ERP` (Enterprise ERP & CRM Implementation), `BIA` (BI & Executive Dashboard Specialist), `SWE` (Software Engineer), `FE` (Frontend Engineer), `BSA` (Business Systems Analyst).
11. **Manajemen Strategis & Konsultansi**: `MGT` (Strategic Management), `BTR` (Business Turnaround & Restructuring), `PAR` (Public Affairs & Institutional Advocacy), `CON` (Management Consultant).

---

## 🛠️ 8. PANDUAN PENGEMBANGAN & CARA MENJALANKAN LOKAL

### 1. Prasyarat Sistem:
- Node.js (v18.x atau lebih baru)
- npm / yarn / pnpm / bun

### 2. Instalasi Dependensi:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan:
```bash
npm run dev
```
Aplikasi dapat diakses pada `http://localhost:3000`.

### 4. Menjalankan Linter & Validasi Tipe:
```bash
npm run lint
```

### 5. Kompilasi Produksi (Production Build):
```bash
npm run build
```
Proses ini secara otomatis mengompilasi bundel Vite dan mengeksekusi plugin pembuat rute statis SEO ke direktori `dist/`.

---

## 🚀 9. STRUKTUR BERKAS UTAMA

```
/
├── index.html                           # Entry point HTML utama dengan tag meta OpenGraph lengkap
├── metadata.json                        # Metadata konfigurasi sistem AI Studio
├── package.json                         # Dependensi dan script build
├── tsconfig.json                        # Konfigurasi TypeScript
├── vite.config.ts                       # Konfigurasi Vite & Plugin Generator SEO Statis
├── public/
│   ├── metatag.webp                     # Gambar kartu sosial universal (1200x630px)
│   ├── logo.svg                         # Favicon & logo vektor resmi
│   ├── mycivy-qr-logo.svg               # Aset SVG logo badge MyCivy untuk QR
│   ├── manifest.json                    # Manifest web capabilities (PWA)
│   └── README.md                        # Dokumentasi komprehensif sistem MyCivy
└── src/
    ├── App.tsx                          # Root controller & detektor routing (Home vs Full PDF)
    ├── main.tsx                         # Mount React 19 application
    ├── types.ts                         # Deklarasi tipe TypeScript global
    ├── components/
    │   ├── FullPagePdfView.tsx          # Tampilan Full Page PDF dokumen interaktif
    │   ├── AtsDocumentSheet.tsx         # Komponen lembar dokumen berstandar ATS
    │   ├── HeaderNavbar.tsx             # Navbar utama antarmuka builder
    │   ├── PrintableView.tsx            # Editor & builder pemilihan item CV
    │   └── RolePresetModal.tsx          # Modal pemilihan 41+ preset peran
    ├── context/
    │   └── LanguageContext.tsx          # State provider bilinguistik (ID / EN)
    ├── data/
    │   ├── cvData.ts                    # Data profil profesional Bahasa Indonesia
    │   ├── cvDataEn.ts                  # Data profil profesional Bahasa Inggris
    │   └── rolePresetsConfig.ts         # Konfigurasi 41+ preset peran & pemetaan kode
    ├── hooks/
    │   ├── useCvSelection.ts            # Hook seleksi dan aktivasi item kualifikasi
    │   ├── useMetaTags.ts               # Hook dinamis pembaruan OpenGraph & SEO tags
    │   └── usePdfPreview.ts             # Hook sinkronisasi state pratinjau & unduh PDF
    └── utils/
        └── pdf/
            ├── coreGenerator.ts         # Engine instruksi vektor jsPDF aman parser ATS
            └── helpers.ts               # Helper format teks, kalkulasi tinggi & halaman
```

---

Dibuat dengan standar rekayasa perangkat lunak modern dan dedikasi terhadap keterbacaan dokumen karir profesional.  
**MyCivy — Your ATS Success Navigator**
