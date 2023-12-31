import Team from '../components/Team';
import * as TeamRepository from '../repositories/team.repository';
import {Mapper} from '../helpers/Mapper';
import CustomError from '../components/CustomError';

export async function listOfTeams(){
    const teamsFromDB: Team[] = await TeamRepository.getTeamsFromDB();
    if (!teamsFromDB || teamsFromDB.length === 0) {
        throw new CustomError(404, 'Not Found', 'No teams found');
    }
    const mappedTeams: Team[] = [];
    for (const team of teamsFromDB) {
        const mappedTeam = Mapper.mapTeam(team);
        mappedTeams.push(mappedTeam);
    }
    return mappedTeams;
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
    return await TeamRepository.teamExistsInDB(teamId);
};
