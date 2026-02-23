import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_69Ahf1Rw.mjs';
import { manifest } from './manifest_DjU4mixm.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/shared-text/_id_.astro.mjs');
const _page3 = () => import('./pages/sharetext.astro.mjs');
const _page4 = () => import('./pages/shorturl.astro.mjs');
const _page5 = () => import('./pages/_id_/data.astro.mjs');
const _page6 = () => import('./pages/_id_.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/shared-text/[id].ts", _page2],
    ["src/pages/sharetext.astro", _page3],
    ["src/pages/shorturl.astro", _page4],
    ["src/pages/[id]/data.ts", _page5],
    ["src/pages/[id].astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///var/home/pmustafi/code/quic-link/dist/client/",
    "server": "file:///var/home/pmustafi/code/quic-link/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
