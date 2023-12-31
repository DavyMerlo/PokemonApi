import { body } from "express-validator";

export const validateAddTeam = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
];

export const validateAddPokemonToTeam = [
    body("pokemons")
    .isArray({ min: 1 })
    .withMessage(`Pokemons should contain at least one item`)
];