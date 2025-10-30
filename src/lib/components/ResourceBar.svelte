<script lang="ts">
  import { gameStore } from '../stores/game';
  import { RESOURCE_LABELS } from '../data/constants';
  import type { Res } from '../data/constants';

  function formatNumber(num: number): string {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  }

  function handleSave() {
    gameStore.manualSave();
    alert('Juego guardado!');
  }

  function handleExport() {
    const data = localStorage.getItem('crypto_clicker_degen_save');
    if (!data) {
      alert('No hay datos para exportar');
      return;
    }
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crypto_clicker_save.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = event.target.result;
          localStorage.setItem('crypto_clicker_degen_save', data);
          location.reload();
        } catch (err) {
          alert('Error importando: ' + err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
</script>

<div class="resource-bar nes-container is-dark">
  <div class="resources-grid">
    {#each Object.entries($gameStore.resources) as [key, value]}
      <div class="resource-item">
        <span class="resource-label">{RESOURCE_LABELS[key]}:</span>
        <span class="resource-value">{formatNumber(value)}</span>
      </div>
    {/each}
  </div>


  <div class="actions">
    <button class="nes-btn is-primary" on:click={handleSave}>Guardar</button>
    <button class="nes-btn" on:click={handleExport}>Exportar</button>
    <button class="nes-btn" on:click={handleImport}>Importar</button>
  </div>
</div>

<style>
  .resource-bar {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .resource-item {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem;
  }

  .resource-label {
    font-weight: bold;
  }

  .resource-value {
    color: #ffd700;
  }

  .bonus-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .bonus-info small {
    color: #92cc41;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    .resources-grid {
      grid-template-columns: 1fr 1fr;
    }

    .actions button {
      flex: 1;
      min-width: 100px;
    }
  }
</style>
