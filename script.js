async function fetchData(){
    let res= await fetch(`https://api.rawg.io/api/games?key=0a4e17ae0a3c4454abc1fd8a2b7b5d50`)
    let data= await res.json()
    let game_list=data["results"]

    let container = document.getElementById("Games")

    for (i in game_list){
        let Game= document.createElement("div")
        Game.classList.add("game-card")
        Game.innerHTML=`
        <h2>${game_list[i]["name"]}</h2>
        <img src="${game_list[i]["background_image"]}" alt="${game_list[i]["name"]}">
        `
        container.appendChild(Game)
    }
}
fetchData()
