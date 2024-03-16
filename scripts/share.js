// https://web.dev/articles/web-share
// https://web.dev/articles/workbox-share-targets
// https://developer.chrome.com/docs/capabilities/web-apis/web-share-target
// https://glitch.com/~web-share
// https://developer.mozilla.org/en-US/docs/Web/Manifest/share_target
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Share_data_between_apps
// https://w3c.github.io/web-share-target/
// https://github.com/w3c/web-share-target/tree/main
// https://github.com/GoogleChrome/samples/tree/gh-pages/web-share
// https://github.com/codewithsundeep/web-share-target-test/tree/main
// https://justmarkup.com/articles/2020-02-11-share-images-to-your-website
// https://github.com/justmarkup/demos/tree/gh-pages/web-share-target-image-to-grayscale

import { debugMsg, logLevel } from './debug.js';

function getInputFromUrl() {
  const parsedUrl = new URL(window.location);
  const title = parsedUrl.searchParams.get('title');
  const text = parsedUrl.searchParams.get('text');
  const url = parsedUrl.searchParams.get('url');
  debugMsg(`Url: ${window.location.href} with shared params: title=${title} text=${text} url=${url}`, logLevel.debug);
  var str = "";
  if (title) {
    str = `<b>${title}</b><br/>`;
  }
  if (text) {
    str += `${text}<br/>`;
  }
  if (url) {
    str += `from: <a href="${url}">${url}</a><br/>`;
  }
  return str !== "" ? str : null;
}

window.addEventListener("DOMContentLoaded", async () => {
  const contentBoxId = "mainEditor";
  const shareButtonId = "shareButton";
  const titleStr = "blankPWA Content";
  const urlStr = "https://mark-twain-shelf.github.io/blankPWA/";

  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
    debugMsg(`${contentBoxId} not found`, logLevel.error);
    return;
  }
  const str = getInputFromUrl();
  if (str) {
    contentBox.innerHTML = str;
  }

  const shareButton = document.getElementById(shareButtonId);
  if (!shareButton) {
    debugMsg(`${shareButtonId} not found`, logLevel.error);
    return;
  }
  if (!('share' in navigator)) {
    debugMsg(`navigator.share not supported`, logLevel.warn);
    return;
  }

  shareButton.removeAttribute('disabled');
  shareButton.addEventListener('click', (e) => {
    debugMsg(`navigator.share initiated`);
    e.preventDefault();
    const shareOpts = {
      title: titleStr,
      text: contentBox.textContent,
      url: urlStr
    };
    navigator.share(shareOpts).then((e) => {
      debugMsg(`navigator.share succeeded`, logLevel.debug);
    }).catch((err) => {
      debugMsg(`navigator.share failed with error: ${err}`, logLevel.error);
    });
  });

  if (navigator.serviceWorker) {
    navigator.serviceWorker.onmessage = function(event) {
      if (event.data.action === 'accept-shared') {
        const sharedFile = event.data.file;
        debugMsg(`navigator accept-shared ${sharedFile.name}`, logLevel.debug);
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
          contentBox.innerText = e.target.result;
        });
        reader.readAsBinaryString(sharedFile);
      }
    };
  }
});
