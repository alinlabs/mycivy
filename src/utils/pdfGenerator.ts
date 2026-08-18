import { jsPDF } from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
import { cvData } from '../data/cvData';
import { cvDataEn } from '../data/cvDataEn';
import { getTailoredExperiences } from '../data/tailoredExperiences';
import { getTailoredConsulting, getTailoredDigitalSolutions } from '../data/tailoredProjects';
import { getTailoredOrganizations } from '../data/tailoredOrganizations';

// Configure pdfjs worker source
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('Could not set pdfjs workerSrc:', e);
}

export interface PDFSectionsConfig {
  summary?: boolean;
  metrics?: boolean;
  experience?: boolean;
  education?: boolean;
  skills?: boolean;
  certifications?: boolean;
  consulting?: boolean;
  digitalSolutions?: boolean;
  organizations?: boolean;
  achievements?: boolean;
}

export interface PDFItemSelectionConfig {
  summary?: boolean;
  metrics?: Record<number, boolean>;
  experiences?: Record<string, boolean>;
  education?: Record<number, boolean>;
  skills?: {
    hardGroup?: boolean;
    hard?: Record<number, boolean> | boolean;
    softGroup?: boolean;
    soft?: Record<number, boolean> | boolean;
    toolsGroup?: boolean;
    tools?: Record<number, boolean> | boolean;
  };
  certifications?: Record<string, boolean>;
  consultingProjects?: Record<string, boolean>;
  digitalSolutions?: Record<string, boolean>;
  organizations?: Record<number, boolean>;
  achievements?: Record<string, boolean>;
}

export const PRESET_CODES: Record<string, string> = {
  optimal: 'OPT',
  all: 'ALL',
  business_operations: 'OPS',
  project_management: 'PMO',
  business_development: 'BDV',
  digital_transformation: 'DIG',
  hr_operations: 'HRS',
  strategic_management: 'MGT',
  marketing: 'MKT',
  finance_accounting: 'ACC',
  software_development: 'SWE',
  branch_manager: 'BRN',
  office_administration: 'ADM',
  public_relations: 'PRS',
  sales_executive: 'SLS',
  supply_chain_logistics: 'SCM',
};

export const resolvePresetFromQuery = (paramVal: string | null): string | null => {
  if (paramVal === null) return null;
  const val = paramVal.trim().toLowerCase();
  if (!val) return 'optimal';

  for (const [presetKey, code] of Object.entries(PRESET_CODES)) {
    if (code.toLowerCase() === val || presetKey.toLowerCase() === val) {
      return presetKey;
    }
  }

  const normalizedMap: Record<string, string> = {
    opt: 'optimal',
    all: 'all',
    ops: 'business_operations',
    pmo: 'project_management',
    bdv: 'business_development',
    dig: 'digital_transformation',
    hrs: 'hr_operations',
    mgt: 'strategic_management',
    mkt: 'marketing',
    acc: 'finance_accounting',
    swe: 'software_development',
    brn: 'branch_manager',
    adm: 'office_administration',
    prs: 'public_relations',
    sls: 'sales_executive',
    scm: 'supply_chain_logistics',
    'business-operations': 'business_operations',
    operations: 'business_operations',
    'project-management': 'project_management',
    'business-development': 'business_development',
    'digital-transformation': 'digital_transformation',
    'hr-operations': 'hr_operations',
    hr: 'hr_operations',
    'strategic-management': 'strategic_management',
    'finance-accounting': 'finance_accounting',
    finance: 'finance_accounting',
    accounting: 'finance_accounting',
    'software-development': 'software_development',
    software: 'software_development',
    'branch-manager': 'branch_manager',
    'office-administration': 'office_administration',
    admin: 'office_administration',
    administration: 'office_administration',
    'public-relations': 'public_relations',
    pr: 'public_relations',
    'sales-executive': 'sales_executive',
    sales: 'sales_executive',
    'supply-chain-logistics': 'supply_chain_logistics',
    'supply-chain': 'supply_chain_logistics',
    logistics: 'supply_chain_logistics',
  };

  if (normalizedMap[val]) {
    return normalizedMap[val];
  }

  return 'optimal';
};

export const PRESET_HEADLINES: Record<string, { id: string; en: string }> = {
  optimal: {
    id: 'Operations Manager & Strategic Business Professional',
    en: 'Operations Manager & Strategic Business Professional',
  },
  all: {
    id: 'Business Operations & Strategic Management Specialist',
    en: 'Business Operations & Strategic Management Specialist',
  },
  business_operations: {
    id: 'Business Operations Manager & Process Specialist',
    en: 'Business Operations Manager & Process Specialist',
  },
  project_management: {
    id: 'Project Operations Manager & SLA Delivery Lead',
    en: 'Project Operations Manager & SLA Delivery Lead',
  },
  business_development: {
    id: 'Business Development & Key Account Manager',
    en: 'Business Development & Key Account Manager',
  },
  digital_transformation: {
    id: 'Digital Transformation & ERP System Specialist',
    en: 'Digital Transformation & ERP System Specialist',
  },
  hr_operations: {
    id: 'HR Operations & Talent Management Specialist',
    en: 'HR Operations & Talent Management Specialist',
  },
  strategic_management: {
    id: 'Strategic Operations Manager & Governance Lead',
    en: 'Strategic Operations Manager & Governance Lead',
  },
  marketing: {
    id: 'Digital Marketing & Brand Strategy Manager',
    en: 'Digital Marketing & Brand Strategy Manager',
  },
  finance_accounting: {
    id: 'Finance & Accounting Control Specialist',
    en: 'Finance & Accounting Control Specialist',
  },
  software_development: {
    id: 'Software Development & ERP Specialist',
    en: 'Software Development & ERP Specialist',
  },
  branch_manager: {
    id: 'Branch Operations & Multi-Unit Retail Manager',
    en: 'Branch Operations & Multi-Unit Retail Manager',
  },
  office_administration: {
    id: 'Office Administration & Executive Support Lead',
    en: 'Office Administration & Executive Support Lead',
  },
  public_relations: {
    id: 'Public Relations & Corporate Communications Lead',
    en: 'Public Relations & Corporate Communications Lead',
  },
  sales_executive: {
    id: 'Sales Executive & B2B Account Manager',
    en: 'Sales Executive & B2B Account Manager',
  },
  supply_chain_logistics: {
    id: 'Supply Chain & Logistics Operations Specialist',
    en: 'Supply Chain & Logistics Operations Specialist',
  },
};

