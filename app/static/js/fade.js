

window.onload = async () => {

    document.querySelectorAll(".person-card").forEach((card) => {
        const hover_panel = card.querySelector(".profile-info-bar");
        const hover_div = card.querySelector(".profile-info-div");

        if (!hover_panel || !hover_div) return;

        hover_panel.addEventListener("mouseenter", () => {
            hover_div.classList.remove("hide-transition");
            hover_div.classList.add("show-transition");
        })

        card.addEventListener("mouseleave", () => {
            hover_div.classList.remove("show-transition");
            hover_div.classList.add("hide-transition");
        })
    });

};

