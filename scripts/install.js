// https://glitch.com/edit/#!/mlearn-pwa-web-app-install-prompt?path=app.js%3A1%3A0

const installPromptId = "installPrompt";
const installPromptDelay = 10000;
const installButtonId = "installButton";
const cancelButtonId = "cancelButton";
let deferredInstall = null;

function showInstallPrompt() {
  console.log(`showInstallPrompt`);
  if (deferredInstall) {  
    const installPrompt = document.getElementById(installPromptId);
    if (installPrompt) {
      installPrompt.style.display = 'flex';
    }
  } else {
    console.debug(`showInstallPrompt - no deferredInstall`);
  }
}

function hideInstallPrompt() {
  console.log(`hideInstallPrompt`);
  deferredInstall = null;
  const installPrompt = document.getElementById(installPromptId);
  if (installPrompt) {
    installPrompt.style.display = 'none';
  }
}

function installApp() {
  console.log(`installApp`);
  if (deferredInstall) {
    const result = deferredInstall.prompt();
    result.then((choice) => {
      console.debug(`installApp - user choice was ${choice.outcome}`);
    });
  } else {
    console.debug(`installApp - no deferredInstall`);
  }
  hideInstallPrompt();
}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log(`On beforeinstallprompt event`);
  event.preventDefault();
  deferredInstall = event;
});

window.addEventListener('appinstalled', () => {
  console.log(`On appinstalled event`);
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