export const PRESET_SUMMARIES: Record<string, { id: string; en: string }> = {
  optimal: {
    id: 'Versatile Management & Operations Professional dengan rekam jejak kepemimpinan lintas fungsi yang terbukti pada Operasional Bisnis, Manajemen Proyek, Pengembangan B2B (Database 4.000+ korporasi), Manajemen SDM, dan Inovasi Sistem Digital (50+ web/ERP). Terbukti memimpin 6 divisi fungsional, mengelola 100+ proyek dengan On-Time Delivery >95%, mengawasi 13 gerai ritel, dan memelihara 100+ kemitraan korporat dengan skor CSAT 98%. Memiliki fleksibilitas eksekusi yang tinggi dan terbuka untuk posisi kepemimpinan, operasional, maupun manajerial strategis.',
    en: 'Versatile Management & Operations Professional with a proven cross-functional leadership track record across Business Operations, Project Lead, B2B Development (4,000+ corporate database), HR Management, and Digital Systems Innovation (50+ web/ERP apps). Proven execution leading 6 functional divisions, managing 100+ projects with >95% On-Time Delivery, supervising 13 retail store outlets, and maintaining 100+ corporate partnerships with 98% CSAT. Highly adaptable and open for key leadership, operational, and strategic management opportunities.',
  },
  all: {
    id: 'Versatile Management Professional & Certified HR Specialist (Grade A, MarkPlus Institute) dengan rekam jejak kepemimpinan lintas fungsi dalam Operasional Bisnis, Akuntansi & Keuangan, Manajemen SDM, Lead Database B2B (4.000+ perusahaan), Manajemen 13 Cabang Toko Ritel (8 Cabang Jaya Baru & 5 Cabang Multi Sejahtera), Layanan BPSPAMS (2.000+ pelanggan), serta pengembangan 50+ proyek solusi digital & web app (lintas industri, personal, hingga pemerintahan). Berpengalaman mengelola end-to-end 100+ proyek, memimpin 6 divisi, dan memelihara 100+ kemitraan klien korporat dengan tingkat kepuasan 98%.',
    en: 'Versatile Management Professional & Certified HR Specialist (Grade A, MarkPlus Institute) with a proven cross-functional leadership track record across Business Operations, Accounting & Finance, HR Management, B2B Lead Database (4,000+ corporate contacts), 13 Retail Store Outlets (8 Jaya Baru Outlets & 5 Multi Sejahtera Outlets), BPSPAMS Water Utility Services (2,000+ active customers), and development of 50+ digital solutions & web application projects (spanning diverse commercial industries, personal initiatives, to government systems). Experienced in managing 100+ end-to-end projects, leading 6 working divisions, and maintaining 100+ corporate client partnerships with a 98% client satisfaction rate (CSAT).',
  },
  business_operations: {
    id: 'Operations Manager berpengalaman memimpin koordinasi operasional 6 divisi fungsional (Admin, Marketing, Desain, Produksi, Logistik, Accounting) untuk 100+ proyek komersial dan residensial. Terbukti mengembangkan 20+ SOP & workflow terstandarisasi yang memangkas kendala operasional 70%, mencapai On-Time Delivery >95% dengan CSAT 98%, serta mengawasi operasional 13 gerai toko ritel dan layanan utilitas air BPSPAMS (2.000+ pelanggan).',
    en: 'Operations Manager experienced in leading integrated operations across 6 functional divisions (Admin, Marketing, Design, Production, Logistics, Accounting) for 100+ commercial and residential projects. Proven track record developing 20+ standardized SOPs cutting operational bottlenecks by 70%, achieving >95% On-Time Delivery with 98% CSAT, and supervising operations for 13 retail store outlets and BPSPAMS water utility (2,000+ customers).',
  },
  project_management: {
    id: 'Project Management Specialist dengan rekam jejak sukses memimpin eksekusi 100+ proyek komersial dan residensial end-to-end, mengoordinasikan alur kerja 6 divisi fungsional, dan mencapai tingkat penyelesaian tepat waktu (On-Time Delivery) >95% dengan CSAT 98%. Arsitek sistem manajemen proyek web Logistor App yang memangkas kendala operasional sebesar 70% dan mempercepat siklus pelaporan 60%. Terampil dalam manajemen risiko, alokasi sumber daya, dan mitigasi bottleneck.',
    en: 'Project Management Specialist with a proven track record leading end-to-end execution of 100+ commercial and residential projects, coordinating workflows across 6 functional divisions, and achieving >95% On-Time Delivery with 98% CSAT. Architect of the Logistor App project management system, cutting operational bottlenecks by 70% and accelerating reporting cycles by 60%. Skilled in risk management, resource allocation, and bottleneck mitigation.',
  },
  business_development: {
    id: 'Business Development & Key Account Manager berpengalaman mengelola portofolio 100+ klien korporat aktif di kawasan industri strategis (Cikarang, Bekasi, Karawang, Purwakarta). Membangun database intelijen pasar 4.000+ perusahaan (5.200+ kontak PIC HRGA, Purchasing, GM) dan merancang CRM NextMark. Terpilih sebagai Regional Solution Pitcher Konica Minolta mewakili kantor cabang wilayah (Bekasi, Cikarang, Karawang, Purwakarta) serta konsisten mempertahankan 10+ akun korporat utama/bulan.',
    en: 'Business Development & Key Account Manager experienced in managing a portfolio of 100+ active corporate clients across strategic industrial zones (Cikarang, Bekasi, Karawang, Purwakarta). Built a 4,000+ corporate intelligence database (5,200+ key decision-maker contacts) and developed NextMark CRM. Selected as Konica Minolta Regional Solution Pitcher representing the branch office covering Bekasi, Cikarang, Karawang, and Purwakarta, consistently retaining 10+ major corporate accounts/month.',
  },
  digital_transformation: {
    id: 'Digital Transformation & Process Improvement Specialist dengan keahlian mentransformasi proses bisnis manual menjadi sistem terotomasi berbasis web & AI. Sukses merancang dan mengimplementasikan ERP Logistor, CRM NextMark, HRIS My Career, serta Vynance Accounting yang memangkas kendala operasional 70%, mempercepat proses tutup buku & pelaporan 60%, serta mengoptimasi alur kerja 6 divisi fungsional.',
    en: 'Digital Transformation & Process Improvement Specialist adept in transforming legacy manual workflows into high-efficiency automated web & AI-powered systems. Architected and deployed Logistor ERP, NextMark CRM, My Career HRIS, and Vynance Accounting, slashing operational bottlenecks by 70%, accelerating financial close & reporting by 60%, and streamlining workflows across 6 functional divisions.',
  },
  hr_operations: {
    id: 'Certified Human Resources Professional (Grade A, MarkPlus Institute) & People Development Specialist berpengalaman dalam rekrutmen & talent acquisition, penyusunan SOP kepegawaian, perancangan kurikulum pelatihan, serta kaderisasi & pembinaan 400+ talenta muda. Terampil menyusun matriks KPI/OKR, mengoordinasikan 300+ member dan tim pengajar di Lingua First, serta mengotomasi sistem HRIS & ATS melalui platform web My Career.',
    en: 'Certified Human Resources Professional (Grade A, MarkPlus Institute) & People Development Specialist experienced in talent acquisition, HR SOP design, training curriculum development, and mentoring 400+ student cadres. Skilled in building KPI/OKR appraisal frameworks, coordinating 300+ members and educator teams at Lingua First, and automating HRIS & ATS pipelines via the custom My Career web platform.',
  },
  strategic_management: {
    id: 'Strategic Management Specialist & Presiden Mahasiswa STIE Wikara dengan rekam jejak kepemimpinan eksekutif mengelola 6 divisi operasional komersial, 8 kementerian BEM (30 fungsionaris kabinet), 13 gerai toko ritel, dan 100+ kemitraan korporat. Terampil dalam perencanaan bisnis strategis, penjaminan mutu SLA, mitigasi risiko operasional, kontrol efisiensi anggaran, dan tata kelola organisasi skala makro dengan CSAT 98%.',
    en: 'Strategic Management Specialist & Student Body President at STIE Wikara with a proven executive leadership record managing 6 commercial operational divisions, 8 student government ministries (30 cabinet officers), 13 retail store outlets, and 100+ corporate partnerships. Adept in strategic business planning, SLA quality assurance, operational risk mitigation, budget efficiency control, and macro organizational governance with 98% CSAT.',
  },
  marketing: {
    id: 'Marketing & Digital Growth Specialist berpengalaman memimpin strategi promosi terpadu untuk 13 cabang toko ritel (8 Jaya Baru & 5 Multi Sejahtera), mengelola kampanye iklan Performance Marketing (Meta Ads, Google Ads, TikTok Ads), serta menjalin kemitraan dengan 10+ brand principal. Sukses membangun database prospek 4.000+ korporat, memproduksi 60+ konten kreatif video, dan mengoptimalkan ROI promosi multi-cabang.',
    en: 'Marketing & Digital Growth Specialist experienced in leading integrated promotional strategies for 13 retail branches (8 Jaya Baru & 5 Multi Sejahtera), executing multi-channel Performance Ads (Meta, Google, TikTok Ads), and securing partnerships with 10+ principal brands. Successfully built a 4,000+ corporate prospect database, produced 60+ creative video assets, and optimized promotional ROI across retail stores.',
  },
  finance_accounting: {
    id: 'Finance & Accounting Operations Specialist berlatar belakang SMK Akuntansi & S1 Manajemen dengan keahlian pembukuan keuangan end-to-end (jurnal, buku besar, arus kas, laba rugi), penetapan HPP multi-metode akurat (FIFO/LIFO/Average), dan margin analysis. Berpengalaman mengelola keuangan operasional 2.000+ pelanggan BPSPAMS serta 13 gerai ritel, terbukti menjaga akurasi laporan 99.8%, mengeliminasi kesalahan manual 95%, dan mempercepat tutup buku 50%.',
    en: 'Finance & Accounting Operations Specialist with a background in Vocational Accounting & Bachelor of Management, adept in end-to-end financial ledgers (journals, general ledger, cash flow, P&L), accurate multi-method COGS calculations (FIFO/LIFO/Average), and margin analysis. Managed financial operations for 2,000+ BPSPAMS water utility customers and 13 retail branches, maintaining 99.8% reporting accuracy and accelerating month-end close by 50%.',
  },
  software_development: {
    id: 'Software & Web Development Specialist dengan rekam jejak mengembangkan 50+ aplikasi web kustom untuk aneka industri komersial, personal project, hingga sistem pemerintahan. Arsitek ekosistem ERP Global Mitra Gateway, sistem manajemen proyek Logistor App, CRM NextMark, HRIS My Career, serta Vynance Accounting. Menguasai React, Laravel, Node.js, MySQL, Cloudflare, API Integration, dan visual analytics Looker Studio.',
    en: 'Software & Web Development Specialist with a proven track record developing 50+ custom web applications across diverse commercial industries, personal initiatives, and government systems. Architect of the Global Mitra Gateway ERP ecosystem, Logistor project management system, NextMark CRM, My Career HRIS, and Vynance Accounting. Proficient in React, Laravel, Node.js, MySQL, Cloudflare, API Integration, and Looker Studio BI dashboards.',
  },
  branch_manager: {
    id: 'Branch Manager berpengalaman mengawasi operasional 13 gerai toko ritel (8 Jaya Baru & 5 Multi Sejahtera) dan layanan utilitas air BPSPAMS (2.000+ pelanggan). Terbukti memimpin tim lintas divisi, mengoptimalkan pencapaian target penjualan, efisiensi persediaan kasir/POS, serta mempertahankan standar kepuasan pelanggan (CSAT 98%).',
    en: 'Branch Manager experienced in supervising operations across 13 retail store outlets (8 Jaya Baru & 5 Multi Sejahtera) and BPSPAMS water utility services (2,000+ active customers). Proven track record leading multi-division teams, driving sales target achievement, optimizing cashier/POS inventory efficiency, and maintaining 98% CSAT.',
  },
  office_administration: {
    id: 'Office Administration & Executive Support Specialist dengan pengalaman mengelola dokumentasi perkantoran, rekonsiliasi kas, penyusunan SOP administratif, serta koordinasi operasional 6 divisi dan 30+ fungsionaris organisasi. Terampil menguasai sistem Microsoft Office, Google Workspace, serta otomatisasi arsip & database digital.',
    en: 'Office Administration & Executive Support Specialist with hands-on experience managing office documentation, cash reconciliations, administrative SOPs, and operational coordination across 6 divisions and 30+ organization officers. Proficient in Microsoft Office, Google Workspace, and digital archiving/database automation.',
  },
  public_relations: {
    id: 'Public Relations & Corporate Communications Specialist berlatar belakang Presiden Mahasiswa STIE Wikara & Pimpinan Humas. Berpengalaman memimpin komunikasi publik, kemitraan eksternal dengan 100+ instansi/korporasi, penyelenggaraan 15+ seminar & event skala regional/nasional, serta strategi media relations & branding.',
    en: 'Public Relations & Corporate Communications Specialist with executive background as STIE Wikara Student President & PR Lead. Experienced in leading public communications, external partnerships with 100+ institutions/corporates, organizing 15+ regional/national events, and executing media relations & branding.',
  },
  sales_executive: {
    id: 'Sales Executive & B2B Account Specialist berpengalaman membangun database prospek B2B 4.000+ perusahaan (5.200+ kontak Decision Maker) di kawasan industri strategis. Terpilih sebagai Regional Solution Pitcher Konica Minolta mewakili kantor cabang wilayah (Bekasi, Cikarang, Karawang, Purwakarta), terbukti mengoptimalkan penetrasi pasar dan mempertahankan 10+ akun korporat utama/bulan.',
    en: 'Sales Executive & B2B Account Specialist adept in building a 4,000+ corporate B2B prospect database (5,200+ key Decision Makers) across strategic industrial hubs. Selected as Konica Minolta Regional Solution Pitcher representing the branch office covering Bekasi, Cikarang, Karawang, and Purwakarta, consistently driving market penetration and retaining 10+ major corporate accounts/month.',
  },
  supply_chain_logistics: {
    id: 'Supply Chain & Logistics Operations Specialist berpengalaman mengelola alur distribusi barang di 13 gerai toko ritel, kontrol persediaan stok, serta eksekusi SLA pengiriman >95% untuk 100+ proyek komersial. Arsitek sistem manajemen logistik Logistor App yang memangkas kendala operasional 70% dan meningkatkan efisiensi rantai pasok.',
    en: 'Supply Chain & Logistics Operations Specialist experienced in managing distribution flows across 13 retail store outlets, inventory control, and executing >95% SLA delivery for 100+ commercial projects. Architect of the Logistor App logistics platform, cutting operational bottlenecks by 70% and enhancing supply chain efficiency.',
  },
};

