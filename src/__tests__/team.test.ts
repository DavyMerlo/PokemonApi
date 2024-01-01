import supertest from 'supertest';
import {app, server} from '../index';

const teamId = '1';
const nonExistingTeamId = '20000';
const token = 'wisemen';
const expectedPokemonIds = [1, 2, 3]; 
const setOfPokemons = [150,140,130];
const newTeamData = {name: 'Team Bleu Test'};

describe('Team Endpoints', () => {
    describe('GET /api/v1/teams/{id}', () => {
        describe('given the team exists', () => {
            it('should return the specific team', async () => {
                const response = await supertest(app)
                .get(`/api/v1/teams/${teamId}`)
                .set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('id', 1);
                expect(response.body).toHaveProperty('name', 'Fire Flames');
                expect(response.body).toHaveProperty('pokemons');
                expect(response.body.pokemons).toBeInstanceOf(Array);
                expect(response.body).toHaveProperty('pokemons');
                expect(Array.isArray(response.body.pokemons)).toBe(true);
                if (Array.isArray(response.body.pokemons)) {
                    expectedPokemonIds.forEach(expectedId => {
                        const pokemonFound = response.body.pokemons.includes(expectedId);
                        expect(pokemonFound).toBe(true);
                    });
                }
            });
        });
        describe('given the pokemon does not exist', () => {
            it('should return a 404', async () => {
            const response = await supertest(app)
            .get(`/api/v1/teams/${nonExistingTeamId}`)
            .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Team not found', error_message: 'Team with Id 20000 does not exist' });
            });
        });
    });

    describe('GET /api/v1/teams', () => {
        it('should return an array of all teams', async () => {
            const response = await supertest(app)
            .get('/api/v1/teams')
            .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            const pokemonsArray = response.body as any[];
        });
    });

    describe('POST /api/v1/teams', () => {
        it('should create a new team', async () => {
            const token = 'wisemen'
            const response = await supertest(app)
                .post('/api/v1/teams')
                .send(newTeamData)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
    
            expect(response.status).toBe(201); 
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name');
        });
    });
    
    describe('POST /api/v1/teams/{id}', () => {
        it('should create a set of pokemons by an existing teamId', async () => {
            const response = await supertest(app)
                .post(`/api/v1/teams/${teamId}`)
                .send({ pokemons: setOfPokemons })
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
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
});

