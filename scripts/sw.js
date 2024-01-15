'use strict';

importScripts('sw-toolbox.js');

const pathPrefix = "/bankPWA";
toolbox.precache([`${pathPrefix}/index.html`, `${pathPrefix}/manifest.json`, `${pathPrefix}/browserconfig.xml`, `${pathPrefix}/icons/pwa.svg`]);

toolbox.router.get(`${pathPrefix}/icons/*`, toolbox.cacheFirst);
toolbox.router.get(`${pathPrefix}/screenshots/*`, toolbox.cacheFirst);
toolbox.router.get(`${pathPrefix}/scripts/*`, toolbox.cacheFirst);
toolbox.router.get(`${pathPrefix}/css/*`, toolbox.cacheFirst);

toolbox.router.get(`${pathPrefix}/*`, toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
