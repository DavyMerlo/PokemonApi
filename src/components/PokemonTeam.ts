import { Pokemon } from '@prisma/client';
import { Team } from './Team';

export type PokemonTeam = {
    id: number;
    pokemon: Pokemon;
    pokemonId: number;
    team: Team;
    teamId: number;
};
