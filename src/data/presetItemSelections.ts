export type { ItemSelectionState, SectionOrdersState } from './presetSelectionHelper';
export {
  defaultItemSelection,
  defaultSectionOrders,
  createSelection,
} from './presetSelectionHelper';
export { PRESET_SELECTION_REGISTRY } from './presetRegistryData';
export { getPresetSectionOrders } from './presetSectionOrders';

import { ItemSelectionState, defaultItemSelection } from './presetSelectionHelper';
import { PRESET_SELECTION_REGISTRY } from './presetRegistryData';

/**
 * Retrieves the item selection state for a given preset key.
 */
export function getItemSelectionForPreset(presetKey: string): ItemSelectionState {
  if (presetKey === 'all') {
    return { ...defaultItemSelection };
  }

  if (PRESET_SELECTION_REGISTRY[presetKey]) {
    return PRESET_SELECTION_REGISTRY[presetKey];
  }

  // Fallback to optimal
  return PRESET_SELECTION_REGISTRY.optimal;
}

export const optimalItemSelection: ItemSelectionState = getItemSelectionForPreset('optimal');
