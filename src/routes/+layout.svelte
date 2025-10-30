<script lang="ts">
  import { onMount } from 'svelte';
  import { gameStore } from '$lib/stores/game';
  import 'nes.css/css/nes.min.css';
  import '../app.css';

  onMount(() => {
    gameStore.init();

    return () => {
      gameStore.destroy();
    };
  });
</script>

<div class="app-container">
  <slot />
</div>

<style>
  .app-container {
    min-height: 100vh;
    padding: 1rem;
  }

  :global(body) {
    background-color: #212529;
    color: #fff;
  }
</style>
