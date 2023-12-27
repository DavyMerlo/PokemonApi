import Team from '../components/Team';
import {db} from '../utils/db.server';

export const getTeamsFromDB = async (): Promise<Team[]> => {
    try {
        const TeamsFromDB: any = await db.team.findMany({
            select: {
                id: true,
                name: true,
                pokemons: {
                    include: {
                        pokemon: true
                    }
                }
            }
        })
        return TeamsFromDB;
        
    } catch (error) {
        throw new Error('Failed to fetch teams');
    }
};


export const getTeambyIdFromDB = async (teamId: number): Promise<Team | null> => {
    try{
        const TeamFromDB: any = await db.team.findUnique({
            where: {
                id: teamId,
            },
            select: {
                id: true,
                name: true,
                pokemons: {
                    include: {
                        pokemon: true
                    }
                }
            }
        });
        return TeamFromDB;
    }
    catch(error){
        throw new Error('Failed to fetch team');
    }
}

export const addTeamToDb = async (name: string): Promise<Team> => {
    try {
        const newTeam = await db.team.create({
            data: {
                name: name,
                pokemons: {
                    create: [],
                },
            },
        });

        return newTeam;
    } catch (error) {
        throw new Error('Failed to add team to the database');
    }
};

export const teamExistsInDB = async (teamId: number): Promise<boolean> => {
    try {
        const team = await db.team.findUnique({
            where: {
                id: teamId,
            },
        });

        return !!team;
    } catch (error) {
        throw new Error('Failed to check');
    }
};





