const pokemonListDiv = document.getElementById('pokemonList');
const searchButton = document.getElementById('searchButton');
const pokemonSearchInput = document.getElementById('pokemonSearch');
const errorSearch = document.getElementById('errorSearch');

// Connexion au WebSocket
const ws = new WebSocket(`ws://localhost:8181`);

ws.onopen = () => {
    console.log("Connexion réussie");
};

// Fonction pour récupérer un Pokémon par son nom
async function fetchPokemonByName(name) {
    try {
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Formater le nom du Pokémon
        const response = await fetch(`http://localhost:3000/api/pkmn?name=${formattedName}`);

        if (!response.ok) {
            throw new Error('Pokémon non trouvé');
        }

        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        errorSearch.textContent = error.message; // Afficher l'erreur
    }
}

// Fonction pour afficher un Pokémon
function displayPokemon(pokemon) {
    pokemonListDiv.innerHTML = ''; // Réinitialiser la liste des Pokémon

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
        <img src="${pokemon.imgUrl}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p>Type(s): ${pokemon.types.join(', ')}</p>
    `;
    pokemonListDiv.appendChild(pokemonElement);
}

// Gestion de la recherche via le bouton
searchButton.addEventListener('click', () => {
    const pokemonName = pokemonSearchInput.value.trim();
    if (pokemonName) {
        fetchPokemonByName(pokemonName);
        errorSearch.textContent = ''; // Réinitialiser le message d'erreur
    } else {
        errorSearch.textContent = 'Veuillez entrer un nom de Pokémon.';
    }
});
