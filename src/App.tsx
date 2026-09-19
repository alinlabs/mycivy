import React, { useState, useEffect, useCallback } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { PrintableView } from './components/PrintableView';
import { FullPagePdfView } from './components/FullPagePdfView';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { resolvePresetFromQuery } from './data/rolePresetsConfig';
import { useMetaTags } from './hooks/useMetaTags';
import { JobApplyBottomBar } from './components/JobApply/JobApplyBottomBar';
import { JobApplyModalSheet } from './components/JobApply/JobApplyModalSheet';
import { GlobalDragDropZone } from './components/JobApply/GlobalDragDropZone';
import { GasSettingsModal } from './components/JobApply/GasSettingsModal';
import { useJobApply } from './hooks/useJobApply';

function MainApp() {
  const { language } = useLanguage();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);
  const [activePresetRole, setActivePresetRole] = useState<string>('optimal');
  const [isFullPagePdf, setIsFullPagePdf] = useState(false);
  const [fullPagePresetKey, setFullPagePresetKey] = useState<string>('optimal');

  // Check if admin query param is present: ?admin=true
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === 'true';
  });

  useEffect(() => {
    const handleCheckAdmin = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      setIsAdmin(params.get('admin') === 'true');
    };

    handleCheckAdmin();
    window.addEventListener('popstate', handleCheckAdmin);
    return () => window.removeEventListener('popstate', handleCheckAdmin);
  }, []);

  // Job Apply Scan Hook
  const {
    isModalOpen,
    selectedFile,
    isScanning,
    scanStage,
    ocrProgress,
    scanResult,
    scanError,
    openApplyModal,
    handleClearFile,
    processImageFile,
    handleCloseModal,
  } = useJobApply();

  // Dynamic meta tags for the main web builder interface
  useMetaTags({
    isFullPdf: false,
    canonicalPath: '/',
    language,
  });

  // Parse direct route path (e.g. /all, /opt, /pmo, /swe, /adm, /fe)
  const checkRoutePath = useCallback(() => {
    if (typeof window === 'undefined') return;
    const pathname = window.location.pathname.replace(/^\/+/, '').trim().toLowerCase();

    if (!pathname) {
      setIsFullPagePdf(false);
      return;
    }

    const resolved = resolvePresetFromQuery(pathname);
    if (resolved) {
      setFullPagePresetKey(resolved);
      setIsFullPagePdf(true);
    } else if (['preview', 'pdf', 'full'].includes(pathname)) {
      setFullPagePresetKey('all');
      setIsFullPagePdf(true);
    } else {
      setIsFullPagePdf(false);
    }
  }, []);

  useEffect(() => {
    checkRoutePath();

    const handlePopState = () => {
      checkRoutePath();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [checkRoutePath]);

  const handleNavigateToEditor = () => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      window.history.pushState({}, '', '/' + (search ? search : ''));
    }
    setIsFullPagePdf(false);
  };

  if (isFullPagePdf) {
    return (
      <div className={`relative min-h-screen ${isAdmin ? 'pb-24' : 'pb-8'}`}>
        {/* Global Drag and Drop Zone for Job Application Flyers (Only in Admin Mode) */}
        {isAdmin && <GlobalDragDropZone onDropImage={(file) => processImageFile(file)} />}

        <FullPagePdfView
          initialPreset={fullPagePresetKey}
          onNavigateToEditor={handleNavigateToEditor}
        />

        {/* Lamar Sekarang Bottom Bar (Only in Admin Mode: ?admin=true) */}
        {isAdmin && (
          <JobApplyBottomBar
            onOpenApplyModal={openApplyModal}
            isLoading={isScanning}
          />
        )}

        {/* Modal (Desktop) / Bottom Sheet (Mobile) */}
        {isAdmin && (
          <JobApplyModalSheet
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectedFile={selectedFile}
            scanResult={scanResult}
            isScanning={isScanning}
            scanStage={scanStage}
            ocrProgress={ocrProgress}
            onRescanFile={(file) => processImageFile(file)}
            onClearFile={handleClearFile}
            error={scanError}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-[#0F172A] relative ${isAdmin ? 'pb-24' : 'pb-8'}`}>
      {/* Global Drag and Drop Zone for Job Application Flyers (Only in Admin Mode) */}
      {isAdmin && <GlobalDragDropZone onDropImage={(file) => processImageFile(file)} />}

      {/* Navigation Header */}
      <HeaderNavbar
        onOpenPreviewModal={() => setIsPreviewOpen(true)}
        onOpenGasSettings={() => setIsGasModalOpen(true)}
        onOpenApplyModal={openApplyModal}
      />

      {/* Primary Interface: ATS Section Selection & PDF Builder View */}
      <main className="pb-12">
        <PrintableView
          isPreviewOpen={isPreviewOpen}
          onClosePreview={() => setIsPreviewOpen(false)}
          onOpenPreview={() => setIsPreviewOpen(true)}
          onPresetChange={(preset) => setActivePresetRole(preset)}
        />
      </main>

      {/* Lamar Sekarang Bottom Bar: Pinned to bottom on both desktop & mobile (Only in Admin Mode: ?admin=true) */}
      {isAdmin && (
        <JobApplyBottomBar
          onOpenApplyModal={openApplyModal}
          isLoading={isScanning}
        />
      )}

      {/* Modal (Desktop) / Bottom Sheet (Mobile) */}
      {isAdmin && (
        <JobApplyModalSheet
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedFile={selectedFile}
          scanResult={scanResult}
          isScanning={isScanning}
          scanStage={scanStage}
          ocrProgress={ocrProgress}
          onRescanFile={(file) => processImageFile(file)}
          onClearFile={handleClearFile}
          error={scanError}
        />
      )}

      {/* Standalone 6 GAS Accounts Settings Modal */}
      {isAdmin && (
        <GasSettingsModal
          isOpen={isGasModalOpen}
          onClose={() => setIsGasModalOpen(false)}
        />
      )}

      {/* Hidden container specifically for clean standard browser printing */}
      <div className="hidden print:block">
        <PrintableView disableUrlActions />
      </div>
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

