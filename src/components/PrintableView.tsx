import React, { useState, useEffect } from 'react';
import {
  Download,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  FileCheck,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
  Layers,
  Building2,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowUp,
  ArrowDown,
  Loader2,
  FileText,
  X,
  LayoutList,
  Minus,
  TrendingUp,
  Code2,
  FolderGit2,
  Cpu,
  Trophy,
  Palette,
  Search,
  Check,
} from 'lucide-react';
import { generateATSPDF, getATSPDFBlobUrl, buildATSPDFDocument, renderPdfToPageImages, PDFItemSelectionConfig, PRESET_HEADLINES, PRESET_SUMMARIES, resolvePresetFromQuery } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';
import { CVData } from '../types';

const DESIGN_OPTIONS = [
  {
    key: 'block',
    titleId: 'Tema Blok (Header Solid Navy)',
    titleEn: 'Block Theme (Solid Navy Banner)',
    descId: 'Judul seksi dengan latar blok Navy solid & teks putih kontras tinggi. Tampilan klasik & tegas.',
    descEn: 'Section headers with solid Navy filled block & high-contrast white text. Classic & authoritative.',
  },
  {
    key: 'line',
    titleId: 'Tema Garis (Underline Minimalis)',
    titleEn: 'Line Theme (Minimalist Underline)',
    descId: 'Judul seksi dengan aksen garis bawah bersih. Format standar ATS paling disukai recruiter.',
    descEn: 'Section headers with crisp underline accent. Clean ATS layout preferred by recruiters.',
  },
  {
    key: 'badge',
    titleId: 'Tema Badge (Kapsul Header)',
    titleEn: 'Badge Theme (Header Pill)',
    descId: 'Judul seksi dalam bingkai kapsul badge modern. Terlihat segar & kontemporer.',
    descEn: 'Section headers wrapped in modern badge pills. Fresh & contemporary style.',
  },
  {
    key: 'plain',
    titleId: 'Tema Polos (Minimalis Murni)',
    titleEn: 'Plain Theme (Pure Minimalist)',
    descId: 'Tanpa latar atau garis dekoratif. Fokus murni pada konten teks & kemudahan pemindaian.',
    descEn: 'No decorative backgrounds or lines. Pure focus on text content & scannability.',
  },
];

const ROLE_PRESET_OPTIONS = [
  {
    key: 'optimal',
    code: 'OPT',
    titleId: 'Preset Peran Optimal (Ringkas & Terbaik)',
    titleEn: 'Optimal Role Preset (Best & Concise)',
    tag: 'Rekomendasi Utama',
    descId: 'Rekomendasi terbaik tanpa spesifik posisi: Kurasi metrik unggulan, 2 proyek & solusi terbaik, 2 organisasi, & 3 prestasi tertinggi untuk CV 3-4 halaman yang sangat efektif.',
    descEn: 'Best general recommendation: Curated top metrics, top 2 projects & solutions, top 2 orgs, & top 3 highest achievements for an impactful 3-4 page CV.',
  },
  {
    key: 'all',
    code: 'ALL',
    titleId: 'Semua (Komprehensif)',
    titleEn: 'All (Comprehensive)',
    tag: 'Full Portfolio',
    descId: 'Menampilkan seluruh 13 metrik utama, 3 riwayat kerja, 11 proyek, & 6 solusi digital secara utuh.',
    descEn: 'Shows complete portfolio including 13 key metrics, 3 work histories, 11 projects, & 6 digital solutions.',
  },
  {
    key: 'business_operations',
    code: 'OPS',
    titleId: 'Business Operations / Operations Manager',
    titleEn: 'Business Operations / Operations Manager',
    tag: 'Operations & SOP',
    descId: 'Fokus pada koordinasi 6 divisi, 20+ SOP, efisiensi rantai pasok, & manajemen 13 gerai toko ritel.',
    descEn: 'Focuses on 6 working divisions, 20+ SOPs, supply chain efficiency, & 13 retail store outlets.',
  },
  {
    key: 'project_management',
    code: 'PMO',
    titleId: 'Project Management / Project Operations',
    titleEn: 'Project Management / Project Operations',
    tag: 'SLA & Agile',
    descId: 'Mengedepankan eksekusi 100+ proyek, penyampaian SLA >95%, & metodologi manajemen alur kerja Agile.',
    descEn: 'Highlights 100+ project execution, >95% SLA delivery, & Agile workflow management.',
  },
  {
    key: 'business_development',
    code: 'BDV',
    titleId: 'Business Development / Account Manager',
    titleEn: 'Business Development / Account Manager',
    tag: 'B2B Sales & Growth',
    descId: 'Memprioritaskan akuisisi database B2B 4.000+ perusahaan, pitch solusi korporat, & kemitraan 100+ klien.',
    descEn: 'Prioritizes 4,000+ corporate B2B leads, corporate solution pitching, & 100+ client partnerships.',
  },
  {
    key: 'digital_transformation',
    code: 'DIG',
    titleId: 'Digital Transformation / Process Improvement',
    titleEn: 'Digital Transformation / Process Improvement',
    tag: 'ERP & Automation',
    descId: 'Menyoroti otomatisasi alur kerja, penghematan operasional 70%, & pengembangan 50+ aplikasi digital.',
    descEn: 'Focuses on workflow automation, 70% operational savings, & 50+ digital application projects.',
  },
  {
    key: 'hr_operations',
    code: 'HRS',
    titleId: 'HR Operations / People Development',
    titleEn: 'HR Operations / People Development',
    tag: 'Talent & HRIS',
    descId: 'Fokus pada sertifikasi HR Grade A, pengelolaan 30+ fungsionaris, rekrutmen, & sistem My Career HRIS.',
    descEn: 'Focuses on Grade A HR certification, 30+ team leadership, recruitment, & My Career HRIS system.',
  },
  {
    key: 'strategic_management',
    code: 'MGT',
    titleId: 'Management / Strategic Management',
    titleEn: 'Management / Strategic Management',
    tag: 'Executive Leadership',
    descId: 'Menampilkan kepemimpinan Presiden Mahasiswa, tata kelola eksekutif multi-divisi, & arahan strategis.',
    descEn: 'Showcases Student Executive President leadership, multi-divisional executive governance, & strategy.',
  },
  {
    key: 'marketing',
    code: 'MKT',
    titleId: 'Marketing / Digital Marketing',
    titleEn: 'Marketing / Digital Marketing',
    tag: 'Branding & Ads',
    descId: 'Mengedepankan strategi campaign multi-outlet, riset pasar B2B, & ekosistem promosi digital.',
    descEn: 'Highlights multi-outlet campaign strategies, B2B market research, & digital growth ecosystem.',
  },
  {
    key: 'finance_accounting',
    code: 'ACC',
    titleId: 'Finance / Accounting',
    titleEn: 'Finance / Accounting',
    tag: 'Cashflow & COGS',
    descId: 'Fokus pada pencatatan buku besar, kalkulasi COGS ritel, rekonsiliasi kas, & Vynance Accounting System.',
    descEn: 'Focuses on general ledger, retail COGS calculation, cash reconciliation, & Vynance Accounting.',
  },
  {
    key: 'software_development',
    code: 'SWE',
    titleId: 'Software / Web Development',
    titleEn: 'Software / Web Development',
    tag: 'Full-Stack & Web App',
    descId: 'Arsitek 50+ aplikasi web (ERP Global Mitra Gateway, Logistor, CRM NextMark, Looker Studio).',
    descEn: 'Architect of 50+ web apps (Global Mitra Gateway ERP, Logistor, NextMark CRM, Looker Studio).',
  },
  {
    key: 'branch_manager',
    code: 'BRN',
    titleId: 'Branch Manager / Operasional Multi-Cabang',
    titleEn: 'Branch Manager / Multi-Unit Operations',
    tag: 'Retail & CSAT 98%',
    descId: 'Fokus pada pengawasan 13 gerai toko ritel, layanan utilitas BPSPAMS (2.000+ pelanggan), & CSAT 98%.',
    descEn: 'Focuses on oversight of 13 retail outlets, BPSPAMS water utility (2,000+ clients), & 98% CSAT.',
  },
  {
    key: 'office_administration',
    code: 'ADM',
    titleId: 'Administrasi Perkantoran & Dukungan Eksekutif',
    titleEn: 'Office Administration & Executive Support',
    tag: 'Admin & Executive Support',
    descId: 'Mengutamakan penyusunan SOP administratif, kearsipan digital, rekonsiliasi kas, & operasional sekretariat.',
    descEn: 'Prioritizes administrative SOP formulation, digital archiving, cash reconciliation, & secretariat.',
  },
  {
    key: 'public_relations',
    code: 'PRS',
    titleId: 'Humas & Komunikasi Korporat',
    titleEn: 'Public Relations & Corporate Communications',
    tag: 'PR & Media Relations',
    descId: 'Memunculkan kepemimpinan Pimpinan Humas, kemitraan 100+ instansi, & penyelenggaraan 15+ seminar nasional.',
    descEn: 'Showcases Head of PR leadership, 100+ institutional partnerships, & 15+ national seminars.',
  },
  {
    key: 'sales_executive',
    code: 'SLS',
    titleId: 'Eksekutif Penjualan & Akun B2B',
    titleEn: 'Sales Executive & B2B Account',
    tag: 'B2B Prospecting & Pitcher',
    descId: 'Menyoroti Regional Solution Pitcher Konica Minolta, penetrasi B2B 5.200+ kontak, & retensi akun korporat.',
    descEn: 'Highlights Konica Minolta Regional Solution Pitcher, 5,200+ B2B penetration, & corporate retention.',
  },
  {
    key: 'supply_chain_logistics',
    code: 'SCM',
    titleId: 'Rantai Pasok & Operasional Logistik',
    titleEn: 'Supply Chain & Logistics Operations',
    tag: 'Supply Chain & Logistics',
    descId: 'Mengedepankan distribusi 13 gerai, sistem logistik Logistor App, & pemangkasan kendala distribusi 70%.',
    descEn: 'Highlights 13-outlet distribution, Logistor App logistics system, & 70% distribution bottleneck reduction.',
  },
];

const QUICKBAR_SECTIONS = [
  { key: 'summary', icon: FileText, labelId: 'Ringkasan', labelEn: 'Summary' },
  { key: 'metrics', icon: TrendingUp, labelId: 'Metrik', labelEn: 'Metrics' },
  { key: 'experiences', icon: Briefcase, labelId: 'Pengalaman', labelEn: 'Experience' },
  { key: 'education', icon: GraduationCap, labelId: 'Pendidikan', labelEn: 'Education' },
  { key: 'skills', icon: Code2, labelId: 'Keahlian', labelEn: 'Skills' },
  { key: 'certifications', icon: Award, labelId: 'Sertifikasi', labelEn: 'Certifications' },
  { key: 'consultingProjects', icon: FolderGit2, labelId: 'Konsultasi', labelEn: 'Consulting' },
  { key: 'digitalSolutions', icon: Cpu, labelId: 'Solusi AI', labelEn: 'Digital AI' },
  { key: 'organizations', icon: Building2, labelId: 'Organisasi', labelEn: 'Organization' },
  { key: 'achievements', icon: Trophy, labelId: 'Prestasi', labelEn: 'Achievements' },
];



