const WORDS_PER_MINUTE = 200;
const SAVED_ARTICLES_KEY = "pioneers_saved_articles";

function getSavedArticleIds() {
    try {
        return JSON.parse(localStorage.getItem(SAVED_ARTICLES_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function setSavedArticleIds(ids) {
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(ids));
}

window.addEventListener("DOMContentLoaded", () => {

    // Calculate and display each article's reading time from its word count
    document.querySelectorAll(".industry-news-card").forEach((card) => {
        const wordCount = parseInt(card.dataset.wordCount, 10) || 0;
        const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
        const readTimeEl = card.querySelector(".industry-news-read-time");
        if (readTimeEl) {
            readTimeEl.textContent = minutes + " min read";
        }
    });

    // Restore saved/bookmarked state from localStorage
    const savedIds = getSavedArticleIds();
    document.querySelectorAll(".industry-news-save-btn").forEach((btn) => {
        const card = btn.closest(".industry-news-card");
        const articleId = card.dataset.articleId;
        if (savedIds.includes(articleId)) {
            btn.classList.add("saved");
            btn.setAttribute("aria-pressed", "true");
        }

        btn.addEventListener("click", () => {
            const ids = getSavedArticleIds();
            const index = ids.indexOf(articleId);

            if (index === -1) {
                ids.push(articleId);
                btn.classList.add("saved");
                btn.setAttribute("aria-pressed", "true");
            } else {
                ids.splice(index, 1);
                btn.classList.remove("saved");
                btn.setAttribute("aria-pressed", "false");
            }

            setSavedArticleIds(ids);
        });
    });

    // Share button: use the native share sheet where available, otherwise
    // copy the article link to the clipboard
    document.querySelectorAll(".industry-news-share-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const url = btn.dataset.shareUrl;
            const title = btn.closest(".industry-news-card").querySelector(".industry-news-title").textContent.trim();

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
