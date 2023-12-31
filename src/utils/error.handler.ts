import CustomError from "../components/CustomError";
import type { Response } from 'express';


export const handleError = (error: any, response: Response) => {
    if (error instanceof CustomError) {
        response.status(error.statusCode).json({
            error: error.error,
            error_message: error.error_message,
        });
    } else {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};