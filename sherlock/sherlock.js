const fullText =
  "London is a maze of secrets. While others see accidents, Sherlock Holmes sees patterns, motives, and the single detail that changes everything.";

const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const logoReveal = document.getElementById("logo-reveal");
const nav = document.getElementById("nav-id");
const ratingBox = document.getElementById("rating-id");
const videoBottom = document.getElementById("video-bottom-id");
const afterHero = document.getElementById("after-hero");

let typingIndex = 0;
let isSkipped = false;
let hasFinished = false;
let typingTimeoutId;

function typeEffect() {
  if (!typingElement || isSkipped || hasFinished) return;

  if (typingIndex < fullText.length) {
    typingElement.textContent += fullText.charAt(typingIndex);
    typingIndex += 1;
    typingTimeoutId = setTimeout(typeEffect, 45);
    return;
  }

  finishAnimation();
}

function finishAnimation() {
  if (hasFinished) return;
  hasFinished = true;

  if (!textWrapper) return;

  textWrapper.classList.add("fade-text");
  setTimeout(() => {
    textWrapper.style.display = "none";
    document.body.classList.remove("intro-active");

    nav?.classList.add("visible");
    logoReveal?.classList.add("visible");
    ratingBox?.classList.add("show");
    videoBottom?.classList.add("show");
    afterHero?.classList.add("show");

    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
  }, 600);
}

function skipTyping() {
  if (!typingElement || hasFinished) return;
  isSkipped = true;
  clearTimeout(typingTimeoutId);
  typingElement.textContent = fullText;
  finishAnimation();
}

window.skipTyping = skipTyping;

function initVideoModal() {
  const modal = document.getElementById("videoModal");
  const fullVid = document.getElementById("fullVideo");
  const heroVid = document.getElementById("myHeroVideo");
  const videoBox = document.getElementById("videoBox");
  if (!modal || !videoBox) return;

  function closeFullVideo() {
    modal.style.display = "none";
    if (fullVid) fullVid.pause();
    if (heroVid) heroVid.play().catch(() => {});
  }

  videoBox.addEventListener("click", (event) => {
    event.stopPropagation();
    modal.style.display = "flex";
    if (fullVid) {
      fullVid.currentTime = 0;
      fullVid.play().catch(() => {});
    }
    if (heroVid) heroVid.pause();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeFullVideo();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") {
      closeFullVideo();
    }
  });
}

function initComingSlider() {
  const track = document.querySelector(".coming-track");
  const windowEl = document.querySelector(".coming-window");
  const nextBtn = document.querySelector(".coming-next");
  const prevBtn = document.querySelector(".coming-prev");
  const dotsWrap = document.getElementById("sherlockSoonDots");
  if (!track || !windowEl || !nextBtn || !prevBtn || !dotsWrap) return;

  const cards = Array.from(track.querySelectorAll(".coming-card"));
  if (!cards.length) return;

  let sliderIndex = 0;
  let sliderMaxIndex = 0;
  let autoplayId;
  let resizeTimerId;

  function getGap() {
    return (
      parseFloat(getComputedStyle(track).columnGap) ||
      parseFloat(getComputedStyle(track).gap) ||
      0
    );
  }

  function getVisibleCardsCount() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
  }

  function getStep() {
    const firstCard = cards[0];
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + getGap();
  }

  function updateTrack() {
    const step = getStep();
    if (!step) return;
    track.style.transform = `translateX(-${sliderIndex * step}px)`;
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll(".coming-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === sliderIndex);
    });
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= sliderMaxIndex; i += 1) {
      const dot = document.createElement("button");
      dot.className = "coming-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to Sherlock slide ${i + 1}`);
      dot.addEventListener("click", () => {
        sliderIndex = i;
        updateTrack();
        updateDots();
        startAutoplay();
      });
      dotsWrap.appendChild(dot);
    }
    updateDots();
  }

  function goNext() {
    if (sliderMaxIndex <= 0) return;
    sliderIndex = sliderIndex >= sliderMaxIndex ? 0 : sliderIndex + 1;
    updateTrack();
    updateDots();
  }

  function goPrev() {
    if (sliderMaxIndex <= 0) return;
    sliderIndex = sliderIndex <= 0 ? sliderMaxIndex : sliderIndex - 1;
    updateTrack();
    updateDots();
  }

  function startAutoplay() {
    clearInterval(autoplayId);
    autoplayId = setInterval(goNext, 3400);
  }

  function updateButtonsState() {
    const isStatic = sliderMaxIndex === 0;
    nextBtn.disabled = isStatic;
    prevBtn.disabled = isStatic;
  }

  function rebuildSlider() {
    const visibleCards = Math.min(getVisibleCardsCount(), cards.length);
    sliderMaxIndex = Math.max(0, cards.length - visibleCards);
    sliderIndex = Math.min(sliderIndex, sliderMaxIndex);
    updateButtonsState();
    buildDots();
    updateTrack();
    startAutoplay();
  }

  nextBtn.addEventListener("click", () => {
    goNext();
    startAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    goPrev();
    startAutoplay();
  });

  windowEl.addEventListener("mouseenter", () => clearInterval(autoplayId));
  windowEl.addEventListener("mouseleave", startAutoplay);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimerId);
    resizeTimerId = setTimeout(rebuildSlider, 140);
  });

  rebuildSlider();
}

window.addEventListener("load", () => {
  initVideoModal();
  initComingSlider();

  if (typingElement && textWrapper) {
    document.body.classList.add("intro-active");
    document.body.style.overflow = "hidden";
    typeEffect();
    return;
  }

  document.body.classList.remove("intro-active");
  nav?.classList.add("visible");
  document.body.style.overflow = "auto";
});
