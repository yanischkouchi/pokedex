const pokemonListDiv = document.getElementById('pokemonList');
const searchButton = document.getElementById('searchButton');
const getAllButton = document.getElementById('getAllButton');
const pokemonSearchInput = document.getElementById('pokemonSearch');
const errorSearch = document.getElementById('errorSearch');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

const ws = new WebSocket(`ws://localhost:8181`);

const POKEMONS_PER_PAGE = 12;
let currentPage = 1;
let allPokemon = [];

async function returnPkmn() {
    try {
        const response = await fetch(`http://localhost:3000/api/pkmn/all`);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des Pokémons');
        }
        allPokemon = await response.json();
        updatePagination();
    } catch (error) {
        errorSearch.textContent = error.message;
    }
}

async function fetchPokemonByName(name) {
    try {
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const response = await fetch(`http://localhost:3000/api/pkmn/search?partialName=${formattedName}`);

        if (!response.ok) {
            throw new Error('Pokémon non trouvé');
        }

        const pokemon = await response.json();
        console.log([pokemon.data[0]])
        displayPokemon([pokemon.data[0]]);        
    } catch (error) {
        errorSearch.textContent = error.message;
    }
}

function updatePagination() {
    const totalPages = Math.ceil(allPokemon.length / POKEMONS_PER_PAGE);
    
    // mise à jour des boutons
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    // mise à jour du texte de pagination
    pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;

    // affichage des Pokémon de la page actuelle
    const startIndex = (currentPage - 1) * POKEMONS_PER_PAGE;
    const endIndex = startIndex + POKEMONS_PER_PAGE;
    displayPokemon(allPokemon.slice(startIndex, endIndex));
}

function displayPokemon(pokemonList) {
    pokemonListDiv.innerHTML = ''; // vider la liste avant d'afficher les nouveaux résultats

    pokemonList.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');
        pokemonElement.innerHTML = `
            <img src="${pokemon.imgUrl}" alt="${pokemon.name}" />
            <h3>${pokemon.name}</h3>
            <p>Type(s): ${pokemon.types.join(', ')}</p>
        `;
        pokemonListDiv.appendChild(pokemonElement);
    });
}

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(allPokemon.length / POKEMONS_PER_PAGE)) {
        currentPage++;
        updatePagination();
    }
});

searchButton.addEventListener('click', () => {
    const pokemonName = pokemonSearchInput.value.trim();
    if (pokemonName) {
        fetchPokemonByName(pokemonName);
        errorSearch.textContent = ''; // réinitialiser le message d'erreur
    } else {
        errorSearch.textContent = 'Veuillez entrer un nom de Pokémon.';
    }
});

getAllButton.addEventListener('click', () => {
    returnPkmn();
});

returnPkmn();

/* RECHERCHE PAR TYPE */
const pokemonTypeSelect = document.getElementById('pokemonType');

async function fetchPokemonByType(type) {
    try {
        const response = await fetch(`http://localhost:3000/api/pkmn/search?typeOne=${type}`);

        if (!response.ok) {
            throw new Error('Aucun pokémon trouvé');
        }

        const pokemon = await response.json();
        if (pokemon.data && pokemon.data.length > 0) {
            displayPokemon(pokemon.data);  // afficher tous les Pokémon
        } else {
            throw new Error('Aucun Pokémon trouvé pour ce type.');
        }
    } catch (error) {
        errorSearch.textContent = error.message;
    }
}

pokemonTypeSelect.addEventListener('change', () => {
    const selectedType = pokemonTypeSelect.value;
    if (selectedType) {
        fetchPokemonByType(selectedType);  // lance la recherche par type
        errorSearch.textContent = '';  // réinitialiser le message d'erreur
    } else {
        errorSearch.textContent = 'Veuillez sélectionner un type de Pokémon.';
    }
});
