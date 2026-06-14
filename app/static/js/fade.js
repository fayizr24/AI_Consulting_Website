const DELAY = 700;
const MAX_HIGHLIGHT = 4;
const MIN_HIGHLIGHT = 0;

let current_main = 2;


//TODO: Remove the animation and make it transitions.
//      Use CSS variables to shift each frame by the offset + their width

async function coroutine(delay) {
    await new Promise(r => setTimeout(r, delay));
}

function get_id(num) {
    const text = "highlight-";
    return text.concat("", num.toString()); 
}

function transition_left() {

    current_main -= 1;

    // document.getElementById(get_id(current_main - 1)).classList.remove("outer-left-frame");
    document.getElementById(get_id(current_main - 1)).classList.add("shfit-right");
    document.getElementById(get_id(current_main - 1)).addEventListener("click", transition_left);

    document.getElementById(get_id(current_main)).removeEventListener("click", transition_left);
    document.getElementById(get_id(current_main)).classList.remove("left-frame");
    if (document.getElementById(get_id(current_main)).classList.contains("left-start")) {
        document.getElementById(get_id(current_main)).classList.remove("left-start");
    }
    document.getElementById(get_id(current_main)).classList.add("main-frame");

    document.getElementById(get_id(current_main + 1)).classList.remove("main-frame");
    document.getElementById(get_id(current_main + 1)).classList.add("right-frame");
    document.getElementById(get_id(current_main + 1)).addEventListener("click", transition_right);

    document.getElementById(get_id(current_main + 2)).removeEventListener("click", transition_right);
    document.getElementById(get_id(current_main + 2)).classList.remove("right-frame");
    if (document.getElementById(get_id(current_main)).classList.contains("right-start")) {
        document.getElementById(get_id(current_main)).classList.remove("right-start");
    }
    document.getElementById(get_id(current_main + 2)).classList.add("out-right-frame");

}

function transition_right() {

    current_main += 1;

    document.getElementById(get_id(current_main + 1)).classList.add("shift_left");
    document.getElementById(get_id(current_main + 1)).addEventListener("click", transition_right);

    document.getElementById(get_id(current_main)).removeEventListener("click", transition_right);
    document.getElementById(get_id(current_main)).classList.remove("shift_left");
    if (document.getElementById(get_id(current_main)).classList.contains("right_start")) {
        document.getElementById(get_id(current_main)).classList.remove("right_start");
    }
    document.getElementById(get_id(current_main)).classList.add("main-frame");

    document.getElementById(get_id(current_main - 1)).classList.remove("main-frame");
    document.getElementById(get_id(current_main - 1)).classList.add("shift_left");
    document.getElementById(get_id(current_main - 1)).addEventListener("click", transition_left);

    document.getElementById(get_id(current_main - 2)).removeEventListener("click", transition_left);
    document.getElementById(get_id(current_main - 2)).classList.remove("left-frame");
    if (document.getElementById(get_id(current_main)).classList.contains("left-start")) {
        document.getElementById(get_id(current_main)).classList.remove("left-start");
    }
    document.getElementById(get_id(current_main - 2)).classList.add("out-left-frame");

    console.log("Check point");

}

window.onload = async () => {

    document.querySelector(".left-start").addEventListener("click", transition_left);

    document.querySelector(".right-start").addEventListener("click", transition_right);
    
    for (let i = MIN_HIGHLIGHT; i < MAX_HIGHLIGHT + 1; i++) {
        const div = document.getElementById(get_id(i));
        div.addEventListener("animationend", () => {
            if (div.classList.contains("shift-left")) {
                div.classList.remove("shift-left");
            }

            if (div.classList.contains("shift-right")) {
                div.classList.remove("shift-right");
            }
        });
    }

    await coroutine(DELAY);
    document.getElementById("welcome-header").classList.add('show');
    await coroutine(DELAY);
    document.getElementById("pioneers-header").classList.add('show');


};

// Selects all elements that have the class = fade in from the webpage
const elements = document.getElementById("main-meet-team-div").querySelectorAll('.hidden-transition');

const observer = new IntersectionObserver(entires => {
    entires.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-transition');
        }
    });
});


elements.forEach(el => {
  observer.observe(el);
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add('show');
  }
});
