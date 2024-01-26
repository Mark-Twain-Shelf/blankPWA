// https://developer.mozilla.org/en-US/docs/Web/API/notification

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("DOMContentLoaded", async () => {
  const notifyDelay = 3000;
  const notifyButtonId = "notifyButton";
  const notifyButton = document.getElementById(notifyButtonId);
  if (!notifyButton) {
    debugMsg(`${notifyButtonId} not found`, logLevel.error);
    return;
  }
  const contentBoxId = "mainEditor";
  const contentBox = document.getElementById(contentBoxId);
  if (!contentBox) {
    debugMsg(`${contentBox} not found`, logLevel.error);
    return;
  }
  if (('Notification' in window) && Notification.permission !== 'denied') {
    notifyButton.removeAttribute('disabled');
  }
  notifyButton.addEventListener('click', (e) => {
    debugMsg(`Notification.requestPermission initiated`);
    if (!('Notification' in window)) {
      debugMsg(`Notification not supported`, logLevel.warn);
      return;
    }
    const notify = () => {
      const text = contentBox.innerText;
      const img = 'icons/favicon-96x96.png';
      const notification = new Notification('blankPWA', { body: text, icon: img }); 
    }
    if (Notification.permission === 'granted') {
      setTimeout(notify, notifyDelay); 
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        debugMsg(`Notification.requestPermission succeeded with ${permission}`, logLevel.debug);
        if (permission === 'granted') {
          setTimeout(notify, notifyDelay); 
        }
      });
    } else {
      debugMsg(`Notification.permission denied`, logLevel.warn);
    }
  });
});