export interface PDFStyleOptions {
  marginMm?: number;
  fontSizeScale?: number; // 1.0 = standard, 0.92 = compact, 1.08 = large
  accentColor?: [number, number, number]; // RGB
  boldWeight?: 'refined' | 'bold' | 'minimal';
  headerStyle?: 'solid-banner' | 'navy-solid' | 'navy-double' | 'minimal-thin' | 'plain' | 'badge';
  language?: 'id' | 'en';
  headline?: string;
  preset?: string;
  summaryText?: string;
  sections?: PDFSectionsConfig;
  items?: PDFItemSelectionConfig;
  sectionOrders?: {
    metrics?: number[];
    experiences?: string[];
    education?: number[];
    skills?: string[];
    skills_hard?: number[];
    skills_soft?: number[];
    skills_tools?: number[];
    certifications?: string[];
    consultingProjects?: string[];
    digitalSolutions?: string[];
    organizations?: number[];
    achievements?: string[];
  };
}

/**
 * Builds an executive, ATS-compliant jsPDF document with mathematical optical margins,
 * true hanging indents for all bullet points, perfectly calibrated vertical rhythm (spacing above & below headers),
 * orphan prevention, and multi-page pagination in Indonesian or English.
 */
export const buildATSPDFDocument = (
  languageOrOptions?: 'id' | 'en' | (PDFStyleOptions & { language?: 'id' | 'en' }),
  optionsArg?: PDFStyleOptions
): { doc: jsPDF; filename: string; totalPages: number } => {
  let lang: 'id' | 'en' = 'id';
  let options: PDFStyleOptions | undefined = optionsArg;

  if (typeof languageOrOptions === 'string') {
    lang = languageOrOptions;
  } else if (typeof languageOrOptions === 'object' && languageOrOptions !== null) {
    if (!('nativeEvent' in languageOrOptions)) {
      options = languageOrOptions as PDFStyleOptions;
      if (options.language === 'en' || options.language === 'id') {
        lang = options.language;
      }
    }
  }

  const cv = lang === 'en' ? cvDataEn : cvData;

  const margin = options?.marginMm ?? 15;
  const scale = options?.fontSizeScale ?? 1.0;

  // Palette: Dark Navy & Charcoal (No bright blue, consistent deep navy)
  const primaryNavy: [number, number, number] = [15, 23, 42]; // #0F172A - Deep Solid Navy / Header Banner
  const darkNavyAccent: [number, number, number] = [15, 23, 42]; // #0F172A - Subheadings and bullet symbols
  const darkSlate: [number, number, number] = [30, 41, 59]; // #1E293B - High-Contrast Black/Slate for Bold text
  const bodySlate: [number, number, number] = [51, 65, 85]; // #334155 - Smooth Charcoal Body for Regular text
  const mutedSlate: [number, number, number] = [100, 116, 139]; // #64748B - Muted Subtitles & Dates
  const ruleGray: [number, number, number] = [203, 213, 225]; // #CBD5E1 - Light Dividers

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;
  let pageCount = 1;

  // Helper for clean page break with top margin preservation
  const checkPageBreak = (neededHeight: number): boolean => {
    // allow content to reach up to 2mm before the margin (which is 3mm before the footer line)
    if (currentY + neededHeight > pageHeight - margin - 2) {
      doc.addPage();
      pageCount++;
      currentY = margin + 4; // Top margin on subsequent pages
      return true;
    }
    return false;
  };

  /**
   * Helper to print professional hanging indent bullet points.
   * Ensures the bullet sits cleanly on the left, and subsequent lines of text
   * align strictly with the first word of the text (NOT under the bullet).
   */
  const addHangingBullet = (
    text: string,
    opts?: {
      bulletChar?: string;
      bulletOffset?: number;
      textOffset?: number;
      lineHeight?: number;
      gapAfter?: number;
      fontStyle?: 'normal' | 'bold' | 'italic';
      textColor?: [number, number, number];
      bulletColor?: [number, number, number];
    }
  ) => {
    const bulletChar = opts?.bulletChar ?? '•';
    const bulletOffset = opts?.bulletOffset ?? 1.2;
    const textOffset = opts?.textOffset ?? 5.2;
    const lineHeight = opts?.lineHeight ?? 3.7 * scale;
    const gapAfter = opts?.gapAfter ?? 1.2 * scale;
    const fontStyle = opts?.fontStyle ?? 'normal';
    const textColor = opts?.textColor ?? bodySlate;
    const bulletColor = opts?.bulletColor ?? primaryNavy;

    const bulletX = margin + bulletOffset;
    const textX = margin + textOffset;
    const textWidth = contentWidth - textOffset;

    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(8.4 * scale);
    const splitText = doc.splitTextToSize(text, textWidth);

    checkPageBreak(splitText.length * lineHeight + gapAfter);

    // Draw bullet symbol
    doc.setTextColor(...bulletColor);
    doc.setFont('helvetica', 'bold');
    doc.text(bulletChar, bulletX, currentY);

    // Draw multi-line text
    doc.setFont('helvetica', fontStyle);
    doc.setTextColor(...textColor);
    doc.text(splitText, textX, currentY);

    currentY += splitText.length * lineHeight + gapAfter;
  };

  /**
   * Helper to render a bullet point where the prefix before the colon is Bold
   * and the following text is Regular, with strict hanging indent wrapping.
   */
  const addBoldPrefixHangingBullet = (
    boldPrefix: string,
    bodyText: string,
    opts?: {
      bulletChar?: string;
      bulletOffset?: number;
      textOffset?: number;
      lineHeight?: number;
      gapAfter?: number;
      fontSize?: number;
      prefixColor?: [number, number, number];
      bodyColor?: [number, number, number];
      bulletColor?: [number, number, number];
    }
  ) => {
    const bulletChar = opts?.bulletChar ?? '•';
    const bulletOffset = opts?.bulletOffset ?? 1.2;
    const textOffset = opts?.textOffset ?? (bulletChar ? 5.2 : 0);
    const lineHeight = opts?.lineHeight ?? 3.5 * scale;
    const gapAfter = opts?.gapAfter ?? 1.0 * scale;
    const fontSize = opts?.fontSize ?? 8.3 * scale;
    const prefixColor = opts?.prefixColor ?? primaryNavy;
    const bodyColor = opts?.bodyColor ?? bodySlate;
    const bulletColor = opts?.bulletColor ?? primaryNavy;

    const bulletX = margin + bulletOffset;
    const textX = margin + textOffset;
    const textWidth = contentWidth - textOffset;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSize);
    const formattedPrefix = boldPrefix.trim().endsWith(':') ? boldPrefix.trim() : boldPrefix.trim() + ':';
    const prefixWithSpace = formattedPrefix + ' ';
    const prefixWidth = doc.getTextWidth(prefixWithSpace);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);

    const words = bodyText.trim().split(/\s+/);
    const firstLineWords: string[] = [];
    let remainingWords: string[] = [];
    const firstLineAvailable = textWidth - prefixWidth;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testText = firstLineWords.length === 0 ? word : firstLineWords.join(' ') + ' ' + word;
      if (doc.getTextWidth(testText) <= firstLineAvailable) {
        firstLineWords.push(word);
      } else {
        remainingWords = words.slice(i);
        break;
      }
    }

    const firstLineNormalText = firstLineWords.join(' ');
    const remainingText = remainingWords.join(' ');
    const remainingLines = remainingText ? doc.splitTextToSize(remainingText, textWidth) : [];
    const totalLines = 1 + remainingLines.length;

    checkPageBreak(totalLines * lineHeight + gapAfter);

    // Draw bullet symbol if present
    if (bulletChar) {
      doc.setTextColor(...bulletColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSize);
      doc.text(bulletChar, bulletX, currentY);
    }

    // Draw bold prefix on first line
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...prefixColor);
    doc.text(prefixWithSpace, textX, currentY);

    // Draw normal text on first line
    if (firstLineNormalText) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...bodyColor);
      doc.text(firstLineNormalText, textX + prefixWidth, currentY);
    }

    // Draw subsequent lines with hanging indent
    if (remainingLines.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...bodyColor);
      for (let j = 0; j < remainingLines.length; j++) {
        doc.text(remainingLines[j], textX, currentY + (j + 1) * lineHeight);
      }
    }

    currentY += totalLines * lineHeight + gapAfter;
  };

  /**
   * Helper to render an array of string items across a 4-column grid with bullets.
   */
  const addFourColumnBullets = (
    items: string[],
    opts?: {
      lineHeight?: number;
      gapAfter?: number;
      fontSize?: number;
      textColor?: [number, number, number];
      bulletColor?: [number, number, number];
    }
  ) => {
    const lineHeight = opts?.lineHeight ?? 3.3 * scale;
    const gapAfter = opts?.gapAfter ?? 1.2 * scale;
    const fontSize = opts?.fontSize ?? 7.8 * scale;
    const textColor = opts?.textColor ?? bodySlate;
    const bulletColor = opts?.bulletColor ?? primaryNavy;

    const numCols = 4;
    const colWidth = contentWidth / numCols;
    const bulletSymbol = '•';

    const totalRows = Math.ceil(items.length / numCols);

    for (let r = 0; r < totalRows; r++) {
      let maxLinesInRow = 1;
      const rowItems: { col: number; text: string; lines: string[]; x: number }[] = [];

      for (let c = 0; c < numCols; c++) {
        const idx = r * numCols + c;
        if (idx < items.length) {
          const text = items[idx];
          const cellX = margin + c * colWidth;
          const maxTextWidth = colWidth - 3.8 * scale;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(fontSize);
          const lines = doc.splitTextToSize(text, maxTextWidth);
          maxLinesInRow = Math.max(maxLinesInRow, lines.length);

          rowItems.push({
            col: c,
            text,
            lines,
            x: cellX,
          });
        }
      }

      const rowHeight = maxLinesInRow * lineHeight;
      checkPageBreak(rowHeight + 0.5 * scale);

      rowItems.forEach((cell) => {
        // Bullet
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSize);
        doc.setTextColor(...bulletColor);
        doc.text(bulletSymbol, cell.x, currentY);

        // Lines
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(...textColor);
        cell.lines.forEach((lineText, lineIdx) => {
          doc.text(lineText, cell.x + 2.8 * scale, currentY + lineIdx * lineHeight);
        });
      });

      currentY += rowHeight + 0.6 * scale;
    }

    currentY += gapAfter;
  };

  const headerStyle = options?.headerStyle ?? 'solid-banner';

  // --- SECTION HEADER HELPER (PRECISE VERTICAL RHYTHM: COMPACT & BALANCED) ---
  const addSectionHeader = (title: string, isFirstSection = false, minFirstItemHeight = 22.0 * scale) => {
    // Balanced gap before new sections (depends on header style)
    let gapBefore = isFirstSection ? 2.0 * scale : 2.5 * scale;
    if (!isFirstSection && headerStyle !== 'solid-banner' && headerStyle !== 'badge') {
      gapBefore = 6.0 * scale; // Extra breathing room for line modes since they don't have a banner box
    }
    const bannerHeight = 5.2 * scale;
    // Check page break for section header PLUS first item height to prevent orphan headers
    checkPageBreak(bannerHeight + minFirstItemHeight + gapBefore);
    currentY += gapBefore;

    if (headerStyle === 'solid-banner') {
      // Solid Navy Filled Box (100% Vector Rectangle)
      doc.setFillColor(...primaryNavy);
      doc.rect(margin, currentY, contentWidth, bannerHeight, 'F');

      // Crisp White High-Contrast ATS Text inside banner
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.0 * scale);
      doc.setTextColor(255, 255, 255);
      doc.text(title.toUpperCase(), margin + 2.4, currentY + bannerHeight - 1.6 * scale);

      // Comfortable vertical space from bottom of banner to top of first line text
      currentY += bannerHeight + 4.6 * scale;
    } else if (headerStyle === 'badge') {
      // Badge (Block around text only)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.0 * scale);
      
      const titleUpper = title.toUpperCase();
      const textWidth = doc.getTextWidth(titleUpper);
      const badgeWidth = textWidth + 4.8 * scale; // padding left/right
      const badgeHeight = 5.2 * scale;
      
      doc.setFillColor(...primaryNavy);
      doc.rect(margin, currentY, badgeWidth, badgeHeight, 'F');

      doc.setTextColor(255, 255, 255);
      doc.text(titleUpper, margin + 2.4 * scale, currentY + badgeHeight - 1.6 * scale);

      currentY += badgeHeight + 4.6 * scale;
    } else if (headerStyle === 'plain') {
      // Just bold text, no lines, no backgrounds
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.0 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(title.toUpperCase(), margin, currentY);
      currentY += 3.6 * scale; // standard bottom gap
    } else if (headerStyle === 'navy-double') {
      // Section Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.0 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(title.toUpperCase(), margin, currentY);
      currentY += 1.8 * scale;

      doc.setDrawColor(...primaryNavy);
      doc.setLineWidth(0.4);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      doc.line(margin, currentY + 0.8, pageWidth - margin, currentY + 0.8);
      currentY += 3.6 * scale;
    } else if (headerStyle === 'minimal-thin') {
      // Section Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.0 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(title.toUpperCase(), margin, currentY);
      currentY += 1.8 * scale;

      doc.setDrawColor(...ruleGray);
      doc.setLineWidth(0.35);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 3.6 * scale;
    } else {
      // Section Title with Minimalist Soft Underline
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.0 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(title.toUpperCase(), margin, currentY);
      currentY += 1.8 * scale;

      doc.setDrawColor(148, 163, 184); // Soft slate gray
      doc.setLineWidth(0.2); // Thin, clean line
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 3.6 * scale;
    }
  };

  // ==========================================
  // 1. TOP HEADER (EXECUTIVE TYPOGRAPHY & ATS COMPLIANT)
  // ==========================================
  const centerX = pageWidth / 2;

  // Full Name (BOLD SOLID NAVY)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18.0 * scale);
  doc.setTextColor(...primaryNavy);
  doc.text(cv.personalInfo.fullName.toUpperCase(), centerX, currentY, { align: 'center' });
  currentY += 4.5 * scale;

  // Professional Headline (BOLD DARK SLATE)
  const activeHeadline =
    options?.headline ||
    (options?.preset && PRESET_HEADLINES[options.preset]?.[lang]) ||
    cv.personalInfo.headline;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8 * scale);
  doc.setTextColor(...darkSlate);

  const maxHeadlineWidth = pageWidth - 2 * margin;
  const headlineLines = doc.splitTextToSize(activeHeadline, maxHeadlineWidth);
  headlineLines.forEach((line: string) => {
    doc.text(line, centerX, currentY, { align: 'center' });
    currentY += 4.5 * scale;
  });
  currentY += 1.0 * scale;

  // Contact Info Row (Clickable Links & Centered)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2 * scale);
  
  const contactItems = [
    { text: cv.personalInfo.phone, url: `https://wa.me/${cv.personalInfo.phone.replace(/\D/g, '')}` },
    { text: cv.personalInfo.email, url: `mailto:${cv.personalInfo.email}` },
    { text: cv.personalInfo.linkedin, url: `https://${cv.personalInfo.linkedin.replace(/^https?:\/\//, '')}` },
    { text: cv.personalInfo.website, url: `https://${cv.personalInfo.website.replace(/^https?:\/\//, '')}` }
  ].filter(item => item.text);

  const separator = "   |   ";
  
  // Calculate total width of the line to center it
  let totalWidth = 0;
  contactItems.forEach((item, index) => {
    totalWidth += doc.getTextWidth(item.text);
    if (index < contactItems.length - 1) {
      totalWidth += doc.getTextWidth(separator);
    }
  });

  let startX = centerX - (totalWidth / 2);

  // Render each piece
  contactItems.forEach((item, index) => {
    const textWidth = doc.getTextWidth(item.text);
    doc.setTextColor(...mutedSlate); // keep the same sleek color
    
    if (item.url) {
      doc.textWithLink(item.text, startX, currentY, { url: item.url });
    } else {
      doc.text(item.text, startX, currentY);
    }
    startX += textWidth;

    if (index < contactItems.length - 1) {
      doc.text(separator, startX, currentY);
      startX += doc.getTextWidth(separator);
    }
  });

  currentY += (3.6 * scale) + (1.5 * scale);

  const sec = options?.sections;
  const itm = options?.items;

  // ==========================================
  // 2. RINGKASAN PROFESIONAL (PROFESSIONAL SUMMARY)
  // ==========================================
  const isSummaryActive = itm ? itm.summary === true : sec?.summary !== false;
  if (isSummaryActive) {
    addSectionHeader(lang === 'en' ? 'Professional Summary' : 'Ringkasan', true);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5 * scale);
    doc.setTextColor(...bodySlate);
    const activeSummary =
      options?.summaryText ||
      (options?.preset && PRESET_SUMMARIES[options.preset]?.[lang]) ||
      cv.personalInfo.summary;
    const summaryLines = doc.splitTextToSize(activeSummary, contentWidth);
    doc.text(summaryLines, margin, currentY);
    currentY += (summaryLines.length - 1) * (3.8 * scale) + (3.6 * scale);
  }

  // ==========================================
  // 3. SOROTAN KINERJA & METRIK KUNCI (KEY METRICS)
  // ==========================================
  const allMetricItems = cv.metrics.map((m, idx) => ({
    idx,
    prefix: `${m.value} ${m.label}`,
    body: m.sublabel,
  }));

  let activeMetrics = itm?.metrics
    ? allMetricItems.filter((m) => itm.metrics?.[m.idx])
    : sec?.metrics !== false ? allMetricItems : [];

  if (options?.sectionOrders?.metrics) {
    const order = options.sectionOrders.metrics;
    activeMetrics = [...activeMetrics].sort((a, b) => {
      const idxA = order.indexOf(a.idx);
      const idxB = order.indexOf(b.idx);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeMetrics.length > 0) {
    addSectionHeader(lang === 'en' ? 'Key Metrics & Performance Highlights' : 'Sorotan Kinerja & Metrik Kunci');
    activeMetrics.forEach((m) => {
      addBoldPrefixHangingBullet(m.prefix, m.body, {
        bulletChar: '•',
        gapAfter: 1.1 * scale,
        lineHeight: 3.6 * scale,
        fontSize: 8.3 * scale,
        prefixColor: primaryNavy,
        bodyColor: bodySlate,
      });
    });
  }

  // ==========================================
  // 4. PENGALAMAN KERJA (WORK EXPERIENCE)
  // ==========================================
  const sourceExperiences = getTailoredExperiences(options?.preset, lang);
  let activeExperiences = itm?.experiences
    ? sourceExperiences.filter((exp) => itm.experiences?.[exp.id])
    : sec?.experience !== false ? sourceExperiences : [];

  if (options?.sectionOrders?.experiences) {
    const order = options.sectionOrders.experiences;
    activeExperiences = [...activeExperiences].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeExperiences.length > 0) {
    addSectionHeader(lang === 'en' ? 'Work Experience' : 'Pengalaman');

    activeExperiences.forEach((exp, expIdx) => {
      checkPageBreak(12 * scale);

      if (expIdx > 0) {
        currentY += 6.5 * scale;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.4 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(exp.company.toUpperCase(), margin, currentY);

      const locationText = exp.location ? `${exp.location} (${exp.type})` : exp.type;
      const locationWidth = doc.getTextWidth(locationText);
      doc.text(locationText, pageWidth - margin - locationWidth, currentY);
      currentY += 3.8 * scale;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8 * scale);
      doc.setTextColor(...darkSlate);
      doc.text(exp.role, margin, currentY);

      const periodWidth = doc.getTextWidth(exp.period);
      doc.text(exp.period, pageWidth - margin - periodWidth, currentY);
      currentY += 3.8 * scale;

      if (exp.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.3 * scale);
        doc.setTextColor(...bodySlate);
        const descLines = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(descLines, margin, currentY);
        currentY += descLines.length * (3.6 * scale) + (1.2 * scale);
      }

      exp.highlights.forEach((hl) => {
        addHangingBullet(hl, {
          fontStyle: 'normal',
          textColor: bodySlate,
          bulletColor: primaryNavy,
          textOffset: 5.2,
          bulletOffset: 1.2,
          lineHeight: 3.6 * scale,
          gapAfter: 1.0 * scale,
        });
      });

      checkPageBreak(5 * scale);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8 * scale);
      doc.setTextColor(...darkSlate);
      const toolsPrefix = 'Tools & Platform: ';
      doc.text(toolsPrefix, margin + 5.2, currentY);
      const labelW = doc.getTextWidth(toolsPrefix);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...mutedSlate);
      doc.text(exp.tools.join(', '), margin + 5.2 + labelW, currentY);
      currentY += 1.4 * scale;
    });
  }

  // ==========================================
  // 5. PENDIDIKAN (EDUCATION)
  // ==========================================
  const allEduItems = cv.education.map((edu, idx) => ({ ...edu, idx }));
  let activeEducation = itm?.education
    ? allEduItems.filter((edu) => itm.education?.[edu.idx])
    : sec?.education !== false ? allEduItems : [];

  if (options?.sectionOrders?.education) {
    const order = options.sectionOrders.education;
    activeEducation = [...activeEducation].sort((a, b) => {
      const idxA = order.indexOf(a.idx);
      const idxB = order.indexOf(b.idx);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeEducation.length > 0) {
    addSectionHeader(lang === 'en' ? 'Education' : 'Pendidikan');
    activeEducation.forEach((edu, eduIdx) => {
      checkPageBreak(16 * scale);

      if (eduIdx > 0) {
        currentY += 2.8 * scale;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.2 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(edu.institution.toUpperCase(), margin, currentY);

      const eduPeriodWidth = doc.getTextWidth(edu.period);
      doc.text(edu.period, pageWidth - margin - eduPeriodWidth, currentY);
      currentY += 3.8 * scale;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.6 * scale);
      doc.setTextColor(...darkSlate);
      doc.text(edu.degree, margin, currentY);
      currentY += 3.6 * scale;

      if (edu.detail) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.0 * scale);
        doc.setTextColor(...bodySlate);
        const detailLines = doc.splitTextToSize(edu.detail, contentWidth);
        doc.text(detailLines, margin, currentY);
        currentY += detailLines.length * (3.4 * scale) + (1.2 * scale);
      }
    });
  }

  // ==========================================
  // 6. KEAHLIAN & KOMPETENSI (SKILLS & COMPETENCIES)
  // ==========================================
  const skillConfig = itm?.skills;

  const showHardSkills = skillConfig
    ? (skillConfig.hardGroup !== false) &&
      (typeof skillConfig.hard === 'boolean'
        ? skillConfig.hard
        : Object.values(skillConfig.hard || {}).some(Boolean))
    : sec?.skills !== false;

  const showSoftSkills = skillConfig
    ? (skillConfig.softGroup !== false) &&
      (typeof skillConfig.soft === 'boolean'
        ? skillConfig.soft
        : Object.values(skillConfig.soft || {}).some(Boolean))
    : sec?.skills !== false;

  const showToolsSkills = skillConfig
    ? (skillConfig.toolsGroup !== false) &&
      (typeof skillConfig.tools === 'boolean'
        ? skillConfig.tools
        : Object.values(skillConfig.tools || {}).some(Boolean))
    : sec?.skills !== false;

  const hasAnySkills = showHardSkills || showSoftSkills || showToolsSkills;

  if (hasAnySkills) {
    addSectionHeader(lang === 'en' ? 'Core Competencies & Skills' : 'Keahlian');

    // Hard skills sorted
    let hardSkillItems = cv.skills.hard.map((group, idx) => ({ ...group, idx }));
    if (options?.sectionOrders?.skills_hard) {
      const order = options.sectionOrders.skills_hard;
      hardSkillItems = [...hardSkillItems].sort((a, b) => {
        const idxA = order.indexOf(a.idx);
      const idxB = order.indexOf(b.idx);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
      });
    }

    // Soft skills sorted
    let softSkillItems = cv.skills.soft.map((item, idx) => ({ item, idx }));
    if (options?.sectionOrders?.skills_soft) {
      const order = options.sectionOrders.skills_soft;
      softSkillItems = [...softSkillItems].sort((a, b) => {
        const idxA = order.indexOf(a.idx);
      const idxB = order.indexOf(b.idx);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
      });
    }

    // Tool categories sorted
    let toolCatItems = (cv.skills.toolCategories || []).map((cat, idx) => ({ ...cat, idx }));
    if (options?.sectionOrders?.skills_tools) {
      const order = options.sectionOrders.skills_tools;
      toolCatItems = [...toolCatItems].sort((a, b) => {
        const idxA = order.indexOf(a.idx);
      const idxB = order.indexOf(b.idx);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
      });
    }

    const renderHardSkills = () => {
      if (!showHardSkills) return;
      checkPageBreak(12 * scale);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text('Hard Skills:', margin, currentY);
      currentY += 3.4 * scale;

      hardSkillItems.forEach((group) => {
        const isSelected =
          typeof skillConfig?.hard === 'object'
            ? !!skillConfig.hard[group.idx]
            : true;

        if (isSelected) {
          addBoldPrefixHangingBullet(group.category, group.items.join(', '), {
            gapAfter: 0.9 * scale,
            lineHeight: 3.5 * scale,
            fontSize: 8.3 * scale,
            prefixColor: primaryNavy,
            bodyColor: bodySlate,
            bulletColor: primaryNavy,
          });
        }
      });
      currentY += 1.4 * scale;
    };

    const renderSoftSkills = () => {
      if (!showSoftSkills) return;
      checkPageBreak(10 * scale);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(lang === 'en' ? 'Soft Skills & Leadership:' : 'Soft Skills & Kepemimpinan:', margin, currentY);
      currentY += 3.4 * scale;

      softSkillItems.forEach(({ item, idx }) => {
        const isSelected =
          typeof skillConfig?.soft === 'object'
            ? !!skillConfig.soft[idx]
            : true;

        if (isSelected) {
          const colonIdx = item.indexOf(':');
          const prefix = colonIdx !== -1 ? item.substring(0, colonIdx) : item;
          const body = colonIdx !== -1 ? item.substring(colonIdx + 1) : '';
          addBoldPrefixHangingBullet(prefix, body, {
            bulletChar: '•',
            gapAfter: 0.9 * scale,
            lineHeight: 3.5 * scale,
            fontSize: 8.3 * scale,
            prefixColor: primaryNavy,
            bodyColor: bodySlate,
          });
        }
      });
      currentY += 1.4 * scale;
    };

    const renderToolsSkills = () => {
      if (!showToolsSkills) return;
      checkPageBreak(10 * scale);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(lang === 'en' ? 'Tools & Software Ecosystem:' : 'Tools & Ekosistem Digital:', margin, currentY);
      currentY += 3.4 * scale;

      toolCatItems.forEach((cat) => {
        const isSelected =
          typeof skillConfig?.tools === 'object'
            ? !!skillConfig.tools[cat.idx]
            : true;

        if (isSelected) {
          addBoldPrefixHangingBullet(cat.category, cat.tools, {
            bulletChar: '•',
            gapAfter: 0.9 * scale,
            lineHeight: 3.5 * scale,
            fontSize: 8.3 * scale,
            prefixColor: primaryNavy,
            bodyColor: bodySlate,
          });
        }
      });
      currentY += 1.4 * scale;
    };

    const skillsGroupOrder = options?.sectionOrders?.skills || ['hard', 'soft', 'tools'];
    skillsGroupOrder.forEach((grp) => {
      if (grp === 'hard') renderHardSkills();
      else if (grp === 'soft') renderSoftSkills();
      else if (grp === 'tools') renderToolsSkills();
    });
  }

  // ==========================================
  // 7. SERTIFIKASI PROFESIONAL (PROFESSIONAL CERTIFICATIONS)
  // ==========================================
  let activeCertifications = itm?.certifications
    ? (cv.certifications || []).filter((cert) => itm.certifications?.[cert.id])
    : sec?.certifications !== false ? (cv.certifications || []) : [];

  if (options?.sectionOrders?.certifications) {
    const order = options.sectionOrders.certifications;
    activeCertifications = [...activeCertifications].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeCertifications.length > 0) {
    addSectionHeader(lang === 'en' ? 'Certifications' : 'Sertifikasi');
    activeCertifications.forEach((cert) => {
      checkPageBreak(14 * scale);
      const validityText = lang === 'en' ? `Validity: ${cert.period}` : `Berlaku: ${cert.period}`;
      const prefix = `${cert.title} — ${cert.issuer} (${cert.grade} | ${validityText})`;
      const body = cert.description;
      addBoldPrefixHangingBullet(prefix, body, {
        bulletChar: '•',
        gapAfter: 1.6 * scale,
        lineHeight: 3.5 * scale,
        fontSize: 8.3 * scale,
        prefixColor: primaryNavy,
        bodyColor: bodySlate,
        bulletColor: primaryNavy,
      });
    });
  }

  // ==========================================
  // 8. PORTOFOLIO KONSULTANSI & PROYEK INDEPENDEN
  // ==========================================
  const sourceConsulting = getTailoredConsulting(options?.preset, lang);
  let activeConsultingProjects = itm?.consultingProjects
    ? (sourceConsulting.projects || []).filter((proj) => itm.consultingProjects?.[proj.id])
    : sec?.consulting !== false ? (sourceConsulting.projects || []) : [];

  if (options?.sectionOrders?.consultingProjects) {
    const order = options.sectionOrders.consultingProjects;
    activeConsultingProjects = [...activeConsultingProjects].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeConsultingProjects.length > 0) {
    addSectionHeader(lang === 'en' ? 'Consulting & Independent Projects' : 'Portofolio Konsultansi & Proyek Independen');

    checkPageBreak(15 * scale);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3 * scale);
    doc.setTextColor(...bodySlate);
    const consultSummaryLines = doc.splitTextToSize(sourceConsulting.summary, contentWidth);
    doc.text(consultSummaryLines, margin, currentY);
    currentY += consultSummaryLines.length * (3.6 * scale) + (2.0 * scale);

    activeConsultingProjects.forEach((proj, pIdx) => {
      checkPageBreak(22 * scale);

      if (pIdx > 0) {
        currentY += 2.2 * scale;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.6 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(proj.organization.toUpperCase(), margin, currentY);

      const sectorWidth = doc.getTextWidth(proj.sector);
      doc.text(proj.sector, pageWidth - margin - sectorWidth, currentY);
      currentY += 3.6 * scale;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.3 * scale);
      doc.setTextColor(...darkSlate);
      doc.text(proj.role, margin, currentY);

      const periodTagWidth = doc.getTextWidth(proj.periodType);
      doc.text(proj.periodType, pageWidth - margin - periodTagWidth, currentY);
      currentY += 3.6 * scale;

      proj.highlights.forEach((hl) => {
        addHangingBullet(hl, {
          fontStyle: 'normal',
          textColor: bodySlate,
          bulletColor: primaryNavy,
          textOffset: 5.2,
          bulletOffset: 1.2,
          lineHeight: 3.5 * scale,
          gapAfter: 1.0 * scale,
        });
      });
    });
    currentY += 1.4 * scale;
  }

  // ==========================================
  // 9. PORTOFOLIO SISTEM & SOLUSI DIGITAL
  // ==========================================
  const sourceDigitalSolutions = getTailoredDigitalSolutions(options?.preset, lang);
  let activeDigitalSolutions = itm?.digitalSolutions
    ? (sourceDigitalSolutions || []).filter((sol) => itm.digitalSolutions?.[sol.id])
    : sec?.digitalSolutions !== false ? (sourceDigitalSolutions || []) : [];

  if (options?.sectionOrders?.digitalSolutions) {
    const order = options.sectionOrders.digitalSolutions;
    activeDigitalSolutions = [...activeDigitalSolutions].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeDigitalSolutions.length > 0) {
    addSectionHeader(lang === 'en' ? 'Digital Solutions Portfolio' : 'Portofolio Solusi Digital');
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.0 * scale);
    doc.setTextColor(...darkSlate);
    const solIntro = lang === 'en'
      ? 'All web-based system prototypes are designed as live testing prototypes ready for customization according to corporate workflows and operational scale:'
      : 'Seluruh prototipe sistem berbasis web ini dirancang sebagai kerangka kerja awal (live testing prototype) yang siap dikustomisasi sesuai alur kerja dan skala operasional perusahaan:';
    const solIntroLines = doc.splitTextToSize(solIntro, contentWidth);
    doc.text(solIntroLines, margin, currentY);
    currentY += solIntroLines.length * (3.4 * scale) + (1.6 * scale);
    
    activeDigitalSolutions.forEach((sol) => {
      checkPageBreak(15 * scale);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(sol.title, margin, currentY);

      const titleWidth = doc.getTextWidth(sol.title);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.0 * scale);
      doc.setTextColor(...darkSlate);
      const subtitleText = ` | ${sol.subtitle}`;
      doc.text(subtitleText, margin + titleWidth, currentY);
      currentY += 3.8 * scale; // Space below title

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.0 * scale);
      doc.setTextColor(...bodySlate);
      const impactText = sol.impact ? (lang === 'en' ? ` Impact: ${sol.impact}` : ` Dampak: ${sol.impact}`) : '';
      const fullDesc = `${sol.description}${impactText}`;
      const splitDesc = doc.splitTextToSize(fullDesc, contentWidth);
      doc.text(splitDesc, margin, currentY);
      currentY += splitDesc.length * (3.5 * scale);

      if (sol.demoUrl) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.8 * scale);
        doc.setTextColor(...darkSlate);
        const linkPrefix = 'Link & Demo: ';
        doc.text(linkPrefix, margin, currentY);
        
        const labelW = doc.getTextWidth(linkPrefix);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mutedSlate);
        doc.textWithLink(sol.demoUrl, margin + labelW, currentY, { url: sol.demoUrl });
        currentY += 4.5 * scale; // Spacing after link to next section
      } else {
        currentY += 4.5 * scale;
      }
      currentY += 0.8 * scale; // Additional spacing between items
    });
  }

  // ==========================================
  // 10. PENGALAMAN ORGANISASI & KEPEMIMPINAN
  // ==========================================
  const sourceOrganizations = getTailoredOrganizations(options?.preset, lang);
  const allOrgItems = (sourceOrganizations || []).map((org, idx) => ({ ...org, idx }));
  let activeOrganizations = itm?.organizations
    ? allOrgItems.filter((org) => itm.organizations?.[org.idx])
    : sec?.organizations !== false ? allOrgItems : [];

  if (options?.sectionOrders?.organizations) {
    const order = options.sectionOrders.organizations;
    activeOrganizations = [...activeOrganizations].sort((a, b) => {
      const idxA = order.indexOf(a.idx);
      const idxB = order.indexOf(b.idx);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  if (activeOrganizations.length > 0) {
    addSectionHeader(lang === 'en' ? 'Organizational Leadership' : 'Pengalaman Organisasi & Kepemimpinan');

    activeOrganizations.forEach((org, orgIdx) => {
      checkPageBreak(16 * scale);

      if (orgIdx > 0) {
        currentY += 2.2 * scale;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.6 * scale);
      doc.setTextColor(...primaryNavy);
      doc.text(org.role, margin, currentY);

      const periodWidth = doc.getTextWidth(org.period);
      doc.text(org.period, pageWidth - margin - periodWidth, currentY);
      currentY += 3.6 * scale;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.2 * scale);
      doc.setTextColor(...darkSlate);
      doc.text(org.organization, margin, currentY);
      currentY += 3.4 * scale;

      if (org.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.0 * scale);
        doc.setTextColor(...bodySlate);
        const orgDescLines = doc.splitTextToSize(org.description, contentWidth);
        doc.text(orgDescLines, margin, currentY);
        currentY += orgDescLines.length * (3.4 * scale) + (1.2 * scale);
      }
    });
  }

  // ==========================================
  // 11. PRESTASI & PENGHARGAAN
  // ==========================================
  let activeAchievements = itm?.achievements
    ? (cv.achievements || []).filter((ach) => itm.achievements?.[ach.id])
    : sec?.achievements !== false ? (cv.achievements || []) : [];

  if (options?.sectionOrders?.achievements) {
    const order = options.sectionOrders.achievements;
    activeAchievements = [...activeAchievements].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  }

  // Enforce maximum 5 achievements displayed unless preset is 'all'
  if (options?.preset !== 'all') {
    activeAchievements = activeAchievements.slice(0, 5);
  }

  if (activeAchievements.length > 0) {
    const achHeader = lang === 'en'
      ? `Honors, Awards & Achievements (${activeAchievements.length} Items)`
      : `Prestasi, Penghargaan & Pencapaian (${activeAchievements.length} Kegiatan)`;
    addSectionHeader(achHeader, false, 26.0 * scale);

    activeAchievements.forEach((ach, achIdx) => {
      checkPageBreak(16 * scale);

      if (achIdx > 0) {
        currentY += 2.2 * scale;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.6 * scale);
      doc.setTextColor(...primaryNavy);

      const levelText = lang === 'en' ? `${ach.level} Level` : `Tingkat ${ach.level}`;
      doc.setFontSize(8.0 * scale);
      const levelWidth = doc.getTextWidth(levelText);

      doc.setFontSize(8.6 * scale);
      const maxTitleWidth = contentWidth - levelWidth - 4;
      const titleLines = doc.splitTextToSize(ach.title, maxTitleWidth);
      doc.text(titleLines[0], margin, currentY);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.0 * scale);
      doc.setTextColor(...darkSlate);
      doc.text(levelText, pageWidth - margin - levelWidth, currentY);

      if (titleLines.length > 1) {
        currentY += 3.4 * scale;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.6 * scale);
        doc.setTextColor(...primaryNavy);
        doc.text(titleLines.slice(1), margin, currentY);
      }
      currentY += 3.6 * scale;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.2 * scale);
      doc.setTextColor(...darkSlate);
      doc.text(ach.organization, margin, currentY);

      const yearWidth = doc.getTextWidth(ach.year);
      doc.text(ach.year, pageWidth - margin - yearWidth, currentY);
      currentY += 3.4 * scale;

      if (ach.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.0 * scale);
        doc.setTextColor(...bodySlate);
        const achDescLines = doc.splitTextToSize(ach.description, contentWidth);
        doc.text(achDescLines, margin, currentY);
        currentY += achDescLines.length * (3.4 * scale) + (1.2 * scale);
      }
    });
  }

  // ==========================================
  // FOOTER & PAGINATION ON ALL PAGES
  // ==========================================
  const totalPages = doc.getNumberOfPages();

  // Standard filename format: cv_alvareza_<preset_code>.pdf
  const presetKey = options?.preset || 'all';
  const presetCode = (PRESET_CODES[presetKey] || presetKey).toLowerCase();
  const filename = `cv_alvareza_${presetCode}.pdf`;
  return { doc, filename, totalPages };
};

