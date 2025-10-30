<script lang="ts">
  import { gameStore } from '../stores/game';
  import type { BuildingDef } from '../data/buildings';
  import { calculateBuildingCost, canAfford } from '../data/buildings';

  export let building: BuildingDef;

  $: owned = $gameStore.owned && $gameStore.owned[building.id] || 0;
  $: cost = calculateBuildingCost(building, owned);
  $: affordable = canAfford(cost, $gameStore.resources);

  function formatCost(cost: any): string {
    return Object.entries(cost)
      .map(([res, val]) => `${res}: ${val}`)
      .join(', ');
  }

  function buy(qty: number) {
    gameStore.buyBuilding(building.id, qty);
  }
</script>

<div class="building-card nes-container with-title">
  <p class="title">{building.name}</p>

  <div class="content">
    <p class="flavor">{building.flavor}</p>

    <div class="stats">
      <p><strong>Owned:</strong> {owned}</p>
      <p class="cost" class:affordable class:expensive={!affordable}>
        <strong>Costo:</strong>
        {formatCost(cost)}
      </p>
    </div>

    <div class="production">
      <small>
        Produce:
        {#each Object.entries(building.baseProd) as [res, val]}
          <span>{res} +{val}/s</span>
        {/each}
      </small>
      {#if building.consumes}
        <small class="consume">
          Consume:
          {#each Object.entries(building.consumes) as [res, val]}
            <span>{res} -{val}/s</span>
          {/each}
        </small>
      {/if}
    </div>

    <div class="buttons">
      <button class="nes-btn is-primary" disabled={!affordable} on:click={() => buy(1)}>
        x1
      </button>
      <button class="nes-btn is-primary" disabled={!affordable} on:click={() => buy(10)}>
        x10
      </button>
      <button class="nes-btn is-primary" disabled={!affordable} on:click={() => buy(100)}>
        x100
      </button>
    </div>
  </div>
</div>

<style>
  .title {
    background-color: #000;
  }
  .building-card {
    margin-bottom: 1rem;
  }

  .content {
    padding: 0.5rem;
  }

  .flavor {
    font-size: 0.875rem;
    font-style: italic;
    color: #ccc;
    margin-bottom: 0.5rem;
  }

  .stats {
    margin-bottom: 0.5rem;
  }

  .cost {
    font-size: 0.875rem;
  }

  .cost.affordable {
    color: #92cc41;
  }

  .cost.expensive {
    color: #e76e55;
  }

  .production {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  }

  .production small {
    display: block;
    margin-bottom: 0.25rem;
  }

  .consume {
    color: #ff6b6b;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  .buttons button {
    flex: 1;
  }

  @media (max-width: 480px) {
    .buttons {
      flex-direction: column;
    }
  }
</style>
