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

    initHeadingTypeIn();

});

// Types out each "The Founders" / "The Directors" / "Our Advisors" section
// heading letter by letter as it scrolls into view — same effect as the
// homepage hero, but with no cursor left behind once it finishes.
function initHeadingTypeIn() {

    const headings = document.querySelectorAll(".team-heading");

    headings.forEach((heading) => {
        const parts = Array.from(heading.querySelectorAll(".type-part"));
        const texts = parts.map((part) => part.textContent);
        parts.forEach((part) => { part.textContent = ""; });

        heading.__typeParts = parts;
        heading.__typeTexts = texts;
    });

    // Observe each heading's section-header wrapper rather than the
    // heading itself — before typing starts the heading is empty and
    // has zero height, which an IntersectionObserver never treats as
    // "in view" no matter how far the page scrolls.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                const heading = entry.target.__heading;
                typeHeading(heading.__typeParts, heading.__typeTexts);
            }
        });
    }, { threshold: 0.15 });

    headings.forEach((heading) => {
        const wrapper = heading.closest(".team-section-header") || heading;
        wrapper.__heading = heading;
        observer.observe(wrapper);
    });
}

function typeHeading(parts, texts) {
    const TYPE_SPEED = 55;

    function typeNext(partIndex, charIndex) {
        if (partIndex >= parts.length) return;

        const text = texts[partIndex];

        if (charIndex < text.length) {
            parts[partIndex].textContent += text[charIndex];
            setTimeout(() => typeNext(partIndex, charIndex + 1), TYPE_SPEED);
        } else {
            typeNext(partIndex + 1, 0);
        }
    }

    typeNext(0, 0);
}
