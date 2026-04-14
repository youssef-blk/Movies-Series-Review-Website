let params = new URLSearchParams(window.location.search);

let id = params.get("id");
let type = params.get("type");

const API_KEY = "fba6dc6bc271f716822f95918f1c6f7f";

console.log(id);
console.log(type);

async function getData(id, type) {
  let myRequest = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`,
  );

  let data = await myRequest.json();

  console.log(data);

  document
    .querySelector(".container-fluid")
    .style.setProperty(
      "--bg-image",
      `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
    );
  document.querySelector("img").src =
    `https://image.tmdb.org/t/p/w500${data.poster_path}`;


  if (type === "movie") {
    document.querySelector(".title").textContent = data.title;
    document.querySelector(".original_title .name").textContent = data.original_title;
    document.querySelector(".original_title .year").textContent = new Date(
    data.release_date,
  ).getFullYear();
  }


  if (type === "tv") {
    document.querySelector(".title").textContent = data.name;
    document.querySelector(".original_title .name").textContent = data.original_name;
    document.querySelector(".original_title .year").textContent = new Date(
    data.first_air_date,
  ).getFullYear();
  }

  if (!data.adult) {
    document.querySelector(".adult-div").remove();
  }

  
  document.querySelector(".rating span span").textContent =
    data.vote_average.toFixed(1);

  if (data.vote_count >= 1000) {
    document.querySelector(".votes span").textContent =
      (data.vote_count / 1000).toFixed(1) + "K";
  } else {
    document.querySelector(".votes span").textContent = data.vote_count;
  }

  document.querySelector(".language span").textContent = data.original_language;
  document.querySelector(".origin span").textContent = data.origin_country[0];
  document.querySelector(".story").textContent = data.overview

  data.genres.forEach(element => {
    let span = document.createElement("span");
    span.textContent = element.name;
    document.querySelector(".categories").appendChild(span);
  });

  // Attach Add to Playlist Event Listener
  const addToPlaylistBtn = document.querySelector(".primary-btn");
  if (addToPlaylistBtn) {
    addToPlaylistBtn.addEventListener("click", async () => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        alert("Please log in to add items to your playlist.");
        window.location.href = "login/login.html";
        return;
      }

      const showData = {
        userId: userId,
        showId: id,
        type: type,
        title: type === "movie" ? data.title : data.name,
        poster_path: data.poster_path,
        vote_average: data.vote_average
      };

      try {
        const response = await fetch('http://localhost:3000/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(showData)
        });

        if (response.ok) {
          alert("Added to playlist!");
        } else {
          alert("Failed to add to playlist.");
        }
      } catch (error) {
        console.error("Error adding to playlist:", error);
        alert("Could not connect to the backend server.");
      }
    });
  }
}

getData(id, type);


document.querySelector("nav button").addEventListener("click", () => {
  window.history.back();
})