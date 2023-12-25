import { Team } from '../components/Team';
import {db} from '../utils/db.server';

export const listTeams = async (): Promise<Team[]> => {
    try {
        const allTeamsFromDB: any[] = await db.team.findMany({
            include: {
                pokemons: true
            },
        });
        return allTeamsFromDB;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to fetch pokemons');
    }
};