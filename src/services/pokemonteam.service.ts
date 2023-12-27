import ErrorResponse from '../components/Error';
import {addPokemonTeamToDb, pokemonCountInTeamDB} from '../repositories/pokemonteam.repostiory';
import * as TeamService from '../services/team.service';

export async function addPokemons(teamId: number, pokemons: any[]): Promise<{ status: number, data: any | ErrorResponse }> {
    const teamExists = await TeamService.checkTeamExists(teamId);
        if (!teamExists) {
            const errorResponse: ErrorResponse = {
                error: "Team not found",
                error_message: "The specified team does not exist."
            };
            return { status: 404, data: errorResponse };
        }
        const pokemonCount = await pokemonCountInTeamDB(teamId);
        const maxAllowedPokemons = 6;
        if (!Array.isArray(pokemons) || pokemons.length + pokemonCount > maxAllowedPokemons) {
            const errorResponse: ErrorResponse = {
                error: 'Invalid request',
                error_message: 'Exceeded the maximum allowed number of pokemons in the team.'
            };
            return { status: 400, data: errorResponse };
        }
        await addPokemonTeamToDb(teamId, pokemons);
        const team = await TeamService.teamById(teamId);
        return { status: 200, data: team };
}