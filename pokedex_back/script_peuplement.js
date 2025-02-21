async function main() {
    const count = 1024;
    console.log(count);
    for (let i = 1; i <= count; i++) {
        const pokemonInfo = await fetchPokemon(i);
        if (!pokemonInfo) {
            continue;
        }
        const pokemonDetails = await fetchPokemonDetails(i);
        let nameEntry = pokemonDetails.names.find(name => name.language.name === 'fr');
        if (!nameEntry) {
            nameEntry = pokemonDetails.names.find(name => name.language.name === 'en');
        }
        const name = nameEntry.name;
        let descriptionEntry = pokemonDetails.flavor_text_entries.find(entry => entry.language.name === 'fr');
        if (!descriptionEntry) {
            descriptionEntry = pokemonDetails.flavor_text_entries.find(entry => entry.language.name === 'en');
        }
        const description = descriptionEntry.flavor_text;
        const regions = pokemonInfo.game_indices.map(game => rawRegions[game.version.name] || 'Unknown');
        const uniqueRegions = [...new Set(regions)];
        let regionWithIndex = [];
        regionWithIndex.push({ regionName: 'National', regionPokedexNumber: i });
        regionWithIndex = regionWithIndex.concat(uniqueRegions.map(region => {
            const gameIndex = pokemonInfo.game_indices.find(game => rawRegions[game.version.name] === region).game_index;
            return { regionName: region, regionPokedexNumber: gameIndex };
        }));
        const types = pokemonInfo.types.map(type => type.type.name);
        const imagePath = pokemonInfo.sprites.front_default;
        const height = pokemonInfo.height;
        const weight = pokemonInfo.weight;
        const soundPath = pokemonInfo.cries.latest;
        console.log(`processing pokemon ${i} : ${name}`);
        if (!name || !description || !regionWithIndex || !types || !imagePath || !height || !weight || !soundPath) {
            console.log({ name, description, regionWithIndex, types, imagePath, height, weight, soundPath });
        }
        const pokemon = {
            name,
            description,
            regionWithIndex,
            types,
            imagePath,
            height,
            weight,
            soundPath
        };
        await addPokemon(pokemon);
    }
}

async function fetchPokemonDetails(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await response.json();
    return data;
}

async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

async function fetchPokemonCount() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data.count;
}

async function addPokemon(pokemon) {
    const token = process.env.TOKEN_SECRET;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
    "name": pokemon.name,
    "types": pokemon.types,
    "imgUrl": pokemon.imagePath,
    "description": pokemon.description,
    "regions": pokemon.regionWithIndex,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3000/api/pkmn", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        if (result.error) {
            console.error(result.error);
        } else {
            console.log("Success");
        }
    })
    .catch((error) => console.error(error));
}

const rawRegions = {
    'red': 'Kanto',
    'blue': 'Kanto',
    'yellow': 'Kanto',
    'gold': 'Johto',
    'silver': 'Johto',
    'crystal': 'Johto',
    'ruby': 'Hoenn',
    'sapphire': 'Hoenn',
    'emerald': 'Hoenn',
    'firered': 'Kanto',
    'leafgreen': 'Kanto',
    'diamond': 'Sinnoh',
    'pearl': 'Sinnoh',
    'platinum': 'Sinnoh',
    'heartgold': 'Johto',
    'soulsilver': 'Johto',
    'black': 'Unys',
    'white': 'Unys',
    'black-2': 'Unys',
    'white-2': 'Unys',
    'x': 'Kalos',
    'y': 'Kalos',
    'omega-ruby': 'Hoenn',
    'alpha-sapphire': 'Hoenn',
    'sun': 'Alola',
    'moon': 'Alola',
    'ultra-sun': 'Alola',
    'ultra-moon': 'Alola',
    'let\'s-go-pikachu': 'Kanto',
    'let\'s-go-eevee': 'Kanto',
    'sword': 'Galar',
    'shield': 'Galar',
    'brilliant-diamond': 'Sinnoh',
    'shining-pearl': 'Sinnoh',
    'legends-arceus': 'Hisui',
    'scarlet': 'Paldea',
    'violet': 'Paldea'
};

main();