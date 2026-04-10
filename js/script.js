const slides = [
  {
    img: "images/dark.jpg",
    title: "DARK",
    categories: ["Sci-Fi", "Thriller", "Mystery"],
    year: 2017,
    rating: 8.7,
    director: "Baran bo Odar",
    stars: ["Jonas Kahnwald"],
    p: "A complex supernatural thriller where the disappearance of two children exposes the double lives and fractured relationships among four families. This mind-bending saga explores the dark secrets of a small town across generations...",
  },
  {
    img: "images/vikings.jpg",
    title: "VIKINGS",
    categories: ["Action", "Drama", "History"],
    year: 2013,
    rating: 8.5,
    director: "Michael Hirst",
    stars: ["Ragnar Lothbrok"],
    p: "The brutal and epic journey of Ragnar Lothbrok, a restless warrior who seeks to explore and raid distant shores across the ocean. Witness the rise of a legendary Norse king and the fierce battles that shaped the Viking Age...",
  },
  {
    img: "images/from.jpg",
    title: "FROM",
    categories: ["Horror", "Mystery", "Thriller"],
    year: 2022,
    rating: 7.8,
    director: "Jack Bender",
    stars: ["Boyd Stevens"],
    p: "Unravel the terrifying mystery of a nightmare town in middle America that traps everyone who enters. As the residents struggle to maintain a sense of normalcy, they must also survive the threats of the surrounding forest...",
  },
  {
    img: "images/mindhunter.jpg",
    title: "MINDHUNTER",
    categories: ["Crime", "Drama", "Thriller"],
    year: 2017,
    rating: 8.6,
    director: "David Fincher",
    stars: ["Holden Ford"],
    p: "Set in the late 1970s, two FBI agents expand criminal science by delving into the psychology of murder. By interviewing imprisoned serial killers, they hope to understand how these monsters think to solve ongoing cases...",
  },
  {
    img: "images/joker.jpg",
    title: "THE JOKER",
    categories: ["Crime", "Drama", "Thriller"],
    year: 2019,
    rating: 8.4,
    director: "Todd Phillips",
    stars: ["Arthur Fleck"],
    p: "A deep and haunting character study of Arthur Fleck, a man disregarded by society who eventually transforms into a criminal mastermind. This story explores the origins of Gotham's most iconic villain...",
  },
];

let i = 1;
const bg = document.getElementById("bg");
const desc = document.getElementById("desc");
const title = document.getElementById("show-title");
const categories = document.getElementById("show-categories");
const year = document.getElementById("show-year");
const rating = document.getElementById("show-rating");
const director = document.getElementById("show-director");
const stars = document.getElementById("show-stars");
const infoContainer = document.querySelector(".hero-info");

function renderSlide(slide) {
  bg.src = slide.img;
  title.innerText = slide.title;
  desc.textContent = slide.p;

  if (categories) categories.textContent = (slide.categories || []).join(", ");
  if (year) year.textContent = slide.year ?? "";
  if (rating) rating.textContent = slide.rating ?? "";
  if (director) director.textContent = slide.director ?? "";
  if (stars) stars.textContent = (slide.stars || []).join(", ");
  if (slide.rating > 8) {
    rating.style.color = "#44fe47d9";
  } else {
    rating.style.color = "yellow";
  }
}

renderSlide(slides[0]);

setInterval(() => {
  bg.style.opacity = 0;
  infoContainer.classList.add("fade-out");

  setTimeout(() => {
    renderSlide(slides[i]);

    bg.style.opacity = 1;
    infoContainer.classList.remove("fade-out");
    i++;
    if (i === slides.length) {
      i = 0;
    }
  }, 800);
}, 10000);

// hero inmation

document.addEventListener("DOMContentLoaded", function () {
  if (window.gsap) {
    let tl = gsap.timeline();

    tl.from("#show-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    tl.from(
      "#desc",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.5",
    );

    tl.from(
      ".show-meta",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.4",
    );

    tl.from(
      ".show-credits",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.3",
    );
  }

  const modal = document.getElementById("cardModal");
  const modalTitle = document.getElementById("cardModalTitle");
  const modalContent = modal?.querySelector(".card-modal__content");
  const closeTargets = modal?.querySelectorAll("[data-card-modal-close]");

  if (!modal || !modalTitle || !modalContent) return;

  let lastFocusedElement = null;

  function openCardModal(card) {
    lastFocusedElement = document.activeElement;

    const bgImage =
      card.style.backgroundImage || getComputedStyle(card).backgroundImage;
    const title = card.querySelector("h3")?.textContent?.trim() || "Untitled";

    modalContent.style.backgroundImage = bgImage;
    modalTitle.textContent = title;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modal.querySelector(".card-modal__close")?.focus();

    setTimeout(() => {
      window.location.href = `${card.getAttribute("id")}/${card.getAttribute("id")}.html`;
    }, 2000);
  }

  function closeCardModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    modalContent.style.backgroundImage = "";
    modalTitle.textContent = "";

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll(".cards-section .card").forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    card.addEventListener("click", () => openCardModal(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCardModal(card);
      }
    });
  });

  closeTargets?.forEach((el) => el.addEventListener("click", closeCardModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeCardModal();
    }
  });
});

