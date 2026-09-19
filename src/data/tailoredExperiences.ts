import { CVExperience } from '../types';
import { presetExperiencesId } from './presetExperiencesId';
import { presetExperiencesEn } from './presetExperiencesEn';
import { cvData } from './cvData';
import { cvDataEn } from './cvDataEn';

/**
 * Maps any preset key (including sub-role preset options and codes) to its matching base dataset in dataPool.
 */
export function resolvePresetBaseKey(presetKey?: string | null): string {
  if (!presetKey) return 'optimal';
  const rawKey = presetKey.toLowerCase();

  // Direct match in dataset
  if (rawKey in presetExperiencesId) return rawKey;

  // HR & Talent presets
  if (
    rawKey.includes('hr') ||
    rawKey.includes('personnel') ||
    rawKey.includes('talent') ||
    rawKey.includes('recruit') ||
    rawKey.includes('training') ||
    rawKey.includes('comben') ||
    rawKey.includes('payroll') ||
    rawKey.includes('industrial_rel') ||
    rawKey.includes('employer_brand') ||
    rawKey.includes('lnd') ||
    rawKey.includes('cnb') ||
    rawKey.includes('hra') ||
    rawKey.includes('hrs')
  ) {
    return 'hr_operations';
  }

  // Healthcare Admin
  if (rawKey.includes('hospital') || rawKey.includes('health') || rawKey.includes('hos')) {
    return 'hospital_office_admin';
  }

  // Admin & Secretariat presets
  if (
    rawKey.includes('admin') ||
    rawKey.includes('secretar') ||
    rawKey.includes('executive_assistant') ||
    rawKey.includes('legal') ||
    rawKey.includes('clerk') ||
    rawKey.includes('data_entry') ||
    rawKey.includes('adm') ||
    rawKey.includes('ast') ||
    rawKey.includes('lgl') ||
    rawKey.includes('sad') ||
    rawKey.includes('fba') ||
    rawKey.includes('pra') ||
    rawKey.includes('ppa') ||
    rawKey.includes('dea') ||
    rawKey.includes('wha')
  ) {
    return 'office_administration';
  }

  // Supply Chain, Logistics, Gudang & Procurement presets
  if (
    rawKey.includes('supply') ||
    rawKey.includes('logis') ||
    rawKey.includes('warehouse') ||
    rawKey.includes('ppic') ||
    rawKey.includes('procu') ||
    rawKey.includes('purchas') ||
    rawKey.includes('inventory') ||
    rawKey.includes('fleet') ||
    rawKey.includes('vendor') ||
    rawKey.includes('demand') ||
    rawKey.includes('scm') ||
    rawKey.includes('ppc') ||
    rawKey.includes('prc') ||
    rawKey.includes('whs') ||
    rawKey.includes('ldc') ||
    rawKey.includes('vmr') ||
    rawKey.includes('dip')
  ) {
    return 'supply_chain_logistics';
  }

  // Finance, Accounting & Tax presets
  if (
    rawKey.includes('finan') ||
    rawKey.includes('account') ||
    rawKey.includes('tax') ||
    rawKey.includes('billing') ||
    rawKey.includes('audit') ||
    rawKey.includes('cost') ||
    rawKey.includes('pricing') ||
    rawKey.includes('ap_ar') ||
    rawKey.includes('fac') ||
    rawKey.includes('tao') ||
    rawKey.includes('apa') ||
    rawKey.includes('pca') ||
    rawKey.includes('iaf') ||
    rawKey.includes('fin')
  ) {
    return 'finance_accounting';
  }

  // Project Management & PMO presets
  if (
    rawKey.includes('proj') ||
    rawKey.includes('pmo') ||
    rawKey.includes('scrum') ||
    rawKey.includes('agile') ||
    rawKey.includes('event') ||
    rawKey.includes('nonprofit') ||
    rawKey.includes('implementation') ||
    rawKey.includes('itp') ||
    rawKey.includes('evm') ||
    rawKey.includes('ngo') ||
    rawKey.includes('asm') ||
    rawKey.includes('pom') ||
    rawKey.includes('ipm') ||
    rawKey.includes('cpm')
  ) {
    return 'project_management';
  }

  // Sales & Business Development presets
  if (
    rawKey.includes('sales') ||
    rawKey.includes('biz') ||
    rawKey.includes('business_dev') ||
    rawKey.includes('account_manager') ||
    rawKey.includes('partnership') ||
    rawKey.includes('client_success') ||
    rawKey.includes('tender') ||
    rawKey.includes('bdv') ||
    rawKey.includes('sls') ||
    rawKey.includes('kam') ||
    rawKey.includes('gov') ||
    rawKey.includes('csm') ||
    rawKey.includes('csd') ||
    rawKey.includes('cse') ||
    rawKey.includes('sop') ||
    rawKey.includes('tnd')
  ) {
    return 'business_development';
  }

  // Tech, Software & Digital presets
  if (
    rawKey.includes('soft') ||
    rawKey.includes('dev') ||
    rawKey.includes('code') ||
    rawKey.includes('tech') ||
    rawKey.includes('digit') ||
    rawKey.includes('system') ||
    rawKey.includes('data') ||
    rawKey.includes('erp') ||
    rawKey.includes('bi_') ||
    rawKey.includes('frontend') ||
    rawKey.includes('product') ||
    rawKey.includes('bsa') ||
    rawKey.includes('dbr') ||
    rawKey.includes('fed') ||
    rawKey.includes('pdm') ||
    rawKey.includes('eci') ||
    rawKey.includes('bds')
  ) {
    return 'software_development';
  }

  // PR & Public Relations
  if (rawKey.includes('pr') || rawKey.includes('public_rel') || rawKey.includes('media') || rawKey.includes('humas') || rawKey.includes('prs')) {
    return 'public_relations';
  }

  // Marketing, Marcom & Customer Service presets
  if (
    rawKey.includes('market') ||
    rawKey.includes('brand') ||
    rawKey.includes('marcom') ||
    rawKey.includes('ads') ||
    rawKey.includes('ecom') ||
    rawKey.includes('social') ||
    rawKey.includes('customer_service') ||
    rawKey.includes('mkt') ||
    rawKey.includes('cso') ||
    rawKey.includes('mcb') ||
    rawKey.includes('pma') ||
    rawKey.includes('eco') ||
    rawKey.includes('smc') ||
    rawKey.includes('gml') ||
    rawKey.includes('bmc')
  ) {
    return 'marketing';
  }

  // Operations & Retail presets
  if (rawKey.includes('manufac') || rawKey.includes('pabrik') || rawKey.includes('plant') || rawKey.includes('qc') || rawKey.includes('qa') || rawKey.includes('mfg') || rawKey.includes('qac')) {
    return 'manufacturing_operations';
  }
  if (rawKey.includes('branch') || rawKey.includes('cabang') || rawKey.includes('brn')) {
    return 'branch_manager';
  }
  if (
    rawKey.includes('operat') ||
    rawKey.includes('retail') ||
    rawKey.includes('store') ||
    rawKey.includes('ga') ||
    rawKey.includes('affair') ||
    rawKey.includes('field') ||
    rawKey.includes('utility') ||
    rawKey.includes('ops') ||
    rawKey.includes('rtl') ||
    rawKey.includes('gaf') ||
    rawKey.includes('fld') ||
    rawKey.includes('utl') ||
    rawKey.includes('opx') ||
    rawKey.includes('som') ||
    rawKey.includes('cos') ||
    rawKey.includes('fre')
  ) {
    return 'business_operations';
  }

  // Strategy & Consulting presets
  if (rawKey.includes('consult') || rawKey.includes('strateg') || rawKey.includes('turnaround') || rawKey.includes('bts') || rawKey.includes('pal')) {
    return 'strategic_management';
  }

  return 'optimal';
}

