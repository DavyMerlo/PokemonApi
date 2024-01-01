import * as PokemonService from '../services/pokemon.service';
import {app, server} from '../index';
import Pokemon from '../components/Pokemon';
import PokemonDetail from '../components/PokemonDetail';

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

        afterEach(() => {
            jest.restoreAllMocks();
        });
    
        it('should return an array of pokemon when they exist', async () => {
            const pokemonServiceMock = jest.spyOn(PokemonService, 'listOfPokemons')
            .mockResolvedValue(mockPokemonData);
            const result = await PokemonService.listOfPokemons(undefined);
            expect(result).toEqual(mockPokemonData);
            pokemonServiceMock.mockRestore();
        });
    });

    describe('Get a pokemon by Id', () => {

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return the correct pokemon by ID', async () => {
            const expectedPokemon: Pokemon | undefined = mockPokemonData.find(pokemon => pokemon.id === pokemonId);
            const pokemonServiceMock = jest
            .spyOn(PokemonService, 'pokemonById')
            .mockResolvedValue(expectedPokemon as unknown as PokemonDetail);
                const result = await PokemonService.pokemonById(pokemonId);
                expect(result).toEqual(expectedPokemon);
                console.log(result, expectedPokemon);
                pokemonServiceMock.mockRestore();
        });
    });

    describe('ListOfPokemonsPaginated', () => {

        afterEach(() => {
            jest.restoreAllMocks();
        });
    
         it('should return paginated list of pokemons', async () => {
    
            jest.spyOn(PokemonService, 'ListOfPokemonsPaginated')
            .mockResolvedValue({
                data: mockPokemonData,
                metadata: {
                    total: mockPokemonData.length,
                    pages: 1,
                    page: 1,
                    next: null,
                    previous: null,
                },
            });
            const result = await PokemonService.ListOfPokemonsPaginated('name', 1, 10, undefined, undefined, 'http://example.com/api/pokemons');
            expect(result).toEqual({
                data: mockPokemonData,
                metadata: {
                    total: mockPokemonData.length,
                    pages: 1,
                    page: 1,
                    next: null,
                    previous: null,
                },
            });
        });
    });

    describe('searchPokemons', () => {

        afterEach(() => {
            jest.restoreAllMocks();
        });
    
        it('should search for pokemons based on a query and limit', async () => {
            jest.spyOn(PokemonService, 'searchPokemons').mockResolvedValue(mockPokemonData);
            const query = 'Char';
            const limit = '5';
            const result = await PokemonService.searchPokemons(query, limit);
            expect(PokemonService.searchPokemons).toHaveBeenCalledWith(query, limit);
            expect(result).toEqual(mockPokemonData);
        });
    
        it('should throw an error if no pokemons are found', async () => {
            jest.spyOn(PokemonService, 'searchPokemons').mockResolvedValue([]);
            const query = 'NonExistentName';
            const limit = '5';
            const result = await PokemonService.searchPokemons(query, limit);
            expect(result).toEqual([]);
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






