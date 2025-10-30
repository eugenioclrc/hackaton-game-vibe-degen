import type { GameState } from './game';

const SAVE_KEY = 'crypto_clicker_degen_save';
const SCHEMA_VERSION = 1;

interface SaveData {
  version: number;
  state: GameState;
  savedAt: number;
}

export function saveGame(state: GameState): void {
  if (typeof window === 'undefined') return;

  const data: SaveData = {
    version: SCHEMA_VERSION,
    state,
    savedAt: Date.now()
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error guardando:', e);
  }
}

export function loadGame(): GameState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;

    const data: SaveData = JSON.parse(raw);

    if (data.version !== SCHEMA_VERSION) {
      console.warn('Versión de guardado incompatible');
      return null;
    }

    if (data.state.unlocked && Array.isArray(data.state.unlocked)) {
      data.state.unlocked = new Set(data.state.unlocked);
    }

    return data.state;
  } catch (e) {
    console.error('Error cargando:', e);
    return null;
  }
}

export function exportSave(): string {
  if (typeof window === 'undefined') return '';

  const raw = localStorage.getItem(SAVE_KEY);
  return raw || '';
}

export function importSave(data: string): GameState | null {
  try {
    const parsed: SaveData = JSON.parse(data);

    if (parsed.version !== SCHEMA_VERSION) {
      throw new Error('Versión incompatible');
    }

    if (parsed.state.unlocked && Array.isArray(parsed.state.unlocked)) {
      parsed.state.unlocked = new Set(parsed.state.unlocked);
    }

    localStorage.setItem(SAVE_KEY, data);
    return parsed.state;
  } catch (e) {
    console.error('Error importando:', e);
    return null;
  }
}

export function deleteSave(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SAVE_KEY);
}
