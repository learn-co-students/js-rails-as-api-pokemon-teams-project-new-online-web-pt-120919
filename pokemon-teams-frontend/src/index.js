const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const body = document.querySelector("main")



    fetch(TRAINERS_URL)
    .then((response)=> response.json())
    .then((json) => renderTrainers(json))

function renderTrainers(trainers){
    trainers.forEach(trainer => {
    let card = document.createElement('div')
    card.className = "card"

    let addButton = document.createElement('button')
    addButton.setAttribute("data-id",`${trainer.id}`)
    addButton.innerHTML = "Add Pokemon"
    addButton.addEventListener("click", addPokemon)

   
    let trainerName = document.createElement('p')
    trainerName.innerText = `${trainer.name}`
    
    card.append(addButton)
    card.append(trainerName)
    body.append(card)

    trainer.pokemons.forEach(pokemon => {
    renderPokemon(pokemon)
    })

   

})
}

function renderPokemon(pokemon){
    let div = document.querySelector(`[data-id="${pokemon.trainer_id}"]`).parentElement
    let pokemonItem = document.createElement('li')
    pokemonItem.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseButton = document.createElement('button')
    releaseButton.className = "release"
    releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`)
    releaseButton.innerText = "Release"
    releaseButton.addEventListener("click", releasePokemon)
    
    pokemonItem.append(releaseButton)
    div.append(pokemonItem)
}

function addPokemon(e){
    e.preventDefault()
    configObject = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify({
            trainer_id: parseInt(e.target.dataset.id)
        })}
        fetch(POKEMONS_URL, configObject)
        .then(res => res.json())
        .then(json => {
          if (json.message){
              alert(json.message)
          } else{
                renderPokemon(json)
          }
        })
}

function releasePokemon(e){
    e.preventDefault()
    const configObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObject)
    e.target.parentElement.remove()
    
}
