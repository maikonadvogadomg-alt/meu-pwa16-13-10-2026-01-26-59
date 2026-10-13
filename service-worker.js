// service-worker.js — gerado pelo Mini SK em 13/10/2026, 01:32:13
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-meu-pwa16-13-10-2026-01-26-59-';
const CACHE = PREFIXO + 'mv66pmn1';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./1.codigo.html",
  "./2.codigo.html",
  "./3.codigo.html",
  "./4.codigo.html",
  "./5.codigo.html",
  "./6.codigo.html",
  "./7.codigo.html",
  "./8.codigo.html",
  "./9.codigo.html",
  "./10.codigo.html",
  "./11.codigo.html",
  "./12.codigo.html",
  "./13.codigo.html",
  "./14.codigo.html",
  "./15.codigo.html",
  "./16.codigo.html",
  "./17.codigo.html",
  "./18.codigo.html",
  "./19.codigo.html",
  "./20.codigo.html",
  "./21.codigo.html",
  "./22.codigo.html",
  "./23.codigo.html",
  "./24.codigo.html",
  "./25.codigo.html",
  "./26.codigo.html",
  "./27.codigo.html",
  "./28.codigo.html",
  "./29.codigo.html",
  "./30.codigo.html",
  "./favicon.ico",
  "./icon-192.png",
  "./icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-16.png",
  "./icons/icon-32.png",
  "./icons/icon-48.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/maskable.svg",
  "./index.html",
  "./Index.html",
  "./manifest.json",
  "./sw.js"
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(GUARDAR.map((u) => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIXO) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primeiro a internet (sempre a versão nova); sem internet, a cópia guardada.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      // Igual ao Workbox da Replit: página que não existe (rota do app) abre o index
      if (res.status === 404 && req.mode === 'navigate') return caches.match('./').then((r) => r || fetch('./'));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
