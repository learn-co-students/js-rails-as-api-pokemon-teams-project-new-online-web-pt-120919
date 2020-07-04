const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector('main');

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(object => {
    trainerCreate(object);
  })
}
function trainerCreate(trainerObj) {
  for (let i = 0; i < trainerObj.length; i++) {
    createCard(trainerObj[i]);  
  }
}

function createCard(obj) {
  let div = document.createElement('div');
  let pTag = document.createElement('p');
  pTag.innerText = obj.name;
  let buttonTag = document.createElement('button');
  buttonTag.innerText = "Add Pokemon";
  let ul = document.createElement('ul');
  div.className = "card";
  div.dataset.id = obj.id;
  fetchTrainerPokemons(div.dataset.id, ul)
  buttonTag.addEventListener('click', () => {
    addPokemon(div.dataset.id)
  })
  div.append(pTag, ul, buttonTag);
  div.append(ul);
  main.append(div);
}
function fetchTrainerPokemons(trainerId, pokemonList) {
  fetch(`http://localhost:3000/trainers/${trainerId}/pokemons`)
  .then(resp => resp.json())
  .then(object => {
    object.forEach(pokemonObj => {
      let li = document.createElement('li')
      li.innerHTML = `${pokemonObj.nickname} (${pokemonObj.species}) <button class="release" data-pokemon-id="${pokemonObj.id}" onclick="releasePokemon(event, ${pokemonObj.id})">Release</button`
      pokemonList.append(li)
    })
  })
}

function releasePokemon(event, pokemonId) {
  event.preventDefault()
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: 'DELETE'
  })
  event.target.parentElement.remove()
}

function addPokemon(pokemonOwner) {
  event.preventDefault()
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({trainer_id: pokemonOwner})
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers()
})
