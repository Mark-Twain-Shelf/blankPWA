const debugViewId = "debugView";
const debugView = document.getElementById(debugViewId);

export const logLevel = {
  log: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
}
  
export function debugMsg(msg, lvl = logLevel.log) {
  if (debugView && lvl >= logLevel.info) {
    debugView.innerHTML += msg + "<br/>";
  }
  switch (lvl) {
    case logLevel.error:
      console.error(msg);
      break;
    case logLevel.warn:
      console.warn(msg);
      break;
    case logLevel.info:
      console.info(msg);
      break;
    case logLevel.debug:
      console.debug(msg);
      break;
    case logLevel.log:
    default:
      console.log(msg);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const settingsButtonId = "settingsButton";
  const settingsButton = document.getElementById(settingsButtonId);
  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      if (debugView) {
        if (debugView.style.display === 'flex') {
          debugMsg(`toggleDebugView - hide`);
          debugView.style.display = 'none';
        } else {
          debugMsg(`toggleDebugView - show`);
          debugView.style.display = 'flex';
        }
      }        
    });
  }
});
