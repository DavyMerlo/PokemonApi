import mapPokemonToDB from "./db.mapper";

const providedValue = process.argv.slice(2);
isValidProvidedValue(providedValue);
const pokemonId = Number(providedValue[0]);
importPokemonByIdOrName(providedValue);


function isValidProvidedValue(providedValue: string[]) {
    return providedValue.length === 1;
}

async function importPokemon(providedValue: number | string): Promise<any> {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${providedValue}`);
    if (!pokemonResponse.ok) {
      console.log(`Failed to fetch Pokemon with pokemonID: ${pokemonId}`);
    }
    return pokemonResponse.json()
        .then(async (pokemon) => {
            const name = pokemon.name;
            await mapPokemonToDB(name, pokemon);
        })
        .catch((error) => {
            console.error('Please provide a valid Pokemon ID or name as parameter.', error.message);
        });;
};

function importPokemonByIdOrName(providedValue: string[]){
    if (isValidProvidedValue(providedValue)){
        const pokemonValue = providedValue[0];
        if (!isNaN(Number(pokemonValue))) {
            const pokemonId = Number(pokemonValue);
            importPokemon(pokemonId);
        } else {
            const pokemonName = pokemonValue;
            importPokemon(pokemonName);
        };
    };
};