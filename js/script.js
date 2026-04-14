const API_KEY = "fba6dc6bc271f716822f95918f1c6f7f";
let heroSlides = [];
let currentHeroIndex = 0;

// Hero DOM Elements
const bg = document.getElementById("bg");
const desc = document.getElementById("desc");
const title = document.getElementById("show-title");
const categories = document.getElementById("show-categories");
const year = document.getElementById("show-year");
const rating = document.getElementById("show-rating");
const infoContainer = document.querySelector(".hero-info");

const showType = document.getElementById("show-type");
const showLanguage = document.getElementById("show-language");
const showPopularity = document.getElementById("show-popularity");
const heroActionBtn = document.getElementById("hero-action-btn");

// TMDB Genre Map (To map genre_ids to actual categories)
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

async function getSlidesData() {
  let myMoviesRequest = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  );
  let mySeriesRequest = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
  );

  let movies = await myMoviesRequest.json();
  let series = await mySeriesRequest.json();

  movies = movies.results;
  series = series.results;

  movies.forEach((mv) => {
    let genres = [];
    mv.genre_ids.forEach((g) => genres.push(genreMap[g]));

    let slideObj = {
      id: mv.id,
      bg: mv.backdrop_path ? `https://image.tmdb.org/t/p/w1280${mv.backdrop_path}` : 'images/dark.jpg',
      desc: mv.overview,
      title: mv.title,
      categories: genres,
      year: new Date(mv.release_date).getFullYear(),
      rate: mv.vote_average,
      type: "movie",
      lang: mv.original_language,
      popularity:
      mv.popularity > 1000 ? "High" : mv.popularity > 100 ? "Medium" : "Low",
    };

    heroSlides.push(slideObj);
  });
  series.forEach((sr) => {
    let genres = [];
    sr.genre_ids.forEach((g) => genres.push(genreMap[g]));

    let slideObj = {
      id: sr.id,
      bg: sr.backdrop_path ? `https://image.tmdb.org/t/p/w1280${sr.backdrop_path}` : 'images/dark.jpg',
      desc: sr.overview,
      title: sr.name,
      categories: genres,
      year: new Date(sr.first_air_date).getFullYear(),
      rate: sr.vote_average,
      type: "tv",
      lang: sr.original_language,
      popularity:
      sr.popularity > 1000 ? "High" : sr.popularity > 100 ? "Medium" : "Low",
    };

    heroSlides.push(slideObj);
  });


  heroSlides.sort(() => Math.random() - 0.5);


  renderSlide(heroSlides[currentHeroIndex]);

  setInterval(() => {
    infoContainer.classList.add("fade-out");
    bg.style.opacity = 0;

    setTimeout(() => {
      currentHeroIndex++;
      if (currentHeroIndex >= heroSlides.length) currentHeroIndex = 0;
      
      renderSlide(heroSlides[currentHeroIndex]);

      infoContainer.classList.remove("fade-out");
      bg.style.opacity = 1;
    }, 800);
  }, 10000)

}

function renderSlide(slide) {
  bg.src = slide.bg;
  desc.textContent = slide.desc;
  title.textContent = slide.title;
  categories.textContent = slide.categories.join(" | ");
  year.textContent = slide.year;
  rating.textContent = slide.rate.toFixed(1);
  showType.textContent = slide.type;
  showLanguage.textContent = slide.lang;
  showPopularity.textContent = slide.popularity;

  rating.style.color = slide.rate >= 8 ? "green" : (slide.rate >= 5 ? "yellow" : "red"); 

  heroActionBtn.onclick = () => {
    window.open(`show.html?id=${slide.id}&type=${slide.type}`, "_self");
  };
}

getSlidesData();

// hero inmation

document.addEventListener("DOMContentLoaded", function () {

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
    <img loading="lazy"
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
    <img loading="lazy"
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
          ? `<img loading="lazy" src="https://image.tmdb.org/t/p/w200${imgPath}" class="search-item-img" alt="poster">`
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

// section number
const recType = document.getElementById("rec-type");
const recCategory = document.getElementById("rec-category");
const recYear = document.getElementById("rec-year");
const recLanguage = document.getElementById("rec-language");
const getRecommendationBtn = document.getElementById("get-recommendation-btn");
const recommendationResults = document.getElementById("recommendation-results");

const typesList = ["movie", "series"];
const categoriesList = [
  "28",
  "18",
  "35",
  "878",
  "53",
  "27",
  "10749",
  "16",
  "80",
  "96",
];
const yearsList = ["2024", "2023", "2022", "old"];
const languagesList = ["en", "es", "ko", "fr", "ar", "ja"];

document.addEventListener("DOMContentLoaded", () => {
  const simpleCounters = document.querySelectorAll(".stat-number-simple");

  const animateCounters = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounters(counter), 20);
    } else {
      counter.innerText = target;
    }
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Kat-khdem l-animation ghir l l-elements li banu
          animateCounters(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  simpleCounters.forEach((c) => statsObserver.observe(c));
});
getRecommendationBtn.addEventListener("click", () => {
  let type = recType.value;
  let categorie = recCategory.value;
  let year = recYear.value;
  let lang = recLanguage.value;

  if (!type) type = typesList[Math.floor(Math.random() * typesList.length)];
  if (!categorie)
    categorie =
      categoriesList[Math.floor(Math.random() * categoriesList.length)];
  if (!year) year = yearsList[Math.floor(Math.random() * yearsList.length)];
  if (!lang)
    lang = languagesList[Math.floor(Math.random() * languagesList.length)];

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
      recommendationResults.innerHTML =
        "<p>No recommendations found. Try different criteria!</p>";
      return;
    }

    let startIndex = Math.floor(
      Math.random() * Math.max(0, data.results.length - 3 + 1),
    );
    let results = data.results.slice(startIndex, startIndex + 3);

    results.forEach((item, index) => {
      let card = document.createElement("div");
      let isCenter = results.length === 3 && index === 1;
      card.className = "rec-card" + (isCenter ? " center-card" : "");

      let imgPath = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "images/dark.jpg";

      card.innerHTML = `
        <img loading="lazy" src="${imgPath}" alt="${item.title || item.name}" />
        <div class="rec-card-info">
          <h4>${item.title || item.name}</h4>
          <p>${(item.release_date || item.first_air_date || "").split("-")[0] || "N/A"}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        window.open(`show.html?id=${item.id}&type=${apiType}`, "_self");
      });

      recommendationResults.appendChild(card);
    });
  }
  fetchRecommendation();
});
const counters = document.querySelectorAll(".counter");
const speed = 200;

const startCounter = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

observer.observe(document.querySelector(".platform-stats-section"));
