import supertest from 'supertest';
import {app, server} from '../index';

const nameContains = 'Char';

describe('Search Endpoints', () => {
    describe('GET /api/v1/search', () => {
        it('should return an arrary of pokemons based on name or type', async () => {
            const response = await supertest(app)
            .get('/api/v1/search')
            .query({query: nameContains});
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
})

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