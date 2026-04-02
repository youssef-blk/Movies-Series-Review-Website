const fullText = "The streets run on power and silence. Peaky Blinders follows a gang that moves in the shadows - calm, calculated, and always one step ahead.";
const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const nav = document.getElementById("nav-id");

let typingIndex = 0;
let isSkipped = false;
let hasFinished = false;
let typingTimeoutId;

function typeEffect() {
  if (!typingElement || isSkipped || hasFinished) return;

  if (typingIndex < fullText.length) {
    typingElement.textContent += fullText.charAt(typingIndex);
    typingIndex += 1;
    typingTimeoutId = setTimeout(typeEffect, 40);
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

let container = document.querySelector(".episodes");

function initGalleryMarquee() {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  let track = document.querySelector(".gallery-grid.is-marquee .gallery-track");
  if (!track) return;

  let cards = Array.from(track.children);
  if (cards.length === 0) return;

  let clones = cards.map((card) => {
    let clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("img").forEach((img) => img.setAttribute("alt", ""));
    return clone;
  });

  track.append(...clones);
}

function initVideoModal() {
  let modal = document.getElementById("videoModal");
  let fullVid = document.getElementById("fullVideo");
  let heroVid = document.getElementById("myHeroVideo");
  let videoBox = document.getElementById("videoBox");

  if (!modal || !videoBox) return;

  function closeFullVideo() {
    modal.style.display = "none";
    if (fullVid) fullVid.pause();
    if (heroVid) heroVid.play().catch(() => {});
  }

  videoBox.addEventListener("click", () => {
    modal.style.display = "flex";
    if (fullVid) {
      fullVid.currentTime = 0;
      fullVid.play().catch(() => {});
    }
    if (heroVid) heroVid.pause();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeFullVideo();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeFullVideo();
    }
  });
}

function renderEpisodes(seasons, seasonId) {
  container.innerHTML = "";

  for (let i of seasons[seasonId].episodes) {
    console.log(i.title);

    let div = document.createElement("div");
    div.setAttribute("id", i.id);
    div.className = "episode";
    let title = document.createElement("h2");
    let number = document.createElement("h3");

    number.textContent = `Episode ${i.episodeNumber}`;
    title.textContent = i.title;

    div.append(number, title);
    container.appendChild(div);

    document.getElementById(i.id).style.backgroundImage = `url(${i.img})`;
  }
}

async function getData() {
  try {
    let myRequest = await fetch("data.json");

    let show = await myRequest.json();

    let seasonsInput = document.getElementById("season");

    let seasonId = +seasonsInput.value - 1;

    seasonsInput.addEventListener("input", () => {
      seasonId = +seasonsInput.value - 1;
      renderEpisodes(show.seasons, seasonId);
    });

    renderEpisodes(show.seasons, seasonId);
  } catch (e) {
    console.log(e);
  }
}

getData();
initGalleryMarquee();
initVideoModal();

window.addEventListener("load", () => {
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


