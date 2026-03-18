

const fullText =
  "Tonight’s the night. The air feels heavier, like the world itself is holding its breath. By day, he’s just another forensic technician—quiet, precise, invisible in a room full of noise. He studies blood spatter, traces evidence, and helps uncover the truth behind the worst crimes… all while hiding a truth of his own.";
const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const logoReveal = document.getElementById("logo-reveal");
const nav = document.getElementById("nav-id");

let index = 0;
let isSkipped = false;
let typingTimeout;

function typeEffect() {
  if (isSkipped) return;

  if (index < fullText.length) {
    typingElement.textContent += fullText.charAt(index);
    index++;
    typingTimeout = setTimeout(typeEffect, 40);
  } else {
    finishAnimation();
  }
}

function skipTyping() {
  if (isSkipped || index >= fullText.length) return;
  isSkipped = true;
  clearTimeout(typingTimeout);
  finishAnimation();
}

function finishAnimation() {
  textWrapper.classList.add("fade-text");

  setTimeout(() => {
    textWrapper.style.display = "none";

    logoReveal.classList.add("visible");
    nav.classList.add("visible");

    document.getElementById("after-hero").classList.add("show");

    document.body.style.overflow = "auto";
  }, 600);
}

window.onload = typeEffect;

