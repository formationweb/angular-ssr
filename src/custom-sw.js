importScripts('./ngsw-worker.js')

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request));
})

self.addEventListener('notificationclick', (event) => {
    console.log('notification click', event)
})