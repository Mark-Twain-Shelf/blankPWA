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

self.addEventListener('fetch', function(event) {
  url = event.request.url;
  method = event.request.method;
  alert(`Handling fetch event ${method} for ${url}`);
});
