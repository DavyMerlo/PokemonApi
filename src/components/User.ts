import Team from './Team';
import TeamUser from './TeamUser';

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };

export default User;
