import { Team } from './Team';
import { User } from './User';


export type TeamUser = {
    id: number;
    team: Team;
    teamId: number;
    user: User;
    userId: number;
};
