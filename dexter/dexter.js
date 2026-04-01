/* ================================================================
   DEXTER PAGE SCRIPT
   ================================================================ */
const fullText =
  "Tonight's the night. The air feels heavier, like the world itself is holding its breath. By day, he's just another forensic technician - quiet, precise, invisible in a room full of noise...";

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
   SEARCH BUTTON LOGIC
   ================================================================ */
function initSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const searchForm = document.getElementById("searchForm");
  if (!searchBtn || !searchForm) return;

  searchBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchForm.querySelector("input")?.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!searchForm.contains(event.target) && event.target !== searchBtn) {
      searchForm.classList.remove("show");
    }
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

  function getSlideWidth() {
    const firstCard = track.querySelector(".cast-item");
    if (!firstCard) return 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap =
      parseFloat(getComputedStyle(track).columnGap) ||
      parseFloat(getComputedStyle(track).gap) ||
      0;
    return cardWidth + gap;
  }

  function getMaxIndex() {
    const cards = track.querySelectorAll(".cast-item");
    const totalCards = cards.length;
    const slideWidth = getSlideWidth();
    if (!slideWidth || totalCards <= 1) return 0;

    const visibleCards = Math.max(
      1,
      Math.floor(trackContainer.clientWidth / slideWidth)
    );
    return Math.max(0, totalCards - visibleCards);
  }

  function updateCarousel() {
    const slideWidth = getSlideWidth();
    track.style.transform = `translateX(-${carouselIndex * slideWidth}px)`;

    prevBtn.disabled = carouselIndex === 0;
    nextBtn.disabled = carouselIndex >= getMaxIndex();
  }

  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    carouselIndex = Math.min(carouselIndex + 1, getMaxIndex());
    updateCarousel();
  });

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    carouselIndex = Math.max(carouselIndex - 1, 0);
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    carouselIndex = Math.min(carouselIndex, getMaxIndex());
    updateCarousel();
  });

  updateCarousel();
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
  initSearch();
  initCarousel();
  initVideoModal();

  if (typingElement) {
    document.body.style.overflow = "hidden";
    typeEffect();
  } else {
    document.body.style.overflow = "auto";
  }
});