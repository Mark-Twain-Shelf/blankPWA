'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(['/bankPWA/index.html', '/bankPWA/manifest.json', '/bankPWA/browserconfig.xml', '/bankPWA/icons/pwa.svg']);

toolbox.router.get('/bankPWA/icons/*', toolbox.cacheFirst);
toolbox.router.get('/bankPWA/screenshots/*', toolbox.cacheFirst);
toolbox.router.get('/bankPWA/scripts/*', toolbox.cacheFirst);
toolbox.router.get('/bankPWA/css/*', toolbox.cacheFirst);

toolbox.router.get('/bankPWA/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
