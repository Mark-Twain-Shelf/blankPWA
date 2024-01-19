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

self.addEventListener("fetch", /*async*/ (event) => {
    alert(`fetch event: ${event.request.method}`);
    const contentBoxId = "mainEditor";
    const contentBox = document.getElementById(contentBoxId);
    if (!contentBox) {
        console.error(`${contentBoxId} not found`);
    }
    if (contentBox && event.request.method !== 'POST') {
        event.respondWith((async () => {
            const formData = await event.request.formData();
            const title = formData.get('title') || formData.get('name') || '';
            const desc = formData.get('text') || formData.get('description') || '';
            const link = formData.get('url') || formData.get('link') || '';
            contentBox.innerHTML = `<b><a href="${link}">${title}</a></b><br/>${desc}<br/>`;
            //const responseUrl = await saveBookmark(link);
            alert(`redirecting to ${link}`);
            return Response.redirect(link, 303);
        })());
    } else {
        event.respondWith(fetch(event.request));
    }
});
  