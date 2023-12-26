
import { PokemonTeam } from '../components/PokemonTeam';
import { Team } from '../components/Team';
import {getTeamsFromDB, getTeambyIdFromDB } from '../repositories/team.repository';

export async function listOfTeams() : Promise<Team[]> {
    try {
        const listOfTeams : PokemonTeam[] = await getTeamsFromDB();
        const teamsWithPokemonIds = mapTeams(listOfTeams);
        return teamsWithPokemonIds;
    } catch (error) {
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
        const team = await getTeambyIdFromDB(teamId);
        console.log('Team:', team);
        return team;
    } catch (error) {
        throw new Error('Failed to fetch team');
    }
}