import type { Request, Response } from 'express';
import * as PokemonService from '../services/pokemon.service';
import {handleError} from '../utils/handlers/error.handler';


export async function listOfPokemons(request: Request, response: Response){
    try {
        const sortParameter = request.query.sort as string | undefined;
        const pokemons = await PokemonService.listOfPokemons(sortParameter);
        return response.json(pokemons);
    }  catch (error) {
      handleError(error, response);
  };
};

export async function pokemonById(request: Request, response: Response){
    try {
        const pokemonId: number = parseInt(request.params.id, 10);
        const pokemonDetails = await PokemonService.pokemonById(pokemonId);
        response.json(pokemonDetails);
      }catch (error) {
        handleError(error, response);
    };
};

export async function pokemonImageById(request: Request, response: Response){
  try {
      const pokemonId: number = parseInt(request.params.id, 10);
      const imageBuffer = await PokemonService.pokemonImageById(pokemonId);
      response.set('Content-Type', 'image/png');
      response.send(imageBuffer);
    }catch (error) {
      handleError(error, response);
  };
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
        return response.json(pokemons);
    } catch (error) {
      handleError(error, response);
  };
};

