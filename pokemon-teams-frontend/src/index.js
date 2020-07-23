const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => loadTrainers())
     
const loadTrainers = () => {
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(results => {
            results.forEach(trainer => renderTrainer(trainer))
        })
     }

     const renderTrainer = (trainerInfo) => {
        const div = document.createElement('div')
        const p = document.createElement('p')
        const button = document.createElement('button')
        const ul = document.createElement('ul')

        div.setAttribute('class', 'card')
        div.setAttribute('data-id', trainerInfo.id)
        p.innerHTML = trainerInfo.name
        button.setAttribute('data-trainer-id', trainerInfo.id)
        button.innerHTML = 'Add Pokemon'

        button.addEventListener('click', createPokemon)

        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(ul)

        main.appendChild(div)
        trainerInfo.pokemons.forEach(pokemon => renderPokemon(pokemon))
     }

     const renderPokemon = (pokemon) => {
        const ul = document.querySelector(`div[data-id = '${pokemon.trainer_id}']`)
        const li = document.createElement('li')
        const button = document.createElement('button')
        
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        button.setAttribute('class', 'release')
        button.setAttribute('data-pokemon-id', pokemon.id)
        button.innerHTML = 'Release'

        button.addEventListener('click', deletePokemon)

        li.appendChild(button)
        ul.appendChild(li)
     }

     const createPokemon = (e) => {
        e.preventDefault()
        const configObj = {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: e.target.dataset.trainerId})
        }
        fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => {
          if (json.message){
            alert(json.message)
          } else {
            renderPokemon(json)
          }})
      }

     const deletePokemon = (e) => {
        e.preventDefault()
        const configObj = {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
        }
        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        e.target.parentElement.remove()
     }
    

// document.addEventListener('DOMContentLoaded', function(){
//     loadTrainers()
// })

// function loadTrainers() {
//     fetch(TRAINERS_URL)
//         .then(response => response.json())
//         .then(renderCards)
// }

// function renderCards(trainers) {
//     const main = document.querySelector('main');

//     main.innerHTML = trainers.map(trainer => `
//         <div class="card" data-id="${trainer.id}">
//             <p>${trainer.name}</p>
//             <button class="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
//             <ul>
//                 ${trainer.pokemons.map(pokemon => `
//                     <li>${pokemon.nickname} <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
//                 `).join('')}
//             </ul>
//         </div>
//     `).join('');

//     main.querySelectorAll('.add-pokemon').forEach(button => button.addEventListener('click', () => console.log('poop')))
//     main.querySelectorAll('.release').forEach(button => button.addEventListener('click', () => console.log('pee')))
// }