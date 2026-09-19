import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Copy,
  Check,
  Mail,
  Download,
  RotateCw,
  MessageCircle,
  AlertCircle,
  Send,
  Settings,
  History,
  Paperclip,
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  Camera,
  Scan,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';
import { ALL_ROLE_PRESETS, matchPresetFromJobTitle } from '../../data/rolePresetsConfig';
import { GasHistoryModal } from './GasHistoryModal';
import { EmailLanguage, JobScanResult } from '../../types/jobApplication';
import {
  createMailtoUrl,
  generateTailoredApplicationDraft,
  APPLICANT_DATA,
} from '../../utils/jobApplicationDraft';
import { validateAndSanitizeOcrResult } from '../../utils/ocrValidatorAndMapper';
import { GasSenderService } from '../../services/gasSenderService';
import { generateCvPdfAttachment, formatEmailBodyToHtml } from '../../utils/gasAttachmentGenerator';
import { GasSettingsModal } from './GasSettingsModal';
import { GasAccountConfig, GasSendMode } from '../../types/gasSender';
import { useLanguage } from '../../context/LanguageContext';
import { SendingLottieAnimation } from './SendingLottieAnimation';

const HEADER_COLOR_PRESETS = [
  { hex: '#0062E3', label: 'Primary Blue' },
  { hex: '#0F172A', label: 'Navy Dark' },
  { hex: '#1E293B', label: 'Slate Gray' },
  { hex: '#047857', label: 'Emerald Green' },
  { hex: '#B91C1C', label: 'Crimson Red' },
  { hex: '#6D28D9', label: 'Royal Purple' },
  { hex: '#C2410C', label: 'Burnt Orange' },
  { hex: '#0369A1', label: 'Ocean Blue' },
  { hex: '#334155', label: 'Charcoal' },
  { hex: '#15803D', label: 'Forest Green' },
  { hex: '#A21CAF', label: 'Deep Magenta' },
  { hex: '#4338CA', label: 'Indigo' },
];

