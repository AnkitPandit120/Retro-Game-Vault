const API_KEY = "0a4e17ae0a3c4454abc1fd8a2b7b5d50";
let allGames = [];
let currentPage = 1;

const gameContainer = document.getElementById("Games");
const modal = document.getElementById("gameModal");
const modalDetails = document.getElementById("modalDetails");
const closeModalBtn = document.getElementById("closeModal");
const toggleBtn = document.getElementById("themeToggle");

async function fetchData(page = 1) {
    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const newGames = data.results;
    allGames = [...allGames, ...newGames];

    displayGames(allGames);
}

function displayGames(games) {
    gameContainer.innerHTML = "";

    for (const game of games) {
        const card = document.createElement("div");
        card.classList.add("game-card");

        card.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}" />
            <div class="game-info">
                <p class="rating">⭐️ ${game.rating}</p>
                <h3 class="game-title">${game.name}</h3>
                <button class="more-btn" data-id="${game.id}">More</button>
            </div>
        `;

        gameContainer.appendChild(card);
    }
}

async function fetchGameDetails(id) {
    const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    return res.json();
}

async function showGameDetails(id) {
    const game = await fetchGameDetails(id);

    const genres = Array.isArray(game.genres) ? game.genres.map(g => g.name).join(", ") : "N/A";
    const platforms = Array.isArray(game.platforms)
        ? game.platforms.map(p => p.platform.name).join(", ")
        : "N/A";
    const released = game.released || "Unknown";
    const rating = game.rating || "N/A";
    const website = game.website ? `<a href="${game.website}" target="_blank" rel="noopener">Official website</a>` : "";

    modalDetails.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}" />
        <h2>${game.name}</h2>
        <p><strong>Released:</strong> ${released}</p>
        <p><strong>Rating:</strong> ${rating}</p>
        <p><strong>Genres:</strong> ${genres}</p>
        <p><strong>Platforms:</strong> ${platforms}</p>
        <div>${game.description || "No description available."}</div>
        <p>${website}</p>
    `;

    modal.classList.remove("hidden");
}

function hideModal() {
    modal.classList.add("hidden");
}

function searchGames() {
    applyFilters();
}

function filterByGenre() {
    applyFilters();
}

function applyFilters() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const selectedGenre = document.getElementById("genreFilter").value;

    const filtered = allGames.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchInput);
        const matchesGenre = selectedGenre === "all" ||
            (Array.isArray(game.genres) && game.genres.some(g => g.slug === selectedGenre));

        return matchesSearch && matchesGenre;
    });

    displayGames(filtered);
}

function loadMore() {
    currentPage++;
    fetchData(currentPage);
}

gameContainer.addEventListener("click", event => {
    const button = event.target.closest(".more-btn");
    if (!button) return;
    const gameId = button.dataset.id;
    if (gameId) {
        showGameDetails(gameId);
    }
});

modal.addEventListener("click", event => {
    if (event.target === modal) hideModal();
});

closeModalBtn.addEventListener("click", hideModal);

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggleBtn.textContent = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

fetchData();