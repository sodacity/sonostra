// sw.js

// --- 1. DEFINE CACHE NAME AND FILES ---
// IMPORTANT: Increment this version number every time you update your files.
const CACHE_NAME = 'sonostra-v6'; 

// List all the files your app needs to run offline.
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'style.css',
  'gear.css',
  'sonastra-map.css',
  'script.js',
  'gear.js',
  'sonastra-map.js',
  'manifest.json',
  // Add any other assets like icons or images here
  // e.g., 'icons/icon-192x192.png'
];

// --- 2. INSTALL THE SERVICE WORKER ---
// This runs when the new Service Worker is first installed.
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');

  // Pre-cache all the essential files.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  // This is the magic line! It forces the waiting Service Worker to become the active one.
  self.skipWaiting();
});


// --- 3. ACTIVATE THE SERVICE WORKER ---
// This runs after the new Service Worker is installed and the old one is gone.
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  
  // Clean up old caches that are no longer needed.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  // This is the other magic line! It ensures the new SW takes control of all open pages.
  self.clients.claim();
});


// --- 4. FETCH/INTERCEPT NETWORK REQUESTS ---
// This runs every time the app requests a file (e.g., a script, a stylesheet).
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  
  // We only want to cache GET requests.
  if (evt.request.method !== 'GET') {
      return;
  }

  // Strategy: Cache first, then network.
  // This is ideal for an app shell model. It serves the cached version immediately for speed
  // and offline access, then checks the network for updates in the background.
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
          return cache.match(evt.request)
              .then((response) => {
                  return response || fetch(evt.request).then((response) => {
                      // If we get a valid response from the network, cache it for next time.
                      if(response.status === 200) {
                        cache.put(evt.request, response.clone());
                      }
                      return response;
                  });
              });
      })
  );
});

