import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as TeamService from '../services/team.service';

export const teamRouter = express.Router();


//Get list of original pokemons return for each pokemon a pokemon response
teamRouter.get("/", async(request: Request, response: Response) => {
    try{
        const pokemons = await TeamService.listTeams();
        return response.status(200).json(pokemons);
    }catch(error : any){
        return response.status(500).json(error.message);
    }
})