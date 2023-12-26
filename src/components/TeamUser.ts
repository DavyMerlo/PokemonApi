import Team from './Team';
import User  from './User';


type TeamUser = {
    id: number;
    team: Team;
    teamId: number;
    user: User;
    userId: number;
};

export default TeamUser;
