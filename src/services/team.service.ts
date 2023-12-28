import Team from '../components/Team';
import * as TeamRepository from '../repositories/team.repository';
import * as mappingservice from '../helpers/Mapper';
import CustomError from '../components/CustomError';

export async function listOfTeams(): Promise<Team[]> {
    const listOfTeams: Team[] = await TeamRepository.getTeamsFromDB();
        const mappedTeamsPromises: Promise<Team>[] = listOfTeams.map(async (team: Team) => {
            return await mappingservice.mapTeam(team);
        });
        return await Promise.all(mappedTeamsPromises);
}

export async function teamById(teamId: number): Promise<Team> {
    const teamExists = await TeamRepository.teamExistsInDB(teamId);
    if (!teamExists) {
        throw new CustomError(404, 'Team not found', 'Team with ' + teamId + ' does not exist');
    }
    const team = await TeamRepository.getTeambyIdFromDB(teamId);
    return mappingservice.mapTeam(team);
}

export async function addTeam(name: string): Promise<Team> {
    const team = await TeamRepository.addTeamToDb(name);
    return mappingservice.mapTeam(team);
}

export async function checkTeamExists(teamId: number) {
    try{
        return await TeamRepository.teamExistsInDB(teamId);
    }
    catch(error){
        throw new Error('Failed to check');
    }
}
