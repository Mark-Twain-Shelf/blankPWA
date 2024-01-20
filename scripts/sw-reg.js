import { debugMsg, logLevel } from './debug.js';

window.addEventListener("load", (event) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      debugMsg(`ServiceWorker registration successful with scope: ${registration.scope}`, logLevel.debug);
    }, function(err) {
      debugMsg(`ServiceWorker registration failed: ${err}`, logLevel.error);
    });
  }
});
