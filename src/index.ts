import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { pokemonRouter } from './routers/pokemon.router';
import { teamRouter } from './routers/team.router';

dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/pokemons", pokemonRouter);
app.use("/api/teams", teamRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});