import ErrorResponse from '../components/Error';
import * as PokemonRepository from '../repositories/pokemonteam.repostiory';
import * as TeamService from '../services/team.service';
import * as Handler from '../helpers/error.handler';

export async function addPokemons(teamId: number, pokemons: any[]): Promise<{ status: number, data: any | ErrorResponse }> {
    const teamExists = await TeamService.checkTeamExists(teamId);
    if (!teamExists) {
        return Handler.handleErrorResponse(404, "Team not found", "The team does not exist.");
        }
        const pokemonCount = await PokemonRepository.pokemonCountInTeamDB(teamId);
        const maxAllowedPokemons = 6;
        if (!Array.isArray(pokemons) || pokemons.length + pokemonCount > maxAllowedPokemons) {
            return Handler.handleErrorResponse(
                400,
                "Invalid request",
                "Exceeded the maximum allowed number of pokemons in the team."
            );
        }
        await PokemonRepository.addPokemonTeamToDb(teamId, pokemons);
        const team = await TeamService.teamById(teamId);
        return { status: 200, data: team };
};