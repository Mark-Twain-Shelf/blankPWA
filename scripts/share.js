import { debugMsg, logLevel } from './debug.js';

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
});
