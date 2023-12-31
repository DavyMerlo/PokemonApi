import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { authenticationRouterV1 } from './routes/authentication.router';
import { pokemonRouterV1, pokemonRouterV2 } from './routes/pokemon.router';
import { teamRouterV1 } from './routes/team.router';
import { searchRouterV1 } from './routes/search.router';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import authorization from './utils/auth';
import { swaggerConfig } from './utils/swaggerConfig';

dotenv.config();
if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
export const app = express();

const v1Router = express.Router();
const v2Router = express.Router();
const specs = swaggerJSDoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(express.json());

v1Router.use("/auth", authenticationRouterV1);
v1Router.use("/pokemons", pokemonRouterV1);
v1Router.use("/search", searchRouterV1);
v1Router.use("/teams", authorization, teamRouterV1);
v1Router.use("/search", pokemonRouterV1);
v2Router.use("/pokemons", pokemonRouterV2);

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

export const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});