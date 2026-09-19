import { EmailLanguage, EmailTone, JobScanResult } from '../types/jobApplication';
import { matchExactJobPositionFromCatalog, stripOcrArtifactsFromText } from '../data/jobPositionsCatalog';
import { matchPresetFromJobTitle } from '../data/rolePresetsConfig';

export const APPLICANT_DATA = {
  fullName: 'Alvareza Hilka Pratama',
  email: 'alvareza.work@gmail.com',
  phone: '+62 857-9718-4059',
  portfolioUrl: 'https://mycivy.vercel.app',
  linkedinUrl: 'https://linkedin.com/in/alvareza-hilka-pratama',
  headline: 'Business Operations & Strategic Management Specialist',
  certification: 'Certified HR Specialist (MarkPlus Institute, Nilai 93,00) & Six Sigma White Belt',
  keyHighlights: [
    'Supervisi operasional 13 gerai ritel dan koordinasi lintas 6 divisi bisnis',
    'Eksekusi 100+ proyek komersial dengan CSAT 98% dan kepatuhan SLA >95%',
    'Perancangan 20+ SOP yang memangkas hambatan operasional hingga 70%',
    'Pembangunan 50+ aplikasi sistem digital/ERP kustom untuk efisiensi bisnis',
    'Pengelolaan database prospek B2B CRM 4.000+ kontak',
  ],
};

/**
 * Detect language from text (Indonesian vs English)
 */
export function detectLanguageFromText(rawText: string): EmailLanguage {
  const text = (rawText || '').toLowerCase();

  const englishTokens = [
    'hiring', 'we are hiring', 'vacancy', 'job vacancy', 'qualifications',
    'requirements', 'responsibilities', 'apply', 'send your cv', 'send cv',
    'send your resume', 'bachelor degree', 'experience', 'full time', 'part time',
    'work location', 'benefits', 'join our team', 'job description', 'skills',
    'good communication', 'fluent in english', 'must have', 'years of experience',
    'looking for', 'position', 'apply now', 'please send', 'recruitment', 'candidate',
    'minimum degree', 'salary', 'working hours', 'role', 'we\'re hiring', 'careers'
  ];

  const indonesianTokens = [
    'lowongan kerja', 'loker', 'dibutuhkan', 'kualifikasi', 'persyaratan',
    'tanggung jawab', 'kirim berkas', 'kirim cv', 'surat lamaran', 'pria/wanita',
    'pendidikan minimal', 'pengalaman minimal', 'penempatan', 'usia maksimal',
    'bersedia ditempatkan', 'gaji', 'perusahaan', 'diutamakan', 'surat lamaran',
    'pria', 'wanita', 'jurusan', 'lamaran pekerjaan', 'walk in interview', 'rekrutmen'
  ];

  let enScore = 0;
  let idScore = 0;

  for (const token of englishTokens) {
    if (text.includes(token)) enScore += 2;
  }
  for (const token of indonesianTokens) {
    if (text.includes(token)) idScore += 2;
  }

  // Common phrasing weights
  if (/\b(we\s+are\s+looking\s+for|open\s+position|job\s+title|apply\s+to|send\s+resume|join\s+our\s+team)\b/i.test(text)) {
    enScore += 5;
  }
  if (/\b(dibutuhkan\s+segera|kualifikasi\s*:|persyaratan\s*:|kirim\s+lamaran|kirimkan\s+cv|lowongan\s+kerja)\b/i.test(text)) {
    idScore += 5;
  }

  return enScore > idScore ? 'en' : 'id';
}

/**
 * Noise words and slogans that should NEVER be recognized as company names or positions
 */
const NOISE_SLOGANS = [
  'we are hiring', "we're hiring", 'hiring now', 'we are open', 'open recruitment',
  'walk in interview', 'job vacancy', 'career opportunity', 'join our team', 'join us',
  'dibutuhkan segera', 'lowongan kerja', 'loker terbaru', 'loker', 'penerimaan karyawan',
  'kualifikasi', 'persyaratan', 'syarat & ketentuan', 'syarat', 'tanggung jawab',
  'job description', 'responsibilities', 'requirements', 'qualifications', 'benefits',
  'cara melamar', 'how to apply', 'send your cv', 'kirim cv anda', 'kirim lamaran',
  'penempatan', 'work location', 'lokasi kerja', 'contact person', 'hubungi kami',
  'info lowongan', 'open position', 'urgently needed', 'urgent needed', 'segera'
];

/**
 * Cleans OCR artifacts from string
 */
