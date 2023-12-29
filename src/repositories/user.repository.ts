import User from '../components/User';
import {db} from '../utils/db.server';


export const getUserByEmailFromDB = async (email: string): Promise<User | null> => {
    try {
        const userFromDb = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!userFromDb) {
            throw new Error('Failed to fetch user');
        }
        return userFromDb;
    } catch (error) {
        throw new Error('Fetch failed');
    };
};
