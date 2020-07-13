const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



fetch(TRAINERS_URL)
  .then((response) => response.json())
  .then((json) => renderTrainers(json))

function renderTrainers(trainers) {

  trainers.forEach(trainer => {
    let body = document.querySelector("main")
    let trainerCard = document.createElement('div')
    trainerCard.className = "card"

    let trainerName = document.createElement('p')
    trainerName.innerText = `${trainer.name}`

    let addPokemonBtn = document.createElement('button')
    addPokemonBtn.setAttribute("data-id",`${trainer.id}`)
    addPokemonBtn.innerHTML = "Add Pokemon"
    addPokemonBtn.addEventListener("click", addPokemon)

    body.append(trainerCard)
    trainerCard.append(trainerName)
    trainerCard.append(addPokemonBtn)

    trainer.pokemons.forEach(pokemon => {
      renderPokemons(pokemon)
    })

  })
}

function renderPokemons(pokemon) {
  let pokemonList = document.querySelector(`[data-id="${pokemon.trainer_id}"]`).parentElement
  let pokemonItem = document.createElement('li')
  pokemonItem.innerText = `${pokemon.nickname} (${pokemon.species})`
  let releasePokemonBtn = document.createElement('button')
  releasePokemonBtn.className = "release"
  releasePokemonBtn.innerHTML = "release"
  releasePokemonBtn.setAttribute("data-pokemon-id", `${pokemon.id}`)
  releasePokemonBtn.addEventListener("click", releasePokemon)

  pokemonList.append(pokemonItem)
  pokemonItem.append(releasePokemonBtn)

}

function addPokemon(event) {
  event.preventDefault()
  configObj = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify ({
      trainer_id: parseInt(event.target.dataset.id)
    })
  }
  fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(json => {
      if (json.message){
        alert(json.message)
      } else {
        renderPokemons(json)
      }
    })
  }

function releasePokemon(event) {
  event.preventDefault()
  configObj = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  },
  fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
  event.target.parentElement.remove()
}
