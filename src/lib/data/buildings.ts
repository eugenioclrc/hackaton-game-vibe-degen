import type { Res } from './constants';

export type Prod = Partial<Record<Res, number>>;
export type Cost = Partial<Record<Res, number>>;

export interface BuildingDef {
  id: string;
  name: string;
  flavor: string;
  baseCost: Cost;
  costK: number;
  baseProd: Prod;
  unlock?: { reqId: string; qty: number }[];
}

export const BUILDINGS: BuildingDef[] = [
  {
    id: 'cpu',
    name: 'CPU Miner',
    flavor: 'Pentium con cooler stock.',
    baseCost: { TOKEN: 15 },
    costK: 1.15,
    baseProd: { TOKEN: 0.1 }
  },
  {
    id: 'airdrop',
    name: 'Airdrop Farmer',
    flavor: 'Form fill enjoyer.',
    baseCost: { TOKEN: 100 },
    costK: 1.15,
    baseProd: { TOKEN: 1 }
  },
  {
    id: 'shill',
    name: 'Shill en X',
    flavor: 'Hilo de 20 puntos y 0 fuentes.',
    baseCost: { TOKEN: 500 },
    costK: 1.18,
    baseProd: { TOKEN: 4 },
    unlock: [{ reqId: 'cpu', qty: 5 }]
  },
  {
    id: 'gpu',
    name: 'GPU Rig',
    flavor: '6×GPU "usadas" con olor a minado.',
    baseCost: { TOKEN: 3000 },
    costK: 1.18,
    baseProd: { TOKEN: 20 },
    unlock: [{ reqId: 'airdrop', qty: 5 }]
  },
  {
    id: 'launchpad',
    name: 'Launchpad Intern',
    flavor: 'Lanza memecoins impronunciables.',
    baseCost: { TOKEN: 10000 },
    costK: 1.2,
    baseProd: { TOKEN: 80 },
    unlock: [{ reqId: 'gpu', qty: 5 }]
  },
  {
    id: 'alpha',
    name: 'Alpha TG Group',
    flavor: 'DYOR, bro.',
    baseCost: { TOKEN: 40000 },
    costK: 1.2,
    baseProd: { TOKEN: 260 },
    unlock: [{ reqId: 'launchpad', qty: 5 }]
  },
  {
    id: 'arb',
    name: 'Arb Bot',
    flavor: 'Spread-snacker.',
    baseCost: { TOKEN: 200000 },
    costK: 1.22,
    baseProd: { TOKEN: 1400 },
    unlock: [{ reqId: 'alpha', qty: 5 }]
  },
  {
    id: 'mempool',
    name: 'Mempool Sneaker',
    flavor: 'Parodia (no enseña nada real).',
    baseCost: { TOKEN: 1600000 },
    costK: 1.22,
    baseProd: { TOKEN: 7800 },
    unlock: [{ reqId: 'arb', qty: 5 }]
  },
  {
    id: 'awareness',
    name: 'Phishing Awareness Circus',
    flavor: 'Show anti-estafas.',
    baseCost: { TOKEN: 10000000 },
    costK: 1.18,
    baseProd: { TOKEN: 44000 },
    unlock: [{ reqId: 'mempool', qty: 5 }]
  },
  {
    id: 'rollup',
    name: 'Rollup Node',
    flavor: 'Súper secuenciador.',
    baseCost: { TOKEN: 65000000 },
    costK: 1.25,
    baseProd: { TOKEN: 260000 },
    unlock: [{ reqId: 'awareness', qty: 5 }]
  },
  {
    id: 'vc',
    name: 'VC de Servilleta',
    flavor: 'Term sheet en una servilleta.',
    baseCost: { TOKEN: 430000000 },
    costK: 1.25,
    baseProd: { TOKEN: 1600000 },
    unlock: [{ reqId: 'rollup', qty: 5 }]
  },
  {
    id: 'oracle',
    name: 'Oracle Patron',
    flavor: 'Sponsorear la suerte.',
    baseCost: { TOKEN: 2900000000 },
    costK: 1.28,
    baseProd: { TOKEN: 10000000 },
    unlock: [{ reqId: 'vc', qty: 5 }]
  }
];

export function calculateBuildingCost(building: BuildingDef, owned: number): Cost {
  const cost: Cost = {};
  for (const [res, base] of Object.entries(building.baseCost)) {
    cost[res as Res] = Math.floor(base * Math.pow(building.costK, owned));
  }
  return cost;
}

export function canAfford(cost: Cost, resources: Record<Res, number>): boolean {
  for (const [res, amount] of Object.entries(cost)) {
    if (resources[res as Res] < amount) return false;
  }
  return true;
}
