<script lang="ts">
  export let show = false;
  export let title = 'Confirmar';
  export let message = '¿Estás seguro?';
  export let onConfirm: () => void = () => {};

  function confirm() {
    onConfirm();
    show = false;
  }

  function cancel() {
    show = false;
  }
</script>

{#if show}
  <div class="modal-overlay" on:click={cancel} on:keydown={(e) => e.key === 'Escape' && cancel()} role="button" tabindex="-1">
    <div class="dialog nes-container with-title is-centered" on:click|stopPropagation role="dialog">
      <p class="title">{title}</p>

      <div class="dialog-content">
        <p>{message}</p>

        <div class="buttons">
          <button class="nes-btn is-error" on:click={confirm}>Confirmar</button>
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

  .dialog {
    max-width: 400px;
    width: 90%;
  }

  .dialog-content {
    padding: 1rem;
  }

  .dialog-content p {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  @media (max-width: 480px) {
    .buttons {
      flex-direction: column;
    }
  }
</style>
