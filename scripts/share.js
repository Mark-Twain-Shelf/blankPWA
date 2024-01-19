window.addEventListener("DOMContentLoaded", async () => {
    const contentBoxId = "mainEditor";
    const shareButtonId = "shareButton";
    const titleStr = "blankPWA Content";
    const urlStr = "https://mark-twain-shelf.github.io/blankPWA/";
    
    const contentBox = document.getElementById(contentBoxId);
    if (!contentBox) {
        console.error(`${contentBoxId} not found`);
        return;
    }
    const shareButton = document.getElementById(shareButtonId);
    if (!shareButton) {
        console.error(`${shareButtonId} not found`);
        return;
    }
    if (!('share' in navigator)) {
        console.log(`navigator.share not supported`);
        return;
    }

    shareButton.removeAttribute('disabled');
    shareButton.addEventListener('click', (e) => {
        console.log(`navigator.share initiated`);
        e.preventDefault();
        const shareOpts = {
            title: titleStr,
            text: contentBox.innerText,
            url: urlStr
        };
        navigator.share(shareOpts).then((e) => {
            console.debug(`navigator.share succeeded`);
        }).catch((err) => {
            console.error(`navigator.share failed with error: ${err}`);
        });
    });
});
