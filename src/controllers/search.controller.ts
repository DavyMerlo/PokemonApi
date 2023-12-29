import type { Request, Response } from 'express';
import * as PokemonService from '../services/pokemon.service';

export async function searchPokemons(request: Request, response: Response){
    try {
        const query = request.query.query as string;
        const limit = request.query.limit as string | undefined;
        const pokemons = await PokemonService.searchPokemons(query, limit);
        if (pokemons.length > 0) {
            return response.status(200).json(pokemons);
        }
        return response.status(404).json("No searched pokemons found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    };
};