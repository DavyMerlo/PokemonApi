import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as PokemonService from '../services/pokemon.service';
export const searchRouterV1 = express.Router();

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
 * /api/v1/search:
 *   get:
 *     summary: Search for pokemons
 *     tags:
 *       - Search
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Name or Type of the pokemon
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Limit the number of results
 *         required: false
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokemons not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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