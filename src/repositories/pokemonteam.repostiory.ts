import {db} from '../utils/db.server';

export const addPokemonTeamToDb = async (teamId: number, pokemonIds: number[]) => {
    try {
        for (const pokemonId of pokemonIds) {
            await db.pokemonTeam.create({
                data: {
                    pokemon: {
                        connect: { id: pokemonId },
                    },
                    team: {
                        connect: { id: teamId },
                    },
                },
            });
        };
    } catch (error) {
        throw new Error('Failed to add Pokemon teams to the database');
    };
};

export async function pokemonCountInTeamFromDB(teamId: number): Promise<number> {
    try {
        const pokemonCount = await db.pokemonTeam.count({
            where: {
                teamId: teamId,
            },
        });

        return pokemonCount;
    } catch (error) {
        throw new Error('Failed to get Pokemon count for the team');
    }
}
