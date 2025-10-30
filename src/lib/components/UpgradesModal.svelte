<script lang="ts">
  import { gameStore } from '../stores/game';
  import { UPGRADES } from '../data/upgrades';
  import { canAfford } from '../data/buildings';

  function isUnlocked(upgrade: any): boolean {
    if (!upgrade.unlock) return true;
    return upgrade.unlock.every((req: any) => $gameStore.owned[req.reqId] >= req.qty);
  }

  function isPurchased(id: string): boolean {
    return $gameStore.upgradesOwned.includes(id);
  }

  function buy(id: string) {
    gameStore.buyUpgrade(id);
  }

  function formatCost(cost: any): string {
    return Object.entries(cost)
      .map(([res, val]) => `${res}: ${val}`)
      .join(', ');
  }
</script>

<div class="upgrades-section">
  <h2>Upgrades</h2>

  <div class="upgrades-grid">
    {#each UPGRADES as upgrade}
      {@const unlocked = isUnlocked(upgrade)}
      {@const purchased = isPurchased(upgrade.id)}
      {@const affordable = canAfford(upgrade.cost, $gameStore.resources)}

      {#if unlocked}
        <div
          class="upgrade-card nes-container"
          class:is-disabled={purchased}
          class:with-title={!purchased}
        >
          {#if !purchased}
            <p class="title">{upgrade.name}</p>
          {/if}

          <div class="upgrade-content">
            {#if purchased}
              <p class="purchased-name">{upgrade.name}</p>
            {/if}
            <p class="desc">{upgrade.desc}</p>

            {#if !purchased}
              <p class="cost" class:affordable class:expensive={!affordable}>
                {formatCost(upgrade.cost)}
              </p>
              <button
                class="nes-btn is-success"
                disabled={!affordable}
                on:click={() => buy(upgrade.id)}
              >
                Comprar
              </button>
            {:else}
              <p class="purchased-badge">COMPRADO</p>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .upgrades-section {
    margin-top: 1rem;
  }

  .upgrades-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .upgrade-card {
    min-height: 180px;
  }

  .upgrade-card.is-disabled {
    opacity: 0.6;
    background-color: #333;
  }

  .upgrade-content {
    padding: 0.5rem;
  }

  .purchased-name {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .desc {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    min-height: 40px;
  }

  .cost {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .cost.affordable {
    color: #92cc41;
  }

  .cost.expensive {
    color: #e76e55;
  }

  .purchased-badge {
    color: #92cc41;
    font-weight: bold;
    text-align: center;
  }

  @media (max-width: 768px) {
    .upgrades-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
