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
  const rawKey = (presetKey || 'optimal').toLowerCase();

  const dataset = lang === 'en' ? PRESET_PROJECTS_EN : PRESET_PROJECTS_ID;

  // Key normalization & alias mapping
  let key = rawKey;
  if (!dataset[key]) {
    if (key === 'b2b_sales' || key === 'business_development') key = dataset['business_development'] ? 'business_development' : 'b2b_sales';
    else if (key === 'executive' || key === 'strategic_management') key = dataset['strategic_management'] ? 'strategic_management' : 'executive';
    else if (key === 'admin' || key === 'office_administration') key = dataset['office_administration'] ? 'office_administration' : 'admin';
    else if (key === 'pr' || key === 'public_relations') key = dataset['public_relations'] ? 'public_relations' : 'pr';
    else if (key === 'supply_chain' || key === 'supply_chain_logistics') key = dataset['supply_chain_logistics'] ? 'supply_chain_logistics' : 'supply_chain';
    else if (key === 'finance' || key === 'finance_accounting') key = dataset['finance_accounting'] ? 'finance_accounting' : 'finance';
    else if (key === 'software_dev' || key === 'software_development') key = dataset['software_development'] ? 'software_development' : 'software_dev';
  }

  // Direct match
  if (dataset[key]) {
    const tailoredSet = dataset[key];
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

  // Category fallback mappings
  let fallbackKey = 'optimal';
  if (rawKey.includes('oper') || rawKey.includes('branch') || rawKey.includes('supply') || rawKey.includes('logist')) {
    fallbackKey = 'business_operations';
  } else if (rawKey.includes('hr') || rawKey.includes('people') || rawKey.includes('talent')) {
    fallbackKey = 'hr_operations';
  } else if (rawKey.includes('proj') || rawKey.includes('delivery')) {
    fallbackKey = 'project_management';
  } else if (rawKey.includes('finan') || rawKey.includes('account') || rawKey.includes('tax') || rawKey.includes('audit')) {
    fallbackKey = 'finance_accounting';
  } else if (rawKey.includes('market') || rawKey.includes('brand') || rawKey.includes('pr') || rawKey.includes('public_rel') || rawKey.includes('sales')) {
    fallbackKey = 'marketing';
  } else if (rawKey.includes('digit') || rawKey.includes('tech') || rawKey.includes('soft') || rawKey.includes('code') || rawKey.includes('trans')) {
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
  const rawKey = (presetKey || 'optimal').toLowerCase();

  const dataset = lang === 'en' ? PRESET_PROJECTS_EN : PRESET_PROJECTS_ID;

  let key = rawKey;
  if (!dataset[key]) {
    if (key === 'b2b_sales' || key === 'business_development') key = dataset['business_development'] ? 'business_development' : 'b2b_sales';
    else if (key === 'executive' || key === 'strategic_management') key = dataset['strategic_management'] ? 'strategic_management' : 'executive';
    else if (key === 'admin' || key === 'office_administration') key = dataset['office_administration'] ? 'office_administration' : 'admin';
    else if (key === 'pr' || key === 'public_relations') key = dataset['public_relations'] ? 'public_relations' : 'pr';
    else if (key === 'supply_chain' || key === 'supply_chain_logistics') key = dataset['supply_chain_logistics'] ? 'supply_chain_logistics' : 'supply_chain';
    else if (key === 'finance' || key === 'finance_accounting') key = dataset['finance_accounting'] ? 'finance_accounting' : 'finance';
    else if (key === 'software_dev' || key === 'software_development') key = dataset['software_development'] ? 'software_development' : 'software_dev';
  }

  let targetSet = dataset[key];
  if (!targetSet) {
    let fallbackKey = 'optimal';
    if (rawKey.includes('oper') || rawKey.includes('branch') || rawKey.includes('supply') || rawKey.includes('logist')) {
      fallbackKey = 'business_operations';
    } else if (rawKey.includes('hr') || rawKey.includes('people')) {
      fallbackKey = 'hr_operations';
    } else if (rawKey.includes('proj')) {
      fallbackKey = 'project_management';
    } else if (rawKey.includes('finan') || rawKey.includes('account')) {
      fallbackKey = 'finance_accounting';
    } else if (rawKey.includes('market') || rawKey.includes('brand') || rawKey.includes('sales')) {
      fallbackKey = 'marketing';
    } else if (rawKey.includes('digit') || rawKey.includes('tech') || rawKey.includes('soft')) {
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
          techStack: tailoredSol.techStack || baseSol.techStack,
          features: tailoredSol.features || baseSol.features,
        };
      }
      return baseSol;
    });
  }

  return baseData;
}
