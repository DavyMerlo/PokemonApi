
import { PokemonTeam } from '../components/PokemonTeam';
import { Team } from '../components/Team';
import {getTeams, getTeambyId } from '../repositories/team.repository';

export async function listOfTeams() : Promise<Team[]> {
    try {
        const listOfTeams : PokemonTeam[] = await getTeams();
        const teamsWithPokemonIds = mapTeams(listOfTeams);

        return teamsWithPokemonIds;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw new Error('Failed to fetch teams');
    }
}

export async function mapTeams(listOfTeams: PokemonTeam[]): Promise<Team[]> {
    const teamsMap = new Map<number, Team>();

    listOfTeams.forEach(({ teamId, pokemonId, team }) => {
        const existingTeam = teamsMap.get(teamId);
        console.log(existingTeam?.name);

        if (existingTeam) {
            existingTeam.pokemons.push(pokemonId);
        } else {
            teamsMap.set(teamId, {
                id: teamId,
                name: team.name,
                pokemons: [pokemonId],
            });
        }
    });
    return Array.from(teamsMap.values());
}

export async function teamById(teamId: number) {
    try {
        const team = await getTeambyId(teamId);
        console.log('Team:', team);
        return team;
    } catch (error) {
        console.error('Error fetching team:', error);
        throw new Error('Failed to fetch team');
    }
}