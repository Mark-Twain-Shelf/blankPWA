// ServicWorker registration scope
// https://stackoverflow.com/questions/35358038/how-to-register-a-service-workers-scope-one-directory-above-where-the-service-w
// https://stackoverflow.com/questions/49084718/how-exactly-add-service-worker-allowed-to-register-service-worker-scope-in-upp/49098917/

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("load", (event) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      const parsedUrl = new URL(window.location);
      const title = parsedUrl.searchParams.get('title');
      const text = parsedUrl.searchParams.get('text');
      const url = parsedUrl.searchParams.get('url');
      debugMsg(`ServiceWorker registration successful with scope: ${registration.scope} with params: title=${title} text=${text} url=${url}`, logLevel.debug);
    }, function(err) {
      debugMsg(`ServiceWorker registration failed: ${err}`, logLevel.error);
    });
  }
});
