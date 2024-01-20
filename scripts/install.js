// https://glitch.com/edit/#!/mlearn-pwa-web-app-install-prompt?path=app.js%3A1%3A0

import { debugMsg, logLevel } from './debug.js';

const installPromptId = "installPrompt";
const installPromptDelay = 10000;
const installButtonId = "installButton";
const cancelButtonId = "cancelButton";
let deferredInstall = null;

function showInstallPrompt() {
  debugMsg(`showInstallPrompt`);
  if (deferredInstall) {  
    const installPrompt = document.getElementById(installPromptId);
    if (installPrompt) {
      installPrompt.style.display = 'flex';
    }
  } else {
    debugMsg(`showInstallPrompt - no deferredInstall`, logLevel.warn);
  }
}

function hideInstallPrompt() {
  debugMsg(`hideInstallPrompt`);
  deferredInstall = null;
  const installPrompt = document.getElementById(installPromptId);
  if (installPrompt) {
    installPrompt.style.display = 'none';
  }
}

function installApp() {
  debugMsg(`installApp`);
  if (deferredInstall) {
    const result = deferredInstall.prompt();
    result.then((choice) => {
      debugMsg(`installApp - user choice was ${choice.outcome}`, logLevel.debug);
    });
  } else {
    debugMsg(`installApp - no deferredInstall`, logLevel.warn);
  }
  hideInstallPrompt();
}

window.addEventListener('beforeinstallprompt', (event) => {
  debugMsg(`On beforeinstallprompt event`, logLevel.info);
  event.preventDefault();
  deferredInstall = event;
});

window.addEventListener('appinstalled', () => {
  debugMsg(`On appinstalled event`);
  hideInstallPrompt();
});

window.addEventListener("DOMContentLoaded", async () => {
  const installButton = document.getElementById(installButtonId);
  const cancelButton = document.getElementById(cancelButtonId);
  if (installButton && cancelButton) {
    installButton.addEventListener('click', installApp);
    cancelButton.addEventListener('click', hideInstallPrompt);
  }
  setTimeout(() => {
    showInstallPrompt();
  }, installPromptDelay);  
});
