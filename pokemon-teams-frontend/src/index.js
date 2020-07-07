//API URL Variables
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");

//Load Event Listeners
document.addEventListener("DOMContentLoaded", e => {
    getTrainers();
    postPokemon();
    removePokemon()
});
// GET TRAINERS 
function getTrainers() {
    setUpAllTrainersForRetrieval();
}
// POST A POKEMON
function postPokemon() {
    setUpPokemonForCreation();
}
// REMOVE A POKEMON
function removePokemon() {
    setUpPokemonForDeletion();
}

// CREATE TRAINERS-Dynamically creating cards to show in the DOM with JS
function createTrainerCards(trainerData) {
    trainerData.forEach(trainer => {
        let trainerCard = document.createElement("div");
        //adding card to the div
        trainerCard.classList.add("card");  //The classList is a read-only property of an element that returns a live collection of CSS classes
        //A data attribute is exactly that: a custom attribute that stores data. They are always prefixed with data-
        trainerCard.setAttribute("data-id", `${trainer.id}`); //The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
        trainerCard.innerHTML += `
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}" class="add-pokemon-btn">Add Pokemon</button>
        `;
        let pokemonHolder = document.createElement("ul");
        trainer.pokemons.forEach(pokemon => {
            // .innerHTML method is used to change the html contents of a DOM object
            pokemonHolder.innerHTML += `
        <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
        `;
        //can append several nodes and strings
            trainerCard.append(pokemonHolder);
            //can only append one node
            main.appendChild(trainerCard);
        });
    });
};

// GET ALL POKEMON 
function setUpAllTrainersForRetrieval() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainerData => {
            createTrainerCards(trainerData);
            console.log("SUCCESS");
        })
        .catch(err => console.log(err.message));
}

// ADD A POKEMON
function setUpPokemonForCreation() {
    main.addEventListener('click', e => {
        let addButtons = document.querySelectorAll('.add-pokemon-btn')
        let pokemonHolder = e.target.nextElementSibling
        addButtons.forEach(btn => {
            if (e.target === btn) {
                let trainerId = btn.parentElement.dataset.id;
                let pokemonList = btn.nextElementSibling.querySelectorAll('li');
                    if (pokemonList.length >= 6) {
                        alert("You can't add any more pokemon")
                    } else {
                        createFetchPost(trainerId)
                    }
            }
        })

          //POST FETCH CODE
        function createFetchPost(id) {
            data = {
                "trainer_id": id
            }
            options = {
                "method": "POST",
                    "headers": {
                        'Content-Type': "application/json",
                        'Accept': "application/json"
                    },
                    body: JSON.stringify(data)
            }
            fetch(POKEMONS_URL, options)
                .then(res => res.json())
                .then(pokemon => {
                    createPokemonItem(pokemon)
                    console.log(pokemon)
                })
                .catch(err => console.log(err.message))
               
            function createPokemonItem(pokemon) {
                pokemonItem = document.createElement('li')
                pokemonItem.innerHTML += `${pokemon.data.nickname} (${pokemon.data.species})<button class="release" data-pokemon-id="${pokemon.data.id}">Release</button>`                    
                pokemonHolder.appendChild(pokemonItem)
            }
               
        }
          
    })
}

// DELETE A POKEMON 
function setUpPokemonForDeletion() {
    main.addEventListener('click', e => {
      let releaseButtons = document.querySelectorAll('.release') // all release pokemon buttons
        releaseButtons.forEach(btn => {
            if (e.target === btn) {
                let pokemonId = btn.dataset.pokemonId;
                createFetchDelete(pokemonId)
                btn.parentElement.remove()
            }
        })

          //DELETE FETCH CODE
        function createFetchDelete(id) {
            fetch(`${POKEMONS_URL}/${id}`, {
                        "method": "DELETE"
                    })
                    .then(console.log("Deleted Successfully"))
                    .catch(err => console.log(err.message))
        }

    })
}