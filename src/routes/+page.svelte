<script lang="ts">
  import { gameStore } from '$lib/stores/game';
  import { BUILDINGS } from '$lib/data/buildings';
  import BuildingCard from '$lib/components/BuildingCard.svelte';
  import UpgradesModal from '$lib/components/UpgradesModal.svelte';
  import RebootModal from '$lib/components/RebootModal.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import { onMount } from 'svelte';

  let activeTab: 'buildings' | 'upgrades' = 'buildings';
  let showRebootModal = false;
  let showResetDialog = false;

  $: unlockedBuildings = BUILDINGS.filter((b) => $gameStore.unlocked.has(b.id));
  $: tokenPerSec = calculateTokenPerSec();

  function calculateTokenPerSec(): number {
    let total = 0;
    BUILDINGS.forEach((building) => {
      const qty = $gameStore.owned[building.id];
      if (qty > 0 && building.baseProd.TOKEN) {
        let amount = building.baseProd.TOKEN * qty;
        
        $gameStore.upgradesOwned.forEach((upId) => {
          const upgrade = $gameStore.upgradesOwned.find(id => id === upId);
          if (upgrade) {
            import('$lib/data/upgrades').then(({UPGRADES}) => {
              const up = UPGRADES.find(u => u.id === upId);
              if (up && up.effect.building === building.id) {
                amount *= up.effect.multiplier;
              }
            });
          }
        });
        
        total += amount;
      }
    });
    return total;
  }

  function handleFaucetClick() {
    gameStore.clickFaucet();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      handleFaucetClick();
    }
  }

  function openReboot() {
    showRebootModal = true;
  }

  function openReset() {
    showResetDialog = true;
  }

  function confirmReset() {
    gameStore.hardReset();
  }

  function formatNumber(num: number): string {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<svelte:head>
  <title>Crypto Clicker: Degen Edition</title>
</svelte:head>

<div class="game-container">
  <header class="nes-container is-dark">
    <div class="header-content">
      <h1>Crypto Clicker: Degen Simulator</h1>
      <nav>
        <a href="/" class="nes-btn">Juego</a>
        <a href="/credits" class="nes-btn">Créditos</a>
        <a href="/changelog" class="nes-btn">Changelog</a>
        <a href="/privacy" class="nes-btn">Privacidad</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="resource-bar nes-container is-dark">
      <div class="resources-info">
        <div class="token-display">
          <span class="label">TOKEN:</span>
          <span class="value">{formatNumber($gameStore.resources.TOKEN)}</span>
        </div>
        <div class="rate">
          <small>+{formatNumber(tokenPerSec)}/s</small>
        </div>
      </div>
      
      <div class="stats">
        <small>Total: {formatNumber($gameStore.totalEarned)}</small>
        <small>Reboots: {$gameStore.reboots}</small>
      </div>

      <div class="actions">
        <button class="nes-btn is-primary" on:click={() => gameStore.manualSave()}>Guardar</button>
      </div>
    </section>

    <section class="faucet-section nes-container">
      <button class="nes-btn is-primary faucet-btn" on:click={handleFaucetClick}>
        FAUCET
      </button>

      <p class="hint">
        <small>Presiona ESPACIO para obtener TOKEN</small>
      </p>
    </section>

    <section class="tabs-section">
      <div class="tabs">
        <button
          class="nes-btn"
          class:is-primary={activeTab === 'buildings'}
          on:click={() => (activeTab = 'buildings')}
        >
          Edificios
        </button>
        <button
          class="nes-btn"
          class:is-primary={activeTab === 'upgrades'}
          on:click={() => (activeTab = 'upgrades')}
        >
          Upgrades
        </button>
      </div>

      <div class="tab-content">
        {#if activeTab === 'buildings'}
          <div class="buildings-list">
            {#each unlockedBuildings as building (building.id)}
              <BuildingCard {building} />
            {/each}
          </div>
        {:else}
          <UpgradesModal />
        {/if}
      </div>
    </section>
  </main>

  <footer class="footer nes-container">
    <div class="prestige-actions">
      <button class="nes-btn is-warning" on:click={openReboot}>REBOOT</button>
      <button class="nes-btn is-error" on:click={openReset}>Reset Duro</button>
    </div>

    <div class="legal">
      <small>
        Juego de ficción/parodia. NO consejos financieros. No enseñamos ni fomentamos prácticas
        indebidas.
      </small>
    </div>
  </footer>
</div>

<RebootModal bind:show={showRebootModal} />
<ConfirmDialog
  bind:show={showResetDialog}
  title="Reset Duro"
  message="Esto borrará TODO tu progreso. ¿Seguro?"
  onConfirm={confirmReset}
/>

<style>
  .game-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  nav {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .resource-bar {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .resources-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .token-display {
    font-size: 1.5rem;
  }

  .token-display .label {
    font-weight: bold;
  }

  .token-display .value {
    color: #ffd700;
    margin-left: 0.5rem;
  }

  .rate {
    color: #92cc41;
  }

  .stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .faucet-section {
    text-align: center;
    padding: 2rem;
    margin-bottom: 1rem;
  }

  .faucet-btn {
    font-size: 1.5rem;
    padding: 1.5rem 3rem;
    margin-bottom: 1rem;
  }

  .hint {
    margin-top: 0.5rem;
    color: #ccc;
  }

  .tabs-section {
    margin-bottom: 2rem;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tab-content {
    min-height: 400px;
  }

  .buildings-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
  }

  .footer {
    padding: 1rem;
    margin-top: 2rem;
  }

  .prestige-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .legal {
    text-align: center;
    color: #ccc;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.2rem;
    }

    .header-content {
      flex-direction: column;
      align-items: stretch;
    }

    nav {
      justify-content: center;
    }

    .faucet-btn {
      font-size: 1.2rem;
      padding: 1rem 2rem;
    }

    .buildings-list {
      grid-template-columns: 1fr;
    }

    .tabs {
      flex-direction: column;
    }

    .prestige-actions {
      flex-direction: column;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1rem;
    }

    .faucet-btn {
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
    }
  }
</style>
