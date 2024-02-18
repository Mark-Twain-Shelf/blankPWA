// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Associate_files_with_your_PWA

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("DOMContentLoaded", async () => {
  const contentBoxId = "mainEditor";
  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
    debugMsg(`${contentBoxId} not found`, logLevel.error);
    return;
  }
  if ("launchQueue" in window) {
    window.launchQueue.setConsumer(async (launchParams) => {
      if (launchParams.files.length === 0) {
        debugMsg(`launchQueue initiated with no file selected`, logLevel.error);
        return;
      }
      debugMsg(`launchQueue initiated with file: ${launchParams.files[0].name}`);
      launchParams.files[0].getFile().then((file) => {
        let reader = new FileReader();
        reader.onload = function(e) {
          contentBox.innerHTML = e.target.result;
        };
        reader.readAsText(file);
      });
    });
  }
});
