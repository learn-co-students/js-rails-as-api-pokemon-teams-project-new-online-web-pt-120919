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
        // debugger
        json.data.forEach(card => {
            console.log(card)
            renderCards(card)
        }) //.data is how the serializer makes it return.
    })
    .catch(error => console.log(error))
}

const renderCards = (hash) => {
    // debugger
    const main = document.querySelector("main")
    const div = document.createElement("div")
        div.setAttribute("class", "card")
        div.setAttribute("data-id", hash.id) // need id!
    const pDiv = document.createElement("p")
        pDiv.innerText = hash.attributes.name
        
    const addBtn = document.createElement("button")
        addBtn.setAttribute("data-trainer-id", hash.id)
        addBtn.innerText = "Add Pokemon"
        addBtn.addEventListener("click", fetchPokemon)
    const ul = document.createElement("ul") // need an id of some sort
        pDiv.appendChild(addBtn)
        div.appendChild(pDiv)
        div.appendChild(ul)
        main.appendChild(div)  
        // debugger
        // hash.relationships.pokemons.data.forEach(pokemon => renderPoke(pokemon))
}

const fetchPokemon = (event) => {
    // debugger
    event.preventDefault()
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(response => {
        debugger
        // console.log(response.json())
        response.json() //undefined
    })
    .then(json => {
        // debugger
        // console.log(json)
        renderPoke(json)

        // if(json.message){
        //     alert(json.message) // meaning json response message
        // } else {
        //     renderPoke(json)
        // }
    })
    .catch(error => console.log(error))
}

const renderPoke = (data) => {
    console.log(data)
    const ulFind = document.querySelector("ul")
    const li = document.createElement("li")
        debugger
        li.innerText = `${data.nickname}(${data.species})` //need to find trainer.
    const releaseBtn = document.createElement("button")
        releaseBtn.setAttribute("class", "release")
        releaseBtn.setAttribute("data-pokemon-id", data.id) // will need to find pokemon.
        releaseBtn.addEventListener("click", function(e){
            e.preventDefault()
            let configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
            event.target.parentElement.remove() // event is the button so remove the li that holds the button.
            // .then(response => response.json())
            // .then(function(){
            //     const elementRemove = document.querySelector("") //need btn.id
            //         elementRemove.remove()
            // })
        })
    li.appendChild(releaseBtn)
    ulFind.appendChild(li)
}