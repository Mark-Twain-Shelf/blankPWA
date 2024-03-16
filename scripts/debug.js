const debugVersion = "0.0.1-sh2";
const debugViewId = "debugView";
const debugView = document.getElementById(debugViewId);

export const logLevel = {
  log: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
}
const logClasses = ['log', 'debug', 'info', 'warning', 'error'];
const logOutters = [console.log, console.debug, console.info, console.warn, console.error];
const minLogLevel = logLevel.log;
const viewLevel = logLevel.log;
const maxLogLevel = logLevel.error;

export function debugMsg(msg, lvl = logLevel.log) {
  if (!(minLogLevel <= lvl && lvl <= maxLogLevel)) {
    lvl = logLevel.log;
  }
  if (debugView && lvl >= viewLevel) {
    debugView.innerHTML += `<div class=${logClasses[lvl]}>${msg}</div>\n`;
  }
  logOutters[lvl](msg);
}

window.addEventListener("DOMContentLoaded", async () => {
  if (!debugView) {
    console.warn(`${debugViewId} not found`);
  } else {
    debugMsg(`Version: ${debugVersion}`, logLevel.info);
  }
  const settingsButtonId = "settingsButton";
  const settingsButton = document.getElementById(settingsButtonId);
  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      if (debugView) {
        if (debugView.style.display === 'block') {
          debugMsg(`toggleDebugView - hide`);
          debugView.style.display = 'none';
        } else {
          debugMsg(`toggleDebugView - show`);
          debugView.style.display = 'block';
        }
      }        
    });
  }
});
