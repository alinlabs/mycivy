import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { ALL_ROLE_PRESETS } from './src/data/rolePresetsConfig';

function generateRouteMetatagsPlugin(): Plugin {
  return {
    name: 'generate-route-metatags',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const template = fs.readFileSync(indexPath, 'utf-8');

      interface RouteMeta {
        route: string;
        title: string;
        desc: string;
      }

      const routeMetaMap = new Map<string, RouteMeta>();

      const addRoute = (route: string, title: string, desc: string) => {
        const cleanRoute = route.toLowerCase().trim();
        if (!cleanRoute || cleanRoute === '/' || routeMetaMap.has(cleanRoute)) return;
        routeMetaMap.set(cleanRoute, { route: cleanRoute, title, desc });
      };

      // Base predefined routes
      addRoute('all', 'Curriculum Vitae (CV) ATS - Alvareza H. Pratama (ALL) | MyCivy PDF Preview', 'Lihat pratinjau Curriculum Vitae (CV) ATS-Friendly profil komprehensif Alvareza H. Pratama. Format standar industri, siap cetak dan unduh langsung format PDF.');
      addRoute('opt', 'Curriculum Vitae (CV) ATS - Alvareza H. Pratama (OPTIMAL) | MyCivy PDF Preview', 'Lihat pratinjau Curriculum Vitae (CV) ATS-Friendly rekomendasi optimal Alvareza H. Pratama. Padat, efisien, dan siap cetak langsung format PDF.');
      addRoute('preview', 'Curriculum Vitae (CV) ATS - Alvareza H. Pratama | MyCivy PDF Preview', 'Pratinjau Curriculum Vitae (CV) ATS-Friendly resmi Alvareza H. Pratama. Terverifikasi standar sistem pelacak pelamar kerja, siap unduh instan format PDF.');
      addRoute('pdf', 'Curriculum Vitae (CV) ATS - Alvareza H. Pratama | MyCivy PDF Preview', 'Pratinjau Curriculum Vitae (CV) ATS-Friendly resmi Alvareza H. Pratama. Format standar industri, siap cetak dan unduh langsung format PDF.');
      addRoute('full', 'Curriculum Vitae (CV) ATS - Alvareza H. Pratama | MyCivy PDF Preview', 'Pratinjau Curriculum Vitae (CV) ATS-Friendly resmi Alvareza H. Pratama. Format standar industri, siap cetak dan unduh langsung format PDF.');

      // Add all presets and their short codes
      for (const preset of ALL_ROLE_PRESETS) {
        const title = `Curriculum Vitae (CV) ATS - ${preset.titleId} | MyCivy PDF Preview`;
        const desc = `Pratinjau Curriculum Vitae (CV) ATS posisi ${preset.titleId} Alvareza H. Pratama. ${preset.descId} Siap cetak dan unduh langsung format PDF.`;
        
        addRoute(preset.key, title, desc);
        addRoute(preset.code, title, desc);
        addRoute(preset.key.replace(/_/g, '-'), title, desc);
      }

      for (const item of routeMetaMap.values()) {
        const itemDir = path.join(distDir, item.route);
        if (!fs.existsSync(itemDir)) {
          fs.mkdirSync(itemDir, { recursive: true });
        }

        const canonicalUrl = `https://mycivy.vercel.app/${item.route}`;
        let pageHtml = template;

        pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${item.title}</title>`);
        pageHtml = pageHtml.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${item.title}" />`);
        pageHtml = pageHtml.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${item.title}" />`);
        pageHtml = pageHtml.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${item.title}" />`);

        pageHtml = pageHtml.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${item.desc}" />`);
        pageHtml = pageHtml.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${item.desc}" />`);
        pageHtml = pageHtml.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${item.desc}" />`);

        pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
        pageHtml = pageHtml.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
        pageHtml = pageHtml.replace(/<meta\s+twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);

        fs.writeFileSync(path.join(itemDir, 'index.html'), pageHtml, 'utf-8');
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), generateRouteMetatagsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
