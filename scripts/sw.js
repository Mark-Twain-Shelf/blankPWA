'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["../index.html", "../manifest.json", "../browserconfig.xml", "../icons/pwa.svg"]);

toolbox.router.get("../icons/*", toolbox.cacheFirst);
toolbox.router.get("../screenshots/*", toolbox.cacheFirst);
toolbox.router.get("../scripts/*", toolbox.cacheFirst);
toolbox.router.get("../css/*", toolbox.cacheFirst);

toolbox.router.get("../*", toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});

self.addEventListener("fetch", async (event) => {
  alert(`fetch event: ${event.request.method}`);
  const contentBoxId = "mainEditor";
  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
      console.error(`${contentBoxId} not found`);
  }
  if (contentBox && event.request.method !== 'POST') {
      event.respondWith((async () => {
          const formData = await event.request.formData();
          const title = formData.get('title') || formData.get('name') || '';
          const desc = formData.get('text') || formData.get('description') || '';
          const link = formData.get('url') || formData.get('link') || '';
          contentBox.innerHTML = `<b><a href="${link}">${title}</a></b><br/>${desc}<br/>`;
          //const responseUrl = await saveBookmark(link);
          alert(`redirecting to ${link}`);
          return Response.redirect(link, 303);
      })());
  } else {
      event.respondWith(fetch(event.request));
  }
});
