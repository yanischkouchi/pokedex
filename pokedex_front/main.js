const pokemonListDiv = document.getElementById('pokemonList');

// Connexion au WebSocket
const ws = new WebSocket(`ws://localhost:8181`);

ws.onopen = () => {
    console.log("Connexion réussie");
};

// Fonction pour récupérer un Pokémon par son nom depuis l'API backend
async function fetchPokemonByName(pokemonName) {
    try {
        // Construire l'URL pour récupérer le Pokémon spécifique
        const response = await fetch(`http://localhost:3000/api/pkmn?name=${pokemonName}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du Pokémon');
        }
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour afficher un seul Pokémon
function displayPokemon(pokemon) {
    pokemonListDiv.innerHTML = ''; // Réinitialiser la liste avant d'afficher le Pokémon

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
        <img src="${pokemon.imgUrl}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p>Types: ${pokemon.types.join(', ')}</p>
    `;
    pokemonListDiv.appendChild(pokemonElement);
}

// Récupérer et afficher le Pokémon "Charizard"
fetchPokemonByName('Charizard');
