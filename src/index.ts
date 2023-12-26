import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { pokemonRouterV1, pokemonRouterV2 } from './routers/pokemon.router';
import { teamRouterV1 } from './routers/team.router';
import { searchRouterV1 } from './routers/search.router';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'POKEMON API',
            version: '1.0.0',
            description: "Back-end for PokeDex"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["**/*.ts"]
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
const v1Router = express.Router();
const v2Router = express.Router();

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());

v1Router.use("/pokemons", pokemonRouterV1);
v1Router.use("/search", searchRouterV1);
v1Router.use("/teams", teamRouterV1);
v1Router.use("/search", pokemonRouterV1);
v2Router.use("/pokemons", pokemonRouterV2);

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});