//! Hadi Function li katjib l aflam men API
async function getMovies() {
  const API_KEY = "fba6dc6bc271f716822f95918f1c6f7f";

  let allMovies = [];

  let moviesContainer = document.getElementById("movies-container");
  let loader = document.querySelector(".movies .loader");

  for (let i = 1; i <= 10; i++) {
    let myRequest = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${i}`,
    );
    let myData = await myRequest.json();
    allMovies.push(...myData.results);
  }

  loader.style.display = "none";

  function renderMovieCard(movie) {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.id = movie.id;
    movieCard.dataset.type = movie.media_type;
    movieCard.innerHTML = `
    <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      alt="The Joker poster"
      class="img-fluid"
      title="${movie.title}"
    />
    `;

    return movieCard;
  }

  allMovies.forEach((movie) => {
    moviesContainer.appendChild(renderMovieCard(movie));
  });

  let isAnimating = false;

  document.querySelector(".movies #nextBtn").addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const cardWidth = moviesContainer.children[0].offsetWidth;

    moviesContainer.style.transition = "transform 0.4s ease-in-out";
    moviesContainer.style.transform = `translateX(-${cardWidth}px)`;

    moviesContainer.addEventListener("transitionend", function handler() {
      moviesContainer.removeEventListener("transitionend", handler);

      moviesContainer.appendChild(moviesContainer.firstChild);

      moviesContainer.style.transition = "none";
      moviesContainer.style.transform = "translateX(0)";

      isAnimating = false;
    });
  });

  document.querySelector(".movies #backBtn").addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const cardWidth = moviesContainer.children[0].offsetWidth;

    moviesContainer.style.transition = "transform 0.4s ease-in-out";
    moviesContainer.style.transform = `translateX(${cardWidth}px)`;

    moviesContainer.addEventListener("transitionend", function handler() {
      moviesContainer.removeEventListener("transitionend", handler);

      moviesContainer.prepend(moviesContainer.lastChild);

      moviesContainer.style.transition = "none";
      moviesContainer.style.transform = "translateX(0)";

      isAnimating = false;
    });
  });

  for (let ele of moviesContainer.children) {
    ele.addEventListener("click", () => {
      window.open(
        `show.html?id=${ele.dataset.id}&type=${ele.dataset.type}`,
        "_self",
      );
    });
  }
}

//! W Hadi Function li katjib seriat men API
async function getSeries() {
  const API_KEY = "fba6dc6bc271f716822f95918f1c6f7f";

  let allSeries = [];

  let seriesContainer = document.getElementById("series-container");
  let loader = document.querySelector(".series .loader");

  for (let i = 1; i <= 10; i++) {
    let myRequest = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${i}`,
    );
    let myData = await myRequest.json();
    allSeries.push(...myData.results);
    allSeries = allSeries.filter((item) => item.origin_country[0] !== "JP");
  }

  loader.style.display = "none";

  function renderSerieCard(serie) {
    let serieCard = document.createElement("div");
    serieCard.classList.add("serie-card");
    serieCard.dataset.id = serie.id;
    serieCard.dataset.type = serie.media_type;
    serieCard.innerHTML = `
    <img
      src="https://image.tmdb.org/t/p/w500${serie.poster_path}"
      alt="The Joker poster"
      class="img-fluid"
      title="${serie.name}"
    />
    `;

    return serieCard;
  }

  allSeries.forEach((serie) => {
    seriesContainer.appendChild(renderSerieCard(serie));
  });

  let isAnimating = false;

  document.querySelector(".series #nextBtn").addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const cardWidth = seriesContainer.children[0].offsetWidth;

    seriesContainer.style.transition = "transform 0.4s ease-in-out";
    seriesContainer.style.transform = `translateX(-${cardWidth}px)`;

    seriesContainer.addEventListener("transitionend", function handler() {
      seriesContainer.removeEventListener("transitionend", handler);

      seriesContainer.appendChild(seriesContainer.firstChild);

      seriesContainer.style.transition = "none";
      seriesContainer.style.transform = "translateX(0)";

      isAnimating = false;
    });
  });

  document.querySelector(".series #backBtn").addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const cardWidth = seriesContainer.children[0].offsetWidth;

    seriesContainer.style.transition = "transform 0.4s ease-in-out";
    seriesContainer.style.transform = `translateX(${cardWidth}px)`;

    seriesContainer.addEventListener("transitionend", function handler() {
      seriesContainer.removeEventListener("transitionend", handler);

      seriesContainer.prepend(seriesContainer.lastChild);

      seriesContainer.style.transition = "none";
      seriesContainer.style.transform = "translateX(0)";

      isAnimating = false;
    });
  });

  for (let ele of seriesContainer.children) {
    ele.addEventListener("click", () => {
      window.open(
        `show.html?id=${ele.dataset.id}&type=${ele.dataset.type}`,
        "_self",
      );
    });
  }
}