function cleanOcrLine(str: string): string {
  return str
    .replace(/^[^a-zA-Z0-9(]+/, '')
    .replace(/[^a-zA-Z0-9.)]+$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Strict Company Name Extractor
 * Identifies legitimate company entities (PT, CV, UD, Yayasan, Firma)
 * Rejects resume action instructions like "CV Terbaru Ke Email" and returns "" if not found.
 */
export function extractCompanyNameStrict(lines: string[], email?: string): string {
  const RESUME_ACTION_WORDS = [
    'terbaru', 'ke email', 'email', 'pdf', 'portofolio', 'portfolio', 'lamaran', 'lengkap',
    'beserta', 'format', 'ats', 'subjek', 'subject', 'hrd@', '@gmail', 'kirim', 'kirimkan',
    'upload', 'submit', 'berkas', 'surat', 'foto', 'ijazah', 'transkrip', 'hubungi', 'wa:'
  ];

  for (const rawLine of lines) {
    const line = cleanOcrLine(rawLine);
    if (!line || line.length < 3 || line.length > 55) continue;

    // Reject noise slogans and submission commands
    if (NOISE_SLOGANS.some(slogan => line.toLowerCase().includes(slogan))) continue;
    if (/^(?:kirim|kirimkan|send|submit|lampirkan|upload|email)\b/i.test(line)) continue;

    // Pattern: PT / CV / UD / Yayasan / Firma
    const legalMatch = line.match(/\b(PT\.?|CV\.?|UD\.?|Yayasan|Firma)\s+([A-Za-z0-9\s.,&-]{2,50})/i);
    if (legalMatch) {
      const prefix = legalMatch[1].toUpperCase().replace(/\.$/, '');
      const namePart = legalMatch[2].trim();
      const lowerName = namePart.toLowerCase();

      // Check if this is Curriculum Vitae (resume) instruction
      if (RESUME_ACTION_WORDS.some(w => lowerName.includes(w))) {
        continue;
      }

      if (namePart.length >= 3 && !/^(anda|kamu|kami|saya|di|ke|dan|atau)\b/i.test(namePart)) {
        return `${prefix}. ${cleanTitleCase(namePart)}`;
      }
    }
  }

  // Strict user rule: If no PT / CV is present, return empty string ""
  return '';
}

/**
 * Strict Job Position / Role Extractor
 * Matches against exact canonical job catalog and strips OCR artifacts like 'Ee', '1.', 'We'.
 */
export function extractJobPositionStrict(lines: string[], filename?: string, language: EmailLanguage = 'id'): string {
  // 1. Check exact matcher from canonical job catalog
  const catalogMatch = matchExactJobPositionFromCatalog('', lines);
  if (catalogMatch) {
    return catalogMatch;
  }

  // Comprehensive catalog of real job position patterns
  const rolePatterns: RegExp[] = [
    // Operations & Management
    /\b(store\s+manager|store\s+supervisor|supervisor\s+operasional|operational\s+manager|kepala\s+toko|kepala\s+cabang|branch\s+manager|asisten\s+manager|assistant\s+manager|area\s+manager)\b/i,
    /\b(operations\s+specialist|business\s+operations|operation\s+lead|operations\s+officer|staff\s+operasional|operational\s+staff|management\s+trainee|leader|team\s+leader)\b/i,
    // HR & Administration
    /\b(hr\s+specialist|hr\s+generalist|human\s+resources|hrd\s+staff|hr\s+officer|recruiter|talent\s+acquisition|spesialis\s+sdm|personalia)\b/i,
    /\b(staff\s+administrasi|admin\s+operasional|admin\s+gudang|admin\s+logistik|admin\s+sosmed|admin\s+sales|administrative\s+officer|data\s+entry)\b/i,
    // Project & Business Development
    /\b(project\s+manager|project\s+officer|project\s+coordinator|pmo|business\s+development|account\s+manager|account\s+executive|b2b\s+sales|sales\s+executive|marketing\s+executive)\b/i,
    // Retail, F&B & Services
    /\b(barista|cashier|kasir|crew\s+store|pramusaji|waiter|waitress|customer\s+service|front\s+liner|receptionist|telemarketing)\b/i,
    // Tech & Creative
    /\b(graphic\s+designer|content\s+creator|social\s+media\s+specialist|digital\s+marketer|web\s+developer|frontend\s+developer|backend\s+developer|ui\/ux\s+designer|copywriter)\b/i,
    // Generic titles
    /\b(supervisor|manager|officer|specialist|analyst|coordinator|staff)\b/i
  ];

  // 2. Look for explicit position prefixes with artifact stripping
  for (const rawLine of lines) {
    const stripped = stripOcrArtifactsFromText(rawLine);
    const posMatch = stripped.match(/(?:posisi|position|role|sebagai|job\s*title|opening\s*for)\s*[:=\-]\s*(.+)/i);
    if (posMatch && posMatch[1]) {
      const extracted = cleanOcrLine(posMatch[1]);
      const exactMatch = matchExactJobPositionFromCatalog(extracted);
      if (exactMatch) return exactMatch;
      if (extracted.length >= 3 && extracted.length <= 45 && !extracted.includes('@')) {
        return cleanTitleCase(extracted);
      }
    }
  }

  // 3. Match against known role catalog
  for (const rawLine of lines) {
    const line = stripOcrArtifactsFromText(rawLine);
    if (line.length < 3 || line.length > 50 || line.includes('@')) continue;

    // Must not be a requirement line (e.g. "Pria/Wanita", "Minimal S1", "Pengalaman 1 tahun")
    if (/^(minimal|pendidikan|pengalaman|usia|pria|wanita|gaji|bersedia|mampu|menguasai|surat|cv|kirim)/i.test(line)) continue;

    for (const pattern of rolePatterns) {
      if (pattern.test(line)) {
        const exact = matchExactJobPositionFromCatalog(line);
        return exact || cleanTitleCase(line);
      }
    }
  }

  // 4. Fallback from filename if provided
  if (filename) {
    const cleanFn = filename.toLowerCase();
    if (cleanFn.includes('store') || cleanFn.includes('ritel') || cleanFn.includes('retail')) {
      return language === 'en' ? 'Store Operations Supervisor' : 'Supervisor Operasional Ritel';
    }
    if (cleanFn.includes('hr') || cleanFn.includes('human')) {
      return language === 'en' ? 'Human Resources Specialist' : 'Spesialis SDM / HR Specialist';
    }
    if (cleanFn.includes('b2b') || cleanFn.includes('sales') || cleanFn.includes('bizdev')) {
      return language === 'en' ? 'B2B Growth & Account Specialist' : 'B2B Growth & Account Specialist';
    }
    if (cleanFn.includes('pmo') || cleanFn.includes('project')) {
      return language === 'en' ? 'Project Management Officer' : 'Project Management Officer (PMO)';
    }
    if (cleanFn.includes('admin')) {
      return language === 'en' ? 'Operations & Administrative Officer' : 'Staff Administrasi & Operasional';
    }
  }

  return language === 'en' ? 'Operations & Management Specialist' : 'Spesialis Operasional & Manajemen';
}

/**
 * Formats string to clean Title Case
 */
function cleanTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Special acronyms
      if (['hr', 'hrd', 'sdm', 'pmo', 'b2b', 'sop', 'erp', 'crm', 'ui', 'ux', 'it'].includes(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Strict Email Extractor & OCR Fixer
 */
export function extractEmailStrict(text: string): string {
  // Normalize common OCR misreads in emails
  const sanitized = text
    .replace(/\[at\]|\(at\)|_at_|@\s+/gi, '@')
    .replace(/\s+@/g, '@')
    .replace(/@([a-zA-Z0-9.-]+)\s+\.([a-zA-Z]{2,})/g, '@$1.$2');

  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
  const emails = sanitized.match(emailRegex) || [];

  // Filter out applicant's own email and common template domains
  const validEmails = emails.filter(e => {
    const low = e.toLowerCase();
    return !low.includes('alvareza') && !low.includes('mycivy') && !low.includes('example.com') && !low.includes('domain.com');
  });

  if (validEmails.length === 0) return '';

  let bestEmail = validEmails[0];

  // Fix common OCR domain typos
  bestEmail = bestEmail
    .replace(/gmai1\.com/i, 'gmail.com')
    .replace(/gmall\.com/i, 'gmail.com')
    .replace(/gmaill\.com/i, 'gmail.com')
    .replace(/yaho\.com/i, 'yahoo.com')
    .replace(/\.con$/i, '.com')
    .replace(/\.co\.ld$/i, '.co.id');

  return bestEmail.toLowerCase();
}

/**
 * Strict Phone / WhatsApp Extractor & OCR Fixer
 */
export function extractPhoneStrict(text: string): string {
  // Normalize OCR digit errors in numbers
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    if (/(?:wa|whatsapp|telp|telepon|phone|hp|contact|hubungi|call)\b/i.test(line) || /(?:\+62|62|08)[0-9\s\-]{8,16}/.test(line)) {
      // Clean phone numbers
      const cleaned = line
        .replace(/[oO]/g, '0')
        .replace(/[lI]/g, '1')
        .replace(/[B]/g, '8');

      const match = cleaned.match(/(?:\+62|62|08)[0-9\s\-]{8,16}/);
      if (match) {
        const rawPhone = match[0].replace(/[\s\-]/g, '');
        // Validate length and exclude applicant's own number
        if (rawPhone.length >= 10 && rawPhone.length <= 15 && !rawPhone.includes('85797184059')) {
          if (rawPhone.startsWith('08')) {
            return rawPhone;
          } else if (rawPhone.startsWith('62')) {
            return '0' + rawPhone.slice(2);
          } else if (rawPhone.startsWith('+62')) {
            return '0' + rawPhone.slice(3);
          }
          return rawPhone;
        }
      }
    }
  }

  return '';
}

/**
 * Extract Subject Format Notice from Poster if present
 */
export function extractSubjectFormatNotice(lines: string[]): string {
  for (const rawLine of lines) {
    const line = cleanOcrLine(rawLine);
    if (/(?:format\s*subjek|format\s*subject|subjek\s*email|subject\s*email|subject\s*:|subjek\s*:)/i.test(line)) {
      const notice = line.replace(/^(?:format\s*subjek|format\s*subject|subjek\s*email|subject\s*email|subject|subjek)\s*[:=\-]\s*/i, '').trim();
      if (notice.length > 2) return notice;
    }
  }
  return '';
}

/**
 * Dynamic keyword-based highlights tailored to the target job position & preset category
 */
export function getTailoredEmailHighlights(jobTitle: string, presetKey: string, lang: EmailLanguage): string[] {
  const titleLower = (jobTitle || '').toLowerCase();
  const keyLower = (presetKey || '').toLowerCase();

  // 1. HR, Recruitment, People Ops & Personnel
  if (
    keyLower.includes('hr') ||
    keyLower.includes('talent') ||
    keyLower.includes('recruitment') ||
    keyLower.includes('people') ||
    keyLower.includes('payroll') ||
    titleLower.includes('hr') ||
    titleLower.includes('recruitment') ||
    titleLower.includes('personnel') ||
    titleLower.includes('sdm') ||
    titleLower.includes('payroll') ||
    titleLower.includes('ta')
  ) {
    if (lang === 'en') {
      return [
        'End-to-end recruitment & talent acquisition execution, candidate pipeline management, and structured employee onboarding.',
        'Personnel administration, general affairs facilities, and strict compliance with industrial relations & labor regulations.',
        'Team KPI performance evaluation and HRIS/payroll automation reducing HR operational bottlenecks.'
      ];
    }
    return [
      'Penyelenggaraan proses rekrutmen end-to-end, penanganan saluran kandidat, dan onboarding karyawan baru secara terstruktur.',
      'Pengelolaan administrasi personalia, fasilitas kerja (GA), serta pemeliharaan kepatuhan hubungan industrial.',
      'Evaluasi KPI kinerja tim dan otomatisasi alur kerja HRIS/payroll yang memangkas hambatan operasional SDM.'
    ];
  }

  // 2. Administration, Secretariat & Legal
  if (
    keyLower.includes('admin') ||
    keyLower.includes('secretary') ||
    keyLower.includes('executive_assistant') ||
    keyLower.includes('legal') ||
    keyLower.includes('hospital') ||
    titleLower.includes('admin') ||
    titleLower.includes('sekretaris') ||
    titleLower.includes('office') ||
    titleLower.includes('legal') ||
    titleLower.includes('tata usaha')
  ) {
    if (lang === 'en') {
      return [
        'Office administration governance, official executive correspondence, and high-precision digital archiving of legal documents.',
        'Formulation of 20+ standardized administrative SOPs and digital records cutting document processing lead time by 70%.',
        'Cross-departmental operational support, executive schedule coordination, and seamless office workflow management.'
      ];
    }
    return [
      'Tata kelola administrasi kantor, korespondensi resmi pimpinan, dan kearsipan digital dokumen legal dengan presisi tinggi.',
      'Perancangan 20+ SOP kerja administratif baru dan rekap digital yang memangkas 70% waktu pemrosesan dokumen.',
      'Dukungan operasional lintas departemen, pengelolaan agenda pimpinan, serta kelancaran alur kerja kantor.'
    ];
  }

  // 3. Tech, Software & IT Engineering
  if (
    keyLower.includes('software') ||
    keyLower.includes('frontend') ||
    keyLower.includes('backend') ||
    keyLower.includes('developer') ||
    keyLower.includes('systems') ||
    keyLower.includes('erp') ||
    keyLower.includes('data') ||
    titleLower.includes('developer') ||
    titleLower.includes('software') ||
    titleLower.includes('programmer') ||
    titleLower.includes('it') ||
    titleLower.includes('frontend') ||
    titleLower.includes('backend')
  ) {
    if (lang === 'en') {
      return [
        'Architected and deployed 50+ custom web-based digital systems & ERP business tools for operational efficiency.',
        'B2B CRM prospect database management (4,000+ contacts) and cross-departmental data pipeline automation.',
        'Technical problem solving with high code quality, optimal application performance, and >95% SLA execution.'
      ];
    }
    return [
      'Perancangan dan pembangunan 50+ aplikasi sistem digital/ERP kustom berbasis web untuk efisiensi operasional bisnis.',
      'Pengelolaan database prospek B2B CRM (4.000+ kontak) dan otomatisasi alur data antar departemen.',
      'Penyelesaian masalah teknis dengan standar kualitas tinggi, performa sistem optimal, serta eksekusi SLA >95%.'
    ];
  }

  // 4. Finance, Accounting, Tax & Billing
  if (
    keyLower.includes('finance') ||
    keyLower.includes('accounting') ||
    keyLower.includes('tax') ||
    keyLower.includes('billing') ||
    keyLower.includes('audit') ||
    titleLower.includes('finance') ||
    titleLower.includes('accounting') ||
    titleLower.includes('keuangan') ||
    titleLower.includes('pajak') ||
    titleLower.includes('tax') ||
    titleLower.includes('billing') ||
    titleLower.includes('kasir')
  ) {
    if (lang === 'en') {
      return [
        'Financial reconciliation, cash/bank transaction processing, invoice billing verification, and accurate reporting.',
        'Operational budget tracking, periodic tax compliance, expense variance control, and financial documentation.',
        'ERP/accounting software operation maintaining >99% data accuracy and standardized financial workflows.'
      ];
    }
    return [
      'Rekonsiliasi transaksi kas/bank, pemrosesan invoice/faktur billing, dan verifikasi dokumen keuangan secara akurat.',
      'Pengawasan realisasi anggaran operasional, pelaporan pajak berkala, serta pengendalian biaya secara cermat.',
      'Pengoperasian perangkat lunak akuntansi/ERP dengan tingkat ketelitian data >99% dan alur kerja terstandar.'
    ];
  }

  // 5. Marketing, Marcom, Branding & Media
  if (
    keyLower.includes('marketing') ||
    keyLower.includes('marcom') ||
    keyLower.includes('brand') ||
    keyLower.includes('media') ||
    keyLower.includes('content') ||
    keyLower.includes('growth') ||
    titleLower.includes('marketing') ||
    titleLower.includes('marcom') ||
    titleLower.includes('brand') ||
    titleLower.includes('media') ||
    titleLower.includes('sosmed')
  ) {
    if (lang === 'en') {
      return [
        'Promotional campaign execution, social media channel management, and targeted brand message positioning.',
        'Market trend analysis, target audience engagement optimization, and multi-channel marketing communications.',
        'Data-driven marketing campaign optimization delivering measurable brand growth and 98% CSAT.'
      ];
    }
    return [
      'Perancangan kampanye promosi, manajemen saluran media sosial, dan penyusunan pesan merek yang tepat sasaran.',
      'Analisis tren pasar, optimasi retensi audiens, serta strategi komunikasi pemasaran multi-saluran.',
      'Optimalisasi kampanye pemasaran berbasis data yang mendorong pertumbuhan brand dan kepuasan pelanggan 98%.'
    ];
  }

  // 6. Sales, B2B, Key Account & Business Development
  if (
    keyLower.includes('sales') ||
    keyLower.includes('business_development') ||
    keyLower.includes('account') ||
    keyLower.includes('partner') ||
    titleLower.includes('sales') ||
    titleLower.includes('b2b') ||
    titleLower.includes('penjualan') ||
    titleLower.includes('bisnis') ||
    titleLower.includes('account')
  ) {
    if (lang === 'en') {
      return [
        'B2B CRM prospect pipeline management (4,000+ contacts) and strategic institutional client penetration.',
        'Commercial solution presentations, contract deal negotiation, and consistent sales volume growth target delivery.',
        'Key Account Management (KAM) maintaining long-term corporate partnerships with 98% CSAT service quality.'
      ];
    }
    return [
      'Pengelolaan pipeline prospek B2B CRM 4.000+ kontak dan penetrasi pasar ke klien institusi strategis.',
      'Presentasi solusi bisnis komersial, negosiasi kontrak kerja sama, serta pencapaian target pertumbuhan penjualan.',
      'Manajemen hubungan klien kunci (Key Accounts) berkelanjutan dengan tingkat kepuasan layanan (CSAT) 98%.'
    ];
  }

  // 7. Supply Chain, Logistics, Warehouse & Procurement
  if (
    keyLower.includes('logistics') ||
    keyLower.includes('warehouse') ||
    keyLower.includes('procurement') ||
    keyLower.includes('supply') ||
    keyLower.includes('ppic') ||
    titleLower.includes('logistik') ||
    titleLower.includes('gudang') ||
    titleLower.includes('warehouse') ||
    titleLower.includes('procurement') ||
    titleLower.includes('pengadaan') ||
    titleLower.includes('ppic')
  ) {
    if (lang === 'en') {
      return [
        'Warehouse inventory stock flow control (FIFO method), stock accuracy audits, and storage layout optimization.',
        'Supply chain distribution fleet coordination, vendor/supplier purchasing negotiations, and PPIC scheduling.',
        'Supply chain SLA execution (>95%) eliminating stock discrepancies and operational bottlenecks by 70%.'
      ];
    }
    return [
      'Pengawasan alur persediaan stok gudang (metode FIFO), akurasi fisik stok, dan efisiensi penyimpanan.',
      'Koordinasi armada distribusi rantai pasok, negosiasi dengan vendor/pemasok, dan perancangan jadwal PPIC.',
      'Eksekusi pengiriman barang dengan pemenuhan SLA >95% dan pencegahan hambatan operasional hingga 70%.'
    ];
  }

  // 8. Default fallback
  if (lang === 'en') {
    return [
      'Supervised 13 retail branches and coordinated cross-functional execution across 6 divisions (98% CSAT, >95% SLA).',
      'Formulated standardized SOPs and continuous improvement frameworks, eliminating 70% of workflow bottlenecks.',
      'Engineered 50+ custom digital systems and business ERP tools for inventory and CRM operations.'
    ];
  }
  return [
    'Supervisi operasional 13 gerai ritel dan koordinasi lintas 6 divisi bisnis (CSAT 98%, SLA >95%).',
    'Standardisasi 20+ SOP kerja baru yang berhasil memangkas 70% hambatan operasional tim.',
    'Transformasi digital dan otomatisasi sistem kerja berbasis web/ERP (50+ aplikasi).'
  ];
}

export interface TailoredExperienceInfo {
  intro: string;
  bullets: string[];
}

/**
 * Dynamic candidate experience breakdown tailored to the active CV preset category (Structured Bullet Points)
 * Carefully calibrated to avoid over-claiming years of experience across specialized fields while highlighting real CV accomplishments.
 */
export function getTailoredExperienceDetails(presetKey: string, lang: EmailLanguage = 'id'): TailoredExperienceInfo {
  const keyLower = (presetKey || '').toLowerCase();

  // 1. HR, Talent, Recruitment & People Operations
  if (
    keyLower.includes('hr') ||
    keyLower.includes('talent') ||
    keyLower.includes('recruitment') ||
    keyLower.includes('people') ||
    keyLower.includes('payroll') ||
    keyLower.includes('employer_branding')
  ) {
    if (lang === 'en') {
      return {
        intro: 'a solid professional background in Human Resources & People Operations',
        bullets: [
          'End-to-end talent recruitment & structured employee onboarding',
          'Personnel administration, employment contracts & labor compliance',
          'Team KPI performance appraisals & employer branding initiatives',
        ],
      };
    }
    return {
      intro: 'rekam jejak pengalaman dalam tata kelola SDM (Human Resources & People Operations)',
      bullets: [
        'Pengelolaan rekrutmen end-to-end & onboarding karyawan',
        'Administrasi personalia, kontrak kerja & kepatuhan hubungan industrial',
        'Evaluasi KPI kinerja tim & inisiatif employer branding',
      ],
    };
  }

  // 2. Administration, Secretariat, Office & General Affairs
  if (
    keyLower.includes('admin') ||
    keyLower.includes('secretary') ||
    keyLower.includes('executive_assistant') ||
    keyLower.includes('general_affairs') ||
    keyLower.includes('office') ||
    keyLower.includes('hospital') ||
    keyLower.includes('data_entry')
  ) {
    if (lang === 'en') {
      return {
        intro: 'proven professional experience in office administration and operational governance',
        bullets: [
          'Executive correspondence, document archiving & records management',
          'Standardization of 20+ operational SOPs & facility coordination',
          'Workflow optimization and structured data management',
        ],
      };
    }
    return {
      intro: 'pengalaman kerja dalam administrasi perkantoran & tata kelola operasional',
      bullets: [
        'Korespondensi resmi, administrasi eksekutif & tata kelola arsip',
        'Standardisasi 20+ SOP operasional & pengelolaan fasilitas kantor',
        'Optimalisasi alur kerja dokumen & pengolahan data terstruktur',
      ],
    };
  }

  // 3. Project Management, PMO & Program Delivery
  if (
    keyLower.includes('pmo') ||
    keyLower.includes('project') ||
    keyLower.includes('program')
  ) {
    if (lang === 'en') {
      return {
        intro: 'a proven track record in Project Management & Program Delivery (PMO)',
        bullets: [
          'Execution & monitoring of 100+ cross-functional projects with >95% SLA compliance',
          'Timeline governance, resource allocation & operational risk mitigation',
          'Continuous workflow improvement and business process optimization',
        ],
      };
    }
    return {
      intro: 'rekam jejak dalam manajemen proyek & Project Management Office (PMO)',
      bullets: [
        'Eksekusi & monitoring 100+ proyek lintas divisi dengan pemenuhan SLA >95%',
        'Tata kelola timeline, alokasi sumber daya & manajemen risiko operasional',
        'Continuous improvement alur kerja dan optimalisasi proses bisnis',
      ],
    };
  }

  // 4. B2B Sales, Key Account & Business Development
  if (
    keyLower.includes('sales') ||
    keyLower.includes('business_development') ||
    keyLower.includes('account') ||
    keyLower.includes('partner')
  ) {
    if (lang === 'en') {
      return {
        intro: 'solid professional experience in B2B business development & corporate account management',
        bullets: [
          'Management of 4,000+ business relationship contacts in CRM pipeline',
          'Commercial partnership negotiations & revenue target attainment',
          'High-standard client satisfaction delivery (98% CSAT)',
        ],
      };
    }
    return {
      intro: 'pengalaman kerja dalam pengembangan bisnis B2B & pengelolaan relasi klien',
      bullets: [
        'Manajemen 4.000+ kontak relasi dalam pipeline CRM bisnis',
        'Negosiasi kemitraan komersial & pencapaian target kerja sama',
        'Pelayanan kepuasan klien berstandar tinggi (CSAT 98%)',
      ],
    };
  }

  // 5. Supply Chain, Logistics, Warehouse & Procurement
  if (
    keyLower.includes('logistics') ||
    keyLower.includes('warehouse') ||
    keyLower.includes('procurement') ||
    keyLower.includes('supply') ||
    keyLower.includes('ppic')
  ) {
    if (lang === 'en') {
      return {
        intro: 'proven background in supply chain management, warehouse governance & logistics coordination',
        bullets: [
          'Warehouse inventory management utilizing standardized FIFO methodology',
          'Procurement sourcing, vendor coordination & purchase order verification',
          'On-time logistics distribution across multi-branch networks',
        ],
      };
    }
    return {
      intro: 'pengalaman kerja dalam manajemen rantai pasok, logistik & pergudangan',
      bullets: [
        'Pengelolaan persediaan inventaris gudang dengan metode alur FIFO terstandar',
        'Koordinasi pengadaan barang (procurement) & evaluasi vendor penyedia',
        'Distribusi logistik tepat waktu dan efisiensi rantai pasok multi-cabang',
      ],
    };
  }

  // 6. Tech, Software & Digital Systems Development
  if (
    keyLower.includes('software') ||
    keyLower.includes('frontend') ||
    keyLower.includes('backend') ||
    keyLower.includes('developer') ||
    keyLower.includes('systems') ||
    keyLower.includes('digital_tech') ||
    keyLower.includes('digital_transformation')
  ) {
    if (lang === 'en') {
      return {
        intro: 'practical experience in digital systems engineering & web/ERP workflow automation',
        bullets: [
          'Engineering & deployment of 50+ custom web/ERP system applications',
          'Workflow automation to maximize operational productivity',
          'System reliability maintenance & rapid technical problem solving',
        ],
      };
    }
    return {
      intro: 'pengalaman dalam perancangan sistem digital & otomatisasi alur kerja web/ERP',
      bullets: [
        'Pengembangan & deployment 50+ aplikasi sistem digital/ERP operasional',
        'Otomatisasi proses kerja untuk percepatan produktivitas bisnis',
        'Pemeliharaan keandalan sistem dan penanganan kendala teknis operasional',
      ],
    };
  }

  // 7. Finance, Accounting & Cost Control
  if (
    keyLower.includes('finance') ||
    keyLower.includes('accounting') ||
    keyLower.includes('tax') ||
    keyLower.includes('billing') ||
    keyLower.includes('audit')
  ) {
    if (lang === 'en') {
      return {
        intro: 'practical experience in operational financial administration, transaction records & cost control',
        bullets: [
          'Invoice verification, financial records filing & cash reconciliation',
          'Operational budget analysis and cost control optimization',
          'Accurate, verified periodic financial reporting',
        ],
      };
    }
    return {
      intro: 'pengalaman dalam administrasi keuangan, pencatatan transaksi & cost control',
      bullets: [
        'Verifikasi faktur/invoice, pengarsipan keuangan & rekonsiliasi kas',
        'Analisis pengendalian anggaran biaya (cost control) operasional',
        'Pelaporan keuangan berkala yang akurat dan terverifikasi',
      ],
    };
  }

  // 8. Marketing, Branding & PR
  if (
    keyLower.includes('marketing') ||
    keyLower.includes('marcom') ||
    keyLower.includes('brand') ||
    keyLower.includes('media') ||
    keyLower.includes('content')
  ) {
    if (lang === 'en') {
      return {
        intro: 'professional experience in marketing strategy formulation, promotional campaigns & brand management',
        bullets: [
          'Multi-channel promotional campaign planning and execution',
          'Target audience research analysis & engagement growth',
          'Brand reputation management & external communications',
        ],
      };
    }
    return {
      intro: 'pengalaman kerja dalam komunikasi pemasaran, kampanye promosi & manajemen brand',
      bullets: [
        'Perencanaan & eksekusi kampanye promosi multi-saluran',
        'Analisis riset pasar, audiens sasaran & pertumbuhan engagement',
        'Pengelolaan citra brand serta komunikasi eksternal',
      ],
    };
  }

  // 9. General Operations & Management (Default / Optimal / All)
  if (lang === 'en') {
    return {
      intro: '4+ years of professional experience in cross-functional operations management',
      bullets: [
        'Supervision of 13 retail branches & coordination across 6 business divisions',
        'Standardization of 20+ operational SOPs & governance frameworks',
        'Team leadership and end-to-end workflow efficiency optimization',
      ],
    };
  }
  return {
    intro: '4+ tahun pengalaman kerja dalam manajemen operasional lintas fungsi',
    bullets: [
      'Supervisi 13 gerai ritel & koordinasi 6 divisi bisnis',
      'Standardisasi 20+ SOP operasional & tata kelola sistem kerja',
      'Kepemimpinan tim dan optimalisasi efisiensi alur kerja',
    ],
  };
}

/**
 * Dynamic candidate experience summary tailored to the active CV preset category (Legacy String Form)
 */
export function getTailoredExperienceSummary(presetKey: string, lang: EmailLanguage = 'id'): string {
  const details = getTailoredExperienceDetails(presetKey, lang);
  return `${details.intro} (${details.bullets.join(', ')})`;
}

/**
 * Dynamic candidate certification summary tailored to the active CV preset category (No numeric scores, Grade & IACET USA inclusion)
 * STRICTLY aligns with the candidate's actual certifications in the CV data without cross-field contamination.
 */
export function getTailoredCertificationSummary(presetKey: string, lang: EmailLanguage = 'id'): string {
  const keyLower = (presetKey || '').toLowerCase();

  // 1. HR & People Management Specific
  if (
    keyLower.includes('hr') ||
    keyLower.includes('talent') ||
    keyLower.includes('recruitment') ||
    keyLower.includes('people') ||
    keyLower.includes('payroll') ||
    keyLower.includes('employer_branding')
  ) {
    if (lang === 'en') {
      return 'Certified HR Specialist from MarkPlus Institute (Grade A / Outstanding) and Human Resource Management from Saylor Academy (Grade A / IACET Accredited Provider, USA)';
    }
    return 'Certified HR Specialist dari MarkPlus Institute (Grade A / Predikat Outstanding) serta Human Resource Management dari Saylor Academy (Grade A / Terakreditasi IACET, USA)';
  }

  // 2. Tech, Software & Systems Development
  if (
    keyLower.includes('software') ||
    keyLower.includes('frontend') ||
    keyLower.includes('backend') ||
    keyLower.includes('developer') ||
    keyLower.includes('systems') ||
    keyLower.includes('digital_tech') ||
    keyLower.includes('digital_transformation')
  ) {
    if (lang === 'en') {
      return 'Management Information Systems from Saylor Academy (Grade B / IACET Accredited Provider, USA) and Six Sigma White Belt from CSSC (USA)';
    }
    return 'Sistem Informasi Manajemen dari Saylor Academy (Grade B / Terakreditasi IACET, USA) serta Six Sigma White Belt dari CSSC (USA)';
  }

  // 3. Project Management, PMO & Program Delivery
  if (
    keyLower.includes('pmo') ||
    keyLower.includes('project') ||
    keyLower.includes('program')
  ) {
    if (lang === 'en') {
      return 'Six Sigma White Belt from CSSC (USA) and Operations Management from Saylor Academy (Grade A / IACET Accredited Provider, USA)';
    }
    return 'Six Sigma White Belt dari CSSC (USA) serta Operations Management dari Saylor Academy (Grade A / Terakreditasi IACET, USA)';
  }

  // 4. Marketing, Branding, PR & Digital Growth
  if (
    keyLower.includes('marketing') ||
    keyLower.includes('marcom') ||
    keyLower.includes('brand') ||
    keyLower.includes('media') ||
    keyLower.includes('content')
  ) {
    if (lang === 'en') {
      return 'Google Ads Search Certification and Google Analytics 4 (GA4) from Google Digital Academy';
    }
    return 'Google Ads Search Certification serta Google Analytics 4 (GA4) dari Google Digital Academy';
  }

  // 5. Supply Chain, Logistics, Warehouse & Procurement
  if (
    keyLower.includes('logistics') ||
    keyLower.includes('warehouse') ||
    keyLower.includes('procurement') ||
    keyLower.includes('supply') ||
    keyLower.includes('ppic')
  ) {
    if (lang === 'en') {
      return 'Operations Management from Saylor Academy (Grade A / IACET Accredited Provider, USA) and Six Sigma White Belt from CSSC (USA)';
    }
    return 'Operations Management dari Saylor Academy (Grade A / Terakreditasi IACET, USA) serta Six Sigma White Belt dari CSSC (USA)';
  }

  // 6. Finance, Accounting & Cost Control
  if (
    keyLower.includes('finance') ||
    keyLower.includes('accounting') ||
    keyLower.includes('tax') ||
    keyLower.includes('billing') ||
    keyLower.includes('audit')
  ) {
    if (lang === 'en') {
      return 'Operations Management from Saylor Academy (Grade A / IACET Accredited Provider, USA) and Six Sigma White Belt from CSSC (USA)';
    }
    return 'Operations Management dari Saylor Academy (Grade A / Terakreditasi IACET, USA) serta Six Sigma White Belt dari CSSC (USA)';
  }

  // 7. B2B Sales, Business Development & Key Account
  if (
    keyLower.includes('sales') ||
    keyLower.includes('business_development') ||
    keyLower.includes('account') ||
    keyLower.includes('partner')
  ) {
    if (lang === 'en') {
      return 'Google Analytics 4 (GA4) from Google Digital Academy and Six Sigma White Belt from CSSC (USA)';
    }
    return 'Google Analytics 4 (GA4) dari Google Digital Academy serta Six Sigma White Belt dari CSSC (USA)';
  }

  // 8. Administration, Secretariat & General Affairs (Non-HR)
  if (
    keyLower.includes('admin') ||
    keyLower.includes('secretary') ||
    keyLower.includes('general_affairs') ||
    keyLower.includes('office') ||
    keyLower.includes('hospital') ||
    keyLower.includes('data_entry') ||
    keyLower.includes('legal')
  ) {
    if (lang === 'en') {
      return 'Operations Management from Saylor Academy (Grade A / IACET Accredited Provider, USA) and Six Sigma White Belt from CSSC (USA)';
    }
    return 'Operations Management dari Saylor Academy (Grade A / Terakreditasi IACET, USA) serta Six Sigma White Belt dari CSSC (USA)';
  }

  // 9. Strategic Consulting & General Leadership (Default / Optimal / All / Executive)
  if (lang === 'en') {
    return 'Certified HR Specialist from MarkPlus Institute (Grade A / Outstanding) and Six Sigma White Belt from CSSC (USA)';
  }
  return 'Certified HR Specialist dari MarkPlus Institute (Grade A / Predikat Outstanding) serta Six Sigma White Belt dari CSSC (USA)';
}

/**
 * Generate Tailored Application Draft (Matching User's Specified Standard Structure)
 * Strictly separates Experience and Certification into 2 distinct paragraphs.
 */
export function generateTailoredApplicationDraft(params: {
  companyName: string;
  jobTitle: string;
  recipientEmail: string;
  keyRequirements?: string[];
  tone?: EmailTone;
  language?: EmailLanguage;
  presetKey?: string;
}): { emailSubject: string; emailBody: string; autoMatchedPresetKey: string } {
  const {
    companyName = '',
    jobTitle = 'Posisi Terkait',
    language = 'id',
    presetKey,
  } = params;

  const rawCompany = (companyName || '').trim();
  const hasRealCompany = !!rawCompany && rawCompany.toLowerCase() !== 'perusahaan' && rawCompany.toLowerCase() !== 'company' && rawCompany.toLowerCase() !== 'hiring company';
  const cleanCompany = hasRealCompany ? rawCompany : '';

  const cleanTitle = (jobTitle || '').trim() || (language === 'en' ? 'Target Position' : 'Posisi Terkait');
  const matchedPreset = matchPresetFromJobTitle(cleanTitle);
  const activePresetKey = presetKey || matchedPreset.key;

  const experienceDetails = getTailoredExperienceDetails(activePresetKey, language);
  const bulletsFormatted = experienceDetails.bullets.map((b) => `• ${b}`).join('\n');
  const certificationDesc = getTailoredCertificationSummary(activePresetKey, language);

  if (language === 'en') {
    const subject = cleanCompany
      ? `Job Application: ${cleanTitle} - ${cleanCompany} - ${APPLICANT_DATA.fullName}`
      : `Job Application: ${cleanTitle} - ${APPLICANT_DATA.fullName}`;

    const greeting = cleanCompany ? `Dear Recruitment Team at ${cleanCompany},` : 'Dear Recruitment Team,';
    const applyTarget = cleanCompany ? `for the ${cleanTitle} position at ${cleanCompany}` : `for the ${cleanTitle} position`;
    const contributeTarget = cleanCompany ? `to ${cleanCompany}` : 'to the organization';

    const body = `${greeting}

My name is ${APPLICANT_DATA.fullName}. I am writing to formally submit my application ${applyTarget}.

I bring a solid professional background with ${experienceDetails.intro}, such as:
${bulletsFormatted}
Through these experiences, I have developed a structured, proactive approach and am eager to contribute effectively ${contributeTarget}.

To further substantiate my expertise, I hold official certifications in ${certificationDesc} that directly complement this role's requirements.

For your consideration, I have attached my CV and required supporting documents.

Thank you for your time and consideration. I look forward to the opportunity to discuss my qualifications further in the next selection process.

Warm regards,
${APPLICANT_DATA.fullName}
${APPLICANT_DATA.phone}`;

    return { emailSubject: subject, emailBody: body, autoMatchedPresetKey: activePresetKey };
  }

  // Indonesian Draft (Bulleted Experience & Separate Certification Paragraph)
  const subject = cleanCompany
    ? `Lamaran Pekerjaan: ${cleanTitle} - ${cleanCompany} - ${APPLICANT_DATA.fullName}`
    : `Lamaran Pekerjaan: ${cleanTitle} - ${APPLICANT_DATA.fullName}`;

  const greeting = cleanCompany ? `Yth. Tim Recruitment ${cleanCompany},` : 'Yth. Tim Recruitment / HRD,';
  const applyTarget = cleanCompany ? `untuk posisi ${cleanTitle} di ${cleanCompany}` : `untuk posisi ${cleanTitle}`;
  const contributeTarget = cleanCompany ? `bersama ${cleanCompany}` : 'secara optimal';

  const body = `${greeting}

Perkenalkan, saya ${APPLICANT_DATA.fullName}. Saya bermaksud mengajukan lamaran ${applyTarget}.

Saya memiliki latar belakang dan pengalaman kerja dalam ${experienceDetails.intro}, seperti:
${bulletsFormatted}
Dengan pengalaman tersebut, saya terbiasa bekerja secara terstruktur, proaktif, dan siap berkontribusi ${contributeTarget}.

Sebagai penguatan kompetensi, saya memiliki sertifikasi ${certificationDesc} yang relevan dalam menunjang keberhasilan peran ini.

Sebagai bahan pertimbangan, saya melampirkan CV dan dokumen pendukung yang diperlukan.

Terima kasih atas waktu dan perhatiannya. Saya berharap dapat memperoleh kesempatan untuk mengikuti proses seleksi lebih lanjut.

Hormat saya,
${APPLICANT_DATA.fullName}
${APPLICANT_DATA.phone}`;

  return { emailSubject: subject, emailBody: body, autoMatchedPresetKey: activePresetKey };
}

/**
 * Strict Heuristic OCR Parser with Entity Disambiguation
 */
export function parseJobTextHeuristically(rawText: string, filename?: string, language?: EmailLanguage): JobScanResult {
  const text = rawText || '';
  const detectedLang = language || detectLanguageFromText(text);
  const activeLanguage = detectedLang;
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Extract Email with OCR error correction
  const detectedEmail = extractEmailStrict(text);

  // 2. Extract Phone / WhatsApp
  const detectedPhone = extractPhoneStrict(text);

  // 3. Extract Subject Format Notice
  const detectedSubjectNotice = extractSubjectFormatNotice(lines);

  // 4. Extract Company Name with strict entity validation
  const detectedCompany = extractCompanyNameStrict(lines, detectedEmail);

  // 5. Extract Job Title / Position with strict role detection
  const detectedRole = extractJobPositionStrict(lines, filename, activeLanguage);

  // 6. Extract Key Requirements
  const keyRequirements: string[] = [];
  let reqSection = false;
  for (const line of lines) {
    if (/(?:kualifikasi|persyaratan|requirements|kriteria|job\s*description|tanggung\s*jawab)/i.test(line)) {
      reqSection = true;
      continue;
    }
    if (reqSection) {
      if (/(?:kirim|send|email|kontak|contact|hubungi|apply|deadline|lokasi|penempatan)/i.test(line)) {
        reqSection = false;
      } else if (line.length > 5 && line.length < 80) {
        keyRequirements.push(line.replace(/^[-•*–\d\.\)]\s*/, ''));
        if (keyRequirements.length >= 4) break;
      }
    }
  }

  if (keyRequirements.length === 0) {
    keyRequirements.push(
      activeLanguage === 'en' ? 'Operational management & SOP governance' : 'Manajemen operasional & standardisasi SOP',
      activeLanguage === 'en' ? 'Cross-functional team coordination' : 'Koordinasi tim lintas divisi bisnis',
      activeLanguage === 'en' ? 'Process efficiency & digital automation' : 'Efisiensi proses kerja & otomatisasi sistem'
    );
  }

  // Construct Final Subject
  let customSubject = '';
  if (detectedSubjectNotice) {
    customSubject = detectedSubjectNotice
      .replace(/\[posisi\]|\[position\]|\[job title\]/gi, detectedRole)
      .replace(/\[nama\]|\[name\]|\[nama pelamar\]/gi, APPLICANT_DATA.fullName)
      .replace(/\[perusahaan\]|\[company\]/gi, detectedCompany);
  } else {
    customSubject = activeLanguage === 'en'
      ? `Job Application: ${detectedRole} - ${detectedCompany} - ${APPLICANT_DATA.fullName}`
      : `Lamaran Pekerjaan: ${detectedRole} - ${detectedCompany} - ${APPLICANT_DATA.fullName}`;
  }

  const { emailBody } = generateTailoredApplicationDraft({
    companyName: detectedCompany,
    jobTitle: detectedRole,
    recipientEmail: detectedEmail || 'recruitment@perusahaan.com',
    keyRequirements,
    tone: 'concise',
    language: activeLanguage,
  });

  return {
    companyName: detectedCompany,
    jobTitle: detectedRole,
    recipientEmail: detectedEmail || '',
    recipientPhone: detectedPhone,
    formatSubjectNotice: detectedSubjectNotice,
    keyRequirements,
    emailSubject: customSubject,
    emailBody,
    language: activeLanguage,
    rawExtractedText: rawText,
    notes: activeLanguage === 'en'
      ? 'Extracted and verified via strict entity disambiguation engine.'
      : 'Berhasil diekstrak dan diseleksi secara ketat melalui mesin analisis entitas cerdas.',
    isAi: false,
    isFallback: true,
  };
}

export function createFallbackJobScan(filename?: string, language: EmailLanguage = 'id'): JobScanResult {
  const detectedRole = extractJobPositionStrict([], filename, language);
  const detectedCompany = language === 'en' ? 'Hiring Company' : 'Perusahaan';

  const keyRequirements = language === 'en'
    ? ['Operational efficiency & workflow design', 'Team leadership & cross-functional coordination', 'SOP implementation & problem solving']
    : ['Efisiensi operasional & standardisasi SOP', 'Koordinasi tim lintas divisi bisnis', 'Orientasi pada data & perbaikan proses'];

  const { emailSubject, emailBody } = generateTailoredApplicationDraft({
    companyName: detectedCompany,
    jobTitle: detectedRole,
    recipientEmail: '',
    keyRequirements,
    tone: 'concise',
    language,
  });

  return {
    companyName: detectedCompany,
    jobTitle: detectedRole,
    recipientEmail: '',
    recipientPhone: '',
    keyRequirements,
    emailSubject,
    emailBody,
    language,
    notes: language === 'en'
      ? 'Preset for Alvareza Hilka Pratama with verified credentials.'
      : 'Draf siap kirim tersusun otomatis untuk Alvareza Hilka Pratama.',
    isAi: false,
    isFallback: true,
  };
}

export function createMailtoUrl(recipientEmail: string, subject: string, body: string, ccEmail?: string): string {
  const cleanEmail = (recipientEmail || '').trim();
  const encodedSubject = encodeURIComponent(subject || '');
  const encodedBody = encodeURIComponent(body || '');
  let url = `mailto:${cleanEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  if (ccEmail && ccEmail.trim().length > 0) {
    url += `&cc=${encodeURIComponent(ccEmail.trim())}`;
  }
  return url;
}
