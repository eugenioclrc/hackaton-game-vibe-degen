import type { Cost } from './buildings';

export interface UpgradeDef {
  id: string;
  name: string;
  desc: string;
  cost: Cost;
  unlock?: { reqId: string; qty: number }[];
  effect: {
    building?: string;
    prod?: string;
    multiplier: number;
  };
}

export const UPGRADES: UpgradeDef[] = [
  {
    id: 'cpu_paste',
    name: 'Pasta Térmica Milagrosa',
    desc: '+20% producción de CPU Miner',
    cost: { TOKEN: 100 },
    unlock: [{ reqId: 'cpu', qty: 5 }],
    effect: { building: 'cpu', prod: 'TOKEN', multiplier: 1.2 }
  },
  {
    id: 'cpu_overclock',
    name: 'Overclock de Abuela',
    desc: '+15% producción de CPU Miner',
    cost: { TOKEN: 500 },
    unlock: [{ reqId: 'cpu', qty: 15 }],
    effect: { building: 'cpu', prod: 'TOKEN', multiplier: 1.15 }
  },
  {
    id: 'cpu_bios',
    name: 'BIOS Beta',
    desc: '+25% producción de CPU Miner',
    cost: { TOKEN: 2000 },
    unlock: [{ reqId: 'cpu', qty: 25 }],
    effect: { building: 'cpu', prod: 'TOKEN', multiplier: 1.25 }
  },
  {
    id: 'airdrop_bots',
    name: 'Bots Multi-Wallet',
    desc: '+20% producción de Airdrop Farmer',
    cost: { TOKEN: 1000 },
    unlock: [{ reqId: 'airdrop', qty: 5 }],
    effect: { building: 'airdrop', prod: 'TOKEN', multiplier: 1.2 }
  },
  {
    id: 'shill_threads',
    name: 'Template de Hilos Pro',
    desc: '+30% producción de Shill en X',
    cost: { TOKEN: 5000 },
    unlock: [{ reqId: 'shill', qty: 5 }],
    effect: { building: 'shill', prod: 'TOKEN', multiplier: 1.3 }
  },
  {
    id: 'gpu_risers',
    name: 'Risers Que No Explotan',
    desc: '+20% producción de GPU Rig',
    cost: { TOKEN: 15000 },
    unlock: [{ reqId: 'gpu', qty: 5 }],
    effect: { building: 'gpu', prod: 'TOKEN', multiplier: 1.2 }
  },
  {
    id: 'gpu_cooling',
    name: 'Fuente 80 Plus Tal Vez',
    desc: '+25% producción de GPU Rig',
    cost: { TOKEN: 50000 },
    unlock: [{ reqId: 'gpu', qty: 10 }],
    effect: { building: 'gpu', prod: 'TOKEN', multiplier: 1.25 }
  },
  {
    id: 'launchpad_stickers',
    name: 'Sticker Pack Perruno',
    desc: '+25% producción de Launchpad',
    cost: { TOKEN: 100000 },
    unlock: [{ reqId: 'launchpad', qty: 5 }],
    effect: { building: 'launchpad', prod: 'TOKEN', multiplier: 1.25 }
  },
  {
    id: 'launchpad_hype',
    name: 'Máquina de Hype',
    desc: '+30% producción de Launchpad',
    cost: { TOKEN: 400000 },
    unlock: [{ reqId: 'launchpad', qty: 10 }],
    effect: { building: 'launchpad', prod: 'TOKEN', multiplier: 1.3 }
  },
  {
    id: 'alpha_dyor',
    name: 'DYOR Intensivo',
    desc: '+25% producción de Alpha TG Group',
    cost: { TOKEN: 500000 },
    unlock: [{ reqId: 'alpha', qty: 5 }],
    effect: { building: 'alpha', prod: 'TOKEN', multiplier: 1.25 }
  },
  {
    id: 'arb_retry',
    name: 'RetryCount 9000',
    desc: '+30% producción de Arb Bot',
    cost: { TOKEN: 2000000 },
    unlock: [{ reqId: 'arb', qty: 5 }],
    effect: { building: 'arb', prod: 'TOKEN', multiplier: 1.3 }
  },
  {
    id: 'arb_latency',
    name: 'Latencia Cuántica',
    desc: '+40% producción de Arb Bot',
    cost: { TOKEN: 8000000 },
    unlock: [{ reqId: 'arb', qty: 10 }],
    effect: { building: 'arb', prod: 'TOKEN', multiplier: 1.4 }
  },
  {
    id: 'mempool_sandwich',
    name: 'Sandwich Sin Pan',
    desc: '+35% producción de Mempool Sneaker',
    cost: { TOKEN: 15000000 },
    unlock: [{ reqId: 'mempool', qty: 5 }],
    effect: { building: 'mempool', prod: 'TOKEN', multiplier: 1.35 }
  },
  {
    id: 'awareness_banner',
    name: 'Banner "NO HAGAS CLICK"',
    desc: '+30% producción del Circus',
    cost: { TOKEN: 100000000 },
    unlock: [{ reqId: 'awareness', qty: 5 }],
    effect: { building: 'awareness', prod: 'TOKEN', multiplier: 1.3 }
  },
  {
    id: 'rollup_sequencer',
    name: 'Secuenciador Turbo',
    desc: '+25% producción de Rollup Node',
    cost: { TOKEN: 600000000 },
    unlock: [{ reqId: 'rollup', qty: 5 }],
    effect: { building: 'rollup', prod: 'TOKEN', multiplier: 1.25 }
  },
  {
    id: 'vc_napkin',
    name: 'Servilleta Premium',
    desc: '+30% producción de VC de Servilleta',
    cost: { TOKEN: 4000000000 },
    unlock: [{ reqId: 'vc', qty: 5 }],
    effect: { building: 'vc', prod: 'TOKEN', multiplier: 1.3 }
  }
];
