async function fetchData(){
    let res= await fetch(`https://api.rawg.io/api/games?key=0a4e17ae0a3c4454abc1fd8a2b7b5d50`)
    let data= await res.json()
    console.log(data)
}
fetchData()
