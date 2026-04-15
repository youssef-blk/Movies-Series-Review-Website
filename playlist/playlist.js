document.addEventListener("DOMContentLoaded", async () => {
  const moviesGrid = document.getElementById("moviesGrid");
  const headerCount = document.querySelector(".header span");
  const userId = localStorage.getItem("userId");

  const API_URL = "http://localhost:3000";

  if (!userId) {
    moviesGrid.innerHTML = `
      <div class="empty-playlist-msg">
        <p>Please <a href="../login/login.html">log in</a> to view your playlist.</p>
      </div>`;
    headerCount.textContent = "0 Items";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/playlists?userId=${userId}`);
    const playlist = await response.json();

    let currentCount = playlist.length;
    headerCount.textContent = `${currentCount} Items`;

    // empty state
    if (playlist.length === 0) {
      moviesGrid.innerHTML = `
        <div class="empty-playlist-msg">
          <p>Your playlist is empty. Let's find something <a href="../index.html">to watch</a>!</p>
        </div>`;
      return;
    }

    // render cards
    playlist.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <button class="remove-btn" data-id="${item.id}" title="Remove">
          <i class="fa-solid fa-trash"></i>
        </button>

        <a href="../show.html?type=${item.type}&id=${item.showId}">
          <img loading="lazy" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
        </a>

        <div class="movie-info">
          <h3>${item.title}</h3>
          <span>${item.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i></span>
        </div>
      `;

      moviesGrid.appendChild(card);
    });

    // DELETE HANDLER
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const idToRemove = e.currentTarget.getAttribute("data-id");
        const card = e.currentTarget.parentElement;

        try {
          const deleteRes = await fetch(
            `${API_URL}/playlists/${idToRemove}`,
            {
              method: "DELETE",
            }
          );

          if (deleteRes.ok) {
            // animation
            card.classList.add("removing");

            setTimeout(() => {
              card.remove();

              currentCount--;
              headerCount.textContent = `${currentCount} Items`;

              showToast("Removed from playlist", "success");

              if (currentCount === 0) {
                moviesGrid.innerHTML = `
                  <div class="empty-playlist-msg">
                    <p>Your playlist is empty. Let's find something <a href="../index.html">to watch</a>!</p>
                  </div>`;
              }
            }, 300);
          } else {
            showToast("Failed to delete item.");
          }
        } catch (error) {
          console.error(error);
          showToast("Server error. Try again.");
        }
      });
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    moviesGrid.innerHTML = "";
    showToast("Failed to load playlist.");
  }
});
function showToast(message, type = "error") {
  const toast = document.getElementById("toastPopup");
  const text = document.getElementById("toastMessage");
  const title = document.getElementById("toastTitle");
  const icon = document.getElementById("toastIcon");

  text.textContent = message;

  // reset class
  toast.classList.remove("success");

  if (type === "success") {
    toast.classList.add("success");
    title.textContent = "Success";
    icon.className = "fas fa-check-circle";
  } else {
    title.textContent = "Error";
    icon.className = "fas fa-exclamation-circle";
  }

  toast.style.display = "flex";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}