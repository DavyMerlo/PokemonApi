import PokemonTeam from './PokemonTeam';
import User from './User';
import TeamUser from './TeamUser';

type Team = {
    id: number;
    name: string;
    pokemons?: number[];
};

export default Team;
