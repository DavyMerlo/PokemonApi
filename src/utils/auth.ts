import { NextFunction, Request, Response } from 'express';
import { hardCodedToken } from "../config/token";


function authorization(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const expectedToken = hardCodedToken();
    if (token === `Bearer ${expectedToken}`) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export default authorization;