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

window.addEventListener("load", (event) => {
    const contentBoxId = "mainEditor";
    const contentBox = document.getElementById(contentBoxId);
    if (!contentBox) {
        debugMsg(`${contentBoxId} not found`, "error");
        return;
    }
    var parsedUrl = new URL(window.location.toString());
    const title = parsedUrl.searchParams.get("title");
    const text = parsedUrl.searchParams.get("text");
    const url = parsedUrl.searchParams.get("url");
    contentBox.innerHTML = `<b><a href="${url}">${title}</a></b><br/>${text}<br/>`;
});
