import express from 'express';
import type { Request, Response } from 'express';
import * as AuthenticationService from '../services/authentication.service';
import e from 'express';
import CustomError from '../components/CustomError';
export const authenticationRouterV1 = express.Router();

authenticationRouterV1.post("/authenticate", async (request: Request, response: Response) => {
    const { email, password } = request.body;
    try {
        const user = await AuthenticationService.authenticateUser(email, password);
        response.json(user);
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
});