

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/privacy/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DW5ULWQ6.js","_app/immutable/chunks/kUQnmLq-.js","_app/immutable/chunks/C75Z2t5e.js"];
export const stylesheets = ["_app/immutable/assets/5.CcY-j3ff.css"];
export const fonts = [];
