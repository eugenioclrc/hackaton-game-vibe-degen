

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DEDDMtNT.js","_app/immutable/chunks/kUQnmLq-.js","_app/immutable/chunks/C75Z2t5e.js","_app/immutable/chunks/DI-b58Np.js","_app/immutable/chunks/B_HAED2-.js"];
export const stylesheets = ["_app/immutable/assets/0.BIkHR_Mb.css"];
export const fonts = [];
