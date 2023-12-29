import type { Request, Response } from 'express';
import * as PokemonService from '../services/pokemon.service';
import CustomError from '../components/CustomError';


export async function listOfPokemons(request: Request, response: Response){
    try {
        const sortParameter = request.query.sort as string | undefined;
        const pokemons = await PokemonService.listOfPokemons(sortParameter);
        if (pokemons.length > 0) {
            return response.status(200).json(pokemons);
        }
        return response.status(404).json("No pokemons found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
};

export async function pokemonById(request: Request, response: Response){
    const pokemonId: number = parseInt(request.params.id, 10);
    try {
        const pokemonDetails = await PokemonService.pokemonById(pokemonId);
        response.json(pokemonDetails);
      } catch (error) {
        if (error instanceof CustomError) {
          response.status(error.statusCode).json({
            error: error.error,
            error_message: error.error_message,
          });
        } else {
          response.status(500).json({
            error: 'InternalServerError',
            error_message: 'Internal Server Error',
          });
        }
    }
};

export async function listOfPokemonsPaginated(request: Request, response: Response) {
    try {
        const page = Number(request.query.page) || 1;
        const pageSize = Number(request.query.pageSize) || 150;
        const sort = request.query.sort as string | undefined;
        const limit = Number(request.query.limit) || undefined;
        const offset = Number(request.query.offset) || undefined;
        const baseUrl = `${request.protocol}://${request.get('host')}${request.originalUrl.split('?')[0]}`;
        const pokemons = await PokemonService.ListOfPokemonsPaginated(sort, page, pageSize, offset, limit, baseUrl);
        if (pokemons.data.length > 0) {
            return response.status(200).json(pokemons);
        }
        return response.status(404).json("No pokemons found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    };
};

