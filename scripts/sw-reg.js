window.addEventListener("load", (event) => {
    if ('serviceWorker' in navigator) {
        console.log('PATH: ', window.location.pathname);
        navigator.serviceWorker.register('scripts/sw.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});
