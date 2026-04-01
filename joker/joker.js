const fullText = "The city hums like nothing’s wrong, but something underneath is already cracking. In the middle of it all, The Joker moves unseen—no grand plan, no clear motive ...";
const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const logoReveal = document.getElementById("logo-reveal");
const nav = document.getElementById("nav-id");
const ratingBox = document.getElementById("rating-id");
const videoBottom = document.getElementById("video-bottom-id");
const afterHero = document.getElementById("after-hero");
const afterHero2 = document.getElementById("after-hero2");

const modal = document.getElementById("videoModal");
const fullVid = document.getElementById("fullVideo");
const heroVid = document.getElementById("myHeroVideo");
const vBox = document.getElementById('videoBox');

let index = 0;
let isSkipped = false;
let typingTimeout;

// SECTION 1: TYPING
function typeEffect() {
    if (isSkipped) return;
    if (index < fullText.length) {
        typingElement.textContent += fullText.charAt(index);
        index++;
        typingTimeout = setTimeout(typeEffect, 50);
    } else {
        setTimeout(finishAnimation, 1500); 
    }
}

function skipTyping() {
    if (isSkipped || index >= fullText.length) return;
    isSkipped = true;
    clearTimeout(typingTimeout);
    typingElement.textContent = fullText; 
    setTimeout(finishAnimation, 500);
}

function finishAnimation() {
    textWrapper.classList.add("fade-text");
    setTimeout(() => {
        textWrapper.style.display = "none";
        logoReveal.classList.add("visible");
        nav.classList.add("visible");
        if(ratingBox) ratingBox.classList.add("show");
        if(videoBottom) videoBottom.classList.add("show");
        if(afterHero) afterHero.classList.add("show");
        if(afterHero2) afterHero2.classList.add("show");

        document.body.style.overflow = "auto";
        document.body.style.overflowX = "hidden";
    }, 600);
}

// SECTION 2: MODAL CONTROL
if(vBox) {
    vBox.addEventListener('click', (e) => {
        e.stopPropagation(); 
        openFullVideo();
    });
}

function openFullVideo() {
    if(modal) {
        modal.style.display = "flex";
        fullVid.play();
        heroVid.pause(); 
    }
}

function closeFullVideo() {
    if(modal) {
        modal.style.display = "none";
        fullVid.pause();
        fullVid.currentTime = 0; 
        heroVid.play(); 
    }
}

// SECTION 3: WINDOW EVENTS
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeFullVideo();
    }
});

window.onload = typeEffect;