import { PokemonTeam } from '../components/PokemonTeam';
import { Team } from '../components/Team';
import {db} from '../utils/db.server';

export const getTeams = async (): Promise<PokemonTeam[]> => {
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
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to fetch pokemons');
    }
};


export const getTeambyId = async (teamId: number): Promise<Team | null> => {
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
        console.log("Error fetching TeamId: " + teamId);
        throw new Error('Failed to fetch pokemon');
    }
}