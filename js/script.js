const images = [
  "https://i.pinimg.com/1200x/d0/89/8b/d0898ba66dc67c0d39435e6b9410a9e4.jpg",
  "https://i.pinimg.com/1200x/a4/74/f9/a474f94adc86667848f4681bec86eb77.jpg",
  "https://i.pinimg.com/1200x/af/4d/08/af4d086656c120f13960c3f8848cd8f9.jpg",
  "https://i.pinimg.com/1200x/99/db/70/99db709a08f8c535f544efe88b8ceaaa.jpg",
];
const alts = ["dd", "hh", "nn", "jj"];

let i = 0;
const bg = document.getElementById("bg");

setInterval(() => {
  i++;
  if (i >= images.length) {
    i = 0;
  }
  bg.src = images[i];
  bg.alt = alts[i];
}, 3000);
