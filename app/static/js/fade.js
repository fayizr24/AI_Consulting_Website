

window.onload = async () => {

    // New operations

    const jiya_div = document.getElementById("team-div-jiya");
    const jiya_hover_panel = document.getElementById("info-panel-jiya");
    const jiya_hover_div = document.getElementById("info-div-jiya");
    jiya_hover_panel.addEventListener("mouseenter", () => {
        jiya_hover_div.classList.remove("hide-transition");
        jiya_hover_div.classList.add("show-transition");
    })

    jiya_div.addEventListener("mouseleave", () => {
        jiya_hover_div.classList.remove("show-transition");
        jiya_hover_div.classList.add("hide-transition");
    })

};


