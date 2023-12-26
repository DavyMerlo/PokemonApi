import Pokemon from './Pokemon';
import Team from './Team';

type PokemonTeam = {
    id: number;
    pokemon: Pokemon;
    pokemonId: number;
    team: Team;
    teamId: number;
};

export default PokemonTeam;

