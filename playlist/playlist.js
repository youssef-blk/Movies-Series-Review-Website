document.addEventListener('DOMContentLoaded', async () => {
    const moviesGrid = document.getElementById('moviesGrid');
    const headerCount = document.querySelector('.header span');
    const userId = localStorage.getItem('userId');

    if (!userId) {
        moviesGrid.innerHTML = '<p style="color:white;text-align:center;">Please <a href="../login/login.html" style="color:#007bff;">log in</a> to view your playlist.</p>';
        headerCount.textContent = '0 Movies';
        return;
    }

    const API_URL = 'http://localhost:3000';

    try {
        const response = await fetch(`${API_URL}/playlists?userId=${userId}`);
        const playlist = await response.json();

        headerCount.textContent = `${playlist.length} Items`;

        if (playlist.length === 0) {
            moviesGrid.innerHTML = '<p style="color:white;text-align:center;">Your playlist is empty.</p>';
            return;
        }

        playlist.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            
            card.innerHTML = `
                <button class="remove-btn" data-id="${item.id}" title="Remove"><i class="fa-solid fa-trash"></i></button>
                <a href="../show.html?type=${item.type}&id=${item.showId}">
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
                </a>
                <div class="movie-info">
                    <h3>${item.title}</h3>
                    <span>${item.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i></span>
                </div>
            `;
            
            moviesGrid.appendChild(card);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const idToRemove = e.currentTarget.getAttribute('data-id');
                try {
                    const deleteRes = await fetch(`${API_URL}/playlists/${idToRemove}`, {
                        method: 'DELETE'
                    });
                    
                    if (deleteRes.ok) {
                        e.currentTarget.parentElement.remove();
                        // Update count
                        const currentCount = parseInt(headerCount.textContent);
                        headerCount.textContent = `${currentCount - 1} Items`;
                        if (currentCount - 1 === 0) {
                            moviesGrid.innerHTML = '<p style="color:white;text-align:center;">Your playlist is empty.</p>';
                        }
                    } else {
                        alert("Failed to delete item.");
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    alert("Could not connect to the backend server.");
                }
            });
        });

    } catch (error) {
        console.error('Error fetching playlist:', error);
        moviesGrid.innerHTML = '<p style="color:white;text-align:center;">Failed to load playlist. Is json-server running?</p>';
    }
});
