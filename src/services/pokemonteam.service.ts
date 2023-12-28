import CustomError from '../components/CustomError';
import * as PokemonRepository from '../repositories/pokemonteam.repostiory';
import * as TeamService from '../services/team.service';

export async function addPokemonsToTeam(teamId: number, pokemons: any[]): Promise<any> {
    const teamExists = await TeamService.checkTeamExists(teamId);
    if (!teamExists) {
        throw new CustomError(404, 'Team not found', 'Team with ' + teamId + ' does not exist');
    }
    const pokemonCount = await PokemonRepository.pokemonCountInTeamFromDB(teamId);
    const maxAllowedPokemons = 6;
    if (!Array.isArray(pokemons) || pokemons.length + pokemonCount > maxAllowedPokemons) {
        throw new CustomError(400, 'Bad Request', "Exceeded the maximum allowed number of pokemons in this team");
    }
    await PokemonRepository.addPokemonTeamToDb(teamId, pokemons);
    const team = await TeamService.teamById(teamId);
    return team;
}