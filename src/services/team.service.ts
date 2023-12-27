import Team from '../components/Team';
import * as TeamRepository from '../repositories/team.repository';
import * as mappingservice from '../helpers/mapping';

export async function listOfTeams(): Promise<Team[]> {
    const listOfTeams: Team[] = await TeamRepository.getTeamsFromDB();
        const mappedTeamsPromises: Promise<Team>[] = listOfTeams.map(async (team: Team) => {
            return await mappingservice.mapTeam(team);
        });
        const mappedTeams: Team[] = await Promise.all(mappedTeamsPromises);
        return mappedTeams;
}

export async function teamById(teamId: number): Promise<Team> {
    const team = await TeamRepository.getTeambyIdFromDB(teamId);
        if (team === null) {
            throw new Error('Team not found');
        }
        return mappingservice.mapTeam(team);
}

export async function addNewTeam(name: string): Promise<Team> {
    const newTeam = await TeamRepository.addTeamToDb(name);
    return newTeam;
}

export async function checkTeamExists(teamId: number) {
    try{
        const teamExists = await TeamRepository.checkTeamExistsInDB(teamId);
        return teamExists;
    }
    catch(error){
        throw new Error('Failed to check');
    }
}
