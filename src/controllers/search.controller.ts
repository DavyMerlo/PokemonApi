import type { Request, Response } from 'express';
import * as PokemonService from '../services/pokemon.service';
import {handleError} from '../utils/handlers/error.handler';

export async function searchPokemons(request: Request, response: Response){
    try {
        const query = request.query.query as string;
        const limit = request.query.limit as string | undefined;
        const pokemons = await PokemonService.searchPokemons(query, limit);
        return response.json(pokemons);
    } catch (error) {
        handleError(error, response);
    };
};