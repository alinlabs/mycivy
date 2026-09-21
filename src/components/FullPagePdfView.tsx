import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  Check,
  Loader2,
  Share2,
  Copy,
  CheckCheck,
  ExternalLink,
  MessageCircle,
  QrCode,
  ArrowLeft,
  LayoutTemplate,
  Palette,
  Paintbrush,
  AlignLeft,
  AlignJustify,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../context/LanguageContext';
import { useCvSelection } from '../hooks/useCvSelection';
import { usePdfPreview } from '../hooks/usePdfPreview';
import { ALL_ROLE_PRESETS } from '../data/rolePresetsConfig';
import { HEADER_COLOR_PRESETS, DESIGN_OPTIONS } from './PrintableView/constants';
import { AtsDocumentSheet } from './AtsDocumentSheet';
import { DesignModal } from './PrintableView/DesignModal';
import { DesignPreset } from './PrintableView/types';
import { useMetaTags } from '../hooks/useMetaTags';
import { PRESET_HEADLINES, PRESET_SUMMARIES } from '../data/presetHeadlinesSummaries';

// Embedded vector SVG badge for MyCivy logo inside the QR Code (Text only, centered, no outline)
const MYCIVY_QR_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 32" width="96" height="32">
  <rect width="96" height="32" rx="6" fill="#ffffff"/>
  <text x="48" y="16" text-anchor="middle" dominant-baseline="central" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16.5" font-weight="900" letter-spacing="-0.3">
    <tspan fill="#0062E3">My</tspan><tspan fill="#0F172A">Civy</tspan>
  </text>
</svg>`
)}`;

interface FullPagePdfViewProps {
  initialPreset: string;
  onNavigateToEditor: () => void;
}

