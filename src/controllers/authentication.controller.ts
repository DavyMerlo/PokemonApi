import type { Request, Response } from 'express';
import * as AuthenticationService from '../services/authentication.service';
import CustomError from '../components/CustomError';


export async function authenticate(request: Request, response: Response): Promise<void>{
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
};