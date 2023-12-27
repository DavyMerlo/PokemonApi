import mapPokemonToDB from "./db.mapper";

const providedValue = process.argv.slice(2);
isValidProvidedValue(providedValue);
const pokemonId = Number(providedValue[0]);
importPokemonByIdOrName(providedValue);


function isValidProvidedValue(providedValue: string[]) {
    return providedValue.length === 1;
}

async function fetchPokemonData(providedValue: number | string): Promise<any> {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${providedValue}`);
    if (!pokemonResponse.ok) {
      console.log(`Failed to fetch Pokemon with pokemonID: ${pokemonId}`);
    }
    return pokemonResponse.json().then((pokemonData) => {
        const name = pokemonData.name;
        console.log('Pokemon: ' + name + ' added!');
        return mapPokemonToDB(name, pokemonData);
    })
    .catch((error) => {
        console.error('Please provide a valid Pokémon ID or name as a command-line argument.', error.message);
    });;
};

function importPokemonByIdOrName(providedValue: string[]){
    if (isValidProvidedValue(providedValue)){
        const pokemonValue = providedValue[0];
        if (!isNaN(Number(pokemonValue))) {
            const pokemonId = Number(pokemonValue);
            fetchPokemonData(pokemonId);
        } else {
            const pokemonName = pokemonValue;
            fetchPokemonData(pokemonName);
        };
    };
};


