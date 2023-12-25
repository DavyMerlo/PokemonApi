import { Team } from './Team';
import { TeamUser } from './TeamUser';


export type User = {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    teams: Team[];
    teamMemberships: TeamUser[];
};
