import express from 'express';
import * as SearchController from '../controllers/search.controller'
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
searchRouterV1.get("/", SearchController.searchPokemons);