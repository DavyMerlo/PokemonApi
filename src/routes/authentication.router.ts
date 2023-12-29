import express from 'express';
import * as AuthenticateController from '../controllers/authentication.controller';
export const authenticationRouterV1 = express.Router();

authenticationRouterV1.post("/authenticate", AuthenticateController.authenticate);