import Team from '../components/Team';
import { getTeamsFromDB, getTeambyIdFromDB, addTeamToDb, checkTeamExistsInDB } from '../repositories/team.repository';

export async function listOfTeams(): Promise<Team[]> {
    const listOfTeams: Team[] = await getTeamsFromDB();
        const mappedTeamsPromises: Promise<Team>[] = listOfTeams.map(async (team: Team) => {
            return await mapTeam(team);
        });
        const mappedTeams: Team[] = await Promise.all(mappedTeamsPromises);
        return mappedTeams;
}

export async function teamById(teamId: number): Promise<Team> {
    const team = await getTeambyIdFromDB(teamId);
        if (team === null) {
            throw new Error('Team not found');
        }
        return mapTeam(team);
}

export async function addNewTeam(name: string): Promise<Team> {
    const newTeam = await addTeamToDb(name);
    return newTeam;
}

export async function checkTeamExists(teamId: number) {
    try{
        const teamExists = await checkTeamExistsInDB(teamId);
        return teamExists;
    }
    catch(error){
        throw new Error('Failed to check');
    }
}


////////////////////////////////////////////////////////////////////////////////
export async function mapTeam(team: Team): Promise<Team> {
    const pokemons: number[] = team?.pokemons ? team.pokemons.map((pokemon: any) => pokemon.pokemonId) : [];
    return {
        id: team?.id || 0,
        name: team?.name || '',
        pokemons: pokemons,
    };
}

