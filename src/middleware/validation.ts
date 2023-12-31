import { body } from "express-validator";

export const validateAddTeam = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
];

