import type { Request, Response } from 'express';
import * as AuthenticationService from '../services/authentication.service';
import {handleError} from '../utils/error.handler';


export async function authenticate(request: Request, response: Response): Promise<void>{
    try {
        const { email, password } = request.body;
        const user = await AuthenticationService.authenticateUser(email, password);
        response.json(user);
      } catch (error) {
        handleError(error, response);
    };
};