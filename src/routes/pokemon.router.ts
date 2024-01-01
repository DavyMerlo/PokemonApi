import express from 'express';
import * as PokemonController from '../controllers/pokemon.controller';
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
pokemonRouterV1.get("/", PokemonController.listOfPokemons);

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
pokemonRouterV1.get("/:id", PokemonController.pokemonById);

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
pokemonRouterV2.get("/", PokemonController.listOfPokemonsPaginated);

/**
 * @swagger
 * /api/v2/pokemons/{id}/image:
 *   get:
 *     summary: Get a pokemon image by ID
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
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouterV2.get("/:id/image", PokemonController.pokemonImageById);
