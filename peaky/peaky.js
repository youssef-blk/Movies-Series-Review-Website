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

let container = document.querySelector(".episodes");

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
