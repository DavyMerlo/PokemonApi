import * as TeamService from '../services/team.service';
import {app, server} from '../index';
import Pokemon from '../components/Pokemon';
import PokemonDetail from '../components/PokemonDetail';
import Team from '../components/Team';

const teamId = 2;
const mockTeamData: Team[] = [
    {
        id: 1,
        name: 'Team Test 1',
    },
    {
        id: 2,
        name: 'Team Test 2',
       
    },
    {
        id: 3,
        name: 'Team Test 3',
    },
];

const mockTeamName = "Test Team 4";
const mockResult: Team = {
    id: 1,
    name: mockTeamName,
};

describe('Team Service', () => {
    describe('Get a list of teams', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('should return an array of teams when they exist', async () => {
            const teamServiceMock = jest.spyOn(TeamService, 'listOfTeams')
            .mockResolvedValue(mockTeamData);
            const result = await TeamService.listOfTeams();
            expect(result).toEqual(mockTeamData);
            teamServiceMock.mockRestore();
        });
    });

    describe('Get a team by id', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('should return the correct team by ID', async () => {
            const expectedTeam: Team | undefined = mockTeamData.find(team => team.id === teamId);
            const teamServiceMock = jest
            .spyOn(TeamService, 'teamById')
            .mockResolvedValue(expectedTeam as unknown as Team);
                const result = await TeamService.teamById(teamId);
                expect(result).toEqual(expectedTeam);
                teamServiceMock.mockRestore();
        });
    });

    describe('add a Team', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
    
        it('should add a team and return status 201', async () => {
            jest.spyOn(TeamService, 'addTeam').mockResolvedValue(mockResult);
            await TeamService.addTeam(mockTeamName); 
            expect(TeamService.addTeam).toHaveBeenCalledWith('Test Team 4');
        });
    });

    afterAll((done) => {
        server.close((err) => {
            if (err) {
                console.error('Error closing server:', err);
                done.fail(err);
            } else {
                console.log('Server closed');
                done();
            }
        });
    });
});




