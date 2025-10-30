<script lang="ts">
</script>

<svelte:head>
  <title>Privacidad - Crypto Clicker Degen</title>
</svelte:head>

<div class="page-container">
  <header class="nes-container is-dark">
    <a href="/" class="nes-btn">← Volver al Juego</a>
  </header>

  <main class="nes-container with-title">
    <p class="title">Política de Privacidad</p>

    <div class="content">
      <section>
        <h2>Recolección de Datos</h2>
        <p>
          <strong>NO recolectamos NINGÚN dato.</strong> Este juego funciona 100% en tu navegador.
        </p>
      </section>

      <section>
        <h2>Almacenamiento Local</h2>
        <p>
          Tu progreso se guarda únicamente en el <code>localStorage</code> de tu navegador. Estos datos
          NUNCA salen de tu dispositivo.
        </p>
        <p>Puedes borrar tu progreso en cualquier momento limpiando el localStorage del navegador.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>No usamos cookies. Ni siquiera las de chocolate.</p>
      </section>

      <section>
        <h2>Análiticas</h2>
        <p>
          No hay Google Analytics, ni tracking, ni nada. Solo tú, tu navegador, y un juego de
          clicker absurdo.
        </p>
      </section>

      <section>
        <h2>Seguridad</h2>
        <p>
          Como no hay servidor ni bases de datos, no hay nada que hackear (excepto tu propia
          localStorage, pero eso es trampa).
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>Si tienes preguntas sobre privacidad, probablemente estés pensando demasiado.</p>
        <p>Pero si insistes: este es un proyecto de código abierto sin entidad detrás.</p>
      </section>

      <div class="disclaimer nes-container is-rounded">
        <p>
          <strong>Recordatorio:</strong> Este juego es FICCIÓN y PARODIA. No promovemos actividades
          ilegales o dañinas. No somos asesores financieros. DYOR.
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

  section {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #92cc41;
  }

  p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  code {
    background-color: #333;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }

  .disclaimer {
    background-color: #e76e55;
    padding: 1rem;
    margin-top: 2rem;
  }

  .disclaimer p {
    margin: 0;
    text-align: center;
    color: #fff;
  }
</style>
