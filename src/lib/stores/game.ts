import { writable } from 'svelte/store';
import type { Res } from '../data/constants';
import { TICK_MS, MAX_OFFLINE_HOURS, WEI_PER_CLICK } from '../data/constants';
import { BUILDINGS, calculateBuildingCost, canAfford, type Cost } from '../data/buildings';
import { UPGRADES } from '../data/upgrades';
import { saveGame, loadGame } from './persistence';

export interface GameState {
  resources: Record<Res, number>;
  owned: Record<string, number>;
  unlocked: Set<string>;
  upgradesOwned: string[];
  totalEarned: number;
  reboots: number;
  lastTick: number;
  playtimeMs: number;
}

function createInitialState(): GameState {
  const owned: Record<string, number> = {};
  BUILDINGS.forEach((b) => (owned[b.id] = 0));

  return {
    resources: {
      TOKEN: 0
    },
    owned,
    unlocked: new Set(['cpu', 'airdrop']),
    upgradesOwned: [],
    totalEarned: 0,
    reboots: 0,
    lastTick: Date.now(),
    playtimeMs: 0
  };
}

function createGameStore() {
  const { subscribe, set, update } = writable<GameState>(createInitialState());

  let tickInterval: NodeJS.Timeout | null = null;
  let saveInterval: NodeJS.Timeout | null = null;

  const loadState = () => {
    const saved = loadGame();
    if (saved) {
      const now = Date.now();
      const deltaMs = Math.min(now - saved.lastTick, MAX_OFFLINE_HOURS * 3600000);
      const ticks = Math.floor(deltaMs / TICK_MS);

      saved.playtimeMs += deltaMs;
      saved.lastTick = now;

      set(saved);

      for (let i = 0; i < ticks; i++) {
        processTick(true);
      }
    }
  };

  const processTick = (silent = false) => {
    update((state) => {
      const now = Date.now();
      const deltaMs = now - state.lastTick;
      state.playtimeMs += deltaMs;
      state.lastTick = now;

      BUILDINGS.forEach((building) => {
        const qty = state.owned[building.id];
        if (qty === 0) return;

        for (const [res, baseAmount] of Object.entries(building.baseProd)) {
          let amount = baseAmount * qty * (TICK_MS / 1000);

          state.upgradesOwned.forEach((upId) => {
            const upgrade = UPGRADES.find((u) => u.id === upId);
            if (
              upgrade &&
              upgrade.effect.building === building.id &&
              upgrade.effect.prod === res
            ) {
              amount *= upgrade.effect.multiplier;
            }
          });

          state.resources[res as Res] += amount;
          state.totalEarned += amount;
        }
      });

      return state;
    });
  };

  return {
    subscribe,

    init: () => {
      loadState();

      if (tickInterval) clearInterval(tickInterval);
      tickInterval = setInterval(() => processTick(), TICK_MS);

      if (saveInterval) clearInterval(saveInterval);
      saveInterval = setInterval(() => {
        let currentState: GameState;
        subscribe((s) => (currentState = s))();
        saveGame(currentState!);
      }, 5000);
    },

    destroy: () => {
      if (tickInterval) clearInterval(tickInterval);
      if (saveInterval) clearInterval(saveInterval);
    },

    clickFaucet: () => {
      update((state) => {
        state.resources.TOKEN += WEI_PER_CLICK;
        state.totalEarned += WEI_PER_CLICK;
        return state;
      });
    },

    buyBuilding: (id: string, quantity = 1) => {
      update((state) => {
        const building = BUILDINGS.find((b) => b.id === id);
        if (!building) return state;

        for (let i = 0; i < quantity; i++) {
          const cost = calculateBuildingCost(building, state.owned[id]);
          if (!canAfford(cost, state.resources)) break;

          for (const [res, amount] of Object.entries(cost)) {
            state.resources[res as Res] -= amount;
          }

          state.owned[id]++;
        }

        BUILDINGS.forEach((b) => {
          if (b.unlock) {
            const unlocked = b.unlock.every((req) => state.owned[req.reqId] >= req.qty);
            if (unlocked) state.unlocked.add(b.id);
          }
        });

        return state;
      });
    },

    buyUpgrade: (id: string) => {
      update((state) => {
        const upgrade = UPGRADES.find((u) => u.id === id);
        if (!upgrade || state.upgradesOwned.includes(id)) return state;

        if (!canAfford(upgrade.cost, state.resources)) return state;

        for (const [res, amount] of Object.entries(upgrade.cost)) {
          state.resources[res as Res] -= amount;
        }

        state.upgradesOwned.push(id);

        return state;
      });
    },

    reboot: async (walletAddress?: string) => {
      let currentState: GameState;
      subscribe((s) => (currentState = s))();

      const tokensEarned = currentState!.totalEarned;

      if (walletAddress && tokensEarned > 0) {
        console.log(`Minting ${tokensEarned} tokens to ${walletAddress}`);
      }

      const newState = createInitialState();
      newState.reboots = currentState!.reboots + 1;
      set(newState);
      saveGame(newState);
    },

    hardReset: () => {
      set(createInitialState());
      saveGame(createInitialState());
    },

    manualSave: () => {
      let currentState: GameState;
      subscribe((s) => (currentState = s))();
      saveGame(currentState!);
    }
  };
}

export const gameStore = createGameStore();
