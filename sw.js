const V="bahr-v6",CORE=["./","index.html","privacy.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-512-maskable.png","icons/apple-touch-icon.png","icons/favicon-48.png"];
const FONT=/^https:\/\/fonts\.(googleapis|gstatic)\.com\//,TILE=/^https:\/\/(tile\.openstreetmap\.org|gibs\.earthdata\.nasa\.gov)\//;
async function trim(c){const k=await c.keys(),t=k.filter(r=>TILE.test(r.url));if(t.length>500)await Promise.all(t.slice(0,t.length-500).map(r=>c.delete(r)))}
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
if(r.mode==="navigate"){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put("index.html",c));return n}).catch(()=>caches.match("index.html")));return}
if(TILE.test(r.url)){e.respondWith(caches.match(r.url).then(h=>h||fetch(r.url,{mode:"cors",credentials:"omit"}).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(async x=>{await x.put(r.url,c);trim(x)})}return n}).catch(()=>fetch(r))));return}
if(u.origin===location.origin||FONT.test(r.url)){e.respondWith(caches.match(r).then(h=>{const f=fetch(r).then(n=>{if(n&&(n.ok||n.type==="opaque")){const c=n.clone();caches.open(V).then(async x=>{await x.put(r,c);if(TILE.test(r.url))trim(x)})}return n}).catch(()=>h);return h||f}))}});
