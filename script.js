async function fetchData(){
    let res= await fetch(`https://api.rawg.io/api/games?key=0a4e17ae0a3c4454abc1fd8a2b7b5d50`)
    let data= await res.json()
    let game_list=data["results"]
    console.log(game_list)

    let container = document.getElementById("Games")


    for (let game of game_list) {
        let Game = document.createElement("div");
        Game.classList.add("game-card");

        Game.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}" />

            <div class="game-info">
                <p class="rating">⭐ ${game.rating}</p>
                <h3>${game.name}</h3>
                <button class="more-btn">More</button>
            </div>
        `;
        container.appendChild(Game);
    }
}
fetchData()
