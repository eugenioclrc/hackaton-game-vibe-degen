import { w as writable } from "./index.js";
const TICK_MS = 1e3 / 10;
const MAX_OFFLINE_HOURS = 12;
const WEI_PER_CLICK = 1;
const BUILDINGS = [
  {
    id: "cpu",
    name: "CPU Miner",
    flavor: "Pentium con cooler stock.",
    baseCost: { TOKEN: 15 },
    costK: 1.15,
    baseProd: { TOKEN: 0.1 }
  },
  {
    id: "airdrop",
    name: "Airdrop Farmer",
    flavor: "Form fill enjoyer.",
    baseCost: { TOKEN: 100 },
    costK: 1.15,
    baseProd: { TOKEN: 1 }
  },
  {
    id: "shill",
    name: "Shill en X",
    flavor: "Hilo de 20 puntos y 0 fuentes.",
    baseCost: { TOKEN: 500 },
    costK: 1.18,
    baseProd: { TOKEN: 4 },
    unlock: [{ reqId: "cpu", qty: 5 }]
  },
  {
    id: "gpu",
    name: "GPU Rig",
    flavor: '6×GPU "usadas" con olor a minado.',
    baseCost: { TOKEN: 3e3 },
    costK: 1.18,
    baseProd: { TOKEN: 20 },
    unlock: [{ reqId: "airdrop", qty: 5 }]
  },
  {
    id: "launchpad",
    name: "Launchpad Intern",
    flavor: "Lanza memecoins impronunciables.",
    baseCost: { TOKEN: 1e4 },
    costK: 1.2,
    baseProd: { TOKEN: 80 },
    unlock: [{ reqId: "gpu", qty: 5 }]
  },
  {
    id: "alpha",
    name: "Alpha TG Group",
    flavor: "DYOR, bro.",
    baseCost: { TOKEN: 4e4 },
    costK: 1.2,
    baseProd: { TOKEN: 260 },
    unlock: [{ reqId: "launchpad", qty: 5 }]
  },
  {
    id: "arb",
    name: "Arb Bot",
    flavor: "Spread-snacker.",
    baseCost: { TOKEN: 2e5 },
    costK: 1.22,
    baseProd: { TOKEN: 1400 },
    unlock: [{ reqId: "alpha", qty: 5 }]
  },
  {
    id: "mempool",
    name: "Mempool Sneaker",
    flavor: "Parodia (no enseña nada real).",
    baseCost: { TOKEN: 16e5 },
    costK: 1.22,
    baseProd: { TOKEN: 7800 },
    unlock: [{ reqId: "arb", qty: 5 }]
  },
  {
    id: "awareness",
    name: "Phishing Awareness Circus",
    flavor: "Show anti-estafas.",
    baseCost: { TOKEN: 1e7 },
    costK: 1.18,
    baseProd: { TOKEN: 44e3 },
    unlock: [{ reqId: "mempool", qty: 5 }]
  },
  {
    id: "rollup",
    name: "Rollup Node",
    flavor: "Súper secuenciador.",
    baseCost: { TOKEN: 65e6 },
    costK: 1.25,
    baseProd: { TOKEN: 26e4 },
    unlock: [{ reqId: "awareness", qty: 5 }]
  },
  {
    id: "vc",
    name: "VC de Servilleta",
    flavor: "Term sheet en una servilleta.",
    baseCost: { TOKEN: 43e7 },
    costK: 1.25,
    baseProd: { TOKEN: 16e5 },
    unlock: [{ reqId: "rollup", qty: 5 }]
  },
  {
    id: "oracle",
    name: "Oracle Patron",
    flavor: "Sponsorear la suerte.",
    baseCost: { TOKEN: 29e8 },
    costK: 1.28,
    baseProd: { TOKEN: 1e7 },
    unlock: [{ reqId: "vc", qty: 5 }]
  }
];
function calculateBuildingCost(building, owned) {
  const cost = {};
  for (const [res, base] of Object.entries(building.baseCost)) {
    cost[res] = Math.floor(base * Math.pow(building.costK, owned));
  }
  return cost;
}
function canAfford(cost, resources) {
  for (const [res, amount] of Object.entries(cost)) {
    if (resources[res] < amount) return false;
  }
  return true;
}
const UPGRADES = [
  {
    id: "cpu_paste",
    name: "Pasta Térmica Milagrosa",
    desc: "+20% producción de CPU Miner",
    cost: { TOKEN: 100 },
    unlock: [{ reqId: "cpu", qty: 5 }],
    effect: { building: "cpu", prod: "TOKEN", multiplier: 1.2 }
  },
  {
    id: "cpu_overclock",
    name: "Overclock de Abuela",
    desc: "+15% producción de CPU Miner",
    cost: { TOKEN: 500 },
    unlock: [{ reqId: "cpu", qty: 15 }],
    effect: { building: "cpu", prod: "TOKEN", multiplier: 1.15 }
  },
  {
    id: "cpu_bios",
    name: "BIOS Beta",
    desc: "+25% producción de CPU Miner",
    cost: { TOKEN: 2e3 },
    unlock: [{ reqId: "cpu", qty: 25 }],
    effect: { building: "cpu", prod: "TOKEN", multiplier: 1.25 }
  },
  {
    id: "airdrop_bots",
    name: "Bots Multi-Wallet",
    desc: "+20% producción de Airdrop Farmer",
    cost: { TOKEN: 1e3 },
    unlock: [{ reqId: "airdrop", qty: 5 }],
    effect: { building: "airdrop", prod: "TOKEN", multiplier: 1.2 }
  },
  {
    id: "shill_threads",
    name: "Template de Hilos Pro",
    desc: "+30% producción de Shill en X",
    cost: { TOKEN: 5e3 },
    unlock: [{ reqId: "shill", qty: 5 }],
    effect: { building: "shill", prod: "TOKEN", multiplier: 1.3 }
  },
  {
    id: "gpu_risers",
    name: "Risers Que No Explotan",
    desc: "+20% producción de GPU Rig",
    cost: { TOKEN: 15e3 },
    unlock: [{ reqId: "gpu", qty: 5 }],
    effect: { building: "gpu", prod: "TOKEN", multiplier: 1.2 }
  },
  {
    id: "gpu_cooling",
    name: "Fuente 80 Plus Tal Vez",
    desc: "+25% producción de GPU Rig",
    cost: { TOKEN: 5e4 },
    unlock: [{ reqId: "gpu", qty: 10 }],
    effect: { building: "gpu", prod: "TOKEN", multiplier: 1.25 }
  },
  {
    id: "launchpad_stickers",
    name: "Sticker Pack Perruno",
    desc: "+25% producción de Launchpad",
    cost: { TOKEN: 1e5 },
    unlock: [{ reqId: "launchpad", qty: 5 }],
    effect: { building: "launchpad", prod: "TOKEN", multiplier: 1.25 }
  },
  {
    id: "launchpad_hype",
    name: "Máquina de Hype",
    desc: "+30% producción de Launchpad",
    cost: { TOKEN: 4e5 },
    unlock: [{ reqId: "launchpad", qty: 10 }],
    effect: { building: "launchpad", prod: "TOKEN", multiplier: 1.3 }
  },
  {
    id: "alpha_dyor",
    name: "DYOR Intensivo",
    desc: "+25% producción de Alpha TG Group",
    cost: { TOKEN: 5e5 },
    unlock: [{ reqId: "alpha", qty: 5 }],
    effect: { building: "alpha", prod: "TOKEN", multiplier: 1.25 }
  },
  {
    id: "arb_retry",
    name: "RetryCount 9000",
    desc: "+30% producción de Arb Bot",
    cost: { TOKEN: 2e6 },
    unlock: [{ reqId: "arb", qty: 5 }],
    effect: { building: "arb", prod: "TOKEN", multiplier: 1.3 }
  },
  {
    id: "arb_latency",
    name: "Latencia Cuántica",
    desc: "+40% producción de Arb Bot",
    cost: { TOKEN: 8e6 },
    unlock: [{ reqId: "arb", qty: 10 }],
    effect: { building: "arb", prod: "TOKEN", multiplier: 1.4 }
  },
  {
    id: "mempool_sandwich",
    name: "Sandwich Sin Pan",
    desc: "+35% producción de Mempool Sneaker",
    cost: { TOKEN: 15e6 },
    unlock: [{ reqId: "mempool", qty: 5 }],
    effect: { building: "mempool", prod: "TOKEN", multiplier: 1.35 }
  },
  {
    id: "awareness_banner",
    name: 'Banner "NO HAGAS CLICK"',
    desc: "+30% producción del Circus",
    cost: { TOKEN: 1e8 },
    unlock: [{ reqId: "awareness", qty: 5 }],
    effect: { building: "awareness", prod: "TOKEN", multiplier: 1.3 }
  },
  {
    id: "rollup_sequencer",
    name: "Secuenciador Turbo",
    desc: "+25% producción de Rollup Node",
    cost: { TOKEN: 6e8 },
    unlock: [{ reqId: "rollup", qty: 5 }],
    effect: { building: "rollup", prod: "TOKEN", multiplier: 1.25 }
  },
  {
    id: "vc_napkin",
    name: "Servilleta Premium",
    desc: "+30% producción de VC de Servilleta",
    cost: { TOKEN: 4e9 },
    unlock: [{ reqId: "vc", qty: 5 }],
    effect: { building: "vc", prod: "TOKEN", multiplier: 1.3 }
  }
];
const upgrades = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UPGRADES
}, Symbol.toStringTag, { value: "Module" }));
const SAVE_KEY = "crypto_clicker_degen_save";
const SCHEMA_VERSION = 1;
function saveGame(state) {
  if (typeof window === "undefined") return;
  const data = {
    version: SCHEMA_VERSION,
    state,
    savedAt: Date.now()
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error guardando:", e);
  }
}
function loadGame() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== SCHEMA_VERSION) {
      console.warn("Versión de guardado incompatible");
      return null;
    }
    if (data.state.unlocked && Array.isArray(data.state.unlocked)) {
      data.state.unlocked = new Set(data.state.unlocked);
    }
    return data.state;
  } catch (e) {
    console.error("Error cargando:", e);
    return null;
  }
}
function createInitialState() {
  const owned = {};
  BUILDINGS.forEach((b) => owned[b.id] = 0);
  return {
    resources: {
      TOKEN: 0
    },
    owned,
    unlocked: /* @__PURE__ */ new Set(["cpu", "airdrop"]),
    upgradesOwned: [],
    totalEarned: 0,
    reboots: 0,
    lastTick: Date.now(),
    playtimeMs: 0
  };
}
function createGameStore() {
  const { subscribe, set, update } = writable(createInitialState());
  let tickInterval = null;
  let saveInterval = null;
  const loadState = () => {
    const saved = loadGame();
    if (saved) {
      const now = Date.now();
      const deltaMs = Math.min(now - saved.lastTick, MAX_OFFLINE_HOURS * 36e5);
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
          let amount = baseAmount * qty * (TICK_MS / 1e3);
          state.upgradesOwned.forEach((upId) => {
            const upgrade = UPGRADES.find((u) => u.id === upId);
            if (upgrade && upgrade.effect.building === building.id && upgrade.effect.prod === res) {
              amount *= upgrade.effect.multiplier;
            }
          });
          state.resources[res] += amount;
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
        let currentState;
        subscribe((s) => currentState = s)();
        saveGame(currentState);
      }, 5e3);
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
    buyBuilding: (id, quantity = 1) => {
      update((state) => {
        const building = BUILDINGS.find((b) => b.id === id);
        if (!building) return state;
        for (let i = 0; i < quantity; i++) {
          const cost = calculateBuildingCost(building, state.owned[id]);
          if (!canAfford(cost, state.resources)) break;
          for (const [res, amount] of Object.entries(cost)) {
            state.resources[res] -= amount;
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
    buyUpgrade: (id) => {
      update((state) => {
        const upgrade = UPGRADES.find((u) => u.id === id);
        if (!upgrade || state.upgradesOwned.includes(id)) return state;
        if (!canAfford(upgrade.cost, state.resources)) return state;
        for (const [res, amount] of Object.entries(upgrade.cost)) {
          state.resources[res] -= amount;
        }
        state.upgradesOwned.push(id);
        return state;
      });
    },
    reboot: async (walletAddress) => {
      let currentState;
      subscribe((s) => currentState = s)();
      const tokensEarned = currentState.totalEarned;
      if (walletAddress && tokensEarned > 0) {
        console.log(`Minting ${tokensEarned} tokens to ${walletAddress}`);
      }
      const newState = createInitialState();
      newState.reboots = currentState.reboots + 1;
      set(newState);
      saveGame(newState);
    },
    hardReset: () => {
      set(createInitialState());
      saveGame(createInitialState());
    },
    manualSave: () => {
      let currentState;
      subscribe((s) => currentState = s)();
      saveGame(currentState);
    }
  };
}
const gameStore = createGameStore();
export {
  BUILDINGS as B,
  canAfford as a,
  calculateBuildingCost as c,
  gameStore as g,
  upgrades as u
};
