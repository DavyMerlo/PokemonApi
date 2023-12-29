import type { Request, Response } from 'express';
import * as TeamService from '../services/team.service';
import * as PokemonTeamService  from '../services/pokemonteam.service';
import CustomError from '../components/CustomError';

export async function listOfTeams(request: Request, response: Response){
    try{
        const teams = await TeamService.listOfTeams();
        if(teams){
            return response.status(200).json(teams);
        }
        return response.status(404).json("No teams found");
    }catch(error : any){
        return response.status(500).json(error.message);
    }
};

export async function teamById(request: Request, response: Response){
    const teamId: number = parseInt(request.params.id, 10);
    try{
        const team = await TeamService.teamById(teamId);
        response.json(team);
    }catch (error) {
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
    };
};

export async function addTeam(request: Request, response: Response){
    try{
        const {name} = request.body;
        const newTeam = await TeamService.addTeam(name);
        response.status(201).json(newTeam);

    }catch(error : any){
        return response.status(500).json(error.message);
    }
};

export async function addPokemonsToTeam(request: Request, response: Response){
    try {
        const teamId = parseInt(request.params.id);
        const { pokemons } = request.body;
        const createdPokemonTeam = await PokemonTeamService.addPokemonsToTeam(teamId, pokemons);
        response.json(createdPokemonTeam);
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
    };
};