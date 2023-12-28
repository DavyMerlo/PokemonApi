import supertest from 'supertest';
import {app, server} from '../index';

describe('Team Endpoints', () => {
    describe('GET /api/v1/teams/{id}', () => {
        describe('given the team exists', () => {
            it('should return the specific team', async () => {
                const teamId = '1';
                const response = await supertest(app).get(`/api/v1/teams/${teamId}`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('id', 1);
                expect(response.body).toHaveProperty('name', 'Fire Flames');
                expect(response.body).toHaveProperty('pokemons');
                expect(response.body.pokemons).toBeInstanceOf(Array);
                expect(response.body).toHaveProperty('pokemons');
                expect(Array.isArray(response.body.pokemons)).toBe(true);

                if (Array.isArray(response.body.pokemons)) {
                    const expectedPokemonIds = [1, 2, 3]; 
                    expectedPokemonIds.forEach(expectedId => {
                        const pokemonFound = response.body.pokemons.includes(expectedId);
                        expect(pokemonFound).toBe(true);
                    });
                }
            });
        });
        describe('given the pokemon does not exist', () => {
            it('should return a 404', async () => {
            const nonExistingTeamId = '20000';
            const response = await supertest(app).get(`/api/v1/teams/${nonExistingTeamId}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Team not found', error_message: 'Team with 20000 does not exist' });
            });
        });
    });

    describe('GET /api/v1/teams', () => {
        it('should return an array of all teams', async () => {
            const response = await supertest(app).get('/api/v1/teams');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            const pokemonsArray = response.body as any[];
        });
    });
});

describe('POST /api/v1/teams', () => {
    it('should create a new team', async () => {
        const newTeamData = {
            name: 'Team Bleu Test',
        };

        const response = await supertest(app)
            .post('/api/v1/teams')
            .send(newTeamData)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201); 
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
    });
});

describe('POST /api/v1/teams/{id}', () => {
    it('should create a set of pokemons by an existing teamId', async () => {
        const existingTeamId = 1;
        const setOfPokemons = [
            5, 9 , 20, 25, 89, 23
        ];

        const response = await supertest(app)
            .post(`/api/v1/teams/${existingTeamId}`)
            .send({ pokemons: setOfPokemons })
            .expect(200);

        expect(response.body).toHaveProperty('success', true);
    });
});

afterAll((done) => {
    server.close((err) => {
        if (err) {
            console.error('Error closing server:', err);
            done.fail(err);
        } else {
            console.log('Server closed');
            done();
        }
    });
});