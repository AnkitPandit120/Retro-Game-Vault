let allGames = [];
let currentPage = 1;

async function fetchData(page = 1) {
    let res = await fetch(`https://api.rawg.io/api/games?key=0a4e17ae0a3c4454abc1fd8a2b7b5d50&page=${page}`);
    let data = await res.json();
    let newGames = data.results;
    allGames = [...allGames, ...newGames];

    displayGames(allGames);
}

function displayGames(games) {
    let container = document.getElementById("Games");
    container.innerHTML = "";

    for (let game of games) {
        let Game = document.createElement("div");
        Game.classList.add("game-card");

        Game.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}" />
            <div class="game-info">
                <p class="rating">⭐️ ${game.rating}</p>
                <h3 class="game-title">${game.name}</h3>
                <button class="more-btn">More</button>
            </div>
        `;
        container.appendChild(Game);
    }
}


function searchGames() {
    applyFilters();
}

function filterByGenre() {
    applyFilters();
}

function applyFilters() {
    let searchInput = document.getElementById("searchBar").value.toLowerCase();
    let selectedGenre = document.getElementById("genreFilter").value;

    let filtered = allGames.filter(game => {
        let matchesSearch = game.name.toLowerCase().includes(searchInput);
        let matchesGenre = selectedGenre === "all" ||
            (Array.isArray(game.genres) && game.genres.some(g => g.slug === selectedGenre));

        return matchesSearch && matchesGenre;
    });

    displayGames(filtered);
}

function loadMore() {
    currentPage++;
    fetchData(currentPage);
}

fetchData();

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
    }
});