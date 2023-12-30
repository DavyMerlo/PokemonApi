import * as PokemonService from '../services/pokemon.service';
import {app, server} from '../index';
import Pokemon from '../components/Pokemon';

const pokemonId = 2;

const mockPokemonData: Pokemon[] = [
    {
        id: 1,
        name: 'Bulbasaur',
        sprite: {
            front_default : 'Something'
        },
        types: [{ name: 'Grass', slot: 1 }, { name: 'Poison', slot: 2 }],
    },
    {
        id: 2,
        name: 'Charmander',
        sprite: {
            front_default : 'Something'
        },
        types: [{ name: 'Fire', slot: 1 }],
    },
    {
        id: 3,
        name: 'Picachu',
        sprite: {
            front_default : 'Something'
        },
        types: [{ name: 'Electric', slot: 1 }],
    },
];


describe('Pokemon Service', () => {
    describe('Get a list of pokemons', () => {
        it('should return an array of pokemon when they exist', async () => {
            const pokemonServiceMock = jest.spyOn(PokemonService, 'listOfPokemons').mockResolvedValue(mockPokemonData);
            const result = await PokemonService.listOfPokemons(undefined);
            expect(result).toEqual(mockPokemonData);
            pokemonServiceMock.mockRestore();
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