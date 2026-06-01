const DELAY = 700;

async function coroutine(delay) {
    await new Promise(r => setTimeout(r, delay));
}

window.onload = async () => {
    await coroutine(DELAY);
    document.getElementById("hero-text-where").classList.add('show');
    await coroutine(DELAY);
    document.getElementById("hero-text-ai").classList.add('show');
    await coroutine(DELAY);
    document.getElementById("hero-text-meets").classList.add('show');
    await coroutine(DELAY);
    document.getElementById("hero-text-consulting").classList.add('show');
    await coroutine(DELAY);
    document.getElementById("hero-text-paragraph").classList.add('show');

};

// Selects all elements that have the class = fade in from the webpage
const elements = document.getElementById("main-meet-team-div").querySelectorAll('.hidden-transition');

const observer = new IntersectionObserver(entires => {
    entires.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});


elements.forEach(el => {
  observer.observe(el);
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add('show');
  }
});