/**
 * Returns the permitted experience order for the preset.
 */
export function getPresetExperienceOrder(presetKey?: string | null): string[] {
  const baseKey = resolvePresetBaseKey(presetKey);
  if (baseKey === 'marketing' || baseKey === 'public_relations') {
    return ['exp-4', 'exp-3', 'exp-2', 'exp-1'];
  }
  return ['exp-1', 'exp-2', 'exp-4', 'exp-3'];
}

export function getTailoredExperiences(
  presetKey?: string | null,
  lang: 'id' | 'en' = 'id'
): CVExperience[] {
  const normalizedKey = presetKey || 'optimal';
  const baseKey = resolvePresetBaseKey(normalizedKey);
  const dataPool = lang === 'en' ? presetExperiencesEn : presetExperiencesId;
  const fallbackExperiences = lang === 'en' ? cvDataEn.experiences : cvData.experiences;
  const optimalList = dataPool['optimal']?.length ? dataPool['optimal'] : fallbackExperiences;

  const rawList =
    dataPool[baseKey]?.length
      ? dataPool[baseKey]
      : optimalList;

  const listMap = new Map<string, CVExperience>();
  rawList.forEach((item) => listMap.set(item.id, item));

  // Guarantee all 4 core experiences (exp-1, exp-2, exp-4, exp-3) are present in every preset
  const requiredIds = ['exp-1', 'exp-2', 'exp-4', 'exp-3'];
  for (const reqId of requiredIds) {
    if (!listMap.has(reqId)) {
      const fallbackItem =
        optimalList.find((item) => item.id === reqId) ||
        fallbackExperiences.find((item) => item.id === reqId);
      if (fallbackItem) {
        listMap.set(reqId, fallbackItem);
      }
    }
  }

  const fullList = Array.from(listMap.values());
  const targetOrder = getPresetExperienceOrder(normalizedKey);
  return fullList.sort((a, b) => {
    const idxA = targetOrder.indexOf(a.id);
    const idxB = targetOrder.indexOf(b.id);
    return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
  });
}

export function getExperienceById(
  id: string,
  presetKey?: string | null,
  lang: 'id' | 'en' = 'id'
): CVExperience | undefined {
  const experiences = getTailoredExperiences(presetKey, lang);
  return experiences.find((exp) => exp.id === id);
}

export function getTailoredExperienceById(
  id: string,
  presetKey?: string | null,
  lang: 'id' | 'en' = 'id'
): CVExperience | undefined {
  return getExperienceById(id, presetKey, lang);
}


