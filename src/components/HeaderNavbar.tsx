import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderNavbarProps {
  onOpenAtsModal: () => void;
  onOpenPreviewModal: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ onOpenAtsModal, onOpenPreviewModal }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs py-2.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Title: Stacked Text */}
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight leading-none">
            MyCivy
          </span>
          <span className="text-[11px] sm:text-xs font-light text-slate-500 tracking-normal mt-0.5">
            ATS Friendly
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Badge with Flag */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Switch Language / Ganti Bahasa"
          >
            <span className="text-base leading-none">{language === 'id' ? '🇮🇩' : '🇬🇧'}</span>
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Raw ATS Text Inspection */}
          <button
            onClick={onOpenAtsModal}
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0062E3] bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors items-center gap-1.5 cursor-pointer"
            title="Lihat teks terstruktur ATS"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.viewAtsText}</span>
          </button>

          {/* Plain Text Button: Preview */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold pl-1">
            <button
              type="button"
              onClick={onOpenPreviewModal}
              className="text-slate-800 hover:text-[#0062E3] transition-colors cursor-pointer"
              title="Lihat Preview PDF"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

