const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const TEAM_SIZE = 6;

// example html to build front-end
/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */

// User stories:
// [x] When a user loads the page, they should see all trainers, with their current team of Pokemon.
// [] Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
// [] Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.

window.addEventListener('DOMContentLoaded', (event) => {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => parseTrainerData(data));

  
  
});

function parseTrainerData(trainerData) {
  const main = document.getElementsByTagName('main')[0];
  
  for (let i = 0; i < trainerData.data.length; i++) {
    const trainer = document.createElement('div');
    trainer.className = 'card';
    trainer.setAttribute('data-id', `${trainerData.data[i].id}`);
    const p = document.createElement('p');
    p.innerHTML = trainerData.data[i].attributes.name;
    const button = document.createElement('button');
    button.setAttribute('data-trainer-id', `${trainerData.data[i].id}`);
    button.innerHTML = 'Add Pokemon';
    button.addEventListener('click', addPokemon);
    const ul = document.createElement('ul');
    for (let j = 0; j < trainerData.data[i].attributes.pokemons.length; j++) {
      const li = document.createElement('li');
      li.innerHTML = `${trainerData.data[i].attributes.pokemons[j].nickname} (${trainerData.data[i].attributes.pokemons[j].species})`;
      const releaseButton = document.createElement('button');
      releaseButton.className = 'release';
      releaseButton.setAttribute('data-pokemon-id', `${trainerData.data[i].attributes.pokemons[j].id}`);
      releaseButton.innerHTML = 'Release';
      releaseButton.addEventListener('click', deletePokemon);
      li.appendChild(releaseButton);
      ul.appendChild(li);
    }
    trainer.appendChild(p);
    trainer.appendChild(button);
    trainer.appendChild(ul);
    main.appendChild(trainer);
  }
}

function addPokemon() {
  const trainerId = this.getAttribute('data-trainer-id');
  const ul = this.parentNode.getElementsByTagName('ul')[0];
  const teamSize = ul.getElementsByTagName('li').length;
  if (teamSize >= 6) {
    alert("Team is too big. Please release a pokemon to free up team slots.");
  } else {
    let configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "trainer_id": trainerId,
      })
    };

    fetch("http://localhost:3000/pokemon", configurationObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
      const li = document.createElement('li');
      li.innerHTML = `${object.nickname} (${object.species})`;
      const releaseButton = document.createElement('button');
      releaseButton.className = 'release';
      releaseButton.setAttribute('data-pokemon-id', `${object.id}`);
      releaseButton.innerHTML = 'Release';
      releaseButton.addEventListener('click', deletePokemon);
      li.appendChild(releaseButton);
      ul.appendChild(li);
    })
    .catch(function(error) {
      alert("Error when creating pokemon!");
      console.log(error.message);
    });
  }

}

function deletePokemon() {
  const pokemonId = this.getAttribute('data-pokemon-id');
  const tmp = this;

  let configurationObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "pokemon_id": pokemonId,
    })
  };

  fetch(`http://localhost:3000/pokemons/${pokemonId}`, configurationObject)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    tmp.parentElement.remove();
  })
  .catch(function(error) {
    alert("Error when creating pokemon!");
    console.log(error.message);
  });
}
