// Share button on each Nish Notes entry: use the native share sheet where
// available, otherwise copy the link to the clipboard. Mirrors the share
// behaviour of the industry news list on the index page.
window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".nish-notes-share-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const url = btn.dataset.shareUrl;
            const title = btn.closest(".nish-notes-card").querySelector(".nish-notes-title").textContent.trim();

            if (navigator.share) {
                try {
                    await navigator.share({ title: title, url: url });
                    return;
                } catch (e) {
                    // user cancelled the share sheet — fall through to clipboard copy
                }
            }

            try {
                await navigator.clipboard.writeText(url);
                btn.classList.add("copied");
                setTimeout(() => btn.classList.remove("copied"), 1500);
            } catch (e) {
                // clipboard access unavailable — nothing more we can do silently
            }
        });
    });

});
