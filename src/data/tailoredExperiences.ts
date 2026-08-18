import { CVExperience } from '../types';
import { presetExperiencesId } from './presetExperiencesId';
import { presetExperiencesEn } from './presetExperiencesEn';
import { cvData } from './cvData';
import { cvDataEn } from './cvDataEn';

/**
 * Returns the permitted experience order for the preset.
 * Strictly 2 valid ordering configurations:
 * 1. Terbaru -> Terdahulu: ['exp-1', 'exp-2', 'exp-3'] (PT Galaksi -> PT Perdana -> CV Jaya Baru)
 * 2. Terdahulu -> Terbaru: ['exp-3', 'exp-2', 'exp-1'] (CV Jaya Baru -> PT Perdana -> PT Galaksi)
 */
export function getPresetExperienceOrder(presetKey?: string | null): string[] {
  if (presetKey === 'marketing' || presetKey === 'public_relations') {
    return ['exp-3', 'exp-2', 'exp-1'];
  }
  return ['exp-1', 'exp-2', 'exp-3'];
}

export function getTailoredExperiences(
  presetKey?: string | null,
  lang: 'id' | 'en' = 'id'
): CVExperience[] {
  const normalizedKey = presetKey || 'optimal';
  const dataPool = lang === 'en' ? presetExperiencesEn : presetExperiencesId;
  const fallbackExperiences = lang === 'en' ? cvDataEn.experiences : cvData.experiences;

  const rawList =
    normalizedKey in dataPool && dataPool[normalizedKey]?.length
      ? dataPool[normalizedKey]
      : dataPool['optimal']?.length
      ? dataPool['optimal']
      : fallbackExperiences;

  const targetOrder = getPresetExperienceOrder(normalizedKey);
  return [...rawList].sort((a, b) => {
    const idxA = targetOrder.indexOf(a.id);
    const idxB = targetOrder.indexOf(b.id);
    return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
  });
}

export function getTailoredExperienceById(
  id: string,
  presetKey?: string | null,
  lang: 'id' | 'en' = 'id'
): CVExperience | undefined {
  const experiences = getTailoredExperiences(presetKey, lang);
  return experiences.find((exp) => exp.id === id);
}
