self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('securguinee-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/login',
        '/dashboard',
        '/logoS.png',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
}); 