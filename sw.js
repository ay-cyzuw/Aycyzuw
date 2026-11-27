var CACHE_NAME = 'aycyzuw-v36';
var ASSETS = [
  './',
  './index.html',
  './style.css?v=35',
  './app.js?v=35',
  './baza.js?v=35',
  './js/xlsx.full.min.js',
  './manifest.json'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (c) {
      return c.addAll(ASSETS).catch(function () {});
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || e.request.url.indexOf('send.php') > -1 || e.request.url.indexOf('baza_live.json') > -1) {
    return;
  }
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.status === 200 && res.type === 'basic') {
        var resClone = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(e.request, resClone); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request);
    })
  );
});
