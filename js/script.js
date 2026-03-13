const images = [
  "https://i.pinimg.com/1200x/17/30/8c/17308cbd97bd1ce8438970938d72b22c.jpg",
  "https://i.pinimg.com/1200x/a4/74/f9/a474f94adc86667848f4681bec86eb77.jpg",
  "https://i.pinimg.com/1200x/af/4d/08/af4d086656c120f13960c3f8848cd8f9.jpg",
  "https://i.pinimg.com/1200x/99/db/70/99db709a08f8c535f544efe88b8ceaaa.jpg",
];
const alts = ["dd", "hh", "nn", "jj"];

let i = 0;
const bg = document.getElementById("hero");

setInterval(() => {
  i++;
  if (i >= images.length) {
    i = 0;
  }
  bg.style.backgroundImage = `url(${images[i]})`;
}, 3000);

// Search button

let searchBtn = document.getElementById("searchBtn");
let searchForm = document.getElementById("searchForm");

searchForm.onsubmit = function (e) {
  e.preventDefault();
}

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
