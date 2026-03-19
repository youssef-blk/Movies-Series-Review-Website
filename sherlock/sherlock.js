const fullText =
  "The world is a puzzle most people never notice. Sherlock Holmes sees every detail, every clue—turning chaos into answers before anyone else even sees the question.";
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
    typingTimeout = setTimeout(typeEffect, 50);
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
    document.querySelector(".rating-box").classList.add("show");
  }, 600);
}

window.onload = typeEffect;

let searchBtn = document.getElementById("searchBtn");
let searchForm = document.getElementById("searchForm");

searchForm.onsubmit = function (e) {
  e.preventDefault();
};

searchBtn.addEventListener("click", function () {
  searchForm.classList.toggle("show");
  searchBtn.classList.toggle("hide");
  searchForm.firstElementChild.focus();
});

searchForm.firstElementChild.onblur = function () {
  searchForm.classList.toggle("show");
  searchBtn.classList.toggle("hide");
  searchForm.firstElementChild.value = "";
};
