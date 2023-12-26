import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as PokemonService from '../services/pokemon.service';
export const searchRouterV1 = express.Router();


searchRouterV1.get("/", async(request: Request, response: Response) => {
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
    }
});