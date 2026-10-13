// Service Worker - Maikon Caldeira Advocacia
// Versão: 1785594639786
// Gerado automaticamente em: 01/08/2026, 11:30:39
// Suporta 30 slots de aplicações

const CACHE_NAME = 'mc-advocacia-v1785594639786';
const RUNTIME_CACHE = 'mc-runtime';

// Arquivos para cache inicial (30 slots)
const PRECACHE_URLS = [
  './index.html',
  './1.codigo.html',
  './2.codigo.html',
  './3.codigo.html',
  './4.codigo.html',
  './5.codigo.html',
  './6.codigo.html',
  './7.codigo.html',
  './8.codigo.html',
  './9.codigo.html',
  './10.codigo.html',
  './11.codigo.html',
  './12.codigo.html',
  './13.codigo.html',
  './14.codigo.html',
  './15.codigo.html',
  './16.codigo.html',
  './17.codigo.html',
  './18.codigo.html',
  './19.codigo.html',
  './20.codigo.html',
  './21.codigo.html',
  './22.codigo.html',
  './23.codigo.html',
  './24.codigo.html',
  './25.codigo.html',
  './26.codigo.html',
  './27.codigo.html',
  './28.codigo.html',
  './29.codigo.html',
  './30.codigo.html',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

// Instalação - cachear arquivos
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando versão 1785594639786...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando 30 slots + arquivos...');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.error('[SW] Erro ao cachear:', err))
  );
});

// Ativação - limpar caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - estratégia Network First para slots, Cache First para estáticos
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições externas
  if (url.origin !== location.origin) {
    return;
  }

  // Para arquivos .html dos slots - tentar rede primeiro
  if (request.url.includes('.codigo.html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            return caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, networkResponse.clone());
                return networkResponse;
              });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Para outros arquivos - cache first
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Servindo do cache:', request.url);
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              return caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(request, networkResponse.clone());
                  return networkResponse;
                });
            }
            return networkResponse;
          })
          .catch(() => {
            if (request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker carregado - Versão 1785594639786 - 30 Slots');