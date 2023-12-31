import { Request } from 'express';
import CustomError from "../../components/CustomError";
import { validationResult } from 'express-validator';

const validatateRequest = (request : Request) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const message = errors.array()[0].msg;
        throw new CustomError (400, 'Validation Error', message);
    };
};

export default validatateRequest;