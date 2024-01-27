// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
// https://web.dev/articles/read-files
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
// https://stackoverflow.com/a/45815534
// https://stackoverflow.com/a/72012915

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("DOMContentLoaded", async () => {
  const openButtonId = "openButton";
  const openButton = document.getElementById(openButtonId);
  if (!openButton) {
    debugMsg(`${openButtonId} not found`, logLevel.error);
    return;
  }
  const contentBoxId = "mainEditor";
  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
    debugMsg(`${contentBoxId} not found`, logLevel.error);
    return;
  }
  openButton.addEventListener('change', (e) => {
    debugMsg(`File IO initiated`);
    if (e.target.files && e.target.files[0]) {
      var myFile = e.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        contentBox.innerText = e.target.result;
      });
      reader.readAsBinaryString(myFile);
    }
  });
});
