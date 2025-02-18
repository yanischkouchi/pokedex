const pokemonListDiv = document.getElementById('pokemonList');
const pokemonSearchInput = document.getElementById('pokemonSearch');
const searchButton = document.getElementById('searchButton');

// Connexion au WebSocket
const ws = new WebSocket(`ws://localhost:8181`);

ws.onopen = () => {
    console.log("Connexion réussie");
};

async function fetchPokemonByName(pokemonName) {
    try {
        // mettre la 1e lettre en maj et le reste en min
        const formattedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();

        const response = await fetch(`http://localhost:3000/api/pkmn?name=${formattedName}`);
        if (!response.ok) {
            throw new Error('Pokémon pas connu ou pas enregistré');
        }
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// afficher un seul Pokémon
function displayPokemon(pokemon) {
    pokemonListDiv.innerHTML = ''; // réinitialiser la liste avant d'afficher le Pokémon

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
        <img src="${pokemon.imgUrl}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p>Types: ${pokemon.types.join(', ')}</p>
    `;
    pokemonListDiv.appendChild(pokemonElement);
}

// btn rechercher pokémon
searchButton.addEventListener('click', () => {
    const searchTerm = pokemonSearchInput.value.trim();
    if (searchTerm) {
        // si un texte est saisi, rechercher le Pokémon par son nom
        fetchPokemonByName(searchTerm);
    } else {
        // si le champ de recherche est vide, afficher un message ou réinitialiser la liste
        pokemonListDiv.innerHTML = '<p>Veuillez entrer un nom de Pokémon pour effectuer la recherche.</p>';
    }
});
