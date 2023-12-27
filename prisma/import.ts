import mapPokemonToDB from "./db.mapper";

async function fetchPokemonData(pokemonId: number): Promise<any> {
  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  if (!pokemonResponse.ok) {
    console.log(`Failed to fetch Pokemon with pokemonID: ${pokemonId}`);
  }
  return pokemonResponse.json();
};

const args = process.argv.slice(2);
const pokemonId = parseInt(args[0]);

if (isNaN(pokemonId) || pokemonId <= 0) {
  console.error('Please provide a valid Pokemon ID as a command-line argument.');
} else {
  fetchPokemonData(pokemonId)
    .then((pokemonData) => {
      const name = pokemonData.name;
      console.log('Pokemon: ' + name +' added!');
      return mapPokemonToDB(name, pokemonData);
    })
    .catch((error) => {
      console.error('Error fetching Pokemon data:', error.message);
    });
};