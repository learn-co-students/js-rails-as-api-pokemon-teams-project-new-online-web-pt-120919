const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// const DELETE_URL = `${BASE_URL}/pokemons/${pokemon.id}`

document.addEventListener("DOMContentLoaded", function(){
    fetchTrainers()
})

const fetchTrainers = () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(card => {
            renderCards(card)
        }) 
    })
    .catch(error => console.log(error))
}

const renderCards = (hash) => {
    // debugger
    const main = document.querySelector("main")
    const div = document.createElement("div")
        div.setAttribute("class", "card")
        div.setAttribute("data-id", hash.id)
    const pDiv = document.createElement("p")
        pDiv.innerText = hash.name
    const addBtn = document.createElement("button")
        addBtn.setAttribute("data-trainer-id", hash.id) // hash id is the same as trainer_id
        addBtn.innerText = "Add Pokemon"
        addBtn.addEventListener("click", fetchPokemon)
    const ul = document.createElement("ul")
        pDiv.appendChild(addBtn)
        div.appendChild(pDiv)
        div.appendChild(ul)
        main.appendChild(div)
        // debugger
        hash.pokemons.forEach(pokemon => {
        //     debugger
            renderPoke(pokemon)
            // console.log(pokemon)
        })
}

const fetchPokemon = (event) => {
    debugger
    // event.preventDefault()
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }
    return fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(json => {
        debugger
        renderPoke(json)
    })
    .catch(error => console.log(error))
}

const renderPoke = (data) => {
    // debugger
    const divC = document.querySelector(`div[data-id="${data.trainer_id}"]`)
    // debugger
    const ulFind = divC.lastElementChild
    const li = document.createElement("li")
        // debugger
        li.innerText = `${data.nickname}(${data.species})` //need to find trainer.
    const releaseBtn = document.createElement("button")
        releaseBtn.setAttribute("class", "release")
        releaseBtn.setAttribute("data-pokemon-id", data.id) // will need to find pokemon.
        releaseBtn.innerText = "Release"
        releaseBtn.addEventListener("click", release)
    li.appendChild(releaseBtn)
    ulFind.appendChild(li)
    divC.appendChild(ulFind)
}

const release = (e) => {
    debugger
    e.preventDefault()
    // debugger
            let configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
            event.target.parentElement.remove() // event is the button so remove the li that holds the button.
}

//.then(response => response.json())
// .then(function(){
//     const elementRemove = document.querySelector("") //need btn.id
//         elementRemove.remove()
// })