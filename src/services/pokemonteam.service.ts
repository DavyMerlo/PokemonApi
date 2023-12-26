import {addPokemonTeamToDb} from '../repositories/pokemonteam.repostiory';

export async function addPokemonsToTeam(teamId: number, pokemons: any[]) {
    try{
        await addPokemonTeamToDb(teamId, pokemons);
    }catch(error : any){
        throw new Error('Failed to add pokemons to team');
    };
};

