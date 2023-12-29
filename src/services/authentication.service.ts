import CustomError from '../components/CustomError';
import * as UserRepository from '../repositories/user.repository';
import {hardCodedToken} from '../config/token';

export async function authenticateUser(email: string, password: string) {
    const userFromDb = await UserRepository.getUserByEmailFromDB(email);
    if (!userFromDb || password !== userFromDb.password) {
        throw new CustomError(404, 'User not found', 'Login credentials are invalid');
    }
    const token = hardCodedToken();
    return {token, user : userFromDb};
}