self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/home')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached home page if available
          if (cachedResponse) return cachedResponse;
          
          // Otherwise fetch from network
          return fetch(event.request)
            .then(response => {
              // Cache home page for offline use
              const responseClone = response.clone();
              caches.open('home-cache')
                .then(cache => cache.put(event.request, responseClone));
              return response;
            })
            .catch(() => {
              // Show custom offline page if fetch fails
              return caches.match('/offline.html');
            });
        })
    );
  }
});

// Precache important routes
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache')
      .then(cache => cache.addAll([
        '/',
        '/login',
        '/home',
        '/manifest.json',
        // Add other critical assets
      ]))
  );
});