export const FullPagePdfView: React.FC<FullPagePdfViewProps> = ({
  initialPreset,
  onNavigateToEditor,
}) => {
  const { language, toggleLanguage, activeCvData: cvData } = useLanguage();

  // CV Selection State
  const {
    items,
    sectionOrders,
    selectedPresetRole,
    applyPreset,
  } = useCvSelection(cvData);

  // Initialize active preset on mount
  useEffect(() => {
    if (initialPreset) {
      applyPreset(initialPreset);
    }
  }, [initialPreset]);

  // Helper to extract initial design, color, and text alignment from URL query parameters (?theme=...&color=...&align=...)
  const getInitialUrlParams = (): {
    initialTheme: DesignPreset;
    initialColor: string;
    initialAlign: 'left' | 'justify';
  } => {
    if (typeof window === 'undefined') {
      return { initialTheme: 'block', initialColor: '#0F172A', initialAlign: 'left' };
    }
    const params = new URLSearchParams(window.location.search);
    const themeParam = (params.get('theme') || params.get('t') || '').toLowerCase();
    const validThemes: DesignPreset[] = ['block', 'line', 'badge', 'plain'];
    const initialTheme: DesignPreset = validThemes.includes(themeParam as DesignPreset)
      ? (themeParam as DesignPreset)
      : 'block';

    const rawColor = (params.get('color') || params.get('c') || '').trim();
    const cleanHex = rawColor.replace(/^#/, '');
    const isValidHex = /^[0-9A-Fa-f]{3,8}$/.test(cleanHex);
    const initialColor = isValidHex ? `#${cleanHex}` : '#0F172A';

    const rawAlign = (params.get('align') || params.get('a') || '').toLowerCase().trim();
    const initialAlign: 'left' | 'justify' = rawAlign === 'justify' ? 'justify' : 'left';

    return { initialTheme, initialColor, initialAlign };
  };

  const { initialTheme, initialColor, initialAlign } = getInitialUrlParams();

  // Design and Customization States
  const [designPreset, setDesignPreset] = useState<DesignPreset>(initialTheme);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isDesignMenuOpen, setIsDesignMenuOpen] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'justify'>(initialAlign);
  const [headerColor, setHeaderColor] = useState<string>(initialColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Sync URL search params with active design theme, header color, and text alignment without page reload
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (designPreset && designPreset !== 'block') {
      url.searchParams.set('theme', designPreset);
    } else {
      url.searchParams.delete('theme');
      url.searchParams.delete('t');
    }

    const cleanColor = headerColor.replace(/^#/, '').toUpperCase();
    if (cleanColor && cleanColor !== '0F172A') {
      url.searchParams.set('color', cleanColor);
    } else {
      url.searchParams.delete('color');
      url.searchParams.delete('c');
    }

    if (textAlign === 'justify') {
      url.searchParams.set('align', 'justify');
    } else {
      url.searchParams.delete('align');
      url.searchParams.delete('a');
    }

    if (language === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
      url.searchParams.delete('bahasa');
      url.searchParams.delete('l');
    }

    window.history.replaceState({}, '', url.toString());
  }, [designPreset, headerColor, textAlign, language]);

  const isAnyModalActive = showQrCode || isDesignModalOpen;

  // Lock background scroll and hide scrollbars when QR modal or Design modal is active
  useEffect(() => {
    if (isAnyModalActive) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isAnyModalActive]);

  const customHeadline =
    (selectedPresetRole && PRESET_HEADLINES[selectedPresetRole]?.[language]) ||
    cvData.personalInfo.headline ||
    '';
  const customSummary =
    (selectedPresetRole && PRESET_SUMMARIES[selectedPresetRole]?.[language]) ||
    cvData.personalInfo.summary ||
    '';

  // PDF Preview Generation Hook
  const {
    previewPageImages,
    pdfPages,
    isBuildingPdf,
    isDownloading,
    handleDownloadCustomPDF,
  } = usePdfPreview({
    disableUrlActions: true,
    applyPreset,
    isPreviewOpen: true,
    items,
    language,
    sectionOrders,
    selectedPresetRole,
    customHeadline,
    customSummary,
    designPreset,
    textAlign,
    headerColor,
  });

  // Find currently active preset info object
  const currentPresetOption =
    ALL_ROLE_PRESETS.find((p) => p.key === selectedPresetRole) ||
    ALL_ROLE_PRESETS.find((p) => p.key === 'optimal') ||
    ALL_ROLE_PRESETS[0];

  const presetCodeUpper = currentPresetOption.code.toUpperCase();
  const currentRoleTitle = language === 'en' ? currentPresetOption.titleEn : currentPresetOption.titleId;

  // Dynamic meta tags for Full Page PDF View (different title and description, same metatag.webp image)
  useMetaTags({
    isFullPdf: true,
    presetCode: currentPresetOption.code,
    presetTitle: currentRoleTitle,
    canonicalPath: `/${currentPresetOption.code.toLowerCase()}`,
    language,
  });

  const shareableUrl = (() => {
    if (typeof window === 'undefined') return '';
    const baseUrl = `${window.location.origin}/${currentPresetOption.code.toLowerCase()}`;
    const params = new URLSearchParams();
    if (designPreset && designPreset !== 'block') {
      params.set('theme', designPreset);
    }
    const cleanColor = headerColor.replace(/^#/, '').toUpperCase();
    if (cleanColor && cleanColor !== '0F172A') {
      params.set('color', cleanColor);
    }
    if (textAlign === 'justify') {
      params.set('align', 'justify');
    }
    if (language === 'en') {
      params.set('lang', 'en');
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  })();

  // Handle Copy Link
  const handleCopyLink = () => {
    if (!shareableUrl) return;
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Handle Open in New Tab
  const handleOpenNewTab = () => {
    if (!shareableUrl) return;
    window.open(shareableUrl, '_blank');
  };

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    if (!shareableUrl) return;
    const text = encodeURIComponent(
      `Lihat Curriculum Vitae (CV) ATS Alvareza H. Pratama (${presetCodeUpper} - ${currentRoleTitle}):\n${shareableUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Handle Native Share
  const handleNativeShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `Curriculum Vitae (CV) ATS - Alvareza H. Pratama (${presetCodeUpper}) | MyCivy`,
        text: `Lihat dan unduh Curriculum Vitae (CV) ATS-Friendly resmi Alvareza H. Pratama (${presetCodeUpper} - ${currentRoleTitle})`,
        url: shareableUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-slate-900 ${
        isAnyModalActive ? 'overflow-hidden max-h-screen' : ''
      }`}
    >
      {/* Top Standalone Header Bar - Clean Normal White Theme */}
      <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-40 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shadow-xs">
        {/* Left Section: Title */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate leading-tight">
            Alvareza H. Pratama
          </h1>
          <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate leading-tight">
            {presetCodeUpper} - MyCivy
          </p>
        </div>

        {/* Right Section: Language Switcher, Design/Paint Card & Share Card */}
        <div className="flex items-center gap-2 shrink-0 relative">
          {/* Language Switcher Badge with Flag Image */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-1.5 sm:p-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center cursor-pointer shadow-2xs group"
            title={language === 'id' ? 'Bahasa Indonesia (Klik untuk ganti ke English)' : 'English (Click to switch to Bahasa Indonesia)'}
            aria-label="Switch language"
          >
            <img
              src={language === 'id' ? 'https://flagcdn.com/id.svg' : 'https://flagcdn.com/gb.svg'}
              alt={language === 'id' ? 'Bendera Indonesia' : 'UK Flag'}
              className="w-5 h-3.5 sm:w-6 sm:h-4 object-cover rounded-xs shadow-2xs border border-black/10 group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </button>

          {/* 1. Design/Paint Card Button with Custom Popup Menu (Ubah Tema & Ubah Warna) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsDesignMenuOpen(!isDesignMenuOpen);
                setIsColorPickerOpen(false);
                setIsShareMenuOpen(false);
              }}
              title={language === 'en' ? 'Design & Appearance' : 'Desain & Tampilan'}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 bg-slate-50 relative"
            >
              <Palette className="w-4 h-4 text-slate-700" />
            </button>

            {/* Custom Popup Menu: Ubah Tema, Ubah Warna & Rata Teks (Kiri / Justify) */}
            {isDesignMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDesignMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="space-y-1">
                    {/* Ubah Tema */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDesignMenuOpen(false);
                        setIsDesignModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer text-left"
                    >
                      <LayoutTemplate className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{language === 'en' ? 'Change Theme' : 'Ubah Tema'}</span>
                    </button>

                    {/* Ubah Warna */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDesignMenuOpen(false);
                        setIsColorPickerOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Paintbrush className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{language === 'en' ? 'Change Color' : 'Ubah Warna'}</span>
                      </div>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                        style={{ backgroundColor: headerColor }}
                      />
                    </button>

                    {/* Divider */}
                    <div className="border-t border-slate-100 my-1" />

                    {/* Perataan Teks: Rata Kiri vs Justify */}
                    <div className="p-1.5 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between gap-1 mb-1.5 px-0.5">
                        <span className="text-[11px] font-semibold text-slate-600">
                          {language === 'en' ? 'Text Alignment' : 'Perataan Teks'}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 capitalize">
                          {textAlign === 'justify' ? 'Justify' : (language === 'en' ? 'Left' : 'Kiri')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 bg-slate-200/60 p-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setTextAlign('left')}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            textAlign === 'left'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <AlignLeft className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Left' : 'Rata Kiri'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTextAlign('justify')}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            textAlign === 'justify'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <AlignJustify className="w-3.5 h-3.5" />
                          <span>Justify</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Dropdown Color Picker Popup */}
            {isColorPickerOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsColorPickerOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsColorPickerOpen(false);
                          setIsDesignMenuOpen(true);
                        }}
                        title={language === 'en' ? 'Back' : 'Kembali'}
                        className="p-1 -ml-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: headerColor }}
                      />
                      <span className="text-xs font-bold text-slate-900">
                        {language === 'en' ? 'Change Color' : 'Ubah Warna'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsColorPickerOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {HEADER_COLOR_PRESETS.map((preset) => {
                      const isSelected =
                        headerColor.toLowerCase() === preset.hex.toLowerCase();
                      return (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => setHeaderColor(preset.hex)}
                          title={preset.label}
                          className={`w-7 h-7 rounded-full transition-all flex items-center justify-center border cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[#0062E3] ring-offset-1 scale-110 border-white shadow-xs'
                              : 'border-slate-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: preset.hex }}
                        >
                          {isSelected && (
                            <Check
                              className="w-3.5 h-3.5 text-white drop-shadow-xs"
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-600 shrink-0">
                      HEX
                    </label>
                    <div className="flex-1 flex items-center">
                      <input
                        type="text"
                        maxLength={7}
                        value={
                          headerColor.startsWith('#')
                            ? headerColor
                            : `#${headerColor}`
                        }
                        onChange={(e) => {
                          let val = e.target.value;
                          if (!val.startsWith('#')) {
                            val = '#' + val.replace(/#/g, '');
                          }
                          const hexPart = val
                            .slice(1)
                            .replace(/[^0-9A-Fa-f]/g, '');
                          if (hexPart.length <= 6) {
                            setHeaderColor(`#${hexPart}`);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0062E3] rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800 outline-none uppercase"
                        placeholder="#0F172A"
                      />
                    </div>
                    <input
                      type="color"
                      value={
                        headerColor.startsWith('#') &&
                        headerColor.length === 7
                          ? headerColor
                          : '#0F172A'
                      }
                      onChange={(e) =>
                        setHeaderColor(e.target.value.toUpperCase())
                      }
                      className="w-7 h-7 rounded-lg border border-slate-300 cursor-pointer p-0 bg-transparent overflow-hidden shrink-0"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 2. Share Card Button & Popup Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsShareMenuOpen(!isShareMenuOpen);
                setIsDesignMenuOpen(false);
                setIsColorPickerOpen(false);
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 bg-slate-50 cursor-pointer relative"
              title={language === 'en' ? 'Share CV' : 'Bagikan CV'}
            >
              <Share2 className="w-4 h-4 text-slate-700" />
            </button>

            {/* Share Popup Menu Dropdown */}
            {isShareMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsShareMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-32 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="space-y-0.5">
                    {/* QR Code Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsShareMenuOpen(false);
                        setShowQrCode(true);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer text-left"
                    >
                      <QrCode className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>QR</span>
                    </button>

                    {/* Copy Link Option */}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        {isCopied ? (
                          <CheckCheck className="w-4 h-4 text-green-600 shrink-0" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <span>
                          {isCopied
                            ? language === 'en'
                              ? 'Copied!'
                              : 'Disalin!'
                            : 'Link'}
                        </span>
                      </div>
                    </button>

                    {/* Download PDF Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsShareMenuOpen(false);
                        handleDownloadCustomPDF();
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer text-left"
                    >
                      <Download className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>PDF</span>
                    </button>

                    {/* Lainnya Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsShareMenuOpen(false);
                        handleNativeShare();
                      }}
                      className="w-full flex items-center p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors cursor-pointer text-left"
                    >
                      <span>
                        {language === 'en' ? 'More' : 'Lainnya'}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>


        </div>
      </header>

      {/* Main Full-Page PDF Canvas Body */}
      <main
        className={`flex-1 bg-slate-200/90 p-3 sm:p-8 flex flex-col items-center justify-start min-h-0 relative ${
          isAnyModalActive ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        {isBuildingPdf ? (
          <div className="flex flex-col items-center justify-center my-auto py-24 gap-3 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-[#0062E3]" />
            <p className="text-xs sm:text-sm font-semibold">
              {language === 'en'
                ? 'Building full-page PDF preview...'
                : 'Menyiapkan pratinjau PDF halaman penuh...'}
            </p>
          </div>
        ) : previewPageImages.length > 0 ? (
          <div className="flex flex-col gap-6 sm:gap-8 items-center w-full max-w-4xl my-auto py-2">
            {previewPageImages.map((pageImg, idx) => (
              <div
                key={idx}
                className="w-full bg-white rounded-lg shadow-xl overflow-hidden border border-slate-300 transition-all"
              >
                <img
                  src={pageImg}
                  alt={`Halaman ${idx + 1}`}
                  className="w-full h-auto block select-none"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-4xl py-4 overflow-y-auto bg-white rounded-xl shadow-xl p-4 my-auto">
            <AtsDocumentSheet
              cvData={cvData}
              items={items}
              language={language}
              totalActiveItems={0}
              sectionOrders={sectionOrders}
              headline={customHeadline}
              summaryText={customSummary}
              designPreset={designPreset}
              preset={selectedPresetRole}
              textAlign={textAlign}
              headerColor={headerColor}
            />
          </div>
        )}
      </main>

      {/* Responsive Bottom Sheet / Modal QR Code Overlay */}
      {showQrCode && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden overscroll-contain">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/10 backdrop-blur-md transition-opacity animate-in fade-in duration-300 cursor-pointer touch-none"
            onClick={() => setShowQrCode(false)}
          />
          {/* Container (Sheet on mobile, centered Modal on desktop) */}
          <div className="relative w-full max-w-sm sm:max-w-[380px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-7 z-10 flex flex-col items-center animate-in slide-in-from-bottom sm:slide-in-from-none sm:zoom-in-95 duration-300">
            {/* Top-right subtle close icon button */}
            <button
              type="button"
              onClick={() => setShowQrCode(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title={language === 'en' ? 'Close' : 'Tutup'}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Text */}
            <h3 className="text-base font-bold text-slate-900 mb-1">
              QR Code - MyCivy
            </h3>
            <p className="text-xs text-slate-500 mb-5 text-center px-4 leading-relaxed">
              {language === 'en'
                ? "Scan code to view Alvareza H. Pratama's CV"
                : "Pindai kode untuk melihat CV Alvareza H. Pratama"}
            </p>

            {/* QR Code Container with Centered Embedded SVG Logo */}
            <div className="relative bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-inner flex items-center justify-center">
              <QRCodeSVG
                value={shareableUrl}
                size={270}
                level="H"
                marginSize={2}
                imageSettings={{
                  src: MYCIVY_QR_LOGO_SVG,
                  width: 75,
                  height: 25,
                  excavate: true,
                }}
                className="w-64 h-64 sm:w-60 sm:h-60 block select-none bg-white p-2.5 rounded-xl shadow-xs border border-slate-100"
              />
            </div>

            {/* Tap outside to close note */}
            <p className="text-[11px] text-slate-400 mt-4 text-center select-none">
              {language === 'en' ? 'Tap anywhere outside to close' : 'Ketuk di luar untuk menutup'}
            </p>
          </div>
        </div>
      )}

      {/* Design Template Modal / Bottom Sheet */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        language={language}
        designPreset={designPreset}
        setDesignPreset={setDesignPreset}
        DESIGN_OPTIONS={DESIGN_OPTIONS}
      />
    </div>
  );
};
