/* ================================================================
   DEXTER PAGE SCRIPT
   ================================================================ */
const fullText =
  "Tonight's the night. Beneath Miami lights, every trace tells a story and every mistake leaves blood. By day he reads evidence, by night he becomes it.";

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
    typingTimeoutId = setTimeout(typeEffect, 50);
    return;
  }

  finishAnimation();
}

function finishAnimation() {
  if (hasFinished) return;
  hasFinished = true;

  if (textWrapper) {
    textWrapper.classList.add("fade-text");
    setTimeout(() => {
      textWrapper.style.display = "none";
      logoReveal?.classList.add("visible");
      nav?.classList.add("visible");
      ratingBox?.classList.add("show");
      videoBottom?.classList.add("show");
      afterHero?.classList.add("show");
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }, 600);
  }

  // Auto-scroll to the next section only if user did not scroll manually.
  setTimeout(() => {
    if (window.scrollY < 100) {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, 3500);
}

function skipTyping() {
  if (!typingElement || hasFinished) return;
  isSkipped = true;
  clearTimeout(typingTimeoutId);
  typingElement.textContent = fullText;
  finishAnimation();
}

window.skipTyping = skipTyping;

/* ================================================================
   SCROLL REVEAL LOGIC
   ================================================================ */
function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal-item");
  if (!revealItems.length || typeof IntersectionObserver === "undefined") {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 0.06, 0.24)}s`;
    observer.observe(item);
  });
}

/* ================================================================
   CAST CAROUSEL LOGIC
   ================================================================ */
function initCarousel() {
  const track = document.querySelector(".cast-track");
  const trackContainer = document.querySelector(".cast-track-container");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  if (!track || !trackContainer || !nextBtn || !prevBtn) return;

  let carouselIndex = 0;
  let autoplayId;
  let resizeTimerId;
  let originalCards = [];

  function getGap() {
    return (
      parseFloat(getComputedStyle(track).columnGap) ||
      parseFloat(getComputedStyle(track).gap) ||
      0
    );
  }

  function getSlideWidth() {
    const firstCard = track.querySelector(".cast-item");
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + getGap();
  }

  function getVisibleCardsCount() {
    const firstCard = track.querySelector(".cast-item");
    if (!firstCard) return 1;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = getGap();
    return Math.max(
      1,
      Math.floor((trackContainer.clientWidth + gap) / (cardWidth + gap))
    );
  }

  function removeClones() {
    track.querySelectorAll(".cast-item.clone").forEach((card) => card.remove());
  }

  function setTrackPosition(animated = true) {
    const slideWidth = getSlideWidth();
    if (!slideWidth) return;
    track.style.transition = animated ? "transform 0.45s ease" : "none";
    track.style.transform = `translateX(-${carouselIndex * slideWidth}px)`;
  }

  function goNext() {
    carouselIndex += 1;
    setTrackPosition(true);
  }

  function goPrev() {
    if (carouselIndex === 0) {
      carouselIndex = originalCards.length;
      setTrackPosition(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          carouselIndex -= 1;
          setTrackPosition(true);
        });
      });
      return;
    }

    carouselIndex -= 1;
    setTrackPosition(true);
  }

  function startAutoplay() {
    clearInterval(autoplayId);
    autoplayId = setInterval(goNext, 2600);
  }

  function rebuildTrack() {
    clearInterval(autoplayId);
    removeClones();

    originalCards = Array.from(track.querySelectorAll(".cast-item:not(.clone)"));
    if (!originalCards.length) return;

    const visibleCards = Math.min(getVisibleCardsCount(), originalCards.length);
    for (let i = 0; i < visibleCards; i += 1) {
      const clone = originalCards[i].cloneNode(true);
      clone.classList.add("clone");
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }

    carouselIndex = 0;
    setTrackPosition(false);
    startAutoplay();
  }

  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    goNext();
    startAutoplay();
  });

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    goPrev();
    startAutoplay();
  });

  track.addEventListener("transitionend", () => {
    if (carouselIndex >= originalCards.length) {
      carouselIndex = 0;
      setTrackPosition(false);
    }
  });

  trackContainer.addEventListener("mouseenter", () => clearInterval(autoplayId));
  trackContainer.addEventListener("mouseleave", startAutoplay);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimerId);
    resizeTimerId = setTimeout(rebuildTrack, 140);
  });

  rebuildTrack();
}

/* ================================================================
   COMING SOON SLIDER
   ================================================================ */
function initSoonSlider() {
  const track = document.querySelector(".soon-track");
  const windowEl = document.querySelector(".soon-track-window");
  const nextBtn = document.querySelector(".soon-next");
  const prevBtn = document.querySelector(".soon-prev");
  const dotsWrap = document.getElementById("soonDots");
  if (!track || !windowEl || !nextBtn || !prevBtn || !dotsWrap) return;

  const cards = Array.from(track.querySelectorAll(".soon-card"));
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
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 992) return 2;
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
    const dots = dotsWrap.querySelectorAll(".soon-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === sliderIndex);
    });
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= sliderMaxIndex; i += 1) {
      const dot = document.createElement("button");
      dot.className = "soon-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to upcoming slide ${i + 1}`);
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
    autoplayId = setInterval(goNext, 3200);
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

/* ================================================================
   VIDEO MODAL LOGIC
   ================================================================ */
function initVideoModal() {
  const modal = document.getElementById("videoModal");
  const fullVid = document.getElementById("fullVideo");
  const heroVid = document.getElementById("myHeroVideo");
  const videoBox = document.getElementById("videoBox");
  if (!modal || !videoBox) return;

  function closeFullVideo() {
    modal.style.display = "none";
    if (fullVid) fullVid.pause();
    if (heroVid) heroVid.play();
  }

  window.closeFullVideo = closeFullVideo;

  videoBox.addEventListener("click", (event) => {
    event.stopPropagation();
    modal.style.display = "flex";
    if (fullVid) {
      fullVid.currentTime = 0;
      fullVid.play();
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

window.addEventListener("load", () => {
  initScrollReveal();
  initCarousel();
  initSoonSlider();
  initVideoModal();

  if (typingElement) {
    document.body.style.overflow = "hidden";
    typeEffect();
  } else {
    document.body.style.overflow = "auto";
  }
});
