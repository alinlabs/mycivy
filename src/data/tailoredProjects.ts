import { cvData } from './cvData';
import { cvDataEn } from './cvDataEn';
import { PRESET_PROJECTS_ID } from './presetProjectsId';
import { PRESET_PROJECTS_EN } from './presetProjectsEn';
import { ConsultingProject, DigitalSolution } from '../types';

/**
 * Returns tailored consulting projects and summary based on the active role preset and language.
 * Falls back to base cvData / cvDataEn if preset is not explicitly mapped or has default data.
 */
export function getTailoredConsulting(
  presetKey?: string,
  lang: 'id' | 'en' = 'id'
): { summary: string; projects: ConsultingProject[] } {
  const baseData = lang === 'en' ? cvDataEn.consulting : cvData.consulting;
  const key = (presetKey || 'optimal').toLowerCase();

  const dataset = lang === 'en' ? PRESET_PROJECTS_EN : PRESET_PROJECTS_ID;

  // Direct match
  if (dataset[key]) {
    const tailoredSet = dataset[key];
    // Merge: if a project isn't customized in the preset, keep the base one
    const mergedProjects = baseData.projects.map((baseProj) => {
      const tailoredProj = tailoredSet.projects.find((p) => p.id === baseProj.id);
      if (tailoredProj) {
        return {
          ...baseProj,
          role: tailoredProj.role || baseProj.role,
          highlights: tailoredProj.highlights?.length ? tailoredProj.highlights : baseProj.highlights,
        };
      }
      return baseProj;
    });

    return {
      summary: tailoredSet.summary || baseData.summary,
      projects: mergedProjects,
    };
  }

  // Alias / category fallback mappings
  let fallbackKey = 'optimal';
  if (key.includes('oper') || key.includes('branch') || key.includes('supply') || key.includes('logist')) {
    fallbackKey = 'business_operations';
  } else if (key.includes('hr') || key.includes('people') || key.includes('talent')) {
    fallbackKey = 'hr_operations';
  } else if (key.includes('proj') || key.includes('delivery')) {
    fallbackKey = 'project_management';
  } else if (key.includes('finan') || key.includes('account') || key.includes('tax') || key.includes('audit')) {
    fallbackKey = 'finance_accounting';
  } else if (key.includes('market') || key.includes('brand') || key.includes('pr') || key.includes('public_rel') || key.includes('sales')) {
    fallbackKey = 'marketing';
  } else if (key.includes('digit') || key.includes('tech') || key.includes('soft') || key.includes('code') || key.includes('trans')) {
    fallbackKey = 'digital_transformation';
  }

  const fallbackSet = dataset[fallbackKey] || dataset['optimal'];
  if (fallbackSet) {
    const mergedProjects = baseData.projects.map((baseProj) => {
      const tailoredProj = fallbackSet.projects.find((p) => p.id === baseProj.id);
      if (tailoredProj) {
        return {
          ...baseProj,
          role: tailoredProj.role || baseProj.role,
          highlights: tailoredProj.highlights?.length ? tailoredProj.highlights : baseProj.highlights,
        };
      }
      return baseProj;
    });

    return {
      summary: fallbackSet.summary || baseData.summary,
      projects: mergedProjects,
    };
  }

  return baseData;
}

/**
 * Returns tailored digital solutions based on the active role preset and language.
 */
export function getTailoredDigitalSolutions(
  presetKey?: string,
  lang: 'id' | 'en' = 'id'
): DigitalSolution[] {
  const baseData = lang === 'en' ? cvDataEn.digitalSolutions : cvData.digitalSolutions;
  const key = (presetKey || 'optimal').toLowerCase();

  const dataset = lang === 'en' ? PRESET_PROJECTS_EN : PRESET_PROJECTS_ID;

  let targetSet = dataset[key];
  if (!targetSet) {
    let fallbackKey = 'optimal';
    if (key.includes('oper') || key.includes('branch') || key.includes('supply') || key.includes('logist')) {
      fallbackKey = 'business_operations';
    } else if (key.includes('hr') || key.includes('people')) {
      fallbackKey = 'hr_operations';
    } else if (key.includes('proj')) {
      fallbackKey = 'project_management';
    } else if (key.includes('finan') || key.includes('account')) {
      fallbackKey = 'finance_accounting';
    } else if (key.includes('market') || key.includes('brand') || key.includes('sales')) {
      fallbackKey = 'marketing';
    } else if (key.includes('digit') || key.includes('tech') || key.includes('soft')) {
      fallbackKey = 'digital_transformation';
    }
    targetSet = dataset[fallbackKey] || dataset['optimal'];
  }

  if (targetSet?.digitalSolutions?.length) {
    return baseData.map((baseSol) => {
      const tailoredSol = targetSet.digitalSolutions.find((s) => s.id === baseSol.id);
      if (tailoredSol) {
        return {
          ...baseSol,
          subtitle: tailoredSol.subtitle || baseSol.subtitle,
          description: tailoredSol.description || baseSol.description,
          impact: tailoredSol.impact || baseSol.impact,
        };
      }
      return baseSol;
    });
  }

  return baseData;
}
