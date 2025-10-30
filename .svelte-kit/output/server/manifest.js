export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CE3dmUtd.js",app:"_app/immutable/entry/app.DE0-Ah4T.js",imports:["_app/immutable/entry/start.CE3dmUtd.js","_app/immutable/chunks/DLzjGkaw.js","_app/immutable/chunks/kUQnmLq-.js","_app/immutable/chunks/B_HAED2-.js","_app/immutable/entry/app.DE0-Ah4T.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/kUQnmLq-.js","_app/immutable/chunks/C75Z2t5e.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/changelog","/credits","/privacy"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
