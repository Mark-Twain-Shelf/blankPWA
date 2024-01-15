window.addEventListener("load", (event) => {
    if ('serviceWorker' in navigator) {
        const pathPrefix = "/bankPWA";
        navigator.serviceWorker.register(`${pathPrefix}/scripts/sw.js`).then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});
