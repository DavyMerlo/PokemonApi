import express from 'express';
import type { Request, Response } from 'express';
import * as PokemonService from '../services/pokemon.service';
export const pokemonRouterV1 = express.Router();
export const pokemonRouterV2 = express.Router();

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   sprites:
 *                     type: object
 *                     properties:
 *                       front_default:
 *                         type: string
 *                   types:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                         slot:
 *                           type: number
 */
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
 *     PokemonDetails:
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
 *             front_female:
 *               type: string
 *             front_shiny:
 *               type: string
 *             front_shiny_female:
 *               type: string
 *             back_default:
 *               type: string
 *             back_female:
 *               type: string
 *             back_shiny:
 *               type: string
 *             back_shiny_female:
 *               type: string
 *         types:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               slot:
 *                 type: number
 *         height:
 *           type: number
 *         weight:
 *           type: number
 *         moves:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               move:
 *                 type: string
 *               version_group_details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     move_learn_method:
 *                       type: string
 *                     version_group:
 *                       type: string
 *                     level_learned_at:
 *                       type: number
 *         order:
 *           type: number
 *         species:
 *           type: string
 *         stats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               stat:
 *                 type: string
 *               base_stat:
 *                 type: number
 *               effort:
 *                 type: number
 */
/**
 * @swagger
 * /api/v1/pokemons/{id}:
 *   get:
 *     summary: Get a pokemon by ID
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the pokemon to retrieve
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
 *               $ref: '#/components/schemas/PokemonDetails'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouterV1.get("/:id", async(request: Request, response: Response) => {
    const pokemonId: number = parseInt(request.params.id, 10);
    try{
        const pokemonExists = await PokemonService.checkPokemonExists(pokemonId);
        if (!pokemonExists) {
            return generateErrorResponse(response, 404, "Pokemon not found");
        }
        const pokemon = await PokemonService.pokemonById(pokemonId);
        if(pokemon){
            return response.status(200).json(pokemon);
        }
        return response.status(404).json("Pokemon could not be found");
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
 * /api/v2/pokemons:
 *   get:
 *     summary: Get all pokemons paginated
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
 *       - name: limit
 *         in: query
 *         description: Limit the number of pokemons
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: offset
 *         in: query
 *         description: Offset the number of pokemons
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pokemon'
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     next:
 *                       type: string
 *                       description: Next page url
 *                     previous:
 *                       type: string
 *                       description: Previous page url
 *                     total:
 *                       type: integer
 *                       description: Total number of pokemons
 *                       format: int32
 *                     pages:
 *                       type: integer
 *                       description: Number of pages
 *                       format: int32
 *                     page:
 *                       type: integer
 *                       description: Current page
 *                       format: int32
 *       404:
 *         description: Pokemons not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

function generateErrorResponse(response: Response, statusCode: number, errorMessage: string): void {
    response.status(statusCode).json({ error: { message: errorMessage, code: statusCode } });
}