// Subcomponent: Combobox for selecting ATS CV Preset by 3-character code
const PresetCombobox: React.FC<{
  value: string;
  onChange: (key: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentPreset = ALL_ROLE_PRESETS.find((p) => p.key === value) || ALL_ROLE_PRESETS[0];

  const filteredPresets = ALL_ROLE_PRESETS.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.code.toLowerCase().includes(q) ||
      p.titleId.toLowerCase().includes(q) ||
      p.key.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative shrink-0" ref={comboboxRef}>
      <button
        type="button"
        id="cv-preset-combobox-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pilih Preset CV ATS"
        title={`Preset Saat Ini: ${currentPreset.code} (${currentPreset.tag || currentPreset.titleId})`}
        className="h-10 px-3 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs flex items-center gap-1.5 cursor-pointer"
      >
        <span className="font-mono text-xs font-bold text-blue-700 tracking-wide">
          {currentPreset.code}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-1.5 w-64 sm:w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
          {/* Search bar inside combobox */}
          <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode preset (e.g. OPT, ADM, HRS)..."
              className="w-full px-2 py-1 text-xs bg-transparent text-slate-900 focus:outline-none placeholder:text-slate-400"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ×
              </button>
            )}
          </div>

          {/* Options list */}
          <div className="max-h-52 overflow-y-auto p-1 divide-y divide-slate-100">
            {filteredPresets.length === 0 ? (
              <div className="p-3 text-[11px] text-slate-400 text-center">
                Kode preset tidak ditemukan
              </div>
            ) : (
              filteredPresets.map((preset) => {
                const isSelected = preset.key === value;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => {
                      onChange(preset.key);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {preset.code}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-xs truncate leading-snug">
                          {preset.tag || preset.titleId}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponent: Static formatted preview of email body with bold greeting, indented bullet points, and WhatsApp hyperlinks
const FormattedEmailBodyPreview: React.FC<{ body: string }> = ({ body }) => {
  if (!body) {
    return <p className="text-slate-400 italic text-xs">Belum ada draf isi email.</p>;
  }

  const lines = body.split('\n');

  // Helper to render text with WhatsApp hyperlinks
  const renderTextWithLinks = (text: string) => {
    const phoneRegex = /(\+?62|0)[\s\-]?[0-9]{3,4}[\s\-]?[0-9]{3,5}[\s\-]?[0-9]{3,5}/g;
    if (!phoneRegex.test(text)) {
      return text;
    }

    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    phoneRegex.lastIndex = 0;
    while ((match = phoneRegex.exec(text)) !== null) {
      const offset = match.index;
      if (offset > lastIdx) {
        parts.push(text.substring(lastIdx, offset));
      }
      const rawPhone = match[0];
      let digits = rawPhone.replace(/\D/g, '');
      if (digits.startsWith('0')) {
        digits = '62' + digits.slice(1);
      } else if (!digits.startsWith('62')) {
        digits = '62' + digits;
      }
      parts.push(
        <a
          key={`phone-${offset}`}
          href={`https://wa.me/${digits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer inline-flex items-center gap-0.5"
          title="Buka WhatsApp"
        >
          {rawPhone}
        </a>
      );
      lastIdx = offset + rawPhone.length;
    }
    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx));
    }
    return parts;
  };

  return (
    <div className="space-y-2 whitespace-normal font-sans text-xs sm:text-sm text-slate-800 leading-relaxed select-text">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} className="h-2" />;
        }

        const isGreeting = /^\s*(Yth\.|Dear\b)/i.test(trimmed);

        // Check if line is a bullet item (•, -, *, or numbered)
        const bulletMatch = trimmed.match(/^([•\-\*]|\d+\.)\s+(.+)$/);
        if (bulletMatch) {
          const bulletSymbol = bulletMatch[1];
          const bulletContent = bulletMatch[2];
          return (
            <div
              key={index}
              className="pl-4 sm:pl-6 -my-0.5 flex items-start gap-2.5 text-slate-800"
            >
              <span className="text-slate-700 font-bold select-none shrink-0 mt-0.5">
                {bulletSymbol.length === 1 ? '•' : bulletSymbol}
              </span>
              <span className="flex-1 leading-relaxed">
                {renderTextWithLinks(bulletContent)}
              </span>
            </div>
          );
        }

        if (isGreeting) {
          return (
            <div key={index} className="font-bold text-slate-900 pb-0.5">
              {renderTextWithLinks(trimmed)}
            </div>
          );
        }

        return (
          <div key={index} className="leading-relaxed">
            {renderTextWithLinks(trimmed)}
          </div>
        );
      })}
    </div>
  );
};

interface JobApplyModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFile: File | null;
  scanResult: JobScanResult | null;
  isScanning: boolean;
  scanStage?: 'idle' | 'ocr' | 'analyzing';
  ocrProgress?: number;
  onRescanFile: (file: File) => void;
  onClearFile?: () => void;
  error?: string | null;
}

interface CustomAttachmentItem {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  base64: string;
}

export const JobApplyModalSheet: React.FC<JobApplyModalSheetProps> = ({
  isOpen,
  onClose,
  selectedFile,
  scanResult,
  isScanning,
  scanStage = 'idle',
  ocrProgress = 0,
  onRescanFile,
  onClearFile,
  error,
}) => {
  const [quickInputText, setQuickInputText] = useState<string>('');
  const [ocrResultText, setOcrResultText] = useState<string>('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [ccEmail, setCcEmail] = useState<string>('');
  const [showCcField, setShowCcField] = useState<boolean>(false);
  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [isSubjectAuto, setIsSubjectAuto] = useState<boolean>(true);
  const [emailBody, setEmailBody] = useState<string>('');
  const [isEmailBodyExpanded, setIsEmailBodyExpanded] = useState<boolean>(false);
  const { language: globalLanguage, setLanguage: setGlobalLanguage } = useLanguage();
  const [language, setLanguage] = useState<EmailLanguage>(globalLanguage || 'id');
  const [cvHeaderColor, setCvHeaderColor] = useState<string>('#0062E3');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [keyRequirements, setKeyRequirements] = useState<string[]>([]);
  const [isDropOver, setIsDropOver] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);

  // Custom User Attachments (Drop / Pick Files to send alongside email)
  const [customAttachments, setCustomAttachments] = useState<CustomAttachmentItem[]>([]);
  const [isAttachmentDropOver, setIsAttachmentDropOver] = useState<boolean>(false);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processUploadedFiles = async (files: FileList | File[]) => {
    const newItems: CustomAttachmentItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 15 * 1024 * 1024) {
        alert(`File "${file.name}" melebihi batas 15MB. Silakan pilih file yang lebih kecil.`);
        continue;
      }
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const res = reader.result as string;
            const clean = res.replace(/^data:[^;]+;base64,/, '');
            resolve(clean);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newItems.push({
          id: 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          name: file.name,
          size: file.size,
          mimeType: file.type || 'application/octet-stream',
          base64,
        });
      } catch (err) {
        console.error('Failed to read attachment file:', err);
      }
    }

    if (newItems.length > 0) {
      setCustomAttachments((prev) => [...prev, ...newItems]);
    }
  };

  const handleRemoveCustomAttachment = (id: string) => {
    setCustomAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  // Sync modal language if global language changes
  useEffect(() => {
    if (globalLanguage && globalLanguage !== language) {
      setLanguage(globalLanguage);
    }
  }, [globalLanguage]);

  // Copy feedback states
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCc, setCopiedCc] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // GAS Email Sender states
  const [isGasSettingsOpen, setIsGasSettingsOpen] = useState(false);
  const [isGasHistoryOpen, setIsGasHistoryOpen] = useState(false);
  const [attachCvPdf, setAttachCvPdf] = useState(true);
  const [selectedCvPreset, setSelectedCvPreset] = useState<string>('optimal');
  const [isPresetAuto, setIsPresetAuto] = useState<boolean>(() => {
    const saved = localStorage.getItem('isPresetAuto');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('isPresetAuto', String(isPresetAuto));
  }, [isPresetAuto]);
  const [activeSenderInfo, setActiveSenderInfo] = useState<{
    account: GasAccountConfig;
    index: number;
    mode: GasSendMode;
    totalConfigured: number;
  } | null>(null);

  const [gasSendState, setGasSendState] = useState<'idle' | 'generating' | 'sending' | 'success' | 'error'>('idle');
  const [gasSendMsg, setGasSendMsg] = useState<string>('');
  const [sendProgress, setSendProgress] = useState<number>(0);
  const [sendingSenderEmail, setSendingSenderEmail] = useState<string>('');
  const [lastSentAccount, setLastSentAccount] = useState<string>('');
  const [emailOption, setEmailOption] = useState<string>('rotate');
  const [gasAccounts, setGasAccounts] = useState<GasAccountConfig[]>([]);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshSenderInfo = () => {
    const next = GasSenderService.getNextSenderAccount();
    setActiveSenderInfo(next);
    const accs = GasSenderService.getAccounts();
    setGasAccounts(accs);
    const mode = GasSenderService.getSendMode();
    if (mode === 'manual') {
      const manualId = GasSenderService.getManualAccountId();
      setEmailOption(manualId);
    } else {
      setEmailOption('rotate');
    }
  };

  const handleEmailOptionChange = (value: string) => {
    setEmailOption(value);
    if (value === 'rotate') {
      GasSenderService.setSendMode('rotate');
      const next = GasSenderService.getNextSenderAccount();
      setActiveSenderInfo(next);
    } else if (value !== 'mailto') {
      GasSenderService.setSendMode('manual');
      GasSenderService.setManualAccountId(value);
      const next = GasSenderService.getNextSenderAccount();
      setActiveSenderInfo(next);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshSenderInfo();
      setGasSendState('idle');
      setGasSendMsg('');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      setTimeout(() => {
        if (!document.querySelector('[id$="-backdrop"]')) {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      }, 0);
    };
  }, [isOpen, isGasSettingsOpen, isGasHistoryOpen]);

  // Create image preview URL when file changes
  useEffect(() => {
    if (!selectedFile) {
      setImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setImagePreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  // Populate form input fields and OCR text when scanResult changes
  useEffect(() => {
    if (scanResult) {
      const validated = validateAndSanitizeOcrResult(
        scanResult,
        scanResult.rawExtractedText || '',
        selectedFile?.name
      );

      setLanguage(validated.language);
      setCompanyName(validated.companyName || '');
      setJobTitle(validated.jobTitle || '');
      setRecipientEmail(validated.recipientEmail || '');
      if (validated.ccEmail !== undefined) setCcEmail(validated.ccEmail);
      if (validated.showCcField !== undefined) setShowCcField(validated.showCcField);
      setRecipientPhone(validated.recipientPhone || '');
      if (validated.keyRequirements && validated.keyRequirements.length > 0) {
        setKeyRequirements(validated.keyRequirements);
      }
      if (validated.hasExplicitSubject && validated.emailSubject) {
        setEmailSubject(validated.emailSubject);
      } else if (isSubjectAuto) {
        if (validated.emailSubject) {
          setEmailSubject(validated.emailSubject);
        } else if (validated.jobTitle) {
          setEmailSubject(`${validated.jobTitle.trim()} - Alvareza`);
        }
      } else {
        setEmailSubject('');
      }
      if (validated.emailBody) {
        setEmailBody(validated.emailBody);
      }
      if (scanResult.rawExtractedText) {
        setOcrResultText(scanResult.rawExtractedText.trim());
      }
    } else if (!emailBody) {
      const draft = generateTailoredApplicationDraft({
        companyName: companyName || '',
        jobTitle: jobTitle || '',
        recipientEmail: recipientEmail || '',
        keyRequirements: [],
        tone: 'concise',
        language: 'id',
      });
      setEmailBody(draft.emailBody);
    }
  }, [scanResult, selectedFile]);

  // Handler for quick pasted / typed job ad text (Smart Teks)
  const handleQuickTextChange = (text: string) => {
    setQuickInputText(text);
    if (!text.trim()) {
      setCompanyName('');
      setJobTitle('');
      setRecipientEmail('');
      setCcEmail('');
      setShowCcField(false);
      setRecipientPhone('');
      if (!isSubjectAuto) {
        setEmailSubject('');
      }
      return;
    }

    const validated = validateAndSanitizeOcrResult(
      null,
      text,
      undefined
    );

    setCompanyName(validated.companyName);
    setJobTitle(validated.jobTitle);
    setRecipientEmail(validated.recipientEmail);
    if (validated.ccEmail !== undefined) setCcEmail(validated.ccEmail);
    if (validated.showCcField !== undefined) setShowCcField(validated.showCcField);
    setRecipientPhone(validated.recipientPhone);
    if (validated.keyRequirements && validated.keyRequirements.length > 0) {
      setKeyRequirements(validated.keyRequirements);
    }
    setLanguage(validated.language);

    if (validated.hasExplicitSubject && validated.emailSubject) {
      setEmailSubject(validated.emailSubject);
    } else if (isSubjectAuto) {
      const cleanTitle = (validated.jobTitle || '').trim();
      setEmailSubject(cleanTitle ? `${cleanTitle} - Alvareza` : (validated.emailSubject || ''));
    } else {
      setEmailSubject('');
    }

    if (validated.emailBody) setEmailBody(validated.emailBody);
  };

  // Handler for editing OCR extracted text
  const handleOcrTextChange = (text: string) => {
    setOcrResultText(text);
    if (!text.trim()) return;

    const validated = validateAndSanitizeOcrResult(
      null,
      text,
      selectedFile?.name
    );

    if (validated.companyName) setCompanyName(validated.companyName);
    if (validated.jobTitle) setJobTitle(validated.jobTitle);
    if (validated.recipientEmail) setRecipientEmail(validated.recipientEmail);
    if (validated.ccEmail !== undefined) setCcEmail(validated.ccEmail);
    if (validated.showCcField !== undefined) setShowCcField(validated.showCcField);
    if (validated.recipientPhone) setRecipientPhone(validated.recipientPhone);
    if (validated.keyRequirements && validated.keyRequirements.length > 0) {
      setKeyRequirements(validated.keyRequirements);
    }
    setLanguage(validated.language);

    if (validated.hasExplicitSubject && validated.emailSubject) {
      setEmailSubject(validated.emailSubject);
    } else if (isSubjectAuto) {
      const cleanTitle = (validated.jobTitle || '').trim();
      setEmailSubject(cleanTitle ? `${cleanTitle} - Alvareza` : (validated.emailSubject || ''));
    } else {
      setEmailSubject('');
    }
  };

  // Auto-sync ATS CV Preset and email highlights whenever jobTitle changes
  useEffect(() => {
    if (isPresetAuto && jobTitle && jobTitle.trim()) {
      const matched = matchPresetFromJobTitle(jobTitle);
      if (matched && matched.key) {
        setSelectedCvPreset(matched.key);
      }
    }
  }, [jobTitle, isPresetAuto]);

  // Sync subject ONLY when isSubjectAuto is enabled or jobTitle changes (NOT dependent on language)
  useEffect(() => {
    if (isSubjectAuto) {
      const cleanTitle = jobTitle.trim();
      setEmailSubject(cleanTitle ? `${cleanTitle} - Alvareza` : '');
    }
  }, [isSubjectAuto, jobTitle]);

  // Synchronization of email body when preset or language changes or if body is empty
  useEffect(() => {
    if (!emailBody) {
      const draft = generateTailoredApplicationDraft({
        companyName: companyName.trim() || (language === 'en' ? 'Company' : 'Perusahaan'),
        jobTitle: jobTitle.trim() || (language === 'en' ? 'Position' : 'Posisi Terkait'),
        recipientEmail: recipientEmail.trim() || 'recruitment@perusahaan.com',
        keyRequirements,
        tone: 'concise',
        language,
        presetKey: selectedCvPreset,
      });
      setEmailBody(draft.emailBody);
    }
  }, [selectedCvPreset, language]);

  const handleRefreshDraft = () => {
    const draft = generateTailoredApplicationDraft({
      companyName: companyName.trim() || (language === 'en' ? 'Company' : 'Perusahaan'),
      jobTitle: jobTitle.trim() || (language === 'en' ? 'Position' : 'Posisi Terkait'),
      recipientEmail: recipientEmail.trim() || 'recruitment@perusahaan.com',
      keyRequirements,
      tone: 'concise',
      language,
      presetKey: selectedCvPreset,
    });
    if (isSubjectAuto) {
      const cleanTitle = jobTitle.trim();
      setEmailSubject(cleanTitle ? `${cleanTitle} - Alvareza` : 'Posisi - Alvareza');
    }
    setEmailBody(draft.emailBody);
  };

  const handleCopy = async (text: string, type: 'subject' | 'body' | 'all' | 'email' | 'cc' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'subject') {
        setCopiedSubject(true);
        setTimeout(() => setCopiedSubject(false), 2000);
      } else if (type === 'body') {
        setCopiedBody(true);
        setTimeout(() => setCopiedBody(false), 2000);
      } else if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else if (type === 'cc') {
        setCopiedCc(true);
        setTimeout(() => setCopiedCc(false), 2000);
      } else if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else if (type === 'all') {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (type === 'all') {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    }
  };

  const handleOpenMailClient = () => {
    const mailto = createMailtoUrl(
      recipientEmail,
      emailSubject,
      emailBody,
      ccEmail.trim() ? ccEmail.trim() : undefined
    );
    window.location.href = mailto;
  };

  const handleDownloadTxt = () => {
    const textContent = `PENERIMA: ${recipientEmail || 'recruitment@perusahaan.com'}
SUBJEK: ${emailSubject}

================ ISI EMAIL (RINGKAS & PADAT) ================
${emailBody}

============================================================
Pengirim: ${APPLICANT_DATA.fullName} (${APPLICANT_DATA.email})
WhatsApp: ${APPLICANT_DATA.phone}
CV Online: ${APPLICANT_DATA.portfolioUrl}
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `draf-lamaran-${(companyName || 'job').toLowerCase().replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handlePreviewCvPdf = () => {
    try {
      const att = generateCvPdfAttachment({
        preset: selectedCvPreset,
        language,
        jobTitle,
        companyName,
        headerColor: cvHeaderColor,
      });
      const byteCharacters = atob(att.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = att.filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert('Gagal membuat preview PDF: ' + (e?.message || 'Error tidak diketahui'));
    }
  };

  const handleSendViaGas = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      alert('Mohon isi alamat email tujuan penerima (HRD) terlebih dahulu.');
      return;
    }

    const currentSender = GasSenderService.getNextSenderAccount();
    if (!currentSender || currentSender.totalConfigured === 0 || !currentSender.account.webAppUrl) {
      setIsGasSettingsOpen(true);
      return;
    }

    setSendingSenderEmail(currentSender.account.email);
    setSendProgress(18);
    setGasSendState('generating');
    setGasSendMsg('Men-generate CV ATS PDF resmi...');

    const progressInterval = setInterval(() => {
      setSendProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 4) + 2;
      });
    }, 120);

    try {
      const attachments = [];
      if (attachCvPdf) {
        const cvAttachment = generateCvPdfAttachment({
          preset: selectedCvPreset,
          language,
          jobTitle,
          companyName,
          headerColor: cvHeaderColor,
        });
        attachments.push(cvAttachment);
      }
      setSendProgress((prev) => Math.max(prev, 42));

      // Sertakan lampiran kustom yang di-drop/upload oleh pengguna
      for (const customAtt of customAttachments) {
        attachments.push({
          filename: customAtt.name,
          mimeType: customAtt.mimeType,
          base64: customAtt.base64,
          sizeBytes: customAtt.size,
        });
      }

      const plainBody = emailBody.trim();
      const htmlFormatted = formatEmailBodyToHtml(plainBody);

      setGasSendState('sending');
      setGasSendMsg(`Mengirimkan email via ${currentSender.account.email}...`);
      setSendProgress((prev) => Math.max(prev, 68));

      const finalSubject = emailSubject.trim() || (jobTitle.trim() ? `${jobTitle.trim()} - Alvareza` : 'Lamaran Pekerjaan - Alvareza');

      const result = await GasSenderService.sendEmail(
        {
          targetEmail: recipientEmail.trim(),
          companyName: companyName.trim(),
          jobTitle: jobTitle.trim(),
          cc: ccEmail.trim() ? ccEmail.trim() : undefined,
          subject: finalSubject,
          body: plainBody,
          bodyText: plainBody,
          bodyHtml: htmlFormatted,
          senderName: 'Lamaran Kerja Alvareza',
          attachments,
        },
        currentSender.account,
        { autoAdvanceRotation: true }
      );

      clearInterval(progressInterval);

      if (result.success) {
        setSendProgress(100);
        setTimeout(() => {
          setGasSendState('success');
          setLastSentAccount(currentSender.account.email);
          setGasSendMsg(
            result.message ||
              `Email lamaran beserta CV ATS berhasil terkirim ke ${recipientEmail} menggunakan ${currentSender.account.email}!`
          );
          refreshSenderInfo();

          // Reset semua field formulir input (kecuali lampiran kustom yang tetap dipertahankan)
          setQuickInputText('');
          setCompanyName('');
          setJobTitle('');
          setRecipientEmail('');
          setCcEmail('');
          setShowCcField(false);
          setRecipientPhone('');
          setOcrResultText('');
          setImagePreviewUrl(null);
          setKeyRequirements([]);
          setEmailSubject('');
          if (onClearFile) {
            onClearFile();
          }
        }, 600);
      } else {
        setSendProgress(0);
        setGasSendState('error');
        setGasSendMsg(result.error || 'Gagal mengirim email via Google Apps Script.');
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setSendProgress(0);
      setGasSendState('error');
      setGasSendMsg(err?.message || 'Terjadi kesalahan saat memproses pengiriman.');
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onRescanFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropOver(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files) as File[];
      const file = files.find((f) => f.type.startsWith('image/')) || files[0];
      if (file) {
        onRescanFile(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setImagePreviewUrl(null);
    setOcrResultText('');
    setIsImageExpanded(false);
    if (onClearFile) {
      onClearFile();
    }
  };

  const handleSelectHistoryItemForEdit = (item: any) => {
    if (item.companyName) setCompanyName(item.companyName);
    if (item.jobTitle) setJobTitle(item.jobTitle);
    if (item.targetEmail) setRecipientEmail(item.targetEmail);
    if (item.subject) {
      setEmailSubject(item.subject);
      setIsSubjectAuto(false);
    }
    setIsGasHistoryOpen(false);
  };

  let activeModalView: 'settings' | 'history' | 'apply' | null = null;
  if (isOpen) {
    if (isGasSettingsOpen) activeModalView = 'settings';
    else if (isGasHistoryOpen) activeModalView = 'history';
    else activeModalView = 'apply';
  }

  return (
    <AnimatePresence mode="wait">
      {activeModalView === 'settings' && (
        <GasSettingsModal
          key="modal-view-settings"
          isOpen={true}
          onClose={() => {
            setIsGasSettingsOpen(false);
            refreshSenderInfo();
          }}
          onAccountsUpdated={refreshSenderInfo}
        />
      )}

      {activeModalView === 'history' && (
        <GasHistoryModal
          key="modal-view-history"
          isOpen={true}
          onClose={() => setIsGasHistoryOpen(false)}
          onSelectForEdit={handleSelectHistoryItemForEdit}
        />
      )}

      {activeModalView === 'apply' && (
        <motion.div
          key="modal-view-apply-backdrop"
          id="job-apply-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-slate-950/10 backdrop-blur-md flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4 pt-[60px] md:pt-0 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label="Pilih flyer lowongan kerja"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Main Container: Mobile Bottom Sheet (rounded-t-3xl) vs Desktop Centered Modal (rounded-2xl) */}
          <motion.div
            key="modal-view-apply-container"
            id="job-apply-modal-container"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full md:max-w-2xl bg-white text-slate-800 rounded-t-3xl md:rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[calc(100vh-60px)] md:max-h-[88vh] overflow-hidden"
          >
        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/80">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
              {isScanning
                ? 'Scan Gambar'
                : gasSendState === 'generating' || gasSendState === 'sending'
                ? 'Mengirimkan Lamaran'
                : 'Lamar Pekerjaan'}
            </h2>
            <p className="text-xs text-slate-500 truncate">
              {isScanning
                ? 'Mengekstrak informasi lowongan...'
                : gasSendState === 'generating' || gasSendState === 'sending'
                ? 'Sedang memproses pengiriman...'
                : 'Draf email & pengiriman'}
            </p>
          </div>

          {!isScanning && (gasSendState !== 'generating' && gasSendState !== 'sending') && (
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Card Bendera Bahasa: Hanya gambar bendera saja, berada di samping kiri icon Riwayat */}
              <button
                type="button"
                id="btn-header-flag-language"
                onClick={() => {
                  const nextLang: EmailLanguage = language === 'id' ? 'en' : 'id';
                  setLanguage(nextLang);
                  setGlobalLanguage(nextLang);
                  const draft = generateTailoredApplicationDraft({
                    companyName: companyName.trim(),
                    jobTitle: jobTitle.trim(),
                    recipientEmail: recipientEmail.trim() || 'recruitment@perusahaan.com',
                    keyRequirements,
                    tone: 'concise',
                    language: nextLang,
                    presetKey: selectedCvPreset,
                  });
                  setEmailBody(draft.emailBody);
                }}
                className="p-1.5 text-slate-500 hover:bg-slate-200/60 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer select-none shrink-0 group flex items-center justify-center border border-slate-200/80 bg-white shadow-2xs"
                title={
                  language === 'id'
                    ? 'Bahasa Indonesia (Klik untuk beralih ke English)'
                    : 'English (Click to switch to Bahasa Indonesia)'
                }
                aria-label="Ganti Bahasa Draf Email dan Preset CV"
              >
                <img
                  src={language === 'id' ? 'https://flagcdn.com/id.svg' : 'https://flagcdn.com/gb.svg'}
                  alt={language === 'id' ? 'Bendera Indonesia' : 'UK Flag'}
                  className="w-5 h-3.5 object-cover rounded-xs shadow-2xs border border-black/10 group-hover:scale-105 transition-transform block"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </button>

              <button
                type="button"
                onClick={() => setIsGasHistoryOpen(true)}
                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                title="Riwayat Pengiriman Email"
                aria-label="Riwayat Pengiriman Email"
              >
                <History className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsGasSettingsOpen(true)}
                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                title="Pengaturan 6 Akun Pengirim GAS"
                aria-label="Pengaturan 6 Akun GAS"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal / Sheet Body */}
        <div className="relative overflow-y-auto p-4 sm:p-5 space-y-3.5 min-h-[220px]">
          {/* Sending State: Only Lottie Animation, Title, & Subtitle */}
          {(gasSendState === 'generating' || gasSendState === 'sending') ? (
            <div className="py-10 px-4 flex flex-col items-center justify-center text-center animate-in fade-in duration-200 min-h-[300px]">
              <SendingLottieAnimation
                className="w-44 h-44 sm:w-52 sm:h-52"
                senderEmail={sendingSenderEmail || activeSenderInfo?.account.email || 'halo.alvareza@gmail.com'}
              />
            </div>
          ) : (
            <>
              {/* Smart Teks Input & OCR Image Pick Button (Hidden when scanning) */}
              {!isScanning && (
            <div
              className="space-y-1.5"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDropOver(true);
              }}
              onDragLeave={() => setIsDropOver(false)}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-between">
                <label htmlFor="quick-job-input" className="block text-xs font-semibold text-slate-700">
                  Smart Teks
                </label>
                <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
                  Format: <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-[10px]">Perusahaan, Posisi, Email, [CC], [Subjek]</code>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`relative flex-1 flex items-center rounded-xl border transition-all ${
                    isDropOver
                      ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500'
                      : 'border-slate-300 bg-white hover:border-slate-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'
                  } shadow-2xs`}
                >
                  <input
                    id="quick-job-input"
                    type="text"
                    value={quickInputText}
                    onChange={(e) => handleQuickTextChange(e.target.value)}
                    className="w-full pl-3.5 pr-8 py-2 text-xs sm:text-sm text-slate-900 bg-transparent border-none focus:outline-none"
                  />

                  {quickInputText && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuickInputText('');
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Hapus teks"
                      aria-label="Hapus teks"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Tombol Scan OCR di luar kolom input dengan card pembungkus putih */}
                <button
                  type="button"
                  id="btn-pick-flyer-ocr"
                  onClick={triggerFileInput}
                  className="w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl border border-slate-300 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs shrink-0 flex items-center justify-center"
                  title="Pindai flyer lowongan (OCR)"
                  aria-label="Pindai flyer lowongan (OCR)"
                >
                  <Scan className="w-4 h-4" />
                </button>
              </div>

              {/* Preview Gambar Utuh Penuh (di Luar Card & di Atas Kolom Input) */}
              {isImageExpanded && imagePreviewUrl && (
                <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Gambar Lowongan Kerja</span>
                    <button
                      type="button"
                      onClick={() => setIsImageExpanded(false)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      Kecilkan Gambar
                    </button>
                  </div>
                  <div
                    onClick={() => setIsImageExpanded(false)}
                    className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900/5 p-1.5 flex items-center justify-center cursor-zoom-out shadow-xs hover:border-slate-300 transition-all"
                    title="Klik gambar untuk memperkecil kembali"
                  >
                    <img
                      src={imagePreviewUrl}
                      alt="Flyer Lowongan Kerja Penuh"
                      className="w-full max-h-[60vh] object-contain rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Card Kolom Input Hasil OCR (dengan thumbnail gambar di sebelah kiri) */}
              {ocrResultText && (
                <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <label htmlFor="ocr-result-textarea" className="block text-xs font-semibold text-slate-700">
                      Hasil OCR
                    </label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(ocrResultText, 'all')}
                        className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Salin Teks Hasil OCR"
                        aria-label="Salin Teks Hasil OCR"
                      >
                        {copiedAll ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Hapus hasil OCR dan gambar"
                        aria-label="Hapus hasil OCR dan gambar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-stretch gap-2.5 p-2 rounded-xl border border-slate-300 bg-white shadow-2xs focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    {/* Gambar di sebelah kiri dari kolom teks OCR (hanya jika tidak expanded) */}
                    {!isImageExpanded && imagePreviewUrl && (
                      <div className="shrink-0 relative self-stretch flex items-center">
                        <img
                          src={imagePreviewUrl}
                          alt="Flyer"
                          onClick={() => setIsImageExpanded(true)}
                          title="Klik untuk melihat gambar utuh penuh"
                          className="w-16 sm:w-20 h-full min-h-[76px] max-h-32 object-cover rounded-lg border border-slate-200 shadow-2xs cursor-zoom-in hover:opacity-85 transition-opacity"
                        />
                      </div>
                    )}

                    {/* Textarea Hasil OCR di sebelah kanan gambar */}
                    <textarea
                      id="ocr-result-textarea"
                      rows={3}
                      value={ocrResultText}
                      onChange={(e) => handleOcrTextChange(e.target.value)}
                      className="flex-1 text-xs sm:text-sm text-slate-900 bg-transparent border-none focus:outline-none resize-y leading-relaxed min-h-[76px]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Scanning State */}
          {isScanning && (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              {imagePreviewUrl && (
                <div className="relative inline-block max-w-[220px] rounded-xl overflow-hidden shadow-md border-2 border-blue-500/60 bg-white">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview Flyer"
                    className="max-h-[220px] w-auto max-w-full block object-contain mx-auto"
                  />
                  {/* Up-and-Down Laser Scan Line */}
                  <div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-300 to-blue-500 shadow-[0_0_12px_#3b82f6,0_0_24px_#60a5fa]"
                    style={{
                      animation: 'scanBeam 2s ease-in-out infinite alternate',
                    }}
                  />
                  <style>{`
                    @keyframes scanBeam {
                      0% { top: 2%; }
                      100% { top: 95%; }
                    }
                  `}</style>
                  <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                </div>
              )}

              <div className="space-y-2 max-w-sm w-full">
                <div className="flex items-center justify-center text-blue-600 font-bold text-sm">
                  <span>
                    {scanStage === 'ocr'
                      ? `Konversi Gambar ke Teks (OCR)... ${ocrProgress}%`
                      : 'Merapikan Entitas & Draf Lamaran...'}
                  </span>
                </div>

                {scanStage === 'ocr' && (
                  <div className="w-full max-w-xs mx-auto bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-blue-600 h-full transition-all duration-200 rounded-full"
                      style={{ width: `${Math.max(10, ocrProgress)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Notice if any */}
          {!isScanning && error && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Catatan:</span> Menggunakan draf asistensi cerdas berbasis data CV Alvareza. Anda dapat mengedit detail di bawah.
              </div>
            </div>
          )}

          {/* Form Fields - Perfectly uniform 14px (space-y-3.5) vertical spacing */}
          {!isScanning && (
            <div className="space-y-3.5">
              {/* Row 1: Nama Perusahaan & Posisi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="company-name-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Perusahaan
                  </label>
                  <input
                    id="company-name-input"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="job-title-input" className="block text-xs font-semibold text-slate-700">
                      Posisi yang Dilamar
                    </label>
                    <div className="flex items-center gap-1.5 select-none" title="Pencocokan Preset Otomatis">
                      <span
                        onClick={() => setIsPresetAuto(!isPresetAuto)}
                        className={`text-xs font-semibold cursor-pointer transition-colors ${
                          isPresetAuto ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      >
                        Auto
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isPresetAuto}
                        onClick={() => setIsPresetAuto(!isPresetAuto)}
                        className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                          isPresetAuto ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle Auto Preset"
                      >
                        <span
                          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                            isPresetAuto ? 'translate-x-3' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <input
                    id="job-title-input"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 2: Email Tujuan & (Whatsapp atau Email CC Tujuan) */}
              {/* Row 2: Email Tujuan & Email CC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="recipient-email-input" className="block text-xs font-semibold text-slate-700">
                      Email Tujuan
                    </label>

                    <div className="flex items-center gap-2">
                      {/* Tombol Tambah CC hanya di mode mobile karena desktop sudah menampilkan kolom CC di samping */}
                      <button
                        type="button"
                        onClick={() => {
                          if (showCcField || ccEmail) {
                            setShowCcField(false);
                            setCcEmail('');
                          } else {
                            setShowCcField(true);
                          }
                        }}
                        className="sm:hidden text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
                      >
                        {showCcField || ccEmail ? 'Hapus CC' : 'Tambah CC'}
                      </button>

                      {recipientEmail && (
                        <button
                          type="button"
                          onClick={() => handleCopy(recipientEmail, 'email')}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Salin Email Tujuan"
                          aria-label="Salin Email Tujuan"
                        >
                          {copiedEmail ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    id="recipient-email-input"
                    type="email"
                    placeholder="hrd@perusahaan.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email CC: Langsung tampil di mode desktop (sm:block), di mode mobile tampil jika tombol Tambah CC diklik atau dari Smart Teks */}
                <div className={`${(showCcField || ccEmail) ? 'block' : 'hidden sm:block'} animate-in fade-in duration-200`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="recipient-cc-email-input" className="block text-xs font-semibold text-slate-700">
                      Email CC <span className="text-[10px] text-slate-400 font-normal">(Opsional)</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      {/* Tombol Hapus CC di mobile */}
                      {(showCcField || ccEmail) && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowCcField(false);
                            setCcEmail('');
                          }}
                          className="sm:hidden text-xs text-rose-500 hover:text-rose-700 font-medium hover:underline cursor-pointer"
                        >
                          Hapus CC
                        </button>
                      )}

                      {ccEmail && (
                        <button
                          type="button"
                          onClick={() => handleCopy(ccEmail, 'cc')}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Salin Email CC"
                          aria-label="Salin Email CC"
                        >
                          {copiedCc ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    id="recipient-cc-email-input"
                    type="email"
                    placeholder="cc@perusahaan.com"
                    value={ccEmail}
                    onChange={(e) => setCcEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="email-subject-input" className="text-xs font-semibold text-slate-700">
                    Subject
                  </label>
                  <div className="flex items-center gap-2">
                    {/* Toggle / Seekbar Format Otomatis: [Posisi] - Alvareza */}
                    <div className="flex items-center gap-1.5 select-none" title="Format subject otomatis: [Posisi] - Alvareza">
                      <span
                        onClick={() => {
                          const nextState = !isSubjectAuto;
                          setIsSubjectAuto(nextState);
                          if (nextState) {
                            const cleanTitle = jobTitle.trim();
                            setEmailSubject(cleanTitle ? `${cleanTitle} - Alvareza` : '');
                          } else {
                            setEmailSubject('');
                          }
                        }}
                        className={`text-xs font-semibold cursor-pointer transition-colors ${
                          isSubjectAuto ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      >
                        Auto
                      </span>
                      <button
                        type="button"
                        id="toggle-auto-subject"
                        role="switch"
                        aria-checked={isSubjectAuto}
                        onClick={() => {
                          const nextState = !isSubjectAuto;
                          setIsSubjectAuto(nextState);
                          if (nextState) {
                            const cleanTitle = jobTitle.trim();
                            setEmailSubject(cleanTitle ? `${cleanTitle} - Alvareza` : '');
                          } else {
                            setEmailSubject('');
                          }
                        }}
                        className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                          isSubjectAuto ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        aria-label="Format subject otomatis [Posisi] - Alvareza"
                      >
                        <span
                          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            isSubjectAuto ? 'translate-x-3' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(emailSubject, 'subject')}
                      className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Salin Subject"
                      aria-label="Salin Subject"
                    >
                      {copiedSubject ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <input
                  id="email-subject-input"
                  type="text"
                  value={emailSubject}
                  onChange={(e) => {
                    if (isSubjectAuto) setIsSubjectAuto(false);
                    setEmailSubject(e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-normal rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Isi Email (Teks Statis dengan Format Bersih, Bold Yth, & Hyperlink WhatsApp) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    onClick={() => setIsEmailBodyExpanded(!isEmailBodyExpanded)}
                    className="text-xs font-semibold text-slate-700 cursor-pointer select-none hover:text-blue-600 transition-colors"
                  >
                    Isi Email
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(emailBody, 'body')}
                      className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Salin Isi Email"
                      aria-label="Salin Isi Email"
                    >
                      {copiedBody ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEmailBodyExpanded(!isEmailBodyExpanded)}
                      className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title={isEmailBodyExpanded ? 'Sembunyikan Isi Email' : 'Tampilkan Isi Email'}
                      aria-label={isEmailBodyExpanded ? 'Sembunyikan Isi Email' : 'Tampilkan Isi Email'}
                    >
                      {isEmailBodyExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>

                {isEmailBodyExpanded && (
                  <div className="w-full p-3.5 sm:p-4 rounded-lg border border-slate-200 bg-slate-50/75 text-slate-800 shadow-2xs overflow-y-auto max-h-72 select-text animate-in fade-in duration-150">
                    <FormattedEmailBodyPreview body={emailBody} />
                  </div>
                )}
              </div>

              {/* SECTION: Lampiran Berkas Tambahan (Drop / Pick Files) */}
              <div className="space-y-1.5 pt-1">
                {/* Hidden File Input (always available for triggers) */}
                <input
                  ref={attachmentInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.zip,.rar"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      processUploadedFiles(e.target.files);
                      e.target.value = '';
                    }
                  }}
                  className="hidden"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <span>Lampiran</span>
                    {customAttachments.length > 0 && (
                      <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 font-bold rounded-full text-[10px]">
                        {customAttachments.length}
                      </span>
                    )}
                  </div>

                  {/* Tombol teks Tambah File jika sudah ada file yang dilampirkan */}
                  {customAttachments.length > 0 && (
                    <button
                      type="button"
                      onClick={() => attachmentInputRef.current?.click()}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                    >
                      Tambah File
                    </button>
                  )}
                </div>

                {/* Dropzone Area - Hanya muncul jika BELUM ADA file yang dilampirkan */}
                {customAttachments.length === 0 && (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsAttachmentDropOver(true);
                    }}
                    onDragLeave={() => setIsAttachmentDropOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsAttachmentDropOver(false);
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        processUploadedFiles(e.dataTransfer.files);
                      }
                    }}
                    onClick={() => attachmentInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-3.5 sm:p-4 text-center cursor-pointer transition-all ${
                      isAttachmentDropOver
                        ? 'border-blue-500 bg-blue-50/70 scale-[0.99]'
                        : 'border-slate-300 bg-slate-50/60 hover:bg-slate-100/70 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          Sisipkan File Disini
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          PDF, DOCX, JPG, PNG, ZIP (Maks. 15MB)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* List of Uploaded Custom Attachments - Tanpa icon, font clean Inter */}
                {customAttachments.length > 0 && (
                  <div className="space-y-1.5 pt-0.5">
                    {customAttachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs group"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {formatFileSize(file.size)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCustomAttachment(file.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                          title="Hapus lampiran ini"
                          aria-label="Hapus lampiran ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: Status Pengiriman & Feedback */}
          {!isScanning && (gasSendState !== 'idle') && (
            <div className="space-y-2">
              {/* Sending Feedback Alerts */}
              {gasSendState === 'generating' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-800">
                  <RotateCw className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                  <span>{gasSendMsg}</span>
                </div>
              )}

              {gasSendState === 'sending' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-800">
                  <RotateCw className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                  <span className="font-medium">{gasSendMsg}</span>
                </div>
              )}

              {gasSendState === 'success' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-900 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 flex-1">
                    <div className="font-bold">Email Lamaran Berhasil Terkirim via GAS!</div>
                    <p className="text-emerald-800 leading-relaxed">{gasSendMsg}</p>
                    {activeSenderInfo?.mode === 'rotate' && (
                      <p className="text-[11px] text-emerald-700 font-medium">
                        🔄 Sistem otomatis bergantian ke pengirim berikutnya untuk lamaran selanjutnya.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {gasSendState === 'error' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-900 animate-in fade-in duration-200">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="font-bold">Pengiriman Gagal:</div>
                    <p className="text-rose-800 leading-relaxed">{gasSendMsg}</p>
                    <button
                      type="button"
                      onClick={() => setIsGasSettingsOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-900 underline cursor-pointer"
                    >
                      <Settings className="w-3 h-3" />
                      Periksa URL di Pengaturan 6 Akun GAS
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          </>
          )}
        </div>

        {/* Action Buttons Footer: Saat proses kirim, digantikan dengan bar progress di paling bawah */}
        {!isScanning && (
          (gasSendState === 'generating' || gasSendState === 'sending') ? (
            <div className="px-5 py-4 border-t border-slate-200 bg-white flex items-center gap-3.5 shrink-0 animate-in fade-in duration-200">
              <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-200/60">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${Math.min(100, Math.max(5, sendProgress))}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-700 font-mono tracking-tight shrink-0 min-w-[42px] text-right">
                {sendProgress}%
              </span>
            </div>
          ) : (
            <div className="px-4 sm:px-5 py-3 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between gap-2 shrink-0">
              {/* Samping Kiri Kolom Opsi Preset: Card Warna Header CV & Kolom Opsi Preset CV ATS */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Card Warna (Header Color Picker CV - Default #0062E3) */}
                <div className="relative">
                  <button
                    type="button"
                    id="btn-cv-header-color-picker"
                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    title={`Warna Header Section CV (${cvHeaderColor})`}
                    aria-label="Ubah Warna Header Section CV"
                    className="h-10 px-3 flex items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer select-none shrink-0"
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs shrink-0 block"
                      style={{ backgroundColor: cvHeaderColor }}
                    />
                  </button>

                  {isColorPickerOpen && (
                    <>
                      {/* Backdrop Dismiss */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsColorPickerOpen(false)}
                      />

                      {/* Dropdown Popup */}
                      <div className="absolute left-0 bottom-full mb-2 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                              style={{ backgroundColor: cvHeaderColor }}
                            />
                            <span className="text-xs font-bold text-slate-900">
                              Warna Header CV
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsColorPickerOpen(false)}
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-500 font-medium mb-2.5">
                          Pilih warna latar belakang untuk header section CV yang akan dikirim:
                        </p>

                        {/* Preset Color Circles */}
                        <div className="grid grid-cols-6 gap-2 mb-3">
                          {HEADER_COLOR_PRESETS.map((preset) => {
                            const isSelected = cvHeaderColor.toLowerCase() === preset.hex.toLowerCase();
                            return (
                              <button
                                key={preset.hex}
                                type="button"
                                onClick={() => {
                                  setCvHeaderColor(preset.hex);
                                }}
                                title={preset.label}
                                className={`w-7 h-7 rounded-full transition-all flex items-center justify-center border cursor-pointer ${
                                  isSelected
                                    ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-white scale-110 border-white shadow-xs'
                                    : 'border-slate-200 hover:scale-105'
                                }`}
                                style={{ backgroundColor: preset.hex }}
                              >
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" strokeWidth={3} />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Hex Input & Native Color Picker */}
                        <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                          <label className="text-[11px] font-bold text-slate-500 shrink-0">HEX</label>
                          <div className="relative flex-1 flex items-center">
                            <input
                              type="text"
                              maxLength={7}
                              value={cvHeaderColor.startsWith('#') ? cvHeaderColor : `#${cvHeaderColor}`}
                              onChange={(e) => {
                                let val = e.target.value;
                                if (!val.startsWith('#')) {
                                  val = '#' + val.replace(/#/g, '');
                                }
                                const hexPart = val.slice(1).replace(/[^0-9A-Fa-f]/g, '');
                                if (hexPart.length <= 6) {
                                  setCvHeaderColor(`#${hexPart}`);
                                }
                              }}
                              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-normal outline-none uppercase transition-all"
                              placeholder="#0062E3"
                            />
                          </div>
                          <input
                            type="color"
                            value={cvHeaderColor.startsWith('#') && cvHeaderColor.length === 7 ? cvHeaderColor : '#0062E3'}
                            onChange={(e) => setCvHeaderColor(e.target.value.toUpperCase())}
                            className="w-7 h-7 rounded-lg border border-slate-200 cursor-pointer p-0 bg-transparent overflow-hidden shrink-0"
                            title="Pilih warna khusus"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Kolom Opsi Preset CV ATS (Combobox 3-Karakter Code) */}
                <PresetCombobox
                  value={selectedCvPreset}
                  onChange={(newPreset) => {
                    setSelectedCvPreset(newPreset);
                    const draft = generateTailoredApplicationDraft({
                      companyName: companyName.trim(),
                      jobTitle: jobTitle.trim(),
                      recipientEmail: recipientEmail.trim() || 'recruitment@perusahaan.com',
                      keyRequirements,
                      tone: 'concise',
                      language,
                      presetKey: newPreset,
                    });
                    setEmailBody(draft.emailBody);
                  }}
                />
              </div>

              {/* Kolom Opsi Email Pengiriman */}
              <div className="flex-1 min-w-0">
                <select
                  id="email-send-option-select"
                  value={emailOption}
                  onChange={(e) => handleEmailOptionChange(e.target.value)}
                  aria-label="Pilih Opsi Email Pengiriman"
                  className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs truncate cursor-pointer"
                >
                  <option value="rotate">
                    Rotasi Otomatis ({gasAccounts.filter((a) => a.isActive).length}/6 Akun Aktif)
                  </option>
                  {gasAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.email}
                    </option>
                  ))}
                  <option value="mailto">mailto (Aplikasi Email Default)</option>
                </select>
              </div>

              {/* Samping Paling Kanan: Tombol Kirim Presisi */}
              <button
                type="button"
                id="btn-send-email-action"
                onClick={() => {
                  if (emailOption === 'mailto') {
                    handleOpenMailClient();
                  } else {
                    handleSendViaGas();
                  }
                }}
                disabled={gasSendState === 'generating' || gasSendState === 'sending'}
                className="h-10 w-10 sm:w-11 rounded-xl flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-600/30 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shrink-0 border border-blue-500/20"
                title={emailOption === 'mailto' ? 'Buka Aplikasi Email' : 'Kirim Email Lamaran'}
                aria-label={emailOption === 'mailto' ? 'Buka Aplikasi Email' : 'Kirim Email Lamaran'}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};
