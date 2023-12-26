import express from 'express';
import type { Request, Response } from 'express';
import * as TeamService from '../services/team.service';

export const teamRouterV1 = express.Router();

teamRouterV1.get("/", async(request: Request, response: Response) => {
    try{
        const teams = await TeamService.listOfTeams();
        if(teams){
            return response.status(200).json(teams);
        }
        return response.status(404).json("No teams found");
    }catch(error : any){
        return response.status(500).json(error.message);
    }
});

teamRouterV1.get("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try{
        const team = await TeamService.teamById(id);
        if(team){
            return response.status(200).json(team);
        }
        return response.status(404).json("Team could not be found");
    }catch(error : any){
        return response.status(500).json(error.message);
    }
});

teamRouterV1.post("/", async(request: Request, response: Response) => {
    try{
        const {name} = request.body;

        const newTeam = await TeamService.addNewTeam(name);

        response.status(201).json(newTeam);
        
    }catch(error : any){
        return response.status(500).json(error.message);
    }
});