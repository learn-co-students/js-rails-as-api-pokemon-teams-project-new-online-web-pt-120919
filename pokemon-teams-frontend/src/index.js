const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then((res) => res.json())
  .then((res) => displayTrainers(res))
  .catch((err) => console.log(err));

    function displayTrainers(object) {
      object.forEach(trainer => {
        const main = document.querySelector("main")  
        const div = document.createElement("div")  
        div.className = "card"
        div.setAttribute("data-id", `${trainer.id}`)
        div.innerHTML = `<p>${trainer.name}</p>`
        const button = document.createElement("button")
        button.setAttribute("data-trainer-id", `${trainer.id}`)
        button.innerHTML = "Add Pokemon"
        // event listener
        button.addEventListener("click", addPokemon)
        div.appendChild(button)
        main.appendChild(div)
        
        trainer.pokemons.forEach(pokemon => {
            renderPokemon(pokemon)
        });
      });
    }

    const renderPokemon = (pokemon) => {
        // we are looking for a div element, that has a data-id property that is = to pokemon.trainer_id
        const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
        const li = document.createElement("li")
        const button = document.createElement("button")

        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "Release"

        li.appendChild(button)
        ul.appendChild(li)
    }

const addPokemon = (e) => {
    e.preventDefault()
    const configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObject)
    .then(res => res.json())
    .then(json => {
        if (json.message) {
            alert(json.message)
        } else {
            renderPokemon(json)
        }
    })
}    













