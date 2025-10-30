<script lang="ts">
  import { gameStore } from '../stores/game';
import { onMount } from 'svelte';

  export let show = false;

  let walletAddress = '';
  onMount(() => {
    walletAddress = localStorage.getItem('walletAddress') || '';
  });
  
  async function confirm() {
    // mint tokens if walletAddress is provided
    if (walletAddress) {

      await gameStore.mintTokens(walletAddress, $gameStore.resources.TOKEN);
      localStorage.setItem('walletAddress', walletAddress);
    }
    gameStore.reboot(walletAddress || undefined);
    show = false;
    walletAddress = '';

  }

  function cancel() {
    show = false;
    walletAddress = '';
  }
</script>

{#if show}
  <div
    class="modal-overlay"
    on:click={cancel}
    on:keydown={(e) => e.key === 'Escape' && cancel()}
    role="button"
    tabindex="-1"
  >
    <div class="modal nes-container with-title is-centered" on:click|stopPropagation role="dialog">
      <p class="title">REBOOT</p>

      <div class="modal-content">
        <p>Has ganado <strong>{$gameStore.totalEarned.toFixed(2)} TOKEN</strong></p>

        <p>Si quieres, ingresa tu wallet para mintear los tokens:</p>

        <div class="nes-field">
          <label for="wallet_input">Wallet (opcional)</label>
          <input
            type="text"
            id="wallet_input"
            class="nes-input"
            bind:value={walletAddress}
            placeholder="0x..."
          />
        </div>

        <p class="warning">
          <small>Esto reiniciará tu progreso pero mantendrás tu contador de Reboots.</small>
        </p>

        <div class="buttons">
          <button class="nes-btn is-warning" on:click={confirm}>REBOOT</button>
          <button class="nes-btn" on:click={cancel}>Cancelar</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .modal {
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  }

  .modal-content {
    padding: 1rem;
  }

  .modal-content p {
    margin-bottom: 1rem;
  }

  .nes-field {
    margin: 1rem 0;
  }

  .warning {
    color: #f7d51d;
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    .buttons {
      flex-direction: column;
    }
  }
</style>
