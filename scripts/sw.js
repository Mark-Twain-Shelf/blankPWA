'use strict';

importScripts('sw-toolbox.js');

const path = window.location.pathname;
console.log('SWPATH: ', path);
toolbox.precache(["../index.html", "../manifest.json", "../browserconfig.xml", "../icons/pwa.svg"]);

toolbox.router.get('../icons/*', toolbox.cacheFirst);
toolbox.router.get('../screenshots/*', toolbox.cacheFirst);
toolbox.router.get('../scripts/*', toolbox.cacheFirst);
toolbox.router.get('../css/*', toolbox.cacheFirst);

toolbox.router.get('../*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
