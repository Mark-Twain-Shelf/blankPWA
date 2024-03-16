'use strict';

importScripts('scripts/sw-toolbox.js');

toolbox.precache(["index.html", "manifest.webmanifest", "browserconfig.xml", "icons/pwa.svg"]);

toolbox.router.get("icons/*", toolbox.cacheFirst);
toolbox.router.get("screenshots/*", toolbox.cacheFirst);
toolbox.router.get("scripts/*", toolbox.cacheFirst);
toolbox.router.get("css/*", toolbox.cacheFirst);

toolbox.router.get("./*", toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});

addEventListener('install', event => {
  skipWaiting();
});

addEventListener('activate', event => {
  clients.claim();
});

addEventListener('fetch', event => {
  //var pagePart = event.request.url.split("/").pop();
  if (event.request.method !== 'POST' || !event.request.url.includes('share.html')) {
    return;
  }

  event.respondWith(Response.redirect('https://mark-twain-shelf.github.io/blankPWA/index.html?title=accept%20shared'));
  event.waitUntil(async function() {
    const data = await event.request.formData();
    const client = await self.clients.get(event.resultingClientId || event.clientId);

    const file = data.get('plainText');
    client.postMessage({ file, action: 'accept-shared' });
  }());
});
