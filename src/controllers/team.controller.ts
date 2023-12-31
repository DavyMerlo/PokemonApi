import type { Request, Response } from 'express';
import * as TeamService from '../services/team.service';
import * as PokemonTeamService  from '../services/pokemonteam.service';
import {handleError} from '../utils/handlers/error.handler';
import validatateRequest from '../utils/handlers/validation.handler';

export async function listOfTeams(request: Request, response: Response){
    try{
        const teams = await TeamService.listOfTeams();
        return response.json(teams);
    } catch (error) {
      handleError(error, response);
  };
};

export async function teamById(request: Request, response: Response){
    try{
        const teamId: number = parseInt(request.params.id, 10);
        const team = await TeamService.teamById(teamId);
        response.json(team);
    }catch (error) {
      handleError(error, response);
  }
};

export async function addTeam(request: Request, response: Response){
  try {
      validatateRequest(request);
      const { name } = request.body;
      const result = await TeamService.addTeam(name);
      response.json(result);
  } catch (error) {
      handleError(error, response);
  };
};

export async function addPokemonsToTeam(request: Request, response: Response){
    try {
      validatateRequest(request);
      const teamId = parseInt(request.params.id);
      const { pokemons } = request.body;
      const createdPokemonTeam = await PokemonTeamService.addPokemonsToTeam(teamId, pokemons);
      response.json(createdPokemonTeam);
    } catch (error) {
      handleError(error, response);
  };
};


