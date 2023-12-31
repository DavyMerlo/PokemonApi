import type { Request, Response } from 'express';
import * as TeamService from '../services/team.service';
import * as PokemonTeamService  from '../services/pokemonteam.service';
import {handleError} from '../utils/error.handler';
import {validationResult } from 'express-validator';

export async function listOfTeams(request: Request, response: Response){
    try{
        const teams = await TeamService.listOfTeams();
        if(teams){
            return response.status(200).json(teams);
        }
        return response.status(404).json("No teams found");
    } catch (error) {
      handleError(error, response);
  };
};

export async function teamById(request: Request, response: Response){
    const teamId: number = parseInt(request.params.id, 10);
    try{
        const team = await TeamService.teamById(teamId);
        response.json(team);
    }catch (error) {
      handleError(error, response);
  }
};

export async function addTeam(request: Request, response: Response){
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
      const validationError = errors.array()[0].msg;
      return response.status(400).json(
        { 
          error: 'Validation Error', 
          error_message: validationError 
        });
  }
  try {
      const { name } = request.body;
      const result = await TeamService.addTeam(name);
      response.json(result);
  } catch (error) {
      handleError(error, response);
  };
};

export async function addPokemonsToTeam(request: Request, response: Response){
    try {
        const teamId = parseInt(request.params.id);
        const { pokemons } = request.body;
        const createdPokemonTeam = await PokemonTeamService.addPokemonsToTeam(teamId, pokemons);
        response.json(createdPokemonTeam);
    } catch (error) {
      handleError(error, response);
  };
};