getMovies();
getSeries();

const API_KEY = "fba6dc6bc271f716822f95918f1c6f7f";
const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeBtn = document.getElementById("closeSearchOverlay");
const backdrop = document.getElementById("searchBackdrop");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let timeout;

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("is-active");
  searchInput.focus();
});

closeBtn.addEventListener("click", () => {
  searchOverlay.classList.remove("is-active");
});

searchOverlay.addEventListener("click", (e) => {
  if (
    e.target === searchOverlay ||
    e.target === backdrop ||
    e.target.classList.contains("search-content")
  ) {
    searchOverlay.classList.remove("is-active");
  }
});

searchInput.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    let value = searchInput.value.trim();
    async function getData(value) {
      let respond = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${value}`,
      );

      let data = await respond.json();
      searchResults.innerHTML = "";
      for (let ele of data.results) {
        if (ele.media_type == "person") {
          continue;
        }
        let div = document.createElement("div");
        div.className = "search-item";
        div.dataset.id = ele.id;
        div.dataset.type = ele.media_type;
        let imgPath = ele.backdrop_path || ele.poster_path;
        let imgElement = imgPath
          ? `<img src="https://image.tmdb.org/t/p/w200${imgPath}" class="search-item-img" alt="poster">`
          : `<div class="search-item-img placeholder"></div>`;

        div.innerHTML = `
          <div class="search-item-info">
            ${imgElement}
            <span class="title">${ele.media_type == "movie" ? ele.title : ele.name}</span>
          </div>
          <span class="year">(${ele.media_type == "movie" ? (ele.release_date ? new Date(ele.release_date).getFullYear() : "N/A") : ele.first_air_date ? new Date(ele.first_air_date).getFullYear() : "N/A"})</span>
        `;
        searchResults.appendChild(div);
      }

      for (let ele of searchResults.children) {
        ele.addEventListener("click", () => {
          window.open(
            `show.html?id=${ele.dataset.id}&type=${ele.dataset.type}`,
            "_self",
          );
        });
      }
    }

    getData(value);
  }, 300);
});


// --- Recommendation Section Elements ---
const recType = document.getElementById("rec-type");
const recCategory = document.getElementById("rec-category");
const recYear = document.getElementById("rec-year");
const recLanguage = document.getElementById("rec-language");
const getRecommendationBtn = document.getElementById("get-recommendation-btn");
const recommendationResults = document.getElementById("recommendation-results");

const typesList = ["movie", "series"];
const categoriesList = ["28", "18", "35", "878", "53", "27", "10749", "16", "80", "96"];
const yearsList = ["2024", "2023", "2022", "old"];
const languagesList = ["en", "es", "ko", "fr", "ar", "ja"];


getRecommendationBtn.addEventListener("click", () => {
  let type = recType.value;
  let categorie = recCategory.value;
  let year = recYear.value;
  let lang = recLanguage.value;

  if (!type) type = typesList[Math.floor(Math.random() * typesList.length)];
  if (!categorie) categorie = categoriesList[Math.floor(Math.random() * categoriesList.length)];
  if (!year) year = yearsList[Math.floor(Math.random() * yearsList.length)];
  if (!lang) lang = languagesList[Math.floor(Math.random() * languagesList.length)];

  let apiType = type === "series" ? "tv" : type;
  let url = `https://api.themoviedb.org/3/discover/${apiType}?api_key=${API_KEY}`;
  if (categorie) url += `&with_genres=${categorie}`;
  if (year) {
    if (year === "old") {
      url += `&before_year=2000`;
    } else {
      url += `&primary_release_year=${year}`;
    }
  }
  if (lang) url += `&with_original_language=${lang}`;

  async function fetchRecommendation() {
    let response = await fetch(url);
    let data = await response.json();
    recommendationResults.innerHTML = "";
    
    if (!data.results || data.results.length === 0) {
      recommendationResults.innerHTML = "<p>No recommendations found. Try different criteria!</p>";
      return;
    }
    
    let startIndex = Math.floor(Math.random() * Math.max(0, data.results.length - 3 + 1));
    let results = data.results.slice(startIndex, startIndex + 3);
    
    results.forEach((item, index) => {
      let card = document.createElement("div");
      let isCenter = results.length === 3 && index === 1;
      card.className = "rec-card" + (isCenter ? " center-card" : "");
      
      let imgPath = item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
        : 'images/dark.jpg';
        
      card.innerHTML = `
        <img src="${imgPath}" alt="${item.title || item.name}" />
        <div class="rec-card-info">
          <h4>${item.title || item.name}</h4>
          <p>${(item.release_date || item.first_air_date || "").split('-')[0] || "N/A"}</p>
        </div>
      `;
      
      card.addEventListener("click", () => {
        window.open(
          `show.html?id=${item.id}&type=${apiType}`,
          "_self"
        );
      });
      
      recommendationResults.appendChild(card);
    });
  }
  fetchRecommendation();
});