import express from 'express';
import type { Request, Response } from 'express';
import * as TeamService from '../services/team.service';
import * as PokemonTeamService  from '../services/pokemonteam.service';
export const teamRouterV1 = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *     Pokemon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         sprites:
 *           type: object
 *           properties:
 *             front_default:
 *               type: string
 *         types:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *               slot:
 *                 type: number
 */
/**
 * @swagger
 * /api/v1/pokemons:
 *   get:
 *     summary: Get all pokemons
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - name: sort
 *         in: query
 *         description: Sort the pokemons
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - name-asc
 *             - name-desc
 *             - id-asc
 *             - id-desc
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         pokemons:
 *           type: array
 *           items:
 *             type: integer
 */
/**
 * @swagger
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Get a team by id
 *     tags:
 *       - Teams
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the team to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouterV1.get("/:id", async(request: Request, response: Response) => {
    const teamId: number = parseInt(request.params.id, 10);
    try{
        const teamExists = await TeamService.checkTeamExists(teamId);
        if (!teamExists) {
            return response.status(404).json({ error: "Team not found" });
        }
        const team = await TeamService.teamById(teamId);
        if(team){
            return response.status(200).json(team);
        }
    }catch(error : any){
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         pokemons:
 *           type: array
 *           items:
 *             type: integer
 */
/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Get all teams
 *     tags:
 *       - Teams
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *   post:
 *     summary: Create a new team
 *     tags:
 *       - Teams
 *     requestBody:
 *       description: Team to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
teamRouterV1.post("/", async(request: Request, response: Response) => {
    try{
        const {name} = request.body;
        const newTeam = await TeamService.addNewTeam(name);
        response.status(201).json(newTeam);

    }catch(error : any){
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         pokemons:
 *           type: array
 *           items:
 *             type: integer
 */
/**
 * @swagger
 * /api/v1/teams/{id}:
 *   post:
 *     summary: Set Pokemons of a team
 *     tags:
 *       - Teams
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the team to set pokemons
 *         required: true
 *         schema:
 *           type: integer
 * 
 *     requestBody:
 *       description: Array of Pokemon id's to set
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemons:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouterV1.post("/:id/pokemons", async(request: Request, response: Response) => {
    try{
        const teamId = parseInt(request.params.id);
        const { pokemons } = request.body;

        const teamExists = await TeamService.checkTeamExists(teamId);
        if (!teamExists) {
            return response.status(404).json({ error: "Team not found" });
        }

        if (!Array.isArray(pokemons) || pokemons.length > 6) {
            return response.status(400).json({ error: "Pokemons array should contain a maximum of 6 pokemonId's" });
        }
        await PokemonTeamService.addPokemonsToTeam(teamId, pokemons);
        return response.status(201).json({ message: "Pokemons added to team with ID: " + teamId });
    }
    catch(error : any){
        return response.status(500).json(error.message);
    }
})