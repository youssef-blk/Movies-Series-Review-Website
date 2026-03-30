const fullText = "The city hums like nothing’s wrong, but something underneath is already cracking. In the middle of it all, The Joker moves unseen—no grand plan, no clear motive ...";
const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const logoReveal = document.getElementById("logo-reveal");
const nav = document.getElementById("nav-id");
const ratingBox = document.getElementById("rating-id");
const videoBottom = document.getElementById("video-bottom-id");
const afterHero = document.getElementById("after-hero");
const afterHero2 = document.getElementById("after-hero2");

let index = 0;
let isSkipped = false;
let typingTimeout;

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

        // HNA L-ISLAH: Rej3i l-scroll l-kollchi fach tsali l-ktiba
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto"; 
        
        // Ila bghiti t-7afdi 3la l-mchkila d l-jenb li t-sl7at:
        document.body.style.overflowX = "hidden";
        document.documentElement.style.overflowX = "hidden";
    }, 600);
}
const vBox = document.getElementById('videoBox');
const vPlayer = document.getElementById('myHeroVideo');

if(vBox && vPlayer) {
    vBox.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (vPlayer.paused) {
            vPlayer.play();
        } else {
            vPlayer.pause();
        }
    });
}

window.onload = typeEffect;