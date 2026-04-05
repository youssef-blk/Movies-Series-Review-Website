const fullText =
  "In Westeros, every crown is forged in betrayal. One whisper can start a war, and one promise can end a dynasty.";

const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const logoReveal = document.getElementById("logo-reveal");
const nav = document.getElementById("nav-id");
const ratingBox = document.getElementById("rating-id");
const videoBottom = document.getElementById("video-bottom-id");

const videoModal = document.getElementById("videoModal");
const videoBox = document.getElementById("videoBox");
const closeVideoBtn = document.getElementById("closeVideoBtn");
const fullVideo = document.getElementById("fullVideo");
const heroVideo = document.getElementById("myHeroVideo");

let typingIndex = 0;
let isSkipped = false;
let hasFinished = false;
let typingTimeoutId;
let swiperInitialized = false;

document.body.style.overflow = "hidden";

function typeEffect() {
  if (!typingElement || isSkipped || hasFinished) return;

  if (typingIndex < fullText.length) {
    typingElement.textContent += fullText.charAt(typingIndex);
    typingIndex += 1;
    typingTimeoutId = setTimeout(typeEffect, 50);
    return;
  }

  setTimeout(finishAnimation, 3000);
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
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
      initSwiper();
    }, 600);
  }
}

function skipTyping() {
  if (hasFinished) return;
  isSkipped = true;
  clearTimeout(typingTimeoutId);
  if (typingElement) typingElement.textContent = fullText;
  finishAnimation();
}

window.skipTyping = skipTyping;

function initSwiper() {
  if (swiperInitialized || typeof Swiper === "undefined") return;
  if (!document.querySelector(".mySwiper")) return;

  swiperInitialized = true;
  // Episode slider used in section after hero.
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 25,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
}

function initCharacters() {
  const thumbs = document.querySelectorAll(".char-thumb");
  if (!thumbs.length) return;

  const characters = {
    tyrion: {
      name: "Tyrion Lannister",
      desc: "Lord Tyrion Lannister is the youngest child of Lord Tywin Lannister and younger brother of Cersei and Jaime Lannister. A dwarf, he uses his wit and intellect to overcome the prejudice he faces.",
      img: "https://i.pinimg.com/736x/d4/19/0c/d4190cffb4c5ddaae39ad6632c2be2fe.jpg",
      detailsUrl: "characters/tyrion.html",
      detailsLabel: "Read Tyrion Dossier"
    },
    jaime: {
      name: "Jaime Lannister",
      desc: "Ser Jaime Lannister was the eldest son of Lord Tywin Lannister. Known as the Kingslayer, he is one of the most skilled swordsmen in the Seven Kingdoms.",
      img: "https://i.pinimg.com/1200x/7c/15/09/7c15099c373eb9528bdb6293aac3f2bb.jpg",
      detailsUrl: "characters/jaime.html",
      detailsLabel: "Read Jaime Dossier"
    },
    cersei: {
      name: "Cersei Lannister",
      desc: "Queen Cersei Lannister is the widow of King Robert Baratheon. She is fierce, protective of her children, and willing to do anything to hold onto power.",
      img: "https://i.pinimg.com/avif/1200x/4f/ef/65/4fef6568fe55439881443271511b701d.avf",
      detailsUrl: "characters/cersei.html",
      detailsLabel: "Read Cersei Dossier"
    },
    daenerys: {
      name: "Daenerys Targaryen",
      desc: "The last confirmed member of House Targaryen. Known as the Mother of Dragons, she began her journey as an exiled princess and rose to become a powerful conqueror with three dragons by her side.",
      img: "https://i.pinimg.com/736x/c8/87/b0/c887b06ad71195db6a1a70623e05953e.jpg",
      detailsUrl: "characters/daenerys.html",
      detailsLabel: "Read Daenerys Dossier"
    }
  };

  function applyCharacter(charKey) {
    const data = characters[charKey];
    if (!data) return;

    const infoDiv = document.getElementById("character-info");
    const bigImg = document.getElementById("char-big-img");
    const detailsLink = document.getElementById("char-details-link");
    if (!infoDiv || !bigImg) return;

    infoDiv.style.opacity = "0";
    bigImg.style.opacity = "0";

    setTimeout(() => {
      document.getElementById("char-name").textContent = data.name;
      document.getElementById("char-desc").textContent = data.desc;
      bigImg.src = data.img;

      if (detailsLink) {
        if (data.detailsUrl) {
          detailsLink.href = data.detailsUrl;
          detailsLink.textContent = data.detailsLabel || "Read Character Details";
          detailsLink.hidden = false;
        } else {
          detailsLink.hidden = true;
        }
      }

      infoDiv.style.opacity = "1";
      bigImg.style.opacity = "1";
    }, 280);
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const currentActive = document.querySelector(".char-thumb.active");
      currentActive?.classList.remove("active");
      thumb.classList.add("active");

      const charKey = thumb.getAttribute("data-target");
      applyCharacter(charKey);
    });
  });

  const initialKey =
    document.querySelector(".char-thumb.active")?.getAttribute("data-target") ||
    "tyrion";
  applyCharacter(initialKey);
}

function initVideoModal() {
  if (!videoModal || !videoBox || !fullVideo) return;

  function closeFullVideo() {
    videoModal.style.display = "none";
    videoModal.setAttribute("aria-hidden", "true");
    fullVideo.pause();
    heroVideo?.play().catch(() => {});
  }

  function openFullVideo(event) {
    event.stopPropagation();
    videoModal.style.display = "flex";
    videoModal.setAttribute("aria-hidden", "false");
    fullVideo.currentTime = 0;
    fullVideo.play().catch(() => {});
    heroVideo?.pause();
  }

  videoBox.addEventListener("click", openFullVideo);

  closeVideoBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeFullVideo();
  });

  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) closeFullVideo();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal.style.display === "flex") {
      closeFullVideo();
    }
  });
}

window.addEventListener("load", () => {
  initCharacters();
  initVideoModal();

  if (typingElement) {
    typeEffect();
    return;
  }

  document.body.style.overflow = "auto";
  nav?.classList.add("visible");
  ratingBox?.classList.add("show");
  videoBottom?.classList.add("show");
  initSwiper();
});
