import {db} from '../utils/db.server';
import PokemonDetail from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import SortingOptionsGenerator from '../helpers/SortingOptionsGenerator';

export const getPokemonsFromDB = async (
    sortParam: string | undefined): Promise<Pokemon[]> => {
    try {
        const orderBy = SortingOptionsGenerator(sortParam);
        const allPokemonsFromDB: any[] = await db.pokemonDetails.findMany({
            include: {
                types: true,
            },
            orderBy: orderBy,
        });
        return allPokemonsFromDB;
    } catch (error) {
        throw new Error('Failed to fetch pokemons');
    }
};


export const getPokemonByIdFromDB = async (pokemonId: number): Promise<PokemonDetail | null> => {
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
        return pokemonFromDB;
    } catch (error) {
        throw new Error('Failed to fetch Pokemon');
    }
};

export const searchPokemonsFromDB = async (
    query: string, 
    limit: string | undefined): Promise<Pokemon[]> => {
    try {
        const searchQuery: any = query ? {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { types: { some: { name: { contains: query, mode: 'insensitive' } } } },
            ],
        } : {};
        const parsedLimit: number | undefined = limit ? parseInt(limit, 10) : undefined;
        const allPokemonsFromDB: any[] = await db.pokemonDetails.findMany({
            where: searchQuery,
            take: parsedLimit,
            include: {
                types: true,
            },
        });
        return allPokemonsFromDB;
    } catch (error) {
        throw new Error('Failed to fetch pokemons');
    }
};

export const getPokemonsPaginatedFromDB = async (
    sortParam: string | undefined, 
    page: number, 
    pageSize: number, 
    offset: number | undefined,
    limit: number | undefined): Promise<Pokemon[]> => {
    try {
        const orderBy = SortingOptionsGenerator(sortParam);
        const skip = (page - 1) * pageSize + (offset ?? 0);
        let take = pageSize;
        if (limit && limit < pageSize) {
            take = limit;
        }

        const allPokemonsFromDB: any[] = await db.pokemonDetails.findMany({
            include: {
                types: true,
            },
            orderBy: orderBy,
            skip,
            take
        });
        return allPokemonsFromDB;
    } catch (error) {
        throw new Error('Failed to fetch paginated pokemons');
    }
};


export const pokemonExistsInDB = async (pokemonId: number): Promise<boolean> => {
    try {
        const team = await db.pokemon.findUnique({
            where: {
                id: pokemonId,
            },
        });
        return !!team;
    } catch (error) {
        throw new Error('Failed to check');
    }
};
