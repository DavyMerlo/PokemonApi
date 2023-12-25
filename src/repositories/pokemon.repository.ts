import {db} from '../utils/db.server';
import { PokemonDetailResponse } from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';

export const getPokemons = async (): Promise<Pokemon[]> => {
    try {
        const allPokemonsFromDB: any[] = await db.pokemonDetails.findMany({
            include: {
                types: true,
            },
        });

        return allPokemonsFromDB;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to fetch pokemons');
    }
};

export const getPokemonbyId = async (pokemonId: number): Promise<PokemonDetailResponse | null> => {
    try {
        const pokemonFromDB: any = await db.pokemonDetails.findUnique({
            where: {
                id: pokemonId,
            },
            select: {
                id: true,
                name: true,
                height: true,
                weight: true,
                order: true,
                species:true,
                stats: true,
                moves: {
                    include: {
                        versionGroupDetails: true,
                    },
                },
                abilities: true,
                sprite: true,
                types: true,
            },
        });
        console.log(pokemonFromDB);
        return pokemonFromDB;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw new Error('Failed to fetch Pokémon');
    }
};