const staticCache = 'static-v1';

const dynamicCache = 'dynamic-v1';

const appShell = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.min.js',
  '/pages/offline.html'
]


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache)
      .then(cache => cache.addAll(appShell))
  )
})


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys(keyArr => {
      keyArr
        .filter(keys => keys !== staticCache && keys !== dynamicAssets)
        .map(oldKey => caches.delete(oldKey))
    })
  )
})


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .then(fetchResponse => caches.open(dynamicCache)
        .then(cache => {
          cache.put(event.request.url, fetchResponse.clone())
          return fetchResponse
        }
      )
    ).catch(() => caches.match('/pages/offline.html'))
  )
})


caches.keys().then(keys => keys.map(key => caches.delete(key)))