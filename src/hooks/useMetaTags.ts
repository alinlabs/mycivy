import { useEffect } from 'react';

export interface MetaTagsConfig {
  isFullPdf?: boolean;
  presetCode?: string;
  presetTitle?: string;
  canonicalPath?: string;
  language?: 'id' | 'en';
}

/**
 * Custom hook to dynamically update document title, description,
 * OpenGraph, Twitter Card, and canonical metadata tags.
 */
export const useMetaTags = ({
  isFullPdf = false,
  presetCode,
  presetTitle,
  canonicalPath,
  language = 'id',
}: MetaTagsConfig) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const origin = window.location.origin;
    const fallbackBaseUrl = 'https://mycivy.vercel.app';
    const absoluteImageUrl = `${fallbackBaseUrl}/metatag.webp`;

    let title =
      language === 'en'
        ? 'MyCivy | Professional ATS CV Builder & Generator'
        : 'MyCivy | Generator & Builder CV ATS Professional';
    let description =
      language === 'en'
        ? 'Professional ATS-Friendly CV & Portfolio Platform. Customize specific job role presets, adjust layout and theme, and instantly download HR-ready PDF resumes.'
        : 'Platform CV ATS-Friendly & Portfolio Professional. Kustomisasi preset peran kerja spesifik, sesuaikan tata letak dan tema, lalu unduh resume PDF siap kirim ke HRD instan.';

    if (isFullPdf) {
      const codeDisplay = presetCode ? presetCode.toUpperCase() : 'OPTIMAL';
      const roleDisplay = presetTitle ? ` - ${presetTitle}` : '';
      title =
        language === 'en'
          ? `Curriculum Vitae (CV) ATS - Alvareza H. Pratama (${codeDisplay}${roleDisplay}) | MyCivy PDF Preview`
          : `Curriculum Vitae (CV) ATS - Alvareza H. Pratama (${codeDisplay}${roleDisplay}) | MyCivy PDF Preview`;
      description =
        language === 'en'
          ? `View official ATS-friendly Curriculum Vitae (CV) of Alvareza H. Pratama. Verified industry standard format, ready to print and download directly as PDF.`
          : `Lihat pratinjau Curriculum Vitae (CV) ATS-Friendly resmi Alvareza H. Pratama. Format standar industri dengan struktur terverifikasi, siap cetak dan diunduh langsung dalam format PDF.`;
    }

    const currentUrl = canonicalPath
      ? `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
      : window.location.href;

    // 1. Update Document Title
    document.title = title;

    // Helper to safely set/update meta tag
    const updateMeta = (nameOrProp: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${nameOrProp}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameOrProp, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMeta('name', 'title', title);
    updateMeta('name', 'description', description);

    // OpenGraph
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:url', currentUrl);
    updateMeta('property', 'og:image', absoluteImageUrl);
    updateMeta('property', 'og:image:secure_url', absoluteImageUrl);
    updateMeta('property', 'og:image:type', 'image/webp');
    updateMeta('property', 'og:image:width', '1200');
    updateMeta('property', 'og:image:height', '630');
    updateMeta('property', 'og:image:alt', title);
    updateMeta('property', 'og:site_name', 'MyCivy');

    // Twitter Card
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:url', currentUrl);
    updateMeta('name', 'twitter:image', absoluteImageUrl);
    updateMeta('name', 'twitter:image:alt', title);
    updateMeta('name', 'twitter:card', 'summary_large_image');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Direct image_src link
    let imageSrc = document.querySelector('link[rel="image_src"]');
    if (!imageSrc) {
      imageSrc = document.createElement('link');
      imageSrc.setAttribute('rel', 'image_src');
      document.head.appendChild(imageSrc);
    }
    imageSrc.setAttribute('href', absoluteImageUrl);
  }, [isFullPdf, presetCode, presetTitle, canonicalPath, language]);
};
