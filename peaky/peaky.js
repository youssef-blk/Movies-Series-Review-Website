// const fullText = "The streets run on power and silence. Peaky Blinders follows a gang that moves in the shadows—calm, calculated, and always one step ahead.";
// const typingElement = document.getElementById("typing-text");
// const textWrapper = document.getElementById("text-wrapper");
// const nav = document.getElementById("nav-id");

// let index = 0;
// let isSkipped = false;
// let typingTimeout;

// function typeEffect() {
//   if (isSkipped) return;

//   if (index < fullText.length) {
//     typingElement.textContent += fullText.charAt(index);
//     index++;
//     typingTimeout = setTimeout(typeEffect, 50);
//   } else {
//     finishAnimation();
//   }
// }

// function skipTyping() {
//   if (isSkipped || index >= fullText.length) return;
//   isSkipped = true;
//   clearTimeout(typingTimeout);
//   finishAnimation();
// }

// function finishAnimation() {
//   textWrapper.classList.add("fade-text");

//   setTimeout(() => {
//     textWrapper.style.display = "none";

//     nav.classList.add("visible");

//     document.body.style.overflow = "auto";
//   }, 600);
// }

// window.onload = typeEffect;



