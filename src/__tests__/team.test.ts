import supertest from 'supertest';
import {app, server} from '../index';

describe('Pokemon API', () => {
    describe('GET /api/v1/teams/{id}', () => {
        describe('given the team exists', () => {
            it('should return the specific team', async () => {
                const teamId = '1';
                const response = await supertest(app).get(`/api/v1/teams/${teamId}`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('id', 1);
                expect(response.body).toHaveProperty('name', 'Fire Flames');
            });
        });
        describe('given the pokemon does not exist', () => {
            it('should return a 404', async () => {
            const nonExistingTeamId = '20';
            const response = await supertest(app).get(`/api/v1/teams/${nonExistingTeamId}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Team not found', error_message: 'Team with 20 does not exist' });
            });
        });
    });

    describe('GET /api/v1/teams', () => {
        it('should return an array of all teams', async () => {
            const teamsCount = 3;
            const response = await supertest(app).get('/api/v1/teams');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            const pokemonsArray = response.body as any[];
            expect(pokemonsArray).toHaveLength(teamsCount);
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