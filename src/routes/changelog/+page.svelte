<script lang="ts">
</script>

<svelte:head>
  <title>Changelog - Crypto Clicker Degen</title>
</svelte:head>

<div class="page-container">
  <header class="nes-container is-dark">
    <a href="/" class="nes-btn">← Volver al Juego</a>
  </header>

  <main class="nes-container with-title">
    <p class="title">Changelog</p>

    <div class="content">
      <table class="nes-table is-bordered is-dark">
        <thead>
          <tr>
            <th>Versión</th>
            <th>Fecha</th>
            <th>Cambios</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.0.0</td>
            <td>2025-10-30</td>
            <td>
              <ul>
                <li>Lanzamiento inicial</li>
                <li>7 edificios base</li>
                <li>12 upgrades</li>
                <li>Sistema de eventos aleatorios</li>
                <li>Halving y Bull Run</li>
                <li>Persistencia localStorage</li>
                <li>Mobile-responsive</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.9.0</td>
            <td>2025-10-25</td>
            <td>
              <ul>
                <li>Beta cerrada</li>
                <li>Testing de balance</li>
                <li>Fix de bugs críticos</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.5.0</td>
            <td>2025-10-15</td>
            <td>
              <ul>
                <li>Alpha interno</li>
                <li>Mecánicas base</li>
                <li>Proof of concept</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="roadmap nes-container is-rounded">
        <h3>Próximamente (tal vez)</h3>
        <ul class="nes-list is-disc">
          <li>Más edificios y upgrades</li>
          <li>Minijuegos interactivos</li>
          <li>Logros y achievements</li>
          <li>Modo oscuro (más oscuro)</li>
          <li>Soporte para gamepad</li>
        </ul>
      </div>
    </div>
  </main>
</div>

<style>
  .page-container {
    max-width: 1000px;
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

  .nes-table {
    width: 100%;
    margin-bottom: 2rem;
  }

  .nes-table td ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  .nes-table td ul li {
    margin-bottom: 0.25rem;
  }

  .roadmap {
    background-color: #333;
    padding: 1rem;
    margin-top: 2rem;
  }

  .roadmap h3 {
    margin-top: 0;
    color: #92cc41;
  }

  @media (max-width: 768px) {
    .nes-table {
      font-size: 0.875rem;
    }

    .nes-table td,
    .nes-table th {
      padding: 0.5rem;
    }
  }
</style>