/**
 * Builds and downloads the ATS PDF directly to the user's filesystem.
 */
export const generateATSPDF = (
  languageOrOptions?: 'id' | 'en' | (PDFStyleOptions & { language?: 'id' | 'en' }),
  optionsArg?: PDFStyleOptions
) => {
  const { doc, filename } = buildATSPDFDocument(languageOrOptions, optionsArg);
  doc.save(filename);
};

/**
 * Builds the ATS PDF and returns an object URL string for in-browser preview without downloading.
 */
export const getATSPDFBlobUrl = (
  languageOrOptions?: 'id' | 'en' | (PDFStyleOptions & { language?: 'id' | 'en' }),
  optionsArg?: PDFStyleOptions
): { blobUrl: string; filename: string; totalPages: number } => {
  const { doc, filename, totalPages } = buildATSPDFDocument(languageOrOptions, optionsArg);
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  return { blobUrl, filename, totalPages };
};

/**
 * Triggers standard browser print tailored by print CSS.
 */
export const triggerBrowserPrint = () => {
  window.print();
};

/**
 * Renders all pages of a jsPDF document into PNG data URLs for crisp multi-page previewing.
 */
export const renderPdfToPageImages = async (doc: jsPDF): Promise<string[]> => {
  try {
    const arrayBuffer = doc.output('arraybuffer');
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdfDoc = await loadingTask.promise;
    const pageImageUrls: string[] = [];

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 }); // Crisp 2x scaling
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (context) {
        await page.render({ canvasContext: context, viewport, canvas }).promise;
        pageImageUrls.push(canvas.toDataURL('image/png'));
      }
    }

    return pageImageUrls;
  } catch (err) {
    console.error('Failed to render PDF page images:', err);
    return [];
  }
};
