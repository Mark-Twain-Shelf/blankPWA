// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("DOMContentLoaded", async () => {
  const contentBoxId = "mainEditor";
  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
    debugMsg(`${contentBoxId} not found`, logLevel.error);
    return;
  }
  contentBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });
  contentBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data) {
      debugMsg(`Text dropped: ${data}`, logLevel.debug);
      contentBox.innerText = data;
      return;
    }
    if (e.dataTransfer.files.length === 0 || e.dataTransfer.files[0].type !== "text/plain") {
      debugMsg(`No text file dropped`, logLevel.debug);
      return;
    }
    const file = e.dataTransfer.files[0];
    debugMsg(`File dropped: ${file.name}`, logLevel.debug);
    const reader = new FileReader();
    reader.onload = function(e) {
      contentBox.innerText = e.target.result;
    };
    reader.readAsText(file);
  });
});
