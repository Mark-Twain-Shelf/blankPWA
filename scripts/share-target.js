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
  const shareViewId = "shareView";
  const shareView = document.getElementById(shareViewId);
  if (!shareView) {
    debugMsg(`${shareViewId} not found`, logLevel.error);
    return;
  }
  const str = getInputFromUrl();
  if (str) {
    shareView.innerHTML = str;
  }
});
