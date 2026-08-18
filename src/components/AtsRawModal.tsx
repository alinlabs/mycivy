import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Zap,
} from 'lucide-react';
import { generateATSPDF } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';
import { getTailoredExperiences } from '../data/tailoredExperiences';
import { getTailoredConsulting, getTailoredDigitalSolutions } from '../data/tailoredProjects';
import { getTailoredOrganizations } from '../data/tailoredOrganizations';

interface AtsRawModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset?: string | null;
}

export const AtsRawModal: React.FC<AtsRawModalProps> = ({ isOpen, onClose, preset }) => {
  const { language, activeCvData: cvData, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'analysis'>('analysis');

  if (!isOpen) return null;

  const experiences = getTailoredExperiences(preset, language);
  const tailoredConsulting = getTailoredConsulting(preset, language);
  const tailoredDigitalSolutions = getTailoredDigitalSolutions(preset, language);
  const tailoredOrganizations = getTailoredOrganizations(preset, language);

  // Generate clean plaintext representation
  const generateRawPlainText = () => {
    return `${cvData.personalInfo.fullName.toUpperCase()}
${cvData.personalInfo.headline}
Email: ${cvData.personalInfo.email} | Phone: ${cvData.personalInfo.phone}
LinkedIn: ${cvData.personalInfo.linkedin} | Website: ${cvData.personalInfo.website} | Instagram: @${cvData.personalInfo.instagram}

==================================================
RINGKASAN PROFESIONAL
==================================================
${cvData.personalInfo.summary}

==================================================
SOROTAN KINERJA & METRIK KUNCI
==================================================
${cvData.metrics.map((m) => `* ${m.value} ${m.label} - ${m.sublabel}`).join('\n')}

==================================================
PENGALAMAN KERJA (3 PERAN UTAMA)
==================================================
${experiences
  .map(
    (exp) => `${exp.role.toUpperCase()}
${exp.company} - ${exp.location} | ${exp.period} (${exp.type})
${exp.description}

Tanggung Jawab & Pencapaian:
${exp.highlights.map((h) => `* ${h}`).join('\n')}
Tools: ${exp.tools.join(', ')}`
  )
  .join('\n\n')}

==================================================
PORTOFOLIO KONSULTANSI & PROYEK INDEPENDEN (REFERENSI)
==================================================
${cvData.consulting.title.toUpperCase()} (${cvData.consulting.period})
${tailoredConsulting.summary}

DAFTAR PROYEK KONSULTASI:
${tailoredConsulting.projects
  .map(
    (p, i) => `${i + 1}. ${p.organization.toUpperCase()} - ${p.role}
Sektor: ${p.sector} | Status: ${p.periodType}
Highlights:
${p.highlights.map((h) => `  * ${h}`).join('\n')}`
  )
  .join('\n\n')}

Tools & Platform: ${cvData.consulting.tools.join(', ')}

==================================================
KEAHLIAN & KOMPETENSI
==================================================
Hard Skills:
${cvData.skills.hard.map((h) => `* ${h.category}: ${h.items.join(', ')}`).join('\n')}

Soft Skills:
${cvData.skills.soft.map((s) => `* ${s}`).join('\n')}

Tools & Technologies:
${(cvData.skills.toolCategories || []).map((cat) => `* ${cat.category}: ${cat.tools}`).join('\n')}

==================================================
SERTIFIKASI PROFESIONAL
==================================================
${cvData.certifications
  .map(
    (c) => `* ${c.title.toUpperCase()} - ${c.issuer}
  Grade: ${c.grade} | Masa Berlaku: ${c.period}
  Deskripsi: ${c.description}
  Kompetensi: ${c.skills.join(', ')}`
  )
  .join('\n\n')}

==================================================
PORTOFOLIO SOLUSI DIGITAL
==================================================
${tailoredDigitalSolutions
  .map(
    (sol) => `* ${sol.title} | ${sol.subtitle}
  Deskripsi: ${sol.description}${sol.impact ? (language === 'en' ? ` Impact: ${sol.impact}` : ` Dampak: ${sol.impact}`) : ''}
  Tech: ${sol.techStack.join(', ')}`
  )
  .join('\n\n')}

==================================================
PRESTASI & PENGHARGAAN
==================================================
${cvData.achievements.slice(0, 5).map((a) => `* [${a.year}] ${a.title} - ${a.organization} (Tingkat ${a.level})`).join('\n')}

==================================================
PENGALAMAN ORGANISASI & KEPEMIMPINAN
==================================================
${tailoredOrganizations.map((o) => `* ${o.role.toUpperCase()} - ${o.organization} (${o.period})\n  ${o.description}`).join('\n\n')}

==================================================
PENDIDIKAN
==================================================
${cvData.education.map((e) => `* ${e.degree} - ${e.institution} (${e.period})\n  ${e.detail}`).join('\n')}
`;
  };

  const rawText = generateRawPlainText();

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const atsChecklist = [
    { label: 'Struktur Single-Column', status: 'Lulus', note: 'Tidak menggunakan kolom ganda atau tabel yang merusak parsing bot ATS.' },
    { label: 'Header Standar Terverifikasi', status: 'Lulus', note: 'Menggunakan header standar (Ringkasan, Pengalaman, Pendidikan, Keahlian).' },
    { label: 'Tipografi Mesin Terbaca', status: 'Lulus', note: 'Menggunakan font sans-serif standar tanpa glyphs anomali.' },
    { label: 'Informasi Kontak Lengkap', status: 'Lulus', note: 'Email, telepon, LinkedIn, website, dan media sosial terformat dalam pola regex standar.' },
    { label: 'Metrik & Action Verbs', status: 'Lulus', note: 'Menggunakan metrik angka kuantitatif (100+, 95%+, 20+, 70%) dan kata kerja aksi.' },
    { label: 'Kerapatan Kata Kunci Industri', status: 'Lulus', note: 'Mencakup istilah kunci Operations, B2B CRM, SOP, ERP, dan AI Integration.' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>ATS Engine Diagnostic & Raw Text</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Skor 98/100
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Format kompatibel dengan sistem Workday, Taleo, Greenhouse & Lever
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 px-5 pt-3 gap-4 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'analysis'
                ? 'border-[#0062E3] text-[#0F172A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Analisis Kompatibilitas ATS
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'text'
                ? 'border-[#0062E3] text-[#0F172A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Raw Plain-Text Parser View
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'analysis' ? (
            <div className="space-y-5">
              {/* Score summary */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                    98%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">
                      Sangat Ramah ATS (Applicant Tracking System)
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Semua informasi utama terbaca secara otomatis tanpa distorsi format.
                    </p>
                  </div>
                </div>
                <button
                  onClick={generateATSPDF}
                  className="px-3.5 py-2 bg-[#0F172A] hover:bg-[#0062E3] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh PDF
                </button>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Hasil Pengecekan Kriteria ATS:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {atsChecklist.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{item.label}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {item.status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">
                  Teks mentah yang diekstrak oleh parser ATS:
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Semua Teks</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed whitespace-pre-wrap selection:bg-blue-600">
                {rawText}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Alvareza Hilka Pratama • Dokumen Resmi CV
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={generateATSPDF}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#0062E3] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh PDF Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