const CheckSquare = ({ className }: { className?: string }) => {
  const isShrink = className?.includes('shrink-0');
  return (
    <div className={`w-[16px] h-[16px] rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200 bg-[#0062E3] border-[#0062E3] ${isShrink ? 'shrink-0' : ''}`}>
      <svg className="w-2.5 h-2.5 text-white scale-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

const Square = ({ className }: { className?: string }) => {
  const isShrink = className?.includes('shrink-0');
  return (
    <div className={`w-[16px] h-[16px] rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200 bg-white border-slate-300 group-hover:border-[#0062E3]/50 ${isShrink ? 'shrink-0' : ''}`}>
      <svg className="w-2.5 h-2.5 text-white scale-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

export interface ItemSelectionState {
  summary: boolean;
  metrics: Record<number, boolean>;
  experiences: Record<string, boolean>;
  education: Record<number, boolean>;
  skills: {
    hardGroup: boolean;
    hard: Record<number, boolean>;
    softGroup: boolean;
    soft: Record<number, boolean>;
    toolsGroup: boolean;
    tools: Record<number, boolean>;
  };
  certifications: Record<string, boolean>;
  consultingProjects: Record<string, boolean>;
  digitalSolutions: Record<string, boolean>;
  organizations: Record<number, boolean>;
  achievements: Record<string, boolean>;
}

const defaultItemSelection: ItemSelectionState = {
  summary: true,
  metrics: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true },
  experiences: {
    'exp-1': true,
    'exp-2': true,
    'exp-3': true,
  },
  education: { 0: true, 1: true },
  skills: {
    hardGroup: true,
    hard: { 0: true, 1: true, 2: true, 3: true, 4: true },
    softGroup: true,
    soft: { 0: true, 1: true, 2: true, 3: true, 4: true },
    toolsGroup: true,
    tools: { 0: true, 1: true, 2: true, 3: true, 4: true },
  },
  certifications: {
    'cert-1': true,
  },
  consultingProjects: {
    'proj-1': true,
    'proj-2': true,
    'proj-3': true,
    'proj-4': true,
    'proj-5': true,
    'proj-6': true,
    'proj-7': true,
    'proj-8': true,
    'proj-9': true,
    'proj-10': true,
    'proj-11': true,
  },
  digitalSolutions: {
    'sol-1': true,
    'sol-2': true,
    'sol-3': true,
    'sol-4': true,
    'sol-5': true,
    'sol-6': true,
  },
  organizations: { 0: true, 1: true, 2: true, 3: true, 4: true },
  achievements: {
    'ach-1': true,
    'ach-2': true,
    'ach-3': true,
    'ach-4': true,
    'ach-5': true,
    'ach-6': true,
    'ach-7': true,
    'ach-8': true,
    'ach-9': true,
    'ach-10': true,
    'ach-11': true,
    'ach-12': true,
    'ach-13': true,
    'ach-14': true,
    'ach-15': true,
    'ach-16': true,
    'ach-17': true,
    'ach-18': true,
  },
};

const optimalItemSelection: ItemSelectionState = {
  summary: true,
  metrics: { 0: true, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10: false, 11: true, 12: false },
  experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': true },
  education: { 0: true, 1: false },
  skills: {
    hardGroup: true,
    hard: { 0: true, 1: true, 2: false, 3: true, 4: true },
    softGroup: true,
    soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
    toolsGroup: true,
    tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
  },
  certifications: { 'cert-1': false },
  consultingProjects: {
    'proj-1': true,
    'proj-2': true,
    'proj-3': false,
    'proj-4': false,
    'proj-5': false,
    'proj-6': false,
    'proj-7': false,
    'proj-8': false,
    'proj-9': false,
    'proj-10': false,
    'proj-11': false,
  },
  digitalSolutions: {
    'sol-1': true,
    'sol-2': true,
    'sol-3': false,
    'sol-4': false,
    'sol-5': false,
    'sol-6': false,
  },
  organizations: { 0: true, 1: true, 2: false, 3: false, 4: false },
  achievements: {
    'ach-1': true,
    'ach-2': false,
    'ach-3': false,
    'ach-4': false,
    'ach-5': true,
    'ach-6': false,
    'ach-7': false,
    'ach-8': true,
    'ach-9': false,
    'ach-10': false,
    'ach-11': false,
    'ach-12': false,
    'ach-13': false,
    'ach-14': false,
    'ach-15': false,
    'ach-16': false,
    'ach-17': false,
    'ach-18': false,
  },
};

export type DesignPreset = 'block' | 'line' | 'plain' | 'badge';

export interface AtsDocumentSheetProps {
  sectionOrders: any;
  cvData: CVData;
  items: ItemSelectionState;
  language: 'id' | 'en';
  totalActiveItems: number;
  headline?: string;
  summaryText?: string;
  designPreset?: DesignPreset;
}

/**
 * Reusable Paper Sheet Component for CV Document
 */
export const AtsDocumentSheet: React.FC<AtsDocumentSheetProps> = ({
  cvData,
  items,
  language,
  totalActiveItems,
  sectionOrders,
  headline,
  summaryText,
  designPreset = 'block',
}) => {
  const renderSectionHeader = (title: string) => {
    if (designPreset === 'line') {
      return (
        <div className="border-b border-slate-400 pb-0.5 mb-2 mt-4 flex items-center justify-between">
          <h2 className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F172A]">
            {title}
          </h2>
        </div>
      );
    }
    
    if (designPreset === 'plain') {
      return (
        <div className="mb-2 mt-4 flex items-center justify-between">
          <h2 className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F172A]">
            {title}
          </h2>
        </div>
      );
    }
    
    if (designPreset === 'badge') {
      return (
        <div className="mb-2 mt-4 flex items-start">
          <div className="bg-[#0F172A] px-2.5 py-1 rounded-[2px] inline-flex items-center">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
              {title}
            </h2>
          </div>
        </div>
      );
    }
    
    // Default: 'block'
    return (
      <div className="bg-[#0F172A] text-white px-2.5 py-1 mb-2 mt-3 rounded-[2px] flex items-center justify-between">
        <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
          {title}
        </h2>
      </div>
    );
  };

  return (
    <div
      id="ats-document-root"
      className="bg-white p-4 sm:p-7 md:p-9 shadow-xl print:shadow-none border border-slate-200/90 print:border-none print:p-0 font-sans transition-all duration-200 mx-auto w-full max-w-3xl text-slate-900 rounded-lg overflow-x-hidden select-text"
      style={{ minHeight: '297mm' }}
    >
      {/* Header */}
      <header className="pb-2.5 mb-2 border-b border-slate-200 text-center">
        <h1 className="text-xl sm:text-2xl md:text-[26px] tracking-tight uppercase leading-tight font-extrabold text-[#0F172A] break-words">
          {cvData.personalInfo.fullName}
        </h1>

        <p className="text-xs sm:text-[13px] tracking-tight font-bold text-[#0F172A] break-words">
          {headline || cvData.personalInfo.headline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-600 mt-2.5 font-normal">
          <span>{cvData.personalInfo.phone}</span>
          <span className="text-slate-300">|</span>
          <a href={`mailto:${cvData.personalInfo.email}`} className="text-slate-900 hover:underline">
            {cvData.personalInfo.email}
          </a>
          <span className="text-slate-300">|</span>
          <a href={`https://${cvData.personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline font-bold">
            {cvData.personalInfo.linkedin}
          </a>
          <span className="text-slate-300">|</span>
          <a href={`https://${cvData.personalInfo.website}`} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline font-medium">
            {cvData.personalInfo.website}
          </a>
        </div>
      </header>

      {/* 1. Ringkasan */}
      {items.summary && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Professional Summary' : 'Ringkasan')}
          <p className="text-[13px] text-slate-700 leading-relaxed font-normal">
            {summaryText || cvData.personalInfo.summary}
          </p>
        </section>
      )}

      {/* 2. Sorotan Metrik */}
      {Object.values(items.metrics).some(Boolean) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Key Metrics & Highlights' : 'Sorotan Kinerja & Metrik Kunci')}
          <ul className="space-y-1.5 text-[13px] text-slate-800">
            {cvData.metrics
              .map((m, idx) => ({
                idx,
                text: `${m.value} ${m.label}: ${m.sublabel}`,
              }))
              .filter((m) => items.metrics[m.idx])
              .sort((a, b) => (sectionOrders.metrics.indexOf(a.idx) !== -1 ? sectionOrders.metrics.indexOf(a.idx) : a.idx) - (sectionOrders.metrics.indexOf(b.idx) !== -1 ? sectionOrders.metrics.indexOf(b.idx) : b.idx))
              .map((m) => {
                const colonIdx = m.text.indexOf(':');
                const prefix = colonIdx !== -1 ? m.text.substring(0, colonIdx + 1) : m.text;
                const rest = colonIdx !== -1 ? m.text.substring(colonIdx + 1) : '';
                return (
                  <li key={m.idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">
                      <strong className="font-bold text-[#0F172A]">{prefix}</strong>
                      <span className="font-normal text-slate-700">{rest}</span>
                    </span>
                  </li>
                );
              })}
          </ul>
        </section>
      )}

      {/* 3. Pengalaman Kerja */}
      {Object.values(items.experiences).some(Boolean) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Work Experience' : 'Pengalaman Kerja')}
          <div className="space-y-3">
            {cvData.experiences
              .filter((exp) => items.experiences[exp.id])
              .sort((a, b) => sectionOrders.experiences.indexOf(a.id) - sectionOrders.experiences.indexOf(b.id))
              .map((exp) => (
                <div key={exp.id} className="space-y-1 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-[#0F172A] uppercase">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-bold text-slate-800 shrink-0 ml-2">
                      {exp.location} ({exp.type})
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <div className="text-[13px] font-bold text-slate-800">
                      {exp.role}
                    </div>
                    <span className="text-xs font-bold text-slate-700 shrink-0 ml-2">
                      {exp.period}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-[13px] text-slate-700 leading-relaxed font-normal pt-0.5">
                      {exp.description}
                    </p>
                  )}

                  <ul className="space-y-1 text-[13px] text-slate-800 pt-0.5">
                    {exp.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                        <span className="flex-1 font-normal text-slate-700">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-slate-600 font-medium pt-0.5">
                    <strong className="font-bold text-slate-900">Tools & Platform:</strong> {exp.tools.join(', ')}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* 4. Pendidikan */}
      {Object.values(items.education).some(Boolean) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Education' : 'Pendidikan')}
          <div className="space-y-3.5">
            {cvData.education
              .map((edu, idx) => ({ ...edu, idx }))
              .filter((edu) => items.education[edu.idx])
              .sort((a, b) => sectionOrders.education.indexOf(a.idx) - sectionOrders.education.indexOf(b.idx))
              .map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <strong className="font-bold text-[#0F172A] uppercase text-sm">
                      {edu.institution}
                    </strong>
                    <span className="text-xs text-slate-800 font-bold shrink-0 ml-2">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-[13px] font-bold text-slate-800">
                    {edu.degree}
                  </div>
                  {edu.detail && (
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {edu.detail}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}

      {/* 5. Keahlian */}
      {(
        (items.skills.hardGroup && Object.values(items.skills.hard || {}).some(Boolean)) ||
        (items.skills.softGroup && Object.values(items.skills.soft || {}).some(Boolean)) ||
        (items.skills.toolsGroup && Object.values(items.skills.tools || {}).some(Boolean))
      ) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Core Competencies & Skills' : 'Keahlian')}
          <div className="space-y-2">
            {items.skills.hardGroup && Object.values(items.skills.hard || {}).some(Boolean) && (
              <div>
                <div className="text-[13px] font-bold text-[#0F172A] mb-1">
                  Hard Skills:
                </div>
                <ul className="space-y-1 text-[13px] text-slate-800">
                  {cvData.skills.hard
                    .map((group, idx) => ({ ...group, idx }))
                    .filter((g) => items.skills.hard?.[g.idx])
                    .sort((a, b) => {
                      const idxA = sectionOrders?.skills_hard?.indexOf(a.idx) ?? -1;
                      const idxB = sectionOrders?.skills_hard?.indexOf(b.idx) ?? -1;
                      return (idxA !== -1 ? idxA : a.idx) - (idxB !== -1 ? idxB : b.idx);
                    })
                    .map((group) => (
                      <li key={group.idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                        <span className="flex-1 font-normal text-slate-700">
                          <strong className="font-bold text-[#0F172A]">{group.category}:</strong>{' '}
                          {group.items.join(', ')}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {items.skills.softGroup && Object.values(items.skills.soft || {}).some(Boolean) && (
              <div>
                <div className="text-[13px] font-bold text-[#0F172A] mb-1">
                  {language === 'en' ? 'Soft Skills & Leadership:' : 'Soft Skills & Kepemimpinan:'}
                </div>
                <ul className="space-y-1 text-[13px] text-slate-800">
                  {cvData.skills.soft
                    .map((item, idx) => ({ item, idx }))
                    .filter((s) => items.skills.soft?.[s.idx])
                    .sort((a, b) => {
                      const idxA = sectionOrders?.skills_soft?.indexOf(a.idx) ?? -1;
                      const idxB = sectionOrders?.skills_soft?.indexOf(b.idx) ?? -1;
                      return (idxA !== -1 ? idxA : a.idx) - (idxB !== -1 ? idxB : b.idx);
                    })
                    .map(({ item, idx }) => {
                      const colonIdx = item.indexOf(':');
                      if (colonIdx !== -1) {
                        const prefix = item.substring(0, colonIdx + 1);
                        const rest = item.substring(colonIdx + 1);
                        return (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                            <span className="flex-1 font-normal text-slate-700">
                              <strong className="font-bold text-[#0F172A]">{prefix}</strong>
                              {rest}
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                          <span className="flex-1 font-normal text-slate-700">{item}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {items.skills.toolsGroup && Object.values(items.skills.tools || {}).some(Boolean) && (
              <div>
                <div className="text-[13px] font-bold text-[#0F172A] mb-1">
                  {language === 'en' ? 'Tools & Software Ecosystem:' : 'Tools & Ekosistem Digital:'}
                </div>
                <ul className="space-y-1 text-[13px] text-slate-800">
                  {(cvData.skills.toolCategories || [])
                    .map((cat, idx) => ({ ...cat, idx }))
                    .filter((c) => items.skills.tools?.[c.idx])
                    .sort((a, b) => {
                      const idxA = sectionOrders?.skills_tools?.indexOf(a.idx) ?? -1;
                      const idxB = sectionOrders?.skills_tools?.indexOf(b.idx) ?? -1;
                      return (idxA !== -1 ? idxA : a.idx) - (idxB !== -1 ? idxB : b.idx);
                    })
                    .map((cat) => (
                      <li key={cat.idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                        <span className="flex-1 font-normal text-slate-700">
                          <strong className="font-bold text-[#0F172A]">{cat.category}:</strong> {cat.tools}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. Sertifikasi */}
      {Object.values(items.certifications).some(Boolean) && cvData.certifications && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Certifications' : 'Sertifikasi')}
          <ul className="space-y-1 text-[13px] text-slate-800">
            {cvData.certifications
              .filter((cert) => items.certifications[cert.id])
              .sort((a, b) => sectionOrders.certifications.indexOf(a.id) - sectionOrders.certifications.indexOf(b.id))
              .map((cert) => (
                <li key={cert.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">
                    <strong className="font-bold text-[#0F172A]">
                      {cert.title} — {cert.issuer} ({cert.grade} | {language === 'en' ? `Validity: ${cert.period}` : `Berlaku: ${cert.period}`}):
                    </strong>{' '}
                    <span className="font-normal text-slate-700">{cert.description}</span>
                  </span>
                </li>
              ))}
          </ul>
        </section>
      )}

      {/* 7. Portofolio Konsultansi */}
      {Object.values(items.consultingProjects).some(Boolean) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Consulting & Independent Projects' : 'Portofolio Konsultansi & Proyek Independen')}
          <p className="text-[13px] text-slate-700 leading-relaxed font-normal mb-2">
            {cvData.consulting.summary}
          </p>

          <div className="space-y-3">
            {(cvData.consulting.projects || [])
              .filter((proj) => items.consultingProjects[proj.id])
              .sort((a, b) => {
                const idxA = sectionOrders.consultingProjects?.indexOf(a.id) ?? -1;
                const idxB = sectionOrders.consultingProjects?.indexOf(b.id) ?? -1;
                return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
              })
              .map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[12.5px] font-bold text-[#0F172A] uppercase">
                      {proj.organization}
                    </h3>
                    <span className="text-xs font-bold text-slate-800 shrink-0 ml-2">
                      {proj.sector}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-800">
                      {proj.role}
                    </span>
                    <span className="text-xs font-bold text-slate-700 shrink-0 ml-2">
                      {proj.periodType}
                    </span>
                  </div>

                  <ul className="space-y-1 text-[13px] text-slate-800 pt-0.5">
                    {proj.highlights.map((hl, hlIdx) => (
                      <li key={hlIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#0F172A] font-bold text-xs shrink-0 select-none mt-0.5">•</span>
                        <span className="flex-1 font-normal text-slate-700">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* 8. Solusi Digital */}
      {Object.values(items.digitalSolutions).some(Boolean) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Digital Solutions Portfolio' : 'Portofolio Solusi Digital')}
          <p className="text-[13px] text-slate-700 leading-relaxed font-normal mb-2">
            {language === 'en'
              ? 'All web-based system prototypes are designed as live testing prototypes ready for customization according to corporate workflows and operational scale:'
              : 'Seluruh prototipe sistem berbasis web ini dirancang sebagai kerangka kerja awal (live testing prototype) yang siap dikustomisasi sesuai alur kerja dan skala operasional perusahaan:'}
          </p>

          <ul className="space-y-1.5 text-[13px] text-slate-800">
            {cvData.digitalSolutions
              .filter((sol) => items.digitalSolutions[sol.id])
              .sort((a, b) => sectionOrders.digitalSolutions.indexOf(a.id) - sectionOrders.digitalSolutions.indexOf(b.id))
              .map((sol) => {
                const displayUrl = sol.demoUrl ? sol.demoUrl.replace(/^https?:\/\//, '') : '';
                return (
                  <li key={sol.id} className="leading-relaxed">
                    <div>
                      <strong className="font-bold text-[#0F172A]">{sol.title} | {sol.subtitle}</strong>
                      <div className="font-normal text-slate-700 mt-0.5">
                        {sol.description}
                      </div>
                      {sol.impact && (
                        <div className="text-[13px] text-slate-700 mt-0.5">
                          <strong className="text-slate-900 font-bold">{language === 'en' ? 'Impact:' : 'Dampak:'}</strong>{' '}
                          <span className="text-slate-700 font-normal">{sol.impact}</span>
                        </div>
                      )}
                      {sol.demoUrl && (
                        <div className="text-xs text-slate-600 font-medium mt-0.5">
                          <strong className="text-slate-800">Link & Demo:</strong>{' '}
                          <a href={sol.demoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                            {sol.demoUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      )}

      {/* 9. Pengalaman Organisasi */}
      {Object.values(items.organizations).some(Boolean) && (
        <section className="mb-3.5">
          {renderSectionHeader(language === 'en' ? 'Organizational Leadership' : 'Pengalaman Organisasi & Kepemimpinan')}
          <div className="space-y-2">
            {cvData.organizations
              .map((org, idx) => ({ ...org, idx }))
              .filter((org) => items.organizations[org.idx])
              .sort((a, b) => sectionOrders.organizations.indexOf(a.idx) - sectionOrders.organizations.indexOf(b.idx))
              .map((org, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <strong className="font-bold text-[#0F172A] text-[13px]">
                      {org.role}
                    </strong>
                    <span className="text-xs text-slate-800 font-bold shrink-0 ml-2">
                      {org.period}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-700">
                    {org.organization}
                  </div>
                  {org.description && (
                    <p className="text-[13px] text-slate-700 font-normal leading-relaxed">
                      {org.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}

      {/* 10. Prestasi & Penghargaan */}
      {Object.values(items.achievements).some(Boolean) && (
        <section className="mb-3.5 print:break-inside-avoid">
          {renderSectionHeader(
            language === 'en'
              ? `Honors, Awards & Achievements (${cvData.achievements.filter((a) => items.achievements[a.id]).length} Items)`
              : `Prestasi, Penghargaan & Pencapaian (${cvData.achievements.filter((a) => items.achievements[a.id]).length} Kegiatan)`
          )}
          <div className="space-y-2">
            {cvData.achievements
              .filter((ach) => items.achievements[ach.id])
              .sort((a, b) => sectionOrders.achievements.indexOf(a.id) - sectionOrders.achievements.indexOf(b.id))
              .map((ach) => (
                <div key={ach.id} className="space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline gap-2">
                    <strong className="font-bold text-[#0F172A] text-[13px]">
                      {ach.title}
                    </strong>
                    <span className="text-xs text-slate-800 font-bold shrink-0 ml-2">
                      {language === 'en' ? `${ach.level} Level` : `Tingkat ${ach.level}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <div className="text-xs font-bold text-slate-700">
                      {ach.organization}
                    </div>
                    <span className="text-xs text-slate-700 font-bold shrink-0 ml-2">
                      {ach.year}
                    </span>
                  </div>
                  {ach.description && (
                    <p className="text-[13px] text-slate-700 font-normal leading-relaxed">
                      {ach.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}

      {totalActiveItems === 0 && (
        <div className="py-16 text-center text-slate-400">
          <svg className="w-12 h-12 mx-auto text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><polyline points="16 8 10 14 8 12"/></svg>
          <p className="text-sm font-semibold text-slate-600">
            {language === 'en' ? 'No items selected.' : 'Belum ada item yang dipilih.'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en' ? 'Please check at least one item above to build your PDF.' : 'Silakan centang minimal satu item di atas untuk membuat CV PDF Anda.'}
          </p>
        </div>
      )}
    </div>
  );
};

interface SectionHeadlineBarProps {
  title: string;
  isActive: boolean;
  isExpanded: boolean;
  onToggleAccordion: () => void;
  onToggleActive: (active: boolean) => void;
}

const SectionHeadlineBar: React.FC<SectionHeadlineBarProps> = ({
  title,
  isActive,
  isExpanded,
  onToggleAccordion,
  onToggleActive,
}) => {
  return (
    <div className="flex items-center justify-between py-1 gap-2">
      <span className="font-bold text-sm text-slate-900 select-none truncate">
        {title}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        {/* Seekbar Toggle: Blue when ON, Gray when OFF, No ON/OFF text */}
        <div
          onClick={() => onToggleActive(!isActive)}
          className={`relative inline-flex items-center w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out ${
            isActive ? 'bg-[#0062E3]' : 'bg-slate-300'
          }`}
          title={isActive ? 'Status Aktif (Klik/Geser untuk nonaktifkan)' : 'Status Nonaktif (Klik/Geser untuk aktifkan)'}
        >
          <input
            type="range"
            min={0}
            max={1}
            step={1}
            value={isActive ? 1 : 0}
            onChange={(e) => onToggleActive(e.target.value === '1')}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label={`Toggle ${title}`}
          />
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out pointer-events-none ${
              isActive ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>

        <button
          type="button"
          onClick={onToggleAccordion}
          className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          title="Buka/Tutup Item"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

interface PrintableViewProps {
  onBackToLanding?: () => void;
  onOpenAtsModal?: () => void;
  isPreviewOpen?: boolean;
  onClosePreview?: () => void;
  onOpenPreview?: () => void;
  disableUrlActions?: boolean;
}

export const PrintableView: React.FC<PrintableViewProps> = ({
  onBackToLanding,
  onOpenAtsModal,
  isPreviewOpen = false,
  onClosePreview,
  onOpenPreview,
  disableUrlActions = false,
}) => {
  const { language, activeCvData: cvData, t } = useLanguage();

  // Granular item-level selection state

  const [items, setItems] = useState<ItemSelectionState>(optimalItemSelection);

  const [sectionOrders, setSectionOrders] = useState({
    metrics: cvData.metrics.map((_, i) => i),
    experiences: cvData.experiences.map(e => e.id),
    education: cvData.education.map((_, i) => i),
    skills: ['hard', 'soft', 'tools'],
    skills_hard: cvData.skills.hard.map((_, i) => i),
    skills_soft: cvData.skills.soft.map((_, i) => i),
    skills_tools: (cvData.skills.toolCategories || []).map((_, i) => i),
    certifications: cvData.certifications?.map(c => c.id) || [],
    consultingProjects: cvData.consulting.projects?.map(p => p.id) || [],
    digitalSolutions: cvData.digitalSolutions?.map(s => s.id) || [],
    organizations: cvData.organizations.map((_, i) => i),
    achievements: cvData.achievements?.map(a => a.id) || []
  });

  const moveItem = (sectionKey: keyof typeof sectionOrders, indexOrId: string | number, direction: 'up' | 'down') => {
    setSectionOrders(prev => {
      const arr = [...prev[sectionKey]];
      const idx = arr.indexOf(indexOrId as never);
      if (idx === -1) return prev;
      
      if (direction === 'up' && idx > 0) {
        [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      } else if (direction === 'down' && idx < arr.length - 1) {
        [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      }
      
      return { ...prev, [sectionKey]: arr };
    });
  };


  // Accordion open/close state for child item checkboxes
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    metrics: true,
    experiences: true,
    education: true,
    skills: true,
    skills_hard: true,
    skills_soft: true,
    skills_tools: true,
    certifications: true,
    consultingProjects: true,
    digitalSolutions: true,
    organizations: true,
    achievements: true,
  });

  const [isDownloading, setIsDownloading] = useState(false);

  const toggleAccordion = (secKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [secKey]: !prev[secKey],
    }));
  };

  // Check section active states strictly against valid items
  const isSectionActive = (secKey: keyof ItemSelectionState): boolean => {
    if (secKey === 'summary') return !!items.summary;
    if (secKey === 'metrics') return cvData.metrics.some((_, idx) => !!items.metrics[idx]);
    if (secKey === 'experiences') return cvData.experiences.some((e) => !!items.experiences[e.id]);
    if (secKey === 'education') return cvData.education.some((_, idx) => !!items.education[idx]);
    if (secKey === 'skills')
      return (
        (items.skills.hardGroup && Object.values(items.skills.hard || {}).some(Boolean)) ||
        (items.skills.softGroup && Object.values(items.skills.soft || {}).some(Boolean)) ||
        (items.skills.toolsGroup && Object.values(items.skills.tools || {}).some(Boolean))
      );
    if (secKey === 'certifications') return (cvData.certifications || []).some((c) => !!items.certifications[c.id]);
    if (secKey === 'consultingProjects') return (cvData.consulting.projects || []).some((p) => !!items.consultingProjects[p.id]);
    if (secKey === 'digitalSolutions') return (cvData.digitalSolutions || []).some((s) => !!items.digitalSolutions[s.id]);
    if (secKey === 'organizations') return (cvData.organizations || []).some((_, idx) => !!items.organizations[idx]);
    if (secKey === 'achievements') return (cvData.achievements || []).some((a) => !!items.achievements[a.id]);
    return false;
  };

  // Toggle entire section on/off
  const toggleEntireSection = (secKey: keyof ItemSelectionState) => {
    const active = isSectionActive(secKey);
    setSectionActiveState(secKey, !active);
  };

  // Set whole section active (ON) or inactive (OFF)
  const setSectionActiveState = (secKey: keyof ItemSelectionState, active: boolean) => {
    setActivePreset(null);
    if (secKey === 'summary') {
      setItems((prev) => ({ ...prev, summary: active }));
    } else if (secKey === 'metrics') {
      setItems((prev) => {
        const updated: Record<number, boolean> = {};
        cvData.metrics.forEach((_, idx) => { updated[idx] = active; });
        return { ...prev, metrics: updated };
      });
    } else if (secKey === 'experiences') {
      setItems((prev) => {
        const updated: Record<string, boolean> = {};
        cvData.experiences.forEach((e) => { updated[e.id] = active; });
        return { ...prev, experiences: updated };
      });
    } else if (secKey === 'education') {
      setItems((prev) => {
        const updated: Record<number, boolean> = {};
        cvData.education.forEach((_, idx) => { updated[idx] = active; });
        return { ...prev, education: updated };
      });
    } else if (secKey === 'skills') {
      setItems((prev) => {
        const hardUpdated: Record<number, boolean> = {};
        cvData.skills.hard.forEach((_, idx) => { hardUpdated[idx] = active; });
        const softUpdated: Record<number, boolean> = {};
        cvData.skills.soft.forEach((_, idx) => { softUpdated[idx] = active; });
        const toolsUpdated: Record<number, boolean> = {};
        (cvData.skills.toolCategories || []).forEach((_, idx) => { toolsUpdated[idx] = active; });

        return {
          ...prev,
          skills: {
            hardGroup: active,
            hard: hardUpdated,
            softGroup: active,
            soft: softUpdated,
            toolsGroup: active,
            tools: toolsUpdated,
          },
        };
      });
    } else if (secKey === 'certifications') {
      setItems((prev) => {
        const updated: Record<string, boolean> = {};
        (cvData.certifications || []).forEach((c) => { updated[c.id] = active; });
        return { ...prev, certifications: updated };
      });
    } else if (secKey === 'consultingProjects') {
      setItems((prev) => {
        const updated: Record<string, boolean> = {};
        (cvData.consulting.projects || []).forEach((p) => { updated[p.id] = active; });
        return { ...prev, consultingProjects: updated };
      });
    } else if (secKey === 'digitalSolutions') {
      setItems((prev) => {
        const updated: Record<string, boolean> = {};
        (cvData.digitalSolutions || []).forEach((s) => { updated[s.id] = active; });
        return { ...prev, digitalSolutions: updated };
      });
    } else if (secKey === 'organizations') {
      setItems((prev) => {
        const updated: Record<number, boolean> = {};
        (cvData.organizations || []).forEach((_, idx) => { updated[idx] = active; });
        return { ...prev, organizations: updated };
      });
    } else if (secKey === 'achievements') {
      setItems((prev) => {
        const updated: Record<string, boolean> = {};
        (cvData.achievements || []).forEach((a) => { updated[a.id] = active; });
        return { ...prev, achievements: updated };
      });
    }
  };

  // Toggle individual child item
  const toggleItem = (secKey: keyof ItemSelectionState, subKey: string | number) => {
    setActivePreset(null);
    setItems((prev) => {
      const group = (prev[secKey] || {}) as Record<string | number, boolean>;
      return {
        ...prev,
        [secKey]: {
          ...group,
          [subKey]: !group[subKey],
        },
      };
    });
  };

  type PresetType =
    | 'optimal'
    | 'all'
    | 'business_operations'
    | 'project_management'
    | 'business_development'
    | 'digital_transformation'
    | 'hr_operations'
    | 'strategic_management'
    | 'marketing'
    | 'finance_accounting'
    | 'software_development'
    | 'branch_manager'
    | 'office_administration'
    | 'public_relations'
    | 'sales_executive'
    | 'supply_chain_logistics';
  const [selectedPresetRole, setSelectedPresetRole] = useState<PresetType>('optimal');
  const [activePreset, setActivePreset] = useState<PresetType | null>('optimal');

  // Presets
  const getPresetSectionOrders = (preset: PresetType) => {
    switch (preset) {
      case 'optimal':
        return {
          metrics: [5, 6, 7, 0, 11, 1, 2, 4, 8, 9, 10, 12, 3],
          experiences: ['exp-1', 'exp-3', 'exp-2'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [1, 4, 0, 2, 3],
          skills_soft: [0, 1, 3, 2, 4],
          skills_tools: [0, 1, 2, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-1', 'sol-2', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 1, 2, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-8', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };
      case 'business_operations':
        return {
          metrics: [5, 6, 9, 11, 0, 1, 2, 3, 4, 7, 8, 10, 12],
          experiences: ['exp-1', 'exp-3', 'exp-2'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [1, 0, 3, 4, 2],
          skills_soft: [0, 1, 3, 4, 2],
          skills_tools: [0, 1, 2, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-2', 'proj-3', 'proj-1', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-2', 'sol-1', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 2, 1, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-8', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'project_management':
        return {
          metrics: [5, 6, 7, 11, 0, 1, 2, 3, 4, 8, 9, 10, 12],
          experiences: ['exp-1', 'exp-2', 'exp-3'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [1, 4, 0, 2, 3],
          skills_soft: [3, 0, 1, 4, 2],
          skills_tools: [0, 2, 4, 1, 3],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-3', 'proj-2', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-2', 'sol-3', 'sol-1', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 2, 1, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-6', 'ach-2', 'ach-3', 'ach-4', 'ach-7', 'ach-8', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'business_development':
        return {
          metrics: [0, 5, 10, 11, 1, 2, 3, 4, 6, 7, 8, 9, 12],
          experiences: ['exp-2', 'exp-3', 'exp-1'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [2, 4, 1, 3, 0],
          skills_soft: [2, 4, 0, 1, 3],
          skills_tools: [0, 3, 2, 1, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-9', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-4', 'sol-6', 'sol-1', 'sol-2', 'sol-3', 'sol-5'],
          organizations: [0, 3, 1, 2, 4],
          achievements: ['ach-1', 'ach-2', 'ach-8', 'ach-3', 'ach-4', 'ach-5', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'digital_transformation':
        return {
          metrics: [7, 6, 5, 11, 0, 1, 2, 3, 4, 8, 9, 10, 12],
          experiences: ['exp-1', 'exp-2', 'exp-3'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [4, 1, 3, 2, 0],
          skills_soft: [1, 0, 3, 2, 4],
          skills_tools: [0, 2, 4, 1, 3],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-1', 'sol-2', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 2, 1, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-8', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'hr_operations':
        return {
          metrics: [12, 2, 3, 11, 0, 1, 4, 5, 6, 7, 8, 9, 10],
          experiences: ['exp-1', 'exp-2', 'exp-3'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [0, 1, 4, 3, 2],
          skills_soft: [0, 4, 1, 2, 3],
          skills_tools: [0, 2, 1, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-3', 'proj-10', 'proj-1', 'proj-2', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-11'],
          digitalSolutions: ['sol-3', 'sol-1', 'sol-2', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [2, 4, 0, 1, 3],
          achievements: ['ach-1', 'ach-7', 'ach-9', 'ach-2', 'ach-3', 'ach-4', 'ach-5', 'ach-6', 'ach-8', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'strategic_management':
        return {
          metrics: [8, 11, 5, 9, 0, 1, 2, 3, 4, 6, 7, 10, 12],
          experiences: ['exp-1', 'exp-3', 'exp-2'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [1, 0, 3, 4, 2],
          skills_soft: [0, 1, 2, 4, 3],
          skills_tools: [0, 2, 1, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-1', 'sol-2', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 1, 2, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-7', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-8', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'marketing':
        return {
          metrics: [10, 9, 0, 7, 1, 2, 3, 4, 5, 6, 8, 11, 12],
          experiences: ['exp-3', 'exp-2', 'exp-1'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [2, 4, 1, 0, 3],
          skills_soft: [2, 0, 1, 4, 3],
          skills_tools: [3, 4, 0, 2, 1],
          certifications: ['cert-1'],
          consultingProjects: ['proj-11', 'proj-9', 'proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-10'],
          digitalSolutions: ['sol-4', 'sol-6', 'sol-1', 'sol-2', 'sol-3', 'sol-5'],
          organizations: [0, 3, 1, 2, 4],
          achievements: ['ach-2', 'ach-3', 'ach-1', 'ach-4', 'ach-5', 'ach-6', 'ach-7', 'ach-8', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'finance_accounting':
        return {
          metrics: [4, 1, 9, 12, 0, 2, 3, 5, 6, 7, 8, 10, 11],
          experiences: ['exp-1', 'exp-2', 'exp-3'],
          education: [0, 1],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [3, 1, 4, 0, 2],
          skills_soft: [1, 3, 0, 4, 2],
          skills_tools: [1, 2, 0, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-10', 'proj-2', 'proj-1', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-11'],
          digitalSolutions: ['sol-5', 'sol-2', 'sol-1', 'sol-3', 'sol-4', 'sol-6'],
          organizations: [0, 1, 2, 3, 4],
          achievements: ['ach-1', 'ach-8', 'ach-10', 'ach-2', 'ach-3', 'ach-4', 'ach-5', 'ach-6', 'ach-7', 'ach-9', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'software_development':
        return {
          metrics: [7, 6, 5, 11, 0, 1, 2, 3, 4, 8, 9, 10, 12],
          experiences: ['exp-1', 'exp-2', 'exp-3'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [4, 1, 2, 0, 3],
          skills_soft: [1, 3, 0, 2, 4],
          skills_tools: [0, 4, 2, 3, 1],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-6', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-1', 'sol-2', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 3, 1, 2, 4],
          achievements: ['ach-1', 'ach-5', 'ach-12', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-7', 'ach-8', 'ach-9', 'ach-10', 'ach-11', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'branch_manager':
        return {
          metrics: [9, 1, 6, 11, 0, 2, 3, 4, 5, 7, 8, 10, 12],
          experiences: ['exp-1', 'exp-3', 'exp-2'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [1, 0, 3, 4, 2],
          skills_soft: [0, 1, 3, 4, 2],
          skills_tools: [0, 1, 2, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-2', 'proj-11', 'proj-1', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10'],
          digitalSolutions: ['sol-2', 'sol-1', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 2, 1, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-8', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'office_administration':
        return {
          metrics: [4, 6, 11, 12, 0, 1, 2, 3, 5, 7, 8, 9, 10],
          experiences: ['exp-1', 'exp-2', 'exp-3'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [3, 0, 1, 4, 2],
          skills_soft: [0, 1, 3, 4, 2],
          skills_tools: [1, 0, 2, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-10', 'proj-3', 'proj-1', 'proj-2', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-11'],
          digitalSolutions: ['sol-5', 'sol-3', 'sol-1', 'sol-2', 'sol-4', 'sol-6'],
          organizations: [0, 4, 1, 2, 3],
          achievements: ['ach-1', 'ach-7', 'ach-10', 'ach-2', 'ach-3', 'ach-4', 'ach-5', 'ach-6', 'ach-8', 'ach-9', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'public_relations':
        return {
          metrics: [8, 2, 10, 0, 1, 3, 4, 5, 6, 7, 9, 11, 12],
          experiences: ['exp-3', 'exp-2', 'exp-1'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [0, 2, 4, 1, 3],
          skills_soft: [0, 1, 2, 4, 3],
          skills_tools: [2, 0, 1, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-7', 'proj-11', 'proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-8', 'proj-9', 'proj-10'],
          digitalSolutions: ['sol-4', 'sol-6', 'sol-1', 'sol-2', 'sol-3', 'sol-5'],
          organizations: [0, 1, 2, 3, 4],
          achievements: ['ach-4', 'ach-1', 'ach-7', 'ach-2', 'ach-3', 'ach-5', 'ach-6', 'ach-8', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'sales_executive':
        return {
          metrics: [0, 10, 5, 11, 1, 2, 3, 4, 6, 7, 8, 9, 12],
          experiences: ['exp-2', 'exp-3', 'exp-1'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [2, 4, 1, 3, 0],
          skills_soft: [2, 4, 0, 1, 3],
          skills_tools: [0, 3, 2, 1, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-1', 'proj-9', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-4', 'sol-6', 'sol-1', 'sol-2', 'sol-3', 'sol-5'],
          organizations: [0, 3, 1, 2, 4],
          achievements: ['ach-1', 'ach-2', 'ach-8', 'ach-3', 'ach-4', 'ach-5', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'supply_chain_logistics':
        return {
          metrics: [5, 6, 9, 7, 11, 4, 1, 0, 8, 2, 3, 12, 10],
          experiences: ['exp-1', 'exp-3', 'exp-2'],
          education: [0],
          skills: ['hard', 'soft', 'tools'],
          skills_hard: [1, 0, 3, 4, 2],
          skills_soft: [0, 1, 3, 4, 2],
          skills_tools: [0, 1, 2, 3, 4],
          certifications: ['cert-1'],
          consultingProjects: ['proj-2', 'proj-4', 'proj-1', 'proj-3', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10', 'proj-11'],
          digitalSolutions: ['sol-2', 'sol-1', 'sol-3', 'sol-4', 'sol-5', 'sol-6'],
          organizations: [0, 2, 1, 3, 4],
          achievements: ['ach-1', 'ach-5', 'ach-8', 'ach-2', 'ach-3', 'ach-4', 'ach-6', 'ach-7', 'ach-9', 'ach-10', 'ach-11', 'ach-12', 'ach-13', 'ach-14', 'ach-15', 'ach-16', 'ach-17', 'ach-18'],
        };

      case 'all':
      default:
        return {
          metrics: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          experiences: cvData.experiences.map((e) => e.id),
          education: cvData.education.map((_, i) => i),
          skills: ['hard', 'soft', 'tools'],
          skills_hard: cvData.skills.hard.map((_, i) => i),
          skills_soft: cvData.skills.soft.map((_, i) => i),
          skills_tools: (cvData.skills.toolCategories || []).map((_, i) => i),
          certifications: cvData.certifications?.map((c) => c.id) || [],
          consultingProjects: cvData.consulting.projects?.map((p) => p.id) || [],
          digitalSolutions: cvData.digitalSolutions?.map((s) => s.id) || [],
          organizations: [0, 1, 2, 3, 4],
          achievements: cvData.achievements?.map((a) => a.id) || [],
        };
    }
  };

  const applyPreset = (preset: PresetType) => {
    setSelectedPresetRole(preset);
    setActivePreset(preset);
    setSectionOrders(getPresetSectionOrders(preset));
    if (preset === 'all') {
      setItems({ ...defaultItemSelection });
    } else if (preset === 'optimal') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: true, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': true,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: true, 2: false, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'business_operations') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: false, 8: false, 9: true, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: true, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': true,
          'proj-3': true,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: false, 2: true, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'project_management') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': false },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: true, 2: false, 3: false, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': false,
          'proj-3': true,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': true,
          'sol-3': true,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: false, 2: true, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': true,
          'ach-7': false,
          'ach-8': false,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'business_development') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: false, 2: false, 3: false, 4: false, 5: true, 6: true, 7: false, 8: false, 9: false, 10: true, 11: false, 12: false },
        experiences: { 'exp-1': false, 'exp-2': true, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: false, 2: true, 3: false, 4: true },
          softGroup: true,
          soft: { 0: true, 1: false, 2: true, 3: false, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: true, 3: true, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': false,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': true,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': false,
          'sol-3': false,
          'sol-4': true,
          'sol-5': false,
          'sol-6': true,
        },
        organizations: { 0: true, 1: false, 2: false, 3: true, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': true,
          'ach-3': false,
          'ach-4': false,
          'ach-5': false,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'digital_transformation') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: false, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': true, 'exp-3': false },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: true, 2: false, 3: true, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: false },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: true, 3: false, 4: true },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': true,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: false, 2: true, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': true,
        },
      });
    } else if (preset === 'hr_operations') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: false, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: true, 9: false, 10: false, 11: true, 12: true },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': false },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: false, 4: false },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: false, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': true },
        consultingProjects: {
          'proj-1': false,
          'proj-2': false,
          'proj-3': true,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': true,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': false,
          'sol-3': true,
          'sol-4': false,
          'sol-5': true,
          'sol-6': false,
        },
        organizations: { 0: false, 1: false, 2: true, 3: false, 4: true },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': false,
          'ach-6': false,
          'ach-7': true,
          'ach-8': false,
          'ach-9': true,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'strategic_management') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: false, 2: true, 3: false, 4: true, 5: true, 6: true, 7: false, 8: true, 9: true, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: true, 4: false },
          softGroup: true,
          soft: { 0: true, 1: true, 2: true, 3: false, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': true,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: true, 2: false, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': true,
          'ach-8': false,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'marketing') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: false, 2: false, 3: false, 4: false, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true, 11: false, 12: false },
        experiences: { 'exp-1': false, 'exp-2': true, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: false, 2: true, 3: false, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: true, 3: false, 4: false },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: false, 3: true, 4: true },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': false,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': true,
          'proj-10': false,
          'proj-11': true,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': false,
          'sol-3': false,
          'sol-4': true,
          'sol-5': false,
          'sol-6': true,
        },
        organizations: { 0: true, 1: false, 2: false, 3: true, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': true,
          'ach-3': true,
          'ach-4': false,
          'ach-5': false,
          'ach-6': false,
          'ach-7': false,
          'ach-8': false,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'finance_accounting') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: false, 8: false, 9: true, 10: false, 11: false, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': false },
        education: { 0: true, 1: true },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: true, 2: false, 3: true, 4: false },
          softGroup: true,
          soft: { 0: false, 1: true, 2: false, 3: true, 4: false },
          toolsGroup: true,
          tools: { 0: false, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': true,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': true,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': true,
          'sol-6': false,
        },
        organizations: { 0: true, 1: true, 2: false, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': false,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': true,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': true,
          'ach-16': false,
          'ach-17': false,
          'ach-18': true,
        },
      });
    } else if (preset === 'software_development') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: false, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10: false, 11: false, 12: false },
        experiences: { 'exp-1': true, 'exp-2': true, 'exp-3': false },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: true, 2: false, 3: false, 4: true },
          softGroup: true,
          soft: { 0: false, 1: true, 2: false, 3: true, 4: false },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: true, 3: false, 4: true },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': false,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': true,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: false, 2: false, 3: true, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': false,
          'ach-8': false,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': true,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'branch_manager') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: false, 8: false, 9: true, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: true, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': true,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': true,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: false, 2: true, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'office_administration') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: false, 8: true, 9: false, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': true, 'exp-3': false },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: true, 4: false },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': false,
          'proj-3': true,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': true,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': false,
          'sol-3': true,
          'sol-4': false,
          'sol-5': true,
          'sol-6': false,
        },
        organizations: { 0: false, 1: false, 2: true, 3: false, 4: true },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': false,
          'ach-6': false,
          'ach-7': true,
          'ach-8': false,
          'ach-9': false,
          'ach-10': true,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'public_relations') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: false, 2: true, 3: true, 4: false, 5: true, 6: false, 7: false, 8: true, 9: false, 10: true, 11: true, 12: false },
        experiences: { 'exp-1': false, 'exp-2': true, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: true, 3: false, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: true, 3: false, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': false,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': true,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': true,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': false,
          'sol-3': false,
          'sol-4': true,
          'sol-5': false,
          'sol-6': true,
        },
        organizations: { 0: true, 1: true, 2: false, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': true,
          'ach-5': false,
          'ach-6': false,
          'ach-7': true,
          'ach-8': false,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'sales_executive') {
      setItems({
        summary: true,
        metrics: { 0: true, 1: true, 2: false, 3: false, 4: false, 5: true, 6: true, 7: false, 8: false, 9: false, 10: true, 11: true, 12: false },
        experiences: { 'exp-1': false, 'exp-2': true, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: false, 1: false, 2: true, 3: false, 4: true },
          softGroup: true,
          soft: { 0: true, 1: false, 2: true, 3: false, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: false, 2: true, 3: true, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': true,
          'proj-2': false,
          'proj-3': false,
          'proj-4': false,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': true,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': false,
          'sol-2': false,
          'sol-3': false,
          'sol-4': true,
          'sol-5': false,
          'sol-6': true,
        },
        organizations: { 0: true, 1: false, 2: false, 3: true, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': true,
          'ach-3': false,
          'ach-4': false,
          'ach-5': false,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    } else if (preset === 'supply_chain_logistics') {
      setItems({
        summary: true,
        metrics: { 0: false, 1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: false, 9: true, 10: false, 11: true, 12: false },
        experiences: { 'exp-1': true, 'exp-2': false, 'exp-3': true },
        education: { 0: true, 1: false },
        skills: {
          hardGroup: true,
          hard: { 0: true, 1: true, 2: false, 3: true, 4: true },
          softGroup: true,
          soft: { 0: true, 1: true, 2: false, 3: true, 4: true },
          toolsGroup: true,
          tools: { 0: true, 1: true, 2: true, 3: false, 4: false },
        },
        certifications: { 'cert-1': false },
        consultingProjects: {
          'proj-1': false,
          'proj-2': true,
          'proj-3': false,
          'proj-4': true,
          'proj-5': false,
          'proj-6': false,
          'proj-7': false,
          'proj-8': false,
          'proj-9': false,
          'proj-10': false,
          'proj-11': false,
        },
        digitalSolutions: {
          'sol-1': true,
          'sol-2': true,
          'sol-3': false,
          'sol-4': false,
          'sol-5': false,
          'sol-6': false,
        },
        organizations: { 0: true, 1: false, 2: true, 3: false, 4: false },
        achievements: {
          'ach-1': true,
          'ach-2': false,
          'ach-3': false,
          'ach-4': false,
          'ach-5': true,
          'ach-6': false,
          'ach-7': false,
          'ach-8': true,
          'ach-9': false,
          'ach-10': false,
          'ach-11': false,
          'ach-12': false,
          'ach-13': false,
          'ach-14': false,
          'ach-15': false,
          'ach-16': false,
          'ach-17': false,
          'ach-18': false,
        },
      });
    }
  };

  // Design Preset State ('block' or 'line')
  const [designPreset, setDesignPreset] = useState<DesignPreset>('block');

  // Modal / Bottom Sheet States
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleSearchQuery, setRoleSearchQuery] = useState('');

  const filteredRoleOptions = ROLE_PRESET_OPTIONS.filter((item) => {
    if (!roleSearchQuery.trim()) return true;
    const q = roleSearchQuery.toLowerCase();
    return (
      item.code.toLowerCase().includes(q) ||
      item.titleId.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.descId.toLowerCase().includes(q) ||
      item.descEn.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  // Smooth Scroll to Section Headline
  const scrollToSection = (secKey: string) => {
    setExpandedSections((prev) => ({ ...prev, [secKey]: true }));
    setTimeout(() => {
      const el = document.getElementById(`section-${secKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // State for live built PDF preview
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [previewPageImages, setPreviewPageImages] = useState<string[]>([]);
  const [pdfPages, setPdfPages] = useState<number>(1);
  const [isBuildingPdf, setIsBuildingPdf] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<'pages' | 'iframe'>('pages');

  // Auto-action state for URL query parameters (?preview=code, ?download=code, ?print=code)
  const [pendingAutoAction, setPendingAutoAction] = useState<'download' | 'print' | null>(null);
  const hasHandledUrlRef = React.useRef(false);

  // Parse URL query parameters on mount
  useEffect(() => {
    if (disableUrlActions) return;
    if (hasHandledUrlRef.current) return;
    hasHandledUrlRef.current = true;

    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const previewParam = searchParams.get('preview');
    const downloadParam = searchParams.get('download');
    const printParam = searchParams.get('print');

    if (previewParam !== null) {
      const targetPreset = resolvePresetFromQuery(previewParam) as PresetType;
      if (targetPreset) {
        applyPreset(targetPreset);
        if (onOpenPreview) onOpenPreview();
      }
    } else if (downloadParam !== null) {
      const targetPreset = resolvePresetFromQuery(downloadParam) as PresetType;
      if (targetPreset) {
        applyPreset(targetPreset);
        setPendingAutoAction('download');
      }
    } else if (printParam !== null) {
      const targetPreset = resolvePresetFromQuery(printParam) as PresetType;
      if (targetPreset) {
        applyPreset(targetPreset);
        setPendingAutoAction('print');
      }
    }
  }, []);

  // Current Target Role / Headline based on selected preset role (persists even during custom item edits)
  const currentHeadline =
    PRESET_HEADLINES[selectedPresetRole]?.[language] ||
    cvData.personalInfo.headline;

  const currentSummary =
    PRESET_SUMMARIES[selectedPresetRole]?.[language] ||
    cvData.personalInfo.summary;

  // Build the real PDF whenever preview modal is opened or items change
  useEffect(() => {
    let isCancelled = false;

    if (isPreviewOpen) {
      setIsBuildingPdf(true);
      (async () => {
        try {
          const pdfItemsConfig: PDFItemSelectionConfig = {
            summary: items.summary,
            metrics: items.metrics,
            experiences: items.experiences,
            education: items.education,
            skills: items.skills,
            certifications: items.certifications,
            consultingProjects: items.consultingProjects,
            digitalSolutions: items.digitalSolutions,
            organizations: items.organizations,
            achievements: items.achievements,
          };

          let mappedHeaderStyle: 'solid-banner' | 'navy-solid' | 'plain' | 'badge' = 'solid-banner';
          if (designPreset === 'line') mappedHeaderStyle = 'navy-solid';
          if (designPreset === 'plain') mappedHeaderStyle = 'plain';
          if (designPreset === 'badge') mappedHeaderStyle = 'badge';

          const pdfOptions = {
            language: language,
            marginMm: 15,
            fontSizeScale: 1.15,
            headerStyle: mappedHeaderStyle,
            boldWeight: 'refined' as const,
            headline: currentHeadline,
            preset: selectedPresetRole,
            items: pdfItemsConfig,
            sectionOrders: sectionOrders,
          };

          const { doc, totalPages } = buildATSPDFDocument(pdfOptions);
          const blob = doc.output('blob');
          const blobUrl = URL.createObjectURL(blob);

          const images = await renderPdfToPageImages(doc);

          if (!isCancelled) {
            setPdfPreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return blobUrl;
            });
            setPdfPages(totalPages);
            setPreviewPageImages(images);
          } else {
            URL.revokeObjectURL(blobUrl);
          }
        } catch (err) {
          console.error('Error generating PDF preview:', err);
        } finally {
          if (!isCancelled) {
            setIsBuildingPdf(false);
          }
        }
      })();
    } else {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
        setPdfPreviewUrl(null);
      }
      setPreviewPageImages([]);
    }

    return () => {
      isCancelled = true;
    };
  }, [isPreviewOpen, items, language, sectionOrders, selectedPresetRole, currentHeadline, designPreset]);

  // Automated Optimal Export
  const handleDownloadCustomPDF = () => {
    setIsDownloading(true);

    const pdfItemsConfig: PDFItemSelectionConfig = {
      summary: items.summary,
      metrics: items.metrics,
      experiences: items.experiences,
      education: items.education,
      skills: items.skills,
      certifications: items.certifications,
      consultingProjects: items.consultingProjects,
      digitalSolutions: items.digitalSolutions,
      organizations: items.organizations,
      achievements: items.achievements,
    };

    let mappedHeaderStyle: 'solid-banner' | 'navy-solid' | 'plain' | 'badge' = 'solid-banner';
    if (designPreset === 'line') mappedHeaderStyle = 'navy-solid';
    if (designPreset === 'plain') mappedHeaderStyle = 'plain';
    if (designPreset === 'badge') mappedHeaderStyle = 'badge';

    try {
      generateATSPDF({
        language: language,
        marginMm: 15,
        fontSizeScale: 1.15,
        headerStyle: mappedHeaderStyle,
        boldWeight: 'refined',
        headline: currentHeadline,
        preset: selectedPresetRole,
        items: pdfItemsConfig,
        sectionOrders: sectionOrders,
      });
    } catch (err) {
      console.error('Error exporting PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  // Execute pending auto-action after preset state updates have been applied
  useEffect(() => {
    if (!pendingAutoAction) return;

    if (pendingAutoAction === 'download') {
      handleDownloadCustomPDF();
      setPendingAutoAction(null);
    } else if (pendingAutoAction === 'print') {
      window.print();
      setPendingAutoAction(null);
    }
  }, [pendingAutoAction, selectedPresetRole]);

  // Total active items calculation
  const totalActiveItems =
    (items.summary ? 1 : 0) +
    cvData.metrics.filter((_, idx) => items.metrics[idx]).length +
    cvData.experiences.filter((e) => items.experiences[e.id]).length +
    cvData.education.filter((_, idx) => items.education[idx]).length +
    (items.skills.hard ? 1 : 0) +
    (items.skills.soft ? 1 : 0) +
    (items.skills.tools ? 1 : 0) +
    (cvData.certifications || []).filter((c) => items.certifications[c.id]).length +
    (cvData.consulting.projects || []).filter((p) => items.consultingProjects[p.id]).length +
    (cvData.digitalSolutions || []).filter((s) => items.digitalSolutions[s.id]).length +
    (cvData.organizations || []).filter((_, idx) => items.organizations[idx]).length +
    (cvData.achievements || []).filter((a) => items.achievements[a.id]).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
      {/* QUICKBAR NAVIGATOR (Direct on main layout, without group card or title) */}
      <div className="grid grid-cols-5 gap-y-3.5 gap-x-2 sm:gap-x-4 print:hidden py-1">
        {QUICKBAR_SECTIONS.map((item) => {
          const IconComponent = item.icon;
          const active = isSectionActive(item.key as keyof ItemSelectionState);
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => scrollToSection(item.key)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group select-none focus:outline-none w-full"
              title={language === 'en' ? `Scroll to ${item.labelEn}` : `Lompat ke headline ${item.labelId}`}
            >
              {/* Card Icon */}
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-2xs ${
                active 
                  ? 'bg-[#0062E3] border-[#0062E3] text-white hover:bg-[#0050B8] hover:border-[#0050B8] group-hover:scale-105 shadow-xs' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-700'
              }`}>
                <IconComponent className="w-5 h-5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>
              {/* Teks di bawah dari card icon nya */}
              <span className={`text-[10px] sm:text-xs font-semibold text-center line-clamp-1 w-full transition-colors ${
                active ? 'text-slate-900 group-hover:text-[#0062E3]' : 'text-slate-400 group-hover:text-slate-700'
              }`}>
                {language === 'en' ? item.labelEn : item.labelId}
              </span>
            </button>
          );
        })}
      </div>

      {/* FILTER BAR (Desain & Peran Modal Triggers) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-2xs print:hidden w-full">
        <div className="flex items-center gap-3 sm:gap-6 w-full flex-wrap sm:flex-nowrap">
          {/* Desain Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
              {language === 'en' ? 'Design' : 'Desain'}
            </span>
            <button
              type="button"
              onClick={() => setIsDesignModalOpen(true)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 font-semibold text-xs sm:text-sm text-slate-900 border border-slate-300 hover:border-blue-400 rounded-xl px-3 py-2 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#0062E3]"
            >
              <Palette className="w-4 h-4 text-[#0062E3] shrink-0" />
              <span>
                {designPreset === 'block' && (language === 'en' ? 'Block Theme' : 'Tema Blok')}
                {designPreset === 'line' && (language === 'en' ? 'Line Theme' : 'Tema Garis')}
                {designPreset === 'badge' && (language === 'en' ? 'Badge Theme' : 'Tema Badge')}
                {designPreset === 'plain' && (language === 'en' ? 'Plain Theme' : 'Tema Polos')}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5 shrink-0" />
            </button>
          </div>

          {/* Peran Trigger */}
          <div className="flex items-center gap-2 flex-1 min-w-0 w-full sm:w-auto">
            <span className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
              {language === 'en' ? 'Role' : 'Peran'}
            </span>
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center justify-between gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 font-semibold text-xs sm:text-sm text-slate-900 border border-slate-300 hover:border-blue-400 rounded-xl px-3.5 py-2 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#0062E3] w-full min-w-0 text-left"
            >
              <div className="flex items-center gap-2 truncate min-w-0">
                <Briefcase className="w-4 h-4 text-[#0062E3] shrink-0" />
                <span className="truncate">
                  {activePreset === 'all' && (language === 'en' ? 'All (Comprehensive)' : 'Semua (Komprehensif)')}
                  {activePreset === 'business_operations' && 'Business Operations / Operations Manager'}
                  {activePreset === 'project_management' && 'Project Management / Project Operations'}
                  {activePreset === 'business_development' && 'Business Development / Account Manager'}
                  {activePreset === 'digital_transformation' && 'Digital Transformation / Process Improvement'}
                  {activePreset === 'hr_operations' && 'HR Operations / People Development'}
                  {activePreset === 'strategic_management' && 'Management / Strategic Management'}
                  {activePreset === 'marketing' && 'Marketing / Digital Marketing'}
                  {activePreset === 'finance_accounting' && 'Finance / Accounting'}
                  {activePreset === 'software_development' && 'Software / Web Development'}
                  {activePreset === 'branch_manager' && (language === 'en' ? 'Branch Manager / Multi-Unit Operations' : 'Branch Manager / Operasional Multi-Cabang')}
                  {activePreset === 'office_administration' && (language === 'en' ? 'Office Administration & Executive Support' : 'Administrasi Perkantoran & Dukungan Eksekutif')}
                  {activePreset === 'public_relations' && (language === 'en' ? 'Public Relations & Corporate Communications' : 'Humas & Komunikasi Korporat')}
                  {activePreset === 'sales_executive' && (language === 'en' ? 'Sales Executive & B2B Account' : 'Eksekutif Penjualan & Akun B2B')}
                  {activePreset === 'supply_chain_logistics' && (language === 'en' ? 'Supply Chain & Logistics Operations' : 'Rantai Pasok & Operasional Logistik')}
                  {!activePreset && (language === 'en' ? 'Custom' : 'Kustom')}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 10 CATEGORY CHECKLIST WITH PLAIN TEXT HEADLINES & INDIVIDUAL ITEM CARDS */}
      <div className="space-y-6 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

          {/* SECTION 1: SUMMARY */}
          <div id="section-summary" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Professional Summary' : 'Ringkasan Eksekutif'}
              isActive={items.summary}
              isExpanded={expandedSections.summary}
              onToggleAccordion={() => toggleAccordion('summary')}
              onToggleActive={(val) => setSectionActiveState('summary', val)}
            />
            {expandedSections.summary && (
              <div className="pt-1.5 space-y-2">
                <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs transition-all flex items-start justify-between gap-3">
                  <label onClick={() => toggleEntireSection('summary')} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {items.summary ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {language === 'en' ? 'Executive Profile Summary' : 'Teks Ringkasan Profil Eksekutif'}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1 line-clamp-3">
                        {currentSummary}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: METRICS */}
          <div id="section-metrics" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Key Metrics' : 'Sorotan Metrik Utama'}
              isActive={isSectionActive('metrics')}
              isExpanded={expandedSections.metrics}
              onToggleAccordion={() => toggleAccordion('metrics')}
              onToggleActive={(val) => setSectionActiveState('metrics', val)}
            />
            {expandedSections.metrics && (
              <div className="pt-1.5 space-y-2">
                {cvData.metrics
                  .map((m, idx) => ({
                    idx,
                    title: `${m.value} ${m.label}`,
                    desc: m.sublabel,
                  }))
                  .sort((a, b) => (sectionOrders.metrics.indexOf(a.idx) !== -1 ? sectionOrders.metrics.indexOf(a.idx) : a.idx) - (sectionOrders.metrics.indexOf(b.idx) !== -1 ? sectionOrders.metrics.indexOf(b.idx) : b.idx))
                  .map((m, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={m.idx} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('metrics', m.idx)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.metrics[m.idx] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{m.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 truncate">{m.desc}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('metrics', m.idx, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('metrics', m.idx, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 3: WORK EXPERIENCE */}
          <div id="section-experiences" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Work Experience' : 'Pengalaman Kerja'}
              isActive={isSectionActive('experiences')}
              isExpanded={expandedSections.experiences}
              onToggleAccordion={() => toggleAccordion('experiences')}
              onToggleActive={(val) => setSectionActiveState('experiences', val)}
            />
            {expandedSections.experiences && (
              <div className="pt-1.5 space-y-2">
                {cvData.experiences
                  .sort((a, b) => sectionOrders.experiences.indexOf(a.id) - sectionOrders.experiences.indexOf(b.id))
                  .map((exp, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={exp.id} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('experiences', exp.id)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.experiences[exp.id] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{exp.role}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{exp.company} • {exp.period}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('experiences', exp.id, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('experiences', exp.id, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 4: EDUCATION */}
          <div id="section-education" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Education' : 'Pendidikan'}
              isActive={isSectionActive('education')}
              isExpanded={expandedSections.education}
              onToggleAccordion={() => toggleAccordion('education')}
              onToggleActive={(val) => setSectionActiveState('education', val)}
            />
            {expandedSections.education && (
              <div className="pt-1.5 space-y-2">
                {cvData.education
                  .map((edu, idx) => ({ ...edu, idx }))
                  .sort((a, b) => sectionOrders.education.indexOf(a.idx) - sectionOrders.education.indexOf(b.idx))
                  .map((edu, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={edu.idx} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('education', edu.idx)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.education[edu.idx] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{edu.degree}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{edu.institution} • {edu.period}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('education', edu.idx, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('education', edu.idx, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 5: SKILLS (Now separated into Hard, Soft, Tools) */}
          {/* HARD SKILLS */}
          <div id="section-skills" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Hard Skills' : 'Hard Skills'}
              isActive={!!items.skills.hardGroup}
              isExpanded={expandedSections.skills_hard}
              onToggleAccordion={() => toggleAccordion('skills_hard')}
              onToggleActive={() => {
                setActivePreset(null);
                setItems((prev) => {
                  const newGroupVal = !prev.skills.hardGroup;
                  const newHard = { ...prev.skills.hard };
                  if (newGroupVal && !Object.values(newHard).some(Boolean)) {
                    cvData.skills.hard.forEach((_, idx) => { newHard[idx] = true; });
                  }
                  return {
                    ...prev,
                    skills: {
                      ...prev.skills,
                      hardGroup: newGroupVal,
                      hard: newHard,
                    },
                  };
                });
              }}
            />
            {expandedSections.skills_hard && items.skills.hardGroup && (
              <div className="pt-1.5 space-y-2">
                {cvData.skills.hard
                  .map((group, idx) => ({ ...group, idx }))
                  .sort((a, b) => (sectionOrders.skills_hard?.indexOf(a.idx) !== -1 ? sectionOrders.skills_hard.indexOf(a.idx) : a.idx) - (sectionOrders.skills_hard?.indexOf(b.idx) !== -1 ? sectionOrders.skills_hard.indexOf(b.idx) : b.idx))
                  .map((group, index, arr) => {
                    const isChecked = !!items.skills.hard?.[group.idx];
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div
                        key={group.idx}
                        className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
                      >
                        <label
                          onClick={() => {
                            setActivePreset(null);
                            setItems((prev) => ({
                              ...prev,
                              skills: {
                                ...prev.skills,
                                hard: {
                                  ...(prev.skills.hard || {}),
                                  [group.idx]: !prev.skills.hard?.[group.idx],
                                },
                              },
                            }));
                          }}
                          className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0"
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-[#0062E3]" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">
                              {group.category}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                              {group.items.join(', ')}
                            </span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('skills_hard', group.idx, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('skills_hard', group.idx, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SOFT SKILLS */}
          <div className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Soft Skills & Leadership' : 'Soft Skills & Kepemimpinan'}
              isActive={!!items.skills.softGroup}
              isExpanded={expandedSections.skills_soft}
              onToggleAccordion={() => toggleAccordion('skills_soft')}
              onToggleActive={() => {
                setActivePreset(null);
                setItems((prev) => {
                  const newGroupVal = !prev.skills.softGroup;
                  const newSoft = { ...prev.skills.soft };
                  if (newGroupVal && !Object.values(newSoft).some(Boolean)) {
                    cvData.skills.soft.forEach((_, idx) => { newSoft[idx] = true; });
                  }
                  return {
                    ...prev,
                    skills: {
                      ...prev.skills,
                      softGroup: newGroupVal,
                      soft: newSoft,
                    },
                  };
                });
              }}
            />
            {expandedSections.skills_soft && items.skills.softGroup && (
              <div className="pt-1.5 space-y-2">
                {cvData.skills.soft
                  .map((item, idx) => ({ item, idx }))
                  .sort((a, b) => (sectionOrders.skills_soft?.indexOf(a.idx) !== -1 ? sectionOrders.skills_soft.indexOf(a.idx) : a.idx) - (sectionOrders.skills_soft?.indexOf(b.idx) !== -1 ? sectionOrders.skills_soft.indexOf(b.idx) : b.idx))
                  .map(({ item, idx }, index, arr) => {
                    const isChecked = !!items.skills.soft?.[idx];
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    const colonIdx = item.indexOf(':');
                    const title = colonIdx !== -1 ? item.substring(0, colonIdx) : item;
                    const desc = colonIdx !== -1 ? item.substring(colonIdx + 1).trim() : '';
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
                      >
                        <label
                          onClick={() => {
                            setActivePreset(null);
                            setItems((prev) => ({
                              ...prev,
                              skills: {
                                ...prev.skills,
                                soft: {
                                  ...(prev.skills.soft || {}),
                                  [idx]: !prev.skills.soft?.[idx],
                                },
                              },
                            }));
                          }}
                          className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0"
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-[#0062E3]" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">
                              {title}
                            </span>
                            {desc && (
                              <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                                {desc}
                              </span>
                            )}
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('skills_soft', idx, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('skills_soft', idx, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* TOOLS & EKOSISTEM DIGITAL */}
          <div className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Tools & Digital Ecosystem' : 'Tools & Ekosistem Digital'}
              isActive={!!items.skills.toolsGroup}
              isExpanded={expandedSections.skills_tools}
              onToggleAccordion={() => toggleAccordion('skills_tools')}
              onToggleActive={() => {
                setActivePreset(null);
                setItems((prev) => {
                  const newGroupVal = !prev.skills.toolsGroup;
                  const newTools = { ...prev.skills.tools };
                  if (newGroupVal && !Object.values(newTools).some(Boolean)) {
                    (cvData.skills.toolCategories || []).forEach((_, idx) => { newTools[idx] = true; });
                  }
                  return {
                    ...prev,
                    skills: {
                      ...prev.skills,
                      toolsGroup: newGroupVal,
                      tools: newTools,
                    },
                  };
                });
              }}
            />
            {expandedSections.skills_tools && items.skills.toolsGroup && (
              <div className="pt-1.5 space-y-2">
                {(cvData.skills.toolCategories || [])
                  .map((group, idx) => ({ ...group, idx }))
                  .sort((a, b) => (sectionOrders.skills_tools?.indexOf(a.idx) !== -1 ? sectionOrders.skills_tools.indexOf(a.idx) : a.idx) - (sectionOrders.skills_tools?.indexOf(b.idx) !== -1 ? sectionOrders.skills_tools.indexOf(b.idx) : b.idx))
                  .map((group, index, arr) => {
                    const isChecked = !!items.skills.tools?.[group.idx];
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div
                        key={group.idx}
                        className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
                      >
                        <label
                          onClick={() => {
                            setActivePreset(null);
                            setItems((prev) => ({
                              ...prev,
                              skills: {
                                ...prev.skills,
                                tools: {
                                  ...(prev.skills.tools || {}),
                                  [group.idx]: !prev.skills.tools?.[group.idx],
                                },
                              },
                            }));
                          }}
                          className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0"
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-[#0062E3]" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">
                              {group.category}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                              {group.tools}
                            </span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('skills_tools', group.idx, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('skills_tools', group.idx, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 6: CERTIFICATIONS */}
          <div id="section-certifications" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Certifications' : 'Sertifikasi'}
              isActive={isSectionActive('certifications')}
              isExpanded={expandedSections.certifications}
              onToggleAccordion={() => toggleAccordion('certifications')}
              onToggleActive={(val) => setSectionActiveState('certifications', val)}
            />
            {expandedSections.certifications && (
              <div className="pt-1.5 space-y-2">
                {(cvData.certifications || [])
                  .sort((a, b) => sectionOrders.certifications.indexOf(a.id) - sectionOrders.certifications.indexOf(b.id))
                  .map((cert, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={cert.id} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('certifications', cert.id)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.certifications[cert.id] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{cert.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{cert.issuer} • {cert.period}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('certifications', cert.id, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('certifications', cert.id, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 7: CONSULTING PROJECTS */}
          <div id="section-consultingProjects" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Consulting Projects' : 'Proyek Konsultasi'}
              isActive={isSectionActive('consultingProjects')}
              isExpanded={expandedSections.consultingProjects}
              onToggleAccordion={() => toggleAccordion('consultingProjects')}
              onToggleActive={(val) => setSectionActiveState('consultingProjects', val)}
            />
            {expandedSections.consultingProjects && (
              <div className="pt-1.5 space-y-2">
                {(cvData.consulting.projects || [])
                  .sort((a, b) => sectionOrders.consultingProjects.indexOf(a.id) - sectionOrders.consultingProjects.indexOf(b.id))
                  .map((proj, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={proj.id} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('consultingProjects', proj.id)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.consultingProjects[proj.id] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{proj.role} — {proj.organization}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{proj.sector} • {proj.periodType}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('consultingProjects', proj.id, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('consultingProjects', proj.id, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 8: DIGITAL SOLUTIONS */}
          <div id="section-digitalSolutions" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Digital Solutions' : 'Solusi Digital'}
              isActive={isSectionActive('digitalSolutions')}
              isExpanded={expandedSections.digitalSolutions}
              onToggleAccordion={() => toggleAccordion('digitalSolutions')}
              onToggleActive={(val) => setSectionActiveState('digitalSolutions', val)}
            />
            {expandedSections.digitalSolutions && (
              <div className="pt-1.5 space-y-2">
                {(cvData.digitalSolutions || [])
                  .sort((a, b) => sectionOrders.digitalSolutions.indexOf(a.id) - sectionOrders.digitalSolutions.indexOf(b.id))
                  .map((sol, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={sol.id} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('digitalSolutions', sol.id)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.digitalSolutions[sol.id] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{sol.title} ({sol.subtitle})</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 truncate">{sol.description}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('digitalSolutions', sol.id, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('digitalSolutions', sol.id, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 9: ORGANIZATIONS */}
          <div id="section-organizations" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Organizations' : 'Organisasi'}
              isActive={isSectionActive('organizations')}
              isExpanded={expandedSections.organizations}
              onToggleAccordion={() => toggleAccordion('organizations')}
              onToggleActive={(val) => setSectionActiveState('organizations', val)}
            />
            {expandedSections.organizations && (
              <div className="pt-1.5 space-y-2">
                {(cvData.organizations || [])
                  .map((org, idx) => ({ ...org, idx }))
                  .sort((a, b) => sectionOrders.organizations.indexOf(a.idx) - sectionOrders.organizations.indexOf(b.idx))
                  .map((org, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={org.idx} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('organizations', org.idx)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.organizations[org.idx] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{org.role}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{org.organization} • {org.period}</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('organizations', org.idx, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('organizations', org.idx, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* SECTION 10: ACHIEVEMENTS */}
          <div id="section-achievements" className="scroll-mt-24 space-y-2">
            <SectionHeadlineBar
              title={language === 'en' ? 'Achievements' : 'Penghargaan'}
              isActive={isSectionActive('achievements')}
              isExpanded={expandedSections.achievements}
              onToggleAccordion={() => toggleAccordion('achievements')}
              onToggleActive={(val) => setSectionActiveState('achievements', val)}
            />
            {expandedSections.achievements && (
              <div className="pt-1.5 space-y-2">
                {(cvData.achievements || [])
                  .sort((a, b) => sectionOrders.achievements.indexOf(a.id) - sectionOrders.achievements.indexOf(b.id))
                  .map((ach, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={ach.id} className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3">
                        <label onClick={() => toggleItem('achievements', ach.id)} className="flex items-start gap-3 cursor-pointer flex-1 select-none min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {items.achievements[ach.id] ? <CheckSquare className="w-4 h-4 text-[#0062E3]" /> : <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{ach.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{ach.organization} • {ach.year} ({ach.level})</span>
                          </div>
                        </label>
                        <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('achievements', ach.id, 'up'); }}
                            disabled={isFirst}
                            className={`p-1 rounded transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke atas"
                            aria-label="Pindah ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); moveItem('achievements', ach.id, 'down'); }}
                            disabled={isLast}
                            className={`p-1 rounded transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0062E3] hover:bg-white cursor-pointer shadow-2xs'}`}
                            title="Pindah urutan ke bawah"
                            aria-label="Pindah ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* HIDDEN PRINT CONTAINER (Only visible when browser Print is invoked) */}
      <div className="hidden print:block">
        <AtsDocumentSheet
          cvData={cvData}
          items={items}
          language={language}
          totalActiveItems={totalActiveItems}
          sectionOrders={sectionOrders}
          headline={currentHeadline}
        />
      </div>

      {/* PREVIEW PDF OVERLAY: DESKTOP MODAL (sm:flex) AND MOBILE BOTTOM SHEET (sm:hidden) */}
      {isPreviewOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClosePreview}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
          />

          {/* DESKTOP MODAL: Centered Soft Off-White Dialog */}
          <div className="hidden sm:flex fixed inset-0 z-50 items-center justify-center p-4 sm:p-6 pointer-events-none">
            <div className="bg-[#F1F5F9] rounded-2xl max-w-4xl w-full h-[90vh] shadow-2xl border border-slate-300 overflow-hidden flex flex-col pointer-events-auto transition-all animate-in fade-in zoom-in-95">
              {/* Modal Header */}
              <div className="bg-white text-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-slate-200 shrink-0">
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    PDF Preview
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'en'
                      ? `Total ${pdfPages} Pages • ${totalActiveItems} Selected Items`
                      : `Total ${pdfPages} Halaman • ${totalActiveItems} Item Terpilih`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode((m) => (m === 'pages' ? 'iframe' : 'pages'))}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all cursor-pointer shadow-2xs"
                  >
                    {previewMode === 'pages'
                      ? (language === 'en' ? 'Switch to PDF Iframe' : 'Tampilan Iframe PDF')
                      : (language === 'en' ? 'Switch to Multi-Page View' : 'Tampilan Multi-Halaman')}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCustomPDF}
                    disabled={isDownloading}
                    title={language === 'en' ? 'Download PDF' : 'Unduh PDF'}
                    aria-label={language === 'en' ? 'Download PDF' : 'Unduh PDF'}
                    className="p-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[#0062E3]" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClosePreview}
                    title={language === 'en' ? 'Close' : 'Tutup'}
                    aria-label={language === 'en' ? 'Close' : 'Tutup'}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: True Multi-Page Document View with soft neutral background */}
              <div className="flex-1 bg-slate-100 p-4 sm:p-6 overflow-y-auto relative flex flex-col items-center w-full h-full">
                {isBuildingPdf ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600 my-auto">
                    <Loader2 className="w-8 h-8 animate-spin text-[#0062E3]" />
                    <p className="text-sm font-medium">
                      {language === 'en'
                        ? 'Generating multi-page PDF preview...'
                        : 'Menyiapkan pratinjau PDF multi-halaman...'}
                    </p>
                  </div>
                ) : previewMode === 'pages' && previewPageImages.length > 0 ? (
                  <div className="w-full max-w-3xl flex flex-col items-center space-y-6 pb-6">
                    {/* Page Cards */}
                    {previewPageImages.map((pageImg, idx) => (
                      <div key={idx} className="bg-white shadow-xl rounded-sm border border-slate-300/80 w-full overflow-hidden transition-all duration-200">
                        <img
                          src={pageImg}
                          alt={`Halaman ${idx + 1}`}
                          className="w-full h-auto block select-none"
                        />
                      </div>
                    ))}
                  </div>
                ) : pdfPreviewUrl ? (
                  <iframe
                    src={`${pdfPreviewUrl}#view=FitH&zoom=page-width&toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-0 bg-white rounded-lg shadow-xl"
                    title="Pratinjau PDF"
                  />
                ) : (
                  <div className="w-full max-w-3xl my-auto py-2">
                    <AtsDocumentSheet
                      cvData={cvData}
                      items={items}
                      language={language}
                      totalActiveItems={totalActiveItems}
                      sectionOrders={sectionOrders}
                      headline={currentHeadline}
                      summaryText={currentSummary}
                      designPreset={designPreset}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE BOTTOM SHEET: Soft Off-White Slide-up Drawer */}
          <div className="sm:hidden fixed inset-x-0 bottom-0 z-50 bg-[#F1F5F9] rounded-t-3xl shadow-2xl border-t border-slate-300 h-[92vh] flex flex-col transition-transform duration-300 animate-in slide-in-from-bottom">
            {/* Touch Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 mb-2 shrink-0" />

            {/* Mobile Header */}
            <div className="bg-white text-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900">
                  PDF Preview
                </span>
                <span className="text-xs text-slate-500">
                  ({pdfPages} {language === 'en' ? 'Pages' : 'Halaman'})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadCustomPDF}
                  disabled={isDownloading}
                  title={language === 'en' ? 'Download PDF' : 'Unduh PDF'}
                  aria-label={language === 'en' ? 'Download PDF' : 'Unduh PDF'}
                  className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isDownloading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#0062E3]" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClosePreview}
                  title={language === 'en' ? 'Close' : 'Tutup'}
                  aria-label={language === 'en' ? 'Close' : 'Tutup'}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sheet Body: Multi-Page View with soft neutral background */}
            <div className="flex-1 bg-slate-100 p-3 overflow-y-auto relative flex flex-col items-center w-full h-full pb-6">
              {isBuildingPdf ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600 my-auto">
                  <Loader2 className="w-7 h-7 animate-spin text-[#0062E3]" />
                  <p className="text-xs font-medium">
                    {language === 'en' ? 'Preparing multi-page PDF...' : 'Menyiapkan PDF multi-halaman...'}
                  </p>
                </div>
              ) : previewMode === 'pages' && previewPageImages.length > 0 ? (
                <div className="w-full flex flex-col items-center space-y-4 pb-4">
                  {previewPageImages.map((pageImg, idx) => (
                    <div key={idx} className="bg-white shadow-lg rounded-sm border border-slate-300 w-full overflow-hidden">
                      <img
                        src={pageImg}
                        alt={`Halaman ${idx + 1}`}
                        className="w-full h-auto block select-none"
                      />
                    </div>
                  ))}
                </div>
              ) : pdfPreviewUrl ? (
                <iframe
                  src={`${pdfPreviewUrl}#view=FitH&zoom=page-width&toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full h-full border-0 bg-white"
                  title="Pratinjau PDF"
                />
              ) : (
                <div className="w-full max-w-3xl py-1 overflow-y-auto">
                  <AtsDocumentSheet
                    cvData={cvData}
                    items={items}
                    language={language}
                    totalActiveItems={totalActiveItems}
                    sectionOrders={sectionOrders}
                    headline={currentHeadline}
                    summaryText={currentSummary}
                    designPreset={designPreset}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* MODAL / BOTTOM SHEET: PRESET DESIGN */}
      {isDesignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 transition-opacity animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={() => setIsDesignModalOpen(false)} />

          {/* Container (Bottom Sheet on mobile, Centered Modal on Desktop) */}
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] z-10 transition-transform">
            {/* Mobile Handle Bar */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center bg-slate-50 border-b border-slate-100">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0062E3]">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'en' ? 'Select Design Theme' : 'Pilih Tema Desain CV'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'en' ? 'Choose ATS section header visual style' : 'Atur gaya visual & aksen header seksi ATS'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDesignModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options List */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
              {DESIGN_OPTIONS.map((item) => {
                const isSelected = designPreset === item.key;
                return (
                  <div
                    key={item.key}
                    onClick={() => {
                      setDesignPreset(item.key as DesignPreset);
                      setIsDesignModalOpen(false);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-blue-50/60 border-[#0062E3] ring-1 ring-[#0062E3] shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#0062E3] border-[#0062E3] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${isSelected ? 'text-[#0062E3]' : 'text-slate-900'}`}>
                          {language === 'en' ? item.titleEn : item.titleId}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0062E3] bg-blue-100 px-2 py-0.5 rounded-full shrink-0">
                            {language === 'en' ? 'Active' : 'Aktif'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {language === 'en' ? item.descEn : item.descId}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDesignModalOpen(false)}
                className="px-4 py-2 bg-[#0062E3] hover:bg-[#0050B8] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer"
              >
                {language === 'en' ? 'Done' : 'Selesai'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL / BOTTOM SHEET: PRESET ROLE */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 transition-opacity animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={() => setIsRoleModalOpen(false)} />

          {/* Container */}
          <div className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] z-10 transition-transform">
            {/* Mobile Handle Bar */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center bg-slate-50 border-b border-slate-100">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0062E3]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {language === 'en' ? 'Select Target Role Preset' : 'Pilih Preset Peran CV'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {language === 'en' ? 'Automatically filter experience, metrics, & headline for targeted position' : 'Pilih posisi target untuk menyelaraskan riwayat & headline CV'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={roleSearchQuery}
                  onChange={(e) => setRoleSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Search position or keywords...' : 'Cari posisi target atau kata kunci...'}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0062E3]"
                />
                {roleSearchQuery && (
                  <button
                    onClick={() => setRoleSearchQuery('')}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Role Options List */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
              {filteredRoleOptions.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs sm:text-sm">
                  {language === 'en' ? 'No roles match your search filter' : 'Tidak ada preset peran yang cocok dengan pencarian Anda'}
                </div>
              ) : (
                filteredRoleOptions.map((item) => {
                  const isSelected = activePreset === item.key;
                  return (
                    <div
                      key={item.key}
                      onClick={() => {
                        applyPreset(item.key as PresetType);
                        setIsRoleModalOpen(false);
                      }}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-blue-50/60 border-[#0062E3] ring-1 ring-[#0062E3] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#0062E3] border-[#0062E3] text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                          <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#0062E3]' : 'text-slate-900'}`}>
                            {language === 'en' ? item.titleEn : item.titleId}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.tag && (
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                isSelected ? 'bg-blue-100 text-[#0062E3]' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {item.tag}
                              </span>
                            )}
                            <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md border tracking-wider uppercase ${
                              isSelected
                                ? 'bg-[#0062E3] text-white border-[#0062E3]'
                                : 'bg-slate-800 text-white border-slate-800'
                            }`}>
                              {item.code}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                          {language === 'en' ? item.descEn : item.descId}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {language === 'en' ? `${filteredRoleOptions.length} preset roles available` : `${filteredRoleOptions.length} preset peran tersedia`}
              </span>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="px-4 py-2 bg-[#0062E3] hover:bg-[#0050B8] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer"
              >
                {language === 'en' ? 'Done' : 'Selesai'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
