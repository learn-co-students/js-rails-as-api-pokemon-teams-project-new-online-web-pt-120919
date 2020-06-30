const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then((res) => res.json())
  .then((res) => displayData(res))
  .catch((err) => console.log(err));

    function displayData(object) {
      object.forEach(element => {
        const main = document.querySelector("main")  
        const div = document.createElement("div")  
        div.className = "card"
        div.setAttribute("data-id", `${element.id}`)
        div.innerHTML = `<p>${element.name}</p>`
        const button = document.createElement("button")
        button.setAttribute("data-trainer-id", `${element.id}`)
        button.innerHTML = "Add Pokemon"

        button.addEventListener("click", addPokemon)

        div.appendChild(button)
        const ul = document.createElement("ul")
        div.appendChild(ul)
        main.appendChild(div)
        element.pokemons.forEach(elementData => {
            console.log(elementData)
            ul.innerHTML += `<li>${elementData.nickname} (${elementData.species})<button class="release" data-pokemon-id=${elementData.id}>Release</button> </li>`
            div.appendChild(ul)
        });
      });
    }

const addPokemon = (e) => {
    e.preventDefault()
    const configObject = {
        mathod: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObject)
    .then(res => res.json())
    .then(console.log("Hello!"))
}    













