<script lang="ts">
</script>

<svelte:head>
  <title>Créditos - Crypto Clicker Degen</title>
</svelte:head>

<div class="page-container">
  <header class="nes-container is-dark">
    <a href="/" class="nes-btn">← Volver al Juego</a>
  </header>

  <main class="nes-container with-title">
    <p class="title">Créditos</p>

    <div class="content">
      <ul class="nes-list is-circle">
        <li>Concepto y Diseño: El Degen Anónimo</li>
        <li>Programación: Stack Overflow y Café</li>
        <li>Arte 8-bit: Paint.exe Champion</li>
        <li>Testing: Los que compraron en ATH</li>
        <li>Música: Silencio (feature, no bug)</li>
        <li>Consultoría Legal: "No soy tu asesor financiero"</li>
        <li>Inspiración: Todos los rugs que vimos</li>
        <li>Agradecimientos: NES.css, SvelteKit, y tu paciencia</li>
      </ul>

      <div class="disclaimer nes-container is-rounded">
        <p>
          Este juego es una parodia. No enseña, promueve ni facilita actividades ilegales o
          dañinas. Todo es ficción y humor.
        </p>
      </div>
    </div>
  </main>
</div>

<style>
  .page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  header {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .content {
    padding: 1rem;
  }

  .nes-list {
    margin-bottom: 2rem;
  }

  .nes-list li {
    margin-bottom: 0.5rem;
  }

  .disclaimer {
    background-color: #333;
    padding: 1rem;
    margin-top: 2rem;
  }

  .disclaimer p {
    margin: 0;
    text-align: center;
    color: #f7d51d;
  }
</style>
