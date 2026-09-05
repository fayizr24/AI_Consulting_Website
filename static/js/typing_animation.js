window.addEventListener("DOMContentLoaded", () => {

    const line1 = document.getElementById("hero-line-1");
    const line2Gold = document.getElementById("hero-line-2-gold");
    const line2Rest = document.getElementById("hero-line-2-rest");

    if (!line1 || !line2Gold || !line2Rest) return;

    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";

    const sequence = [
        { el: line1, text: "Where AI meets" },
        { el: line2Gold, text: "real-world" },
        { el: line2Rest, text: " strategy..." },
    ];

    const TYPE_SPEED = 55;
    const START_DELAY = 300;

    function typeNext(seqIndex, charIndex) {
        if (seqIndex >= sequence.length) {
            cursor.classList.add("typing-cursor-blink");
            return;
        }

        const { el, text } = sequence[seqIndex];

        if (charIndex === 0) {
            el.appendChild(cursor);
        }

        if (charIndex < text.length) {
            el.insertBefore(document.createTextNode(text[charIndex]), cursor);
            setTimeout(() => typeNext(seqIndex, charIndex + 1), TYPE_SPEED);
        } else {
            typeNext(seqIndex + 1, 0);
        }
    }

    setTimeout(() => typeNext(0, 0), START_DELAY);
});
