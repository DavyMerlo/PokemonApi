import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as PokemonService from '../services/pokemon.service';
export const pokemonRouterV1 = express.Router();
export const pokemonRouterV2 = express.Router();

pokemonRouterV1.get("/", async (request: Request, response: Response) => {
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
});

pokemonRouterV1.get("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try{
        const pokemon = await PokemonService.pokemonById(id);
        if(pokemon){
            return response.status(200).json(pokemon);
        }
        return response.status(404).json("Pokemon could not be found");
    }catch(error : any){
        return response.status(500).json(error.message);
    }
});

pokemonRouterV2.get("/", async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const pageSize = Number(request.query.pageSize) || 150;
        const sort = request.query.sort as string | undefined;
        const limit = Number(request.query.limit) || undefined;
        const offset = Number(request.query.offset) || undefined;
        const baseUrl = `${request.protocol}://${request.get('host')}${request.originalUrl.split('?')[0]}`;
        const pokemons = await PokemonService.ListOfPokemonsPaginated(sort, page, pageSize, offset, limit, baseUrl);
        
        if(pokemons.data.length > 0){
            return response.status(200).json(pokemons);
        }
        return response.status(404).json("No pokemons found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});