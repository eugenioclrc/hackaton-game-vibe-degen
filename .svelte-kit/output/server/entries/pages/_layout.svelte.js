import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/game.js";
const css = {
  code: ".app-container.svelte-93o7nf{min-height:100vh;padding:1rem}body{background-color:#212529;color:#fff}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { gameStore } from \\"$lib/stores/game\\";\\nimport \\"nes.css/css/nes.min.css\\";\\nimport \\"../app.css\\";\\nonMount(() => {\\n  gameStore.init();\\n  return () => {\\n    gameStore.destroy();\\n  };\\n});\\n<\/script>\\n\\n<div class=\\"app-container\\">\\n  <slot />\\n</div>\\n\\n<style>\\n  .app-container {\\n    min-height: 100vh;\\n    padding: 1rem;\\n  }\\n\\n  :global(body) {\\n    background-color: #212529;\\n    color: #fff;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiBE,4BAAe,CACb,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IACX,CAEQ,IAAM,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,IACT"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="app-container svelte-93o7nf">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
