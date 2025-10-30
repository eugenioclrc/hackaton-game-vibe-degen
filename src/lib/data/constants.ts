export const TICK_MS = 1000 / 10;
export const AUTOSAVE_MS = 5000;
export const MAX_OFFLINE_HOURS = 12;
export const REBOOT_BONUS = 0.1;

export type Res = 'TOKEN';

export const RESOURCE_LABELS: Record<Res, string> = {
  TOKEN: 'TOKEN'
};

export const RESOURCE_EMOJIS: Record<Res, string> = {
  TOKEN: '🪙'
};

export const WEI_PER_CLICK = 1;
