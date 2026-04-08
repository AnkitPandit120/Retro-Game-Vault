let allGames = []; 

async function fetchData() {
    let res = await fetch(`https://api.rawg.io/api/games?key=0a4e17ae0a3c4454abc1fd8a2b7b5d50`);
    let data = await res.json();

    allGames = data.results; 
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
    let input = document.getElementById("searchBar").value.toLowerCase();

    let filtered = allGames.filter(game =>
        game.name.toLowerCase().includes(input)
    );

    displayGames(filtered);
}

fetchData();