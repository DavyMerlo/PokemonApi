import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as PokemonService from '../services/pokemon.service';

export const pokemonRouter = express.Router();


//Get list of original pokemons return for each pokemon a pokemon response
pokemonRouter.get("/", async(request: Request, response: Response) => {
    try{
        const pokemons = await PokemonService.listPokemons();
        return response.status(200).json(pokemons);
    }catch(error : any){
        return response.status(500).json(error.message);
    }
})

//get single pokemon return a pokemondetails response
pokemonRouter.get("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try{
        const pokemon = await PokemonService.getPokemonById(id);
        if(pokemon){
            return response.status(200).json(pokemon);
        }
        return response.status(404).json("Pokemon could not be found");
    }catch(error : any){
        return response.status(500).json(error.message);
    }
})