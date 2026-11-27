var CACHE_NAME = 'aycyzuw-v32';
var ASSETS = ['./', './index.html', './style.css?v=32', './app.js?v=32', './manifest.json'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function (c) { return c.addAll(ASSETS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
  }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || e.request.url.indexOf('send.php') > -1 || e.request.url.indexOf('baza_live.json') > -1) return;
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});
