// Fades/slides in the section headers and card grids as they scroll
// into view. Applied only to whole containers (never individual
// cards), toggled once via .reveal-visible and then left alone.
window.addEventListener("DOMContentLoaded", () => {

    const targets = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // IntersectionObserver fires an initial callback for anything already
    // in view as soon as it's observed, so elements above the fold reveal
    // immediately without needing a separate visibility check.
    targets.forEach((el) => observer.observe(el));

});
