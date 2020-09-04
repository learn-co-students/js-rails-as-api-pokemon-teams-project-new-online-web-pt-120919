const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



const main = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', function () {
    getTrainers();
})

const getTrainers = () => {
    fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            for (const te of json) {
                createCard(te);
            }
        })
}

const createCard = (te) => {   
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.dataId = te['id'];
    main.appendChild(div);

    const p = document.createElement('p');
    p.innerText = te['name'];
    div.appendChild(p);

    const addBtn = document.createElement('button');
    addBtn.dataset.dataTrainerId = te['id'];
    addBtn.innerText = 'Add Pokemon';
    div.appendChild(addBtn);

    const ul = document.createElement('ul');
    div.appendChild(ul);

    for (const pe of te.pokemons) {      
        ul.appendChild(displayPokemon(pe));
    }

    addBtn.addEventListener('click', function () {
        addNewPokemon(te, ul);
    })
}

const displayPokemon = (pe) => {
    const li = document.createElement('li');
    const releaseBtn = document.createElement('button');
    releaseBtn.classList.add('release');
    releaseBtn.innerHTML = 'Release'
    releaseBtn.dataset.dataPokemonId = pe['id'];
    releaseBtn.addEventListener('click', function () {
        releasePokemon(pe) 
    })
    li.id = `pokemon-${pe["id"]}`
    li.innerHTML = pe['nickname'];
    li.innerHTML += ` (${pe.species})`  
    li.appendChild(releaseBtn); 
    return li;
}

const addNewPokemon = (te, ul) => {
    // const ul = event.target.nextSiblingElement  
    // if(te.pokemons.length < 6) {

        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'  
            },
            body: JSON.stringify({
              'trainer_id': te['id']  
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {          
            ul.appendChild(displayPokemon(json));
        })
    // }
}   

const releasePokemon = (pe) => {
    fetch(POKEMONS_URL + `/${pe.id}`, {
       method: 'DELETE'      
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        li = document.getElementById(`pokemon-${json.id}`)
        li.remove(); 
    })
}
