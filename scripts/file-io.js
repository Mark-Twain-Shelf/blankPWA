// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
// https://web.dev/articles/read-files
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
// https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/offline#file-system-access
// https://stackoverflow.com/a/45815534
// https://stackoverflow.com/a/72012915

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("DOMContentLoaded", async () => {
  const contentBoxId = "mainEditor";
  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
    debugMsg(`${contentBoxId} not found`, logLevel.error);
    return;
  }
  const openButtonId = "openButton";
  const openButton = document.getElementById(openButtonId);
  if (!openButton) {
    debugMsg(`${openButtonId} not found`, logLevel.error);
    return;
  }
  openButton.addEventListener('change', (e) => {
    debugMsg(`File openning initiated`);
    if (e.target.files && e.target.files[0]) {
      var selectedFile = e.target.files[0];
      debugMsg(`File selected: ${selectedFile.name}`, logLevel.debug);
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        contentBox.innerText = e.target.result;
      });
      reader.readAsBinaryString(selectedFile);
    } else {
      debugMsg(`No file selected`, logLevel.debug);
    }
  });
  const downloadButtonId = "downloadButton";
  const downloadButton = document.getElementById(downloadButtonId);
  if (!downloadButton) {
    debugMsg(`${downloadButtonId} not found`, logLevel.error);
    return;
  }
  downloadButton.addEventListener('click', (e) => {
    debugMsg(`File download initiated`);
    const content = contentBox.innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'blankPWA.txt');
    link.click();
  });
});
