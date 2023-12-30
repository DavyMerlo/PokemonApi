import supertest from 'supertest';
import {app, server} from '../index';

const pokemonId = '1';
const nonExistingPokemonId = '220';
const totalItems = 151;
const currentPage = 2;
const pageSize = 10;
const totalPages = 16;

describe('Pokemon Endpoints', () => {
    describe('GET /api/v1/pokemons/{id}', () => {
        describe('given the pokemon exists', () => {
            it('should return the specific pokemon', async () => {
                const response = await supertest(app)
                .get(`/api/v1/pokemons/${pokemonId}`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('id', 1);
                expect(response.body).toHaveProperty('name', 'bulbasaur');
                expect(response.body).toHaveProperty('height', 7);
                expect(response.body).toHaveProperty('weight', 69);
                expect(response.body).toHaveProperty('order', 1);
                expect(response.body).toHaveProperty('species', 'https://pokeapi.co/api/v2/pokemon-species/1/');
            });
        });
        describe('given the pokemon does not exist', () => {
            it('should return a 404', async () => {
            const response = await supertest(app)
            .get(`/api/v1/pokemons/${nonExistingPokemonId}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Pokemon not found', error_message: 'Pokemon with Id 220 does not exist' });
            });
        });
    });

    describe('GET /api/v1/pokemons', () => {
        it('should return an array of all pokemons', async () => {
            const response = await supertest(app)
            .get('/api/v1/pokemons');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            const pokemonsArray = response.body as any[];
            expect(pokemonsArray).toHaveLength(totalItems);
        });
    });

    describe('GET /api/v2/pokemons', () => {
        describe('get all pokemons paginated', () => {
            it('should return correct pagination metadata', async () => {
                const response = await supertest(app)
                .get(`/api/v2/pokemons?page=${currentPage}&pageSize=${pageSize}`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body).toHaveProperty('metadata');
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data).toHaveLength(10); 
                expect(response.body.metadata).toHaveProperty('total', totalItems);
                expect(response.body.metadata).toHaveProperty('pages', totalPages);
                expect(response.body.metadata).toHaveProperty('page', currentPage);
            });
        });
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

