import React, { useState } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { PrintableView } from './components/PrintableView';
import { AtsRawModal } from './components/AtsRawModal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainApp() {
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-[#0F172A]">
      {/* Navigation Header */}
      <HeaderNavbar
        onOpenAtsModal={() => setIsAtsModalOpen(true)}
        onOpenPreviewModal={() => setIsPreviewOpen(true)}
      />

      {/* Primary Interface: ATS Section Selection & PDF Builder View */}
      <main className="pb-12">
        <PrintableView
          onOpenAtsModal={() => setIsAtsModalOpen(true)}
          isPreviewOpen={isPreviewOpen}
          onClosePreview={() => setIsPreviewOpen(false)}
          onOpenPreview={() => setIsPreviewOpen(true)}
        />
      </main>

      {/* Hidden container specifically for clean standard browser printing */}
      <div className="hidden print:block">
        <PrintableView disableUrlActions />
      </div>

      {/* ATS Diagnostic & Plain Text Modal */}
      <AtsRawModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
