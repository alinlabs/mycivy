import { ConsultingProject, DigitalSolution } from '../types';

export interface TailoredProjectSet {
  summary: string;
  projects: ConsultingProject[];
  digitalSolutions: DigitalSolution[];
}

export const PRESET_PROJECTS_ID: Record<string, TailoredProjectSet> = {
  optimal: {
    summary:
      'Portofolio konsultasi operasional, pengembangan solusi AI & aplikasi digital, tata kelola SDM, strategi harga ritel, koordinasi event skala besar, hingga kampanye digital multi-channel untuk berbagai institusi dan industri.',
    projects: [
      {
        id: 'proj-1',
        role: 'HR & Operations',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Mengelola 30+ website & application development projects serta 5+ video production projects end-to-end.',
          'Mengembangkan website, mobile/web applications, AI solutions, otomasi sistem, dan strategi digital terpadu sesuai kebutuhan berbagai klien korporat.',
          'Memimpin project lifecycle mulai dari perencanaan (planning), alokasi resource, eksekusi teknis, hingga project delivery dan client training.',
          'Berkoordinasi intensif dengan stakeholders kunci untuk memastikan SLA, timeline, kepatuhan anggaran, dan standar kualitas tercapai.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Business Operations Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Mengembangkan master database terstruktur untuk 100+ SKU produk menggunakan Google Sheets & cloud data architecture.',
          'Formulasi pricing strategy komprehensif: kalkulasi HPP (COGS), margin keuntungan, penetapan bottom price, dan penyesuaian harga jual e-commerce dengan kalkulasi tax/pajak khusus.',
          'Membangun sistem operasional & skema kemitraan komersial multi-channel meliputi jaringan reseller hingga program affiliator.',
          'Merancang SOP pelaporan operasional/keuangan berkala serta alur otomatis restock inventaris guna menjaga stabilitas rantai pasok.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Academic & Operations Consultant',
        organization: 'Lingua First',
        sector: 'Lembaga Kursus Bahasa Inggris',
        periodType: 'Collabs 6 Months',
        category: 'operations_retail',
        highlights: [
          'Mengelola operasional akademik dan sinkronisasi 300+ member/siswa aktif dengan jadwal tutor, klasifikasi paket kursus (reguler, private, intensive), dan kuota pertemuan.',
          'Memimpin dan mengoordinasikan 30 orang tim pengajar dan operasional (lead tutor, asisten tutor, dan staf administrasi).',
          'Merancang workflow penjadwalan terintegrasi, administrasi kehadiran, dan sistem monitoring evaluasi progres belajar siswa.',
          'Meningkatkan efisiensi utilisasi ruang kelas dan jadwal tutor, mengeliminasi konflik jadwal, serta menjaga skor kepuasan peserta >95%.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Business Operations Consultant',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Mengembangkan master database terstruktur & katalog produk untuk 50+ SKU varian parfum.',
          'Formulasi pricing strategy terintegrasi: kalkulasi HPP (COGS), profit margin, penetapan bottom price, dan penyesuaian tax multi-platform e-commerce.',
          'Membangun skema operasional & kemitraan komersial multi-channel (reseller, distributor, affiliator).',
          'Standarisasi laporan operasional/keuangan berkala serta kontrol otomatis replenishment stok toko.',
        ],
      },
      {
        id: 'proj-5',
        role: 'Social Media & Project Coordinator',
        organization: 'STIE Wibawa Karta Raharja',
        sector: 'Higher Education',
        periodType: 'Project 1,5 Years',
        category: 'marketing_media',
        highlights: [
          'Mengelola strategi social media dan kampanye digital institusi pendidikan tinggi.',
          'Mendukung administrasi kontrak kemitraan, legal document, dan koordinasi stakeholder terkait.',
          'Mengoordinasikan talent, vendor visual, dan tim teknis untuk berbagai produksi media institusi.',
          'Mengarahkan proses shooting serta produksi video promosi berkala untuk kegiatan kampus.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Multimedia & Website Project',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Boarding School',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Memproduksi company profile video profesional sebagai media promosi dan visual branding institusi.',
          'Mengembangkan website resmi institusi berbasis standar UI/UX modern dan responsif.',
          'Berkoordinasi dengan pengurus yayasan dalam kurasi konten dan arsitektur informasi digital.',
          'Mendukung penguatan digital branding dan media komunikasi santri/wali santri.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Speaker & Event Organizer',
        organization: 'Various Organizations & Communities',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project based',
        category: 'event_public',
        highlights: [
          'Menjadi Master of Ceremony (MC) profesional untuk 50+ wedding events dan agenda formal korporasi/pemerintahan.',
          'Menjadi narasumber/speaker pada 15+ seminar, workshop manajemen, dan kegiatan edukasi generasi muda.',
          'Mengelola pelaksanaan 10+ large-scale events mulai dari timeline, koordinasi vendor, budgeting, hingga eksekusi live event.',
          'Menyusun rundown teknis, flow acara, serta mitigasi risiko untuk menjamin kelancaran event.',
        ],
      },
      {
        id: 'proj-8',
        role: 'Social Media Ads Specialist',
        organization: "Vany's Group",
        sector: 'Retail Fashion',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Mengelola kampanye Meta Ads dan TikTok Ads terarah untuk kebutuhan penetrasi pasar ritel fashion.',
          'Menyusun content calendar kreatif dan advertising strategy berbasis data konversi audiens.',
          'Memproduksi video promosi komersial untuk peluncuran akbar (Grand Opening) Villa di Sumatera Utara.',
          'Melakukan monitoring ROAS dan optimasi performa campaign secara berkala.',
        ],
      },
      {
        id: 'proj-9',
        role: 'Digital Marketing & Consultant',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project based',
        category: 'marketing_media',
        highlights: [
          'Mengembangkan strategi digital marketing dan reposisi branding korporat di ranah online.',
          'Mengelola 2 Meta Ads campaigns dan 3 storefront e-commerce untuk menjangkau pasar B2B & B2C.',
          'Mengoptimalkan funnel akuisisi digital untuk meningkatkan volume permintaan cetak komersial.',
          'Menyusun laporan analitik konversi dan efisiensi biaya akuisisi pelanggan (CAC).',
        ],
      },
      {
        id: 'proj-10',
        role: 'Administrative & Finance Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Mengelola administrasi operasional dan pelaporan keuangan rutin untuk 2.000+ pelanggan aktif.',
          'Melakukan kalkulasi tagihan bulanan, pencatatan kas masuk/keluar, dan rekonsiliasi payroll staf teknis.',
          'Mendokumentasikan arsip administrasi, pembukuan jurnal kas, dan transparansi laporan keuangan.',
          'Menyajikan data laporan periodik sebagai dasar evaluasi operasional dan tata kelola organisasi.',
        ],
      },
      {
        id: 'proj-11',
        role: 'Marketing Communication Manager',
        organization: 'CV Multi Sejahtera',
        sector: 'Retail Gadget & Smartphone',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Memimpin strategi komunikasi pemasaran, promosi terpadu, dan branding multi-cabang untuk jaringan 5 gerai ritel gadget & smartphone.',
          'Merancang dan mengeksekusi kampanye promosi bulanan, aktivasi penjualan toko, materi visual point-of-sale (POS), dan pengelolaan iklan digital multi-cabang.',
          'Melakukan supervisi rutin ke 5 gerai toko untuk audit visual merchandising, standarisasi display promo, dan penyelarasan materi penawaran staf frontliner.',
          'Menganalisis performa penjualan cabang, efektivitas ROI promosi, dan tren permintaan produk gadget sebagai dasar strategi pemasaran berkelanjutan.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Enterprise Resource Planning',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Ekosistem ERP korporasi full-stack multi-modul terintegrasi yang menghubungkan Marketing, Finance & Accounting, HRGA, Operasional, hingga Executive Dashboard untuk C-Level/Owner secara real-time.',
        impact:
          'Meningkatkan efisiensi alur kerja lintas divisi hingga 65%, memangkas redundansi data operasional sebesar 80%, serta mempercepat siklus pelaporan eksekutif dan pengambilan keputusan strategis C-Level hingga 2x lebih cepat.',
        techStack: ['Full-Stack ERP', 'Executive BI Dashboard', 'Cross-Department Sync'],
        features: ['Multi-Module Integration', 'Owner/Executive Portal', 'Cross-Divisional Workflow'],
      },
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Logistics & Operations Management',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Sistem manajemen rantai pasok & logistik komprehensif: kontrol bahan baku, inventaris masuk/keluar, kalkulasi HPP otomatis (FIFO/LIFO/Average), manajemen database supplier, tracking utang-piutang dagang, jadwal produksi, serta monitoring distribusi klien.',
        impact:
          'Menekan selisih stok & kerugian operasional inventaris hingga 70%, mengotomasi 100% kalkulasi HPP akurat, serta memangkas waktu rekonsiliasi utang-piutang dan siklus pelaporan gudang sebesar 60%.',
        techStack: ['Inventory Engine (FIFO/LIFO)', 'Supply Chain & AP/AR', 'Production Scheduling'],
        features: ['Multi-Method HPP Engine', 'Supplier & Debt/Receivable Tracking', 'End-to-End Production & Distribution'],
      },
      {
        id: 'sol-3',
        title: 'MY CAREER',
        subtitle: 'Human Resource Information System',
        category: 'management',
        demoUrl: 'https://hrworkforce.vercel.app',
        isPrototype: true,
        description:
          'Platform SDM end-to-end: sistem seleksi & rekrutmen pelamar, online web test dengan portal hasil interaktif (kandidat & HR), manajemen kontrak kerja, absensi berbasis GPS/Geo-tracking, group chat internal perusahaan, penilaian KPI objektif, dan otomatisasi kalkulasi payroll.',
        impact:
          'Mengotomasi 80% alur seleksi & rekrutmen kandidat, memangkas durasi pemrosesan payroll bulanan sebesar 75%, serta meningkatkan akurasi absensi dan transparansi evaluasi performa karyawan hingga 90%.',
        techStack: ['Applicant Tracking System (ATS)', 'GPS Geo-Attendance', 'Interactive Assessment & Payroll'],
        features: ['Online Candidate Portal & Testing', 'GPS Geo-Fencing Attendance', 'Internal Team Chat & KPI Matrix'],
      },
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'CRM & Marketing Automation',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Platform CRM dan otomasi pemasaran multi-channel terpadu untuk mengelola pipeline prospek B2B, otomatisasi lead follow-up, serta analitik performa iklan digital, evaluasi ROAS/ROI kampanye, dan tracking konversi closing.',
        impact:
          'Meningkatkan closing rate konversi prospek B2B hingga 45%, mempercepat respons follow-up otomatis 3x lebih cepat, serta mengoptimalkan efisiensi alokasi anggaran iklan digital (ROAS) sebesar 35%.',
        techStack: ['CRM Pipeline', 'Ad Performance & ROI Analytics', 'Marketing Automation Engine'],
        features: ['Multi-Channel Campaign Tracking', 'Ad Spend & ROI Analytics', 'Automated Lead Nurturing'],
      },
      {
        id: 'sol-5',
        title: 'VYNANCE & ASET+',
        subtitle: 'Accounting & Asset Management',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Sistem pencatatan akuntansi, jurnal transaksi, arus kas, depresiasi aset, sinkronisasi saldo, dan laporan laba rugi terstruktur.',
        impact:
          'Menyajikan laporan keuangan dan neraca laba-rugi secara real-time, mengeliminasi kesalahan pencatatan jurnal manual hingga 95%, serta mempercepat proses tutup buku bulanan sebesar 50%.',
        techStack: ['Financial Ledger', 'Balance Sync', 'Asset Depreciation Engine'],
        features: ['Transaction Ledger', 'Automated Financial Reports', 'Asset Lifecycle Tracking'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'B2B Corporate Intelligence Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'Direktori intelijen pasar perusahaan untuk memetakan 4.000+ data korporat (PIC HRGA, Purchasing, GM) beserta koordinat pemetaan zonasi kawasan industri strategis.',
        impact:
          'Memetakan 4.000+ korporasi dan 5.200+ kontak pengambil keputusan kunci di berbagai kawasan industri strategis, meningkatkan efisiensi waktu prospeksi B2B hingga 85%.',
        techStack: ['Database Management', 'Geo-Mapping Index', 'Export & Filter Engine'],
        features: ['4000+ Company Profiling', 'Geo-Mapping Kawasan Industri', 'Multi-level Filter'],
      },
    ],
  },
  business_operations: {
    summary:
      'Portofolio konsultasi sistem operasional bisnis, standardisasi SOP multi-unit, arsitektur database rantai pasok, tata kelola alur kerja 30+ proyek, dan efisiensi utilisasi operasional pada sektor ritel, edukasi, dan layanan publik.',
    projects: [
      {
        id: 'proj-1',
        role: 'Operations & Systems Consultant',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Merancang standard operating procedure (SOP) dan alur kerja operasional terintegrasi untuk 30+ proyek pengembangan software dan multimedia.',
          'Menerapkan sistem monitoring bottleneck, alokasi kapasitas resource teknis, dan manajemen risiko jadwal rilis produk.',
          'Mengimplementasikan quality control (QC) berjenjang dan standarisasi dokumentasi serah terima proyek kepada klien korporat.',
          'Mencapai 96%+ on-time milestone delivery dengan efisiensi biaya operasional proyek meningkat 20%.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Lead Business Operations Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Membangun master database inventaris 100+ SKU dan merancang sistem otomasi replenishment stok guna mencegah out-of-stock.',
          'Merumuskan kalkulasi operasional HPP (COGS), margin kontribusi, dan mekanisme kontrol biaya packing serta logistik kurir multi-ekspedisi.',
          'Menyusun SOP operasional pemrosesan order harian e-commerce dan penanganan retur (RMA) terstandarisasi.',
          'Membangun sistem pelaporan operasional berkala yang memangkas waktu rekonsiliasi stok gudang sebesar 60%.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Academic & Operations Director Consultant',
        organization: 'Lingua First',
        sector: 'Lembaga Kursus Bahasa Inggris',
        periodType: 'Collabs 6 Months',
        category: 'operations_retail',
        highlights: [
          'Memimpin tata kelola operasional harian lembaga kursus: sinkronisasi jadwal 300+ siswa dengan ketersediaan ruang kelas dan alokasi tutor.',
          'Mengoordinasikan 30 staf operasional dan pengajar melalui pembagian tugas terstruktur dan evaluasi kepatuhan SOP harian.',
          'Merancang alur administrasi operasional presensi, penjadwalan kelas pengganti (make-up class), dan manajemen fasilitas belajar.',
          'Mengoptimalkan utilisasi ruangan hingga 90% dan mengeliminasi 100% insiden bentrok jadwal tutor.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Retail Operations Consultant',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Merancang sistem manajemen inventaris dan kontrol restock otomatis untuk 50+ SKU parfum multi-kategori.',
          'Menyusun standardisasi alur kerja fulfillment pesanan e-commerce mulai dari picking, packing anti-pecah, hingga serah terima kurir.',
          'Menetapkan SOP audit fisik stok berkala (stock opname) yang menekan selisih stok gudang hingga di bawah 1%.',
          'Mengintegrasikan laporan rekapitulasi penjualan harian dengan data mutasi stok bahan baku.',
        ],
      },
      {
        id: 'proj-10',
        role: 'Operations & Billing Administration Lead',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Mengelola sistem operasional pencatatan meteran dan penagihan terpadu untuk 2.000+ sambungan rumah tangga pelanggan.',
          'Merancang SOP pemeliharaan jaringan distribusi air, pelaporan gangguan pelanggan, dan dispatch teknisi lapangan.',
          'Mengotomasi rekapitulasi data operasional bulanan dan pembukuan penerimaan iuran secara transparan.',
          'Meningkatkan efisiensi penagihan tepat waktu sebesar 35% dan menurunkan tunggakan pelanggan 40%.',
        ],
      },
      {
        id: 'proj-11',
        role: 'Multi-Store Operations & Marketing Coordinator',
        organization: 'CV Multi Sejahtera',
        sector: 'Retail Gadget & Smartphone',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Mengaudit dan menyelaraskan SOP operasional display promosi dan merchandising di 5 toko ritel gadget.',
          'Menyelenggarakan briefing dan pelatihan berkala kepada frontliner terkait eksekusi promo dan pencatatan transaksi di POS.',
          'Memantau kepatuhan standar pelayanan pelanggan (SLA) dan kesiapan stok unit promo di setiap cabang.',
          'Menyusun laporan evaluasi operasional cabang dan produktivitas penjualan mingguan.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Enterprise Resource Planning & Operations',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Sistem operasi terpusat (ERP) multi-divisi untuk mengontrol alur kerja operasional, sinkronisasi antar-departemen, dan pelaporan bottleneck produksi secara real-time.',
        impact:
          'Meningkatkan efisiensi alur kerja operasional lintas divisi hingga 65% dan memangkas hambatan koordinasi antar-cabang sebesar 80%.',
        techStack: ['Workflow Engine', 'Cross-Divisional ERP', 'Operational Dashboard'],
        features: ['Real-Time Workflow Tracking', 'Multi-Branch Sync', 'Bottleneck Alert'],
      },
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Logistics & Operations Management System',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Platform manajemen rantai pasok dan operasional logistik: kontrol stok masuk/keluar, HPP otomatis, penjadwalan produksi, dan dispatch pengiriman multi-kota.',
        impact:
          'Menekan selisih stok inventaris hingga 70%, mengotomasi jadwal produksi, dan memangkas siklus pelaporan gudang sebesar 60%.',
        techStack: ['Supply Chain Automation', 'Inventory Control Engine', 'Production Dispatcher'],
        features: ['Automated Reorder Point', 'Warehouse In/Out Tracking', 'Live Logistics SLA'],
      },
      {
        id: 'sol-3',
        title: 'MY CAREER',
        subtitle: 'Operations & Workforce Administration',
        category: 'management',
        demoUrl: 'https://hrworkforce.vercel.app',
        isPrototype: true,
        description:
          'Sistem operasional SDM untuk absensi GPS multi-cabang, monitoring penugasan kerja harian, dan evaluasi KPI operasional tim lapangan.',
        impact:
          'Memastikan kepatuhan presensi operasional 90%+ dan mengotomasi alur monitoring tugas tim kerja.',
        techStack: ['GPS Geo-Fencing', 'Task Dispatch', 'Shift Scheduling'],
        features: ['Multi-Branch Attendance', 'Daily Task Log', 'Operational KPI Matrix'],
      },
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'Operational CRM & Lead Tracking',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Sistem pengelolaan alur penanganan prospek, otomatisasi follow-up operasional, dan tracking SLA penanganan pelanggan.',
        impact:
          'Mempercepat waktu respons operasional prospek 3x lebih cepat dan mencegah kebocoran pipeline klien.',
        techStack: ['Lead Routing Engine', 'SLA Monitoring', 'CRM Automation'],
        features: ['Automated Lead Assignment', 'SLA Breach Warning', 'Activity History'],
      },
      {
        id: 'sol-5',
        title: 'VYNANCE & ASET+',
        subtitle: 'Operational Asset & Cashflow Tracker',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Sistem pencatatan aset operasional, tracking pemeliharaan barang modal, dan kontrol pengeluaran kas kecil operasional cabang.',
        impact:
          'Meningkatkan akurasi data aset operasional hingga 95% dan mempercepat rekonsiliasi kas operasional harian.',
        techStack: ['Asset Registry', 'Petty Cash Flow', 'Depreciation Calculator'],
        features: ['Asset Tracking', 'Maintenance Schedule', 'Operational Expense Log'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'Corporate Operations Directory Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'Basis data direktori pemetaan 4.000+ profil perusahaan dan zonasi kawasan industri untuk perencanaan rute operasional logistik dan B2B.',
        impact:
          'Memangkas waktu perencanaan rute logistik dan kunjungan operasional hingga 85%.',
        techStack: ['Industrial Zoning Map', 'Logistics Database', 'Filter Matrix'],
        features: ['Industrial Zone Directory', 'Route Optimization', 'Decision Maker Contact'],
      },
    ],
  },
  hr_operations: {
    summary:
      'Portofolio tata kelola sumber daya manusia (SDM), supervisi tim multi-divisi (30+ staf), rekrutmen & seleksi talenta, kurikulum pelatihan kepemimpinan, dan implementasi sistem HRIS untuk efisiensi organisasi.',
    projects: [
      {
        id: 'proj-3',
        role: 'Academic Team & HR Operations Lead',
        organization: 'Lingua First',
        sector: 'Lembaga Kursus Bahasa Inggris',
        periodType: 'Collabs 6 Months',
        category: 'operations_retail',
        highlights: [
          'Memimpin supervisi, penjadwalan, dan pembagian beban kerja untuk 30 orang tim pengajar (lead tutor, assistant tutor) dan staf administrasi.',
          'Menyusun pedoman kerja pengajar, standar etika pengajaran, dan mekanisme evaluasi kinerja (KPI) berkala.',
          'Menyelenggarakan program onboarding tutor baru dan sesi mentoring rutin guna menjaga mutu pengajaran.',
          'Mencapai tingkat retensi tutor 95% dan menyelesaikan keluhan akademik siswa dengan pendekatan humanis.',
        ],
      },
      {
        id: 'proj-1',
        role: 'Talent & Project Operations Lead',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Mengelola rekrutmen talenta lepas (freelance developer, UI/UX designer, video editor) untuk 30+ proyek teknologi.',
          'Menetapkan skema kompensasi berbasis deliverable dan sistem evaluasi performa kerja berbasis milestone.',
          'Membangun budaya kolaborasi tim remote yang solid melalui komunikasi berkala dan standarisasi alur penugasan.',
          'Menjaga kepuasan dan keterlibatan talenta internal hingga menghasilkan delivery proyek berkualitas tinggi.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Talent Coordinator & People Development Speaker',
        organization: 'Various Organizations & Communities',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project based',
        category: 'event_public',
        highlights: [
          'Menjadi pembicara di 15+ seminar bertema kepemimpinan, komunikasi publik, dan pengembangan kapasitas talenta muda.',
          'Mengoordinasikan tim kepanitiaan (50+ volunteer) dalam manajemen event, memastikan sinergi dan motivasi kerja tinggi.',
          'Menyusun modul pembekalan public speaking dan etika profesional untuk pengurus organisasi kemahasiswaan.',
          'Memfasilitasi sesi team building dan resolusi konflik internal dalam kepanitiaan berskala besar.',
        ],
      },
      {
        id: 'proj-10',
        role: 'HR Administration & Payroll Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Mengelola administrasi data kepegawaian, absensi teknisi lapangan, dan kalkulasi payroll staf bulanan.',
          'Menyusun jadwal shift kerja teknisi pemeliharaan dan memastikan ketersediaan personel tanggap darurat 24/7.',
          'Menjadi penengah komunikasi antara pengurus paguyuban dengan pekerja lapangan.',
          'Meningkatkan ketertiban administrasi kepegawaian dan kepatuhan penyaluran hak pekerja 100% tepat waktu.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-3',
        title: 'MY CAREER',
        subtitle: 'Human Resource Information System (HRIS)',
        category: 'management',
        demoUrl: 'https://hrworkforce.vercel.app',
        isPrototype: true,
        description:
          'Platform SDM komprehensif: seleksi & ATS rekrutmen pelamar, online psycho/skill test, kontrak kerja digital, absensi GPS, internal team chat, evaluasi KPI, dan payroll otomatis.',
        impact:
          'Mengotomasi 80% alur rekrutmen kandidat, memangkas proses payroll 75%, dan meningkatkan transparansi KPI karyawan hingga 90%.',
        techStack: ['ATS Recruitment', 'GPS Attendance', 'Payroll & KPI Engine'],
        features: ['Online Candidate Portal', 'Performance Review Matrix', 'Automated Payroll'],
      },
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Enterprise HRGA & Workforce Management',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Modul HRGA pada ERP korporat untuk integrasi struktur organisasi, database karyawan, persetujuan cuti/izin, dan pelaporan produktivitas ke jajaran eksekutif.',
        impact:
          'Memangkas birokrasi perizinan karyawan sebesar 70% dan menyajikan metrik SDM real-time kepada manajemen.',
        techStack: ['HRGA Integration', 'Employee Directory', 'Executive BI'],
        features: ['Leave Approval Flow', 'Organizational Chart Sync', 'Productivity Metrics'],
      },
    ],
  },
  project_management: {
    summary:
      'Portofolio tata kelola siklus proyek (Project Lifecycle Management), pengawalan timeline & deliverables, mitigasi risiko, alokasi anggaran, dan koordinasi multi-stakeholder untuk 30+ proyek digital, konsultasi, dan event.',
    projects: [
      {
        id: 'proj-1',
        role: 'Project Director & Delivery Specialist',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Memimpin project lifecycle management untuk 30+ website/app projects dan 5+ video projects dari scoping, milestone planning, hingga UAT (User Acceptance Testing).',
          'Menerapkan metodologi kerja agile/waterfall sesuai skala proyek dan mengontrol timeline menggunakan Gantt chart & Trello/Notion board.',
          'Mengelola ekspektasi klien korporat, scope change request, serta mitigasi risiko keterlambatan delivery.',
          'Mencapai tingkat kepuasan serah terima proyek (project acceptance rate) 98% tepat waktu.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Lead Event Project Manager',
        organization: 'Various Organizations & Communities',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project based',
        category: 'event_public',
        highlights: [
          'Memimpin end-to-end project management untuk 10+ event skala besar (1.000+ peserta) mulai dari penyusunan RAB, master timeline, hingga hari H.',
          'Mengelola koordinasi lintas divisi (acara, logistik, publikasi, ticketing, keamanan) dan vendor eksternal.',
          'Menyusun risk mitigation plan dan contingency procedure untuk mengantisipasi kendala teknis lapangan.',
          'Memastikan seluruh milestone persiapan event selesai 100% sesuai jadwal dan batasan anggaran.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Project Manager Website & Multimedia',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Boarding School',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Mengelola proyek pembuatan video company profile dan website institusi dengan timeline ketat 1 bulan.',
          'Menyusun storyboard, jadwal shooting, alokasi kru, dan tahapan revisi konten bersama dewan pimpinan pesantren.',
          'Mengawal delivery hasil video dan peluncuran website tepat waktu dengan respon positif dari stakeholder.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Operations Project Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Menginisiasi proyek restrukturisasi sistem data SKU dan sistem pricing e-commerce selesai dalam 2 bulan.',
          'Memetakan milestone implementasi, pelatihan staf admin, dan transisi menuju katalog terstruktur.',
          'Menyerahkan dokumentasi SOP lengkap kepada owner sebagai deliverable akhir proyek.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Project & Operations Management Suite',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Sistem manajemen proyek internal untuk penjadwalan fase produksi, pelacakan milestone pemasangan interior, dokumentasi progres visual, dan SLA serah terima klien.',
        impact:
          'Memastikan 95%+ proyek komersial selesai on-time dan memangkas waktu pelaporan progres kepada klien hingga 60%.',
        techStack: ['Gantt & Timeline Engine', 'Milestone Tracker', 'Visual Documentation'],
        features: ['Phase Scheduling', 'SLA Monitoring', 'Client Delivery Portal'],
      },
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Multi-Project Corporate Control ERP',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Dashboard terpadu untuk monitoring portofolio proyek multi-divisi, realisasi anggaran per proyek, dan performa tim eksekusi.',
        impact:
          'Meningkatkan visibilitas progres proyek C-Level 2x lebih cepat dan mencegah deviasi anggaran proyek.',
        techStack: ['Executive Project BI', 'Budget Tracking', 'Milestone Alert'],
        features: ['Cross-Project Dashboard', 'Budget vs Actual Tracker', 'Resource Allocation'],
      },
    ],
  },
  finance_accounting: {
    summary:
      'Portofolio konsultasi formulasi HPP (COGS), analisis margin keuntungan ritel, pembukuan kas 2.000+ pelanggan, audit anggaran proyek, dan perancangan sistem akuntansi aset.',
    projects: [
      {
        id: 'proj-2',
        role: 'Pricing & Financial Operations Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Melakukan audit dan formulasi kalkulasi HPP (COGS) detail untuk 100+ SKU produk sepatu.',
          'Menetapkan pricing tiering: bottom price, harga reseller/distributor, dan harga jual marketplace dengan mempertimbangkan biaya komisi platform & pajak.',
          'Menghitung titik impas (Break Even Point) dan proyeksi arus kas margin kotor dari berbagai channel penjualan.',
          'Membantu meningkatkan margin profit bersih perusahaan sebesar +12% melalui efisiensi struktur harga.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Costing & Pricing Consultant',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project based',
        category: 'operations_retail',
        highlights: [
          'Menghitung biaya pokok produksi per milliliter parfum dan kemasan botol untuk 50+ varian.',
          'Menyusun skema harga jual e-commerce terintegrasi pajak platform, promo diskon, dan margin reseller.',
          'Merancang format laporan laba-rugi sederhana untuk monitoring performa keuangan bulanan pemilik bisnis.',
        ],
      },
      {
        id: 'proj-10',
        role: 'Finance & Billing Administration Lead',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Mengelola arus kas masuk dan pembukuan penerimaan iuran dari 2.000+ pelanggan setiap bulan.',
          'Menyusun laporan arus kas (cash flow), neraca kas kecil, serta rekapitulasi pengeluaran operasional dan payroll.',
          'Melakukan rekonsiliasi berkala antara catatan meteran dengan saldo kas fisik, menjamin 100% akurasi saldo.',
          'Menyajikan laporan keuangan berkala dalam musyawarah pertanggungjawaban warga secara transparan.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-5',
        title: 'VYNANCE & ASET+',
        subtitle: 'General Ledger, Cashflow & Asset Accounting',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Sistem akuntansi terintegrasi: jurnal transaksi debit/kredit, buku besar, laporan laba rugi, kalkulasi depresiasi aset tetap, dan sinkronisasi saldo kas.',
        impact:
          'Mengeliminasi 95% kesalahan pencatatan manual dan memangkas waktu tutup buku bulanan sebesar 50%.',
        techStack: ['General Ledger Engine', 'Depreciation Model', 'Financial Statement Generator'],
        features: ['Real-Time Balance Sheet', 'Automated P&L', 'Fixed Asset Depreciation'],
      },
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'HPP Engine & Cost Control System',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Modul kalkulasi HPP otomatis (FIFO, LIFO, Average), pelacakan utang-piutang dagang (AP/AR), dan laporan nilai persediaan material secara presisi.',
        impact:
          'Mengotomasi 100% kalkulasi HPP bahan baku interior dan menekan kebocoran biaya persediaan hingga 70%.',
        techStack: ['FIFO/LIFO/Average Engine', 'Accounts Payable/Receivable', 'Inventory Valuation'],
        features: ['Multi-Method COGS', 'Supplier AP Aging', 'Inventory Asset Value'],
      },
    ],
  },
  marketing: {
    summary:
      'Portofolio kampanye pemasaran multi-channel, manajemen iklan berbayar (Meta & TikTok Ads), aktivasi promosi ritel multi-cabang (CV Multi Sejahtera & Jaya Baru), dan produksi konten multimedia berorientasi ROI.',
    projects: [
      {
        id: 'proj-11',
        role: 'Marketing Communication Manager',
        organization: 'CV Multi Sejahtera',
        sector: 'Retail Gadget & Smartphone',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Memimpin strategi komunikasi pemasaran, promosi terpadu, dan branding untuk jaringan 5 gerai ritel gadget.',
          'Merancang kampanye promosi bulanan, aktivasi penjualan toko, materi visual point-of-sale (POS), dan pengelolaan iklan digital multi-cabang.',
          'Melakukan supervisi rutin ke 5 gerai untuk audit visual merchandising dan standarisasi materi penawaran staf frontliner.',
          'Menganalisis performa penjualan cabang, efektivitas ROI promosi, dan tren permintaan produk gadget.',
        ],
      },
      {
        id: 'proj-8',
        role: 'Social Media & Digital Advertising Specialist',
        organization: "Vany's Group",
        sector: 'Retail Fashion & Hospitality',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Mengelola kampanye berbayar Meta Ads & TikTok Ads dengan penargetan audiens yang menghasilkan peningkatan ROAS.',
          'Merancang content calendar kreatif, copywriting penawaran, dan strategi storytelling produk fashion.',
          'Memproduksi video promosi sinematik untuk Grand Opening Vany Villa Balige di Sumatera Utara.',
          'Memonitor conversion funnel iklan digital untuk mengoptimalkan click-through rate (CTR) dan konversi.',
        ],
      },
      {
        id: 'proj-9',
        role: 'Digital Marketing & Branding Consultant',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project based',
        category: 'marketing_media',
        highlights: [
          'Mengembangkan brand positioning dan strategi komunikasi online untuk solusi percetakan digital komersial.',
          'Mengelola kampanye iklan digital di Meta Ads dan optimasi etalase toko di 3 platform e-commerce.',
          'Meningkatkan inbound inquiry B2B sebesar 40% melalui penargetan iklan berbasis industri target.',
        ],
      },
      {
        id: 'proj-5',
        role: 'Social Media & Creative Campaign Lead',
        organization: 'STIE Wibawa Karta Raharja',
        sector: 'Higher Education',
        periodType: 'Project 1,5 Years',
        category: 'marketing_media',
        highlights: [
          'Mengelola konten media sosial institusi untuk meningkatkan engagement calon mahasiswa baru.',
          'Memproduksi video promosi kampus, liputan event akademik, dan konten testimoni mahasiswa berprestasi.',
          'Mendukung peningkatan pendaftaran mahasiswa baru melalui kampanye digital yang konsisten.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'CRM & Marketing Automation Platform',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Platform automasi pemasaran: pelacakan kampanye multi-channel, integrasi analitik performa iklan (ROAS/ROI), dan lead nurturing pipeline otomatis.',
        impact:
          'Meningkatkan closing rate prospek hingga 45% dan meningkatkan efisiensi alokasi anggaran iklan digital (ROAS) sebesar 35%.',
        techStack: ['Marketing Automation', 'Ad Performance Tracker', 'Conversion Analytics'],
        features: ['Multi-Channel Campaign View', 'ROAS Calculator', 'Automated Lead Workflow'],
      },
    ],
  },
  digital_transformation: {
    summary:
      'Portofolio perancangan arsitektur sistem digital, otomasi proses bisnis, pengembangan 30+ website/aplikasi, integrasi AI, dan modernisasi alur kerja perusahaan.',
    projects: [
      {
        id: 'proj-1',
        role: 'Software Architect & AI Consultant',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Merancang dan membangun 30+ website, web apps, dan solusi AI automation sesuai kebutuhan operasional klien.',
          'Mengintegrasikan API modern, database cloud (Firebase/MySQL), dan workflow automation tools.',
          'Membantu klien korporat melakukan migrasi dari pencatatan manual berbasis kertas ke sistem digital berbasis web.',
          'Memberikan training teknis dan manual operasional kepada tim internal klien guna menjamin adopsi sistem 100%.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Web Platform & Multimedia Architect',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Boarding School',
        periodType: 'Project based',
        category: 'digital_tech',
        highlights: [
          'Mengembangkan website resmi institusi dengan portal informasi santri, donasi, dan profil akademik interaktif.',
          'Memproduksi aset visual video promosi beresolusi tinggi yang terintegrasi pada landing page institusi.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Integrated Enterprise Digital Ecosystem',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Arsitektur sistem informasi enterprise full-stack yang mendigitalisasi operasional, keuangan, HR, dan pelaporan C-Level dalam satu platform cloud terpadu.',
        impact:
          'Memangkas redundansi data hingga 80% dan mempercepat proses bisnis perusahaan hingga 2x lebih efisien.',
        techStack: ['Cloud ERP Architecture', 'REST API Integration', 'Real-Time Sync'],
        features: ['Multi-Module Sync', 'Executive Dashboard', 'Paperless Workflow'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'B2B Market Intelligence & Geo-Spatial Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'Platform direktori intelijen berbasis web dengan fitur filter multi-level dan indeks pemetaan geospasial kawasan industri.',
        impact:
          'Mendigitalisasi 4.000+ data korporat dan mempercepat prospeksi pasar sebesar 85%.',
        techStack: ['Geo-Mapping Matrix', 'Database Indexing', 'Fast Query Engine'],
        features: ['Industrial Zoning Index', 'Instant Search & Filter', 'Contact Data Intelligence'],
      },
    ],
  },
};
