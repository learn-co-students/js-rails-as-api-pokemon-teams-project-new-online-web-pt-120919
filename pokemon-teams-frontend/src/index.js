const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



function fetchTrainers() {
    
    fetch(TRAINERS_URL).then(function(response){ 
        return response.json(); 

    }).then(function(trainers) { 
        renderTrainers(trainers); 

    });
}

function renderTrainers(trainers) {

    for (const trainer of trainers){
        const main = document.querySelector('main')

        const div = document.createElement('div')
        div.setAttribute("class", "card")
        div.setAttribute("data-id", trainer.id)

        const p = document.createElement('p')
        p.innerText = trainer.name

        const button = document.createElement('button')
        button.setAttribute("data-trainer-id", trainer.id)
        button.innerText = "Add Pokemon"
        button.addEventListener("click", addPokemon)

        const ul = document.createElement('ul')

        for (const pokemon of trainer.pokemons){
            const li = document.createElement('li')
            li.innerText = `${pokemon.species} (${pokemon.nickname})`

            const button = document.createElement('button')
            button.setAttribute("class", "release")
            button.setAttribute("data-pokemon-id", pokemon.id)
            button.innerText = "Release"
            button.addEventListener("click", releasePokemon)

            li.appendChild(button)
            ul.append(li)
        }

        div.append(p, button, ul);
        main.append(div);
    } 
}

function addPokemon(event) {
    const trainerId = event.target.getAttribute("data-trainer-id")

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": trainerId
        })
    }

    fetch(POKEMONS_URL, configObj).then(function(response){
        return response.json();
    
    }).then(function(json){
        const div = document.querySelector(`[data-id="${trainerId}"]`)
    
        const li = document.createElement('li')
        li.innerText = `${json.species} (${json.nickname})`

        const button = document.createElement('button')
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", json.id)
        button.innerText = "Release"
        button.addEventListener("click", releasePokemon)

        li.appendChild(button)
        div.lastElementChild.append(li)

    }).catch(function(error){
        console.log(error.message);
        
    })
}

function releasePokemon(event){
    const pokemonId = event.target.getAttribute('data-pokemon-id')

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "pokemon_id": pokemonId
        })
    }

    fetch(POKEMONS_URL + `/${pokemonId}`, configObj).then(function(response){
        return response.json();

    }).then(function(json){
        document.querySelector(`[data-pokemon-id="${json.id}"]`).parentElement.remove()

    }).catch(function(error){
        console.log(error.message)

    });
}

fetchTrainers();