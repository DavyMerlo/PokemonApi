import Team from './Team';
import TeamUser from './TeamUser';


type User = {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    teams: Team[];
    teamMemberships: TeamUser[];
};

export default User;
