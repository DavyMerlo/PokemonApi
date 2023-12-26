import { PokemonTeam } from '../components/PokemonTeam';
import { Team } from '../components/Team';
import {db} from '../utils/db.server';

export const getTeamsFromDB = async (): Promise<PokemonTeam[]> => {
    try {
        const allTeamsFromDB: any[] = await db.pokemonTeam.findMany({
            include: {
                team: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                pokemon: true
            },
        });
        return allTeamsFromDB;
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