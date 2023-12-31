import Team from '../components/Team';
import * as TeamRepository from '../repositories/team.repository';
import {Mapper} from '../helpers/Mapper';
import CustomError from '../components/CustomError';

export async function listOfTeams(){
    const listOfTeams: Team[] = await TeamRepository.getTeamsFromDB();
        const mappedTeams: Promise<Team>[] = listOfTeams.map(async (team: Team) => {
            return Mapper.mapTeam(team);
        });
        return await Promise.all(mappedTeams);
}

export async function teamById(teamId: number) {
    const teamExists = await TeamRepository.teamExistsInDB(teamId);
    if (!teamExists) {
        throw new CustomError(404, 'Team not found', 'Team with Id ' + teamId + ' does not exist');
    }
    const team = await TeamRepository.getTeambyIdFromDB(teamId);
    return Mapper.mapTeam(team);
}

export async function addTeam(name: string) {
    const team = await TeamRepository.addTeamToDb(name);
    return Mapper.mapTeam(team);
}

export async function checkTeamExists(teamId: number) {
    try{
        return await TeamRepository.teamExistsInDB(teamId);
    }
    catch(error){
        throw new Error('Failed to check');
    }
